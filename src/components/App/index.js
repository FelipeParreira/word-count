import './index.css';

import React from 'react';
import Form from '../Form';
import { Typography, Box } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Box p={5}>
        <Typography variant="h3" component="h1" gutterBottom>
            Let's count words!
        </Typography>
      </Box>
      <Box>
        <Form />
      </Box>
    </div>
  );
}

export default App;
