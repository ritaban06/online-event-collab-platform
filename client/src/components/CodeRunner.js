import React, { useState, useEffect } from 'react';
import { runCode } from './api'; 
import { Box, Button, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Editor, useMonaco } from '@monaco-editor/react';

const CodeRunner = () => {
  const [code, setCode] = useState(localStorage.getItem("savedCode") || "// Write your JavaScript code here...\n// Use console.log() to print output");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const monaco = useMonaco();

  useEffect(() => {
    const initializeMonacoTheme = async () => {
      if (!monaco) return;

      monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#EDF9FA',
        },
      });

      monaco.editor.setTheme('customTheme');
    };

    initializeMonacoTheme();
  }, [monaco]);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('');
    setError(null);

    try {
      const result = await runCode({ code, language, input });
      setOutput(result?.output || 'No output received.');
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("// Write your JavaScript code here...\n// Use console.log() to print output");
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Code Runner
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setCode(`// Write your ${e.target.value} code here...\n// Use console.log() to print output`);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="javascript">JAVASCRIPT</MenuItem>
          <MenuItem value="python">PYTHON</MenuItem>
          <MenuItem value="cpp">CPP</MenuItem>
        </Select>

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

      <Editor
        height="400px"
        width="100%"
        language={language}
        theme="customTheme"
        value={code}
        onChange={(newValue) => setCode(newValue || '')}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
        }}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Input:</Typography>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter input for your code..."
          sx={{ mt: 1 }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Output:</Typography>
        <Box
          sx={{
            backgroundColor: '#f4f4f4',
            padding: 2,
            borderRadius: 1,
            border: '1px solid #ddd',
            overflowY: 'auto',
            maxHeight: '200px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {output || 'No output to display.'}
        </Box>
      </Box>

      {error && (
        <Typography sx={{ mt: 2, color: 'red' }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default CodeRunner;