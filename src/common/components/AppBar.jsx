import React from 'react';
import { AppBar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppTopBar = ({ onLogout }) => (
  <AppBar color="primary">
    <Button color="default" className="app-top-bar__button" variant="contained">
      <Link to="/dashboard">Home</Link>
    </Button>
    <Typography align="center" className="app-top-bar__heading" variant="h5">
      Simple Web App
    </Typography>
    <Button
      className="app-top-bar__button"
      color="default"
      onClick={onLogout}
      variant="contained"
    >
      <Typography>Logout</Typography>
    </Button>
  </AppBar>
);

AppTopBar.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default AppTopBar;
