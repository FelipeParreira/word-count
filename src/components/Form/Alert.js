import { Alert as AAlert } from '@material-ui/lab';
import React from 'react';

const Alert = ({ message, severity }) => (
  <AAlert style={{width: '30%', margin: '0 auto'}} variant="outlined" severity={severity}>
    {message}
  </AAlert>
);

export default Alert;
