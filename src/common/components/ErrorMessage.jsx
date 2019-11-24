import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ErrorMessage = ({ children }) => (
  <div className="error-message">
    <Typography align="left" color="error" gutterBottom>
      {children}
    </Typography>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default ErrorMessage;
