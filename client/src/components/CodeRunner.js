import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { runCode } from "./api";

// Initialize WebSocket for collaborative editing
const socket = io("http://localhost:4000", {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const languageTemplates = {
  javascript: "// Write your JavaScript code here...\n// Use console.log() to print output",
  python: "# Write your Python code here...\n# Use print() to print output",
  cpp: "// Write your C++ code here...\n// Use std::cout to print output",
};

const CodeRunner = () => {
  const [code, setCode] = useState(localStorage.getItem("savedCode") || languageTemplates["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("vs-dark");

  const uniqueId = useState(uuidv4())[0]; // Unique ID for collaborative sessions

  // Handle code changes and send updates to WebSocket
  const handleCodeChange = (newCode) => {
    setCode(newCode || "");
    socket.emit("code-change", { id: uniqueId, code: newCode });
  };

  // Listen for updates from other clients
  useEffect(() => {
    socket.on("code-update", (data) => {
      if (data.id !== uniqueId) {
        setCode(data.code);
      }
    });

    return () => socket.off("code-update");
  }, [uniqueId]);

  // Save code to localStorage
  useEffect(() => {
    localStorage.setItem("savedCode", code);
  }, [code]);

  const handleRunCode = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    const result = await runCode({ code, language, input });

    if (result.error) {
      setError(result.error);
    } else {
      setOutput(result.output);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setCode(languageTemplates[language]);
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Code Runner
      </Typography>

      {/* Top Bar: Language Selector, Theme Toggle, and Run Button */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setCode(languageTemplates[e.target.value]);
          }}
          sx={{ minWidth: 200 }}
        >
          {Object.keys(languageTemplates).map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          control={
            <Switch
              checked={theme === "vs-dark"}
              onChange={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
            />
          }
          label="Dark Mode"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRunCode}
          disabled={loading}
        >
          {loading ? "Running..." : "Run Code"}
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {/* Main Layout: Editor and Input/Output Panels */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        {/* Code Editor */}
        <Editor
          height="400px"
          width="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={handleCodeChange}
        />

        {/* Input and Output Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Input */}
          <TextField
            label="Input"
            multiline
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here"
            variant="outlined"
          />

          {/* Output */}
          <TextField
            label="Output"
            multiline
            rows={5}
            value={error ? `Error: ${error}` : output}
            placeholder="Execution output will appear here"
            variant="outlined"
          InputProps={{
            readOnly: true,
            sx: { backgroundColor: 'transparent' },
            disableUnderline: true,
          }}
          />
        </Box>
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default CodeRunner;
