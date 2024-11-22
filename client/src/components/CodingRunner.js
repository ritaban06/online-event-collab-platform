import React, { useState, useEffect } from 'react';
import { runCode } from './api';
import { Box, Button, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Editor, loader, useMonaco } from '@monaco-editor/react';

const CodeRunner = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('javascript');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const monaco = useMonaco();

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme('myTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        colors: {
          'editor.background': '#EDF9FA',
        },
      });
      monaco.editor.setTheme('myTheme');
    });
  }, [monaco]);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput(''); // Reset output on new run
    setError(null);
    try {
      const result = await runCode({ code, language, input });
      setLoading(false);
      setOutput(result.output);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Online Code Runner
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ mr: 2 }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleRunCode}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? 'Running...' : 'Run Code'}
        </Button>
      </Box>

      <Editor
        height="400px"
        width="100%"
        language={language}
        theme="myTheme"
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
        }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Input:</Typography>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ width: '100%', mb: 2 }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Output:</Typography>
        <Typography sx={{ wordBreak: 'break-all' }}>
          {output}
        </Typography>
        {error && (
          <Typography sx={{ color: 'red' }}>{error}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CodeRunner;