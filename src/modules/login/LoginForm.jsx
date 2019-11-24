import React, { PureComponent } from 'react';
import { Button, TextField, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import { postJsonData } from '../../common/fetchMethods';
import { API_DATA } from '../../common/config';
import ErrorMessage from '../../common/components/ErrorMessage';
import { RESPONSE_TYPE } from '../../common/enums';

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      password: '',
      username: ''
    };
  }

  handleUserNameChange = event => {
    const { value } = event.target;

    this.setState({ username: value });
  };

  handlePasswordChange = event => {
    const { value } = event.target;

    this.setState({ password: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { username, password } = this.state;
    const data = { username, password };
    const { onLogin } = this.props;

    try {
      const result = await postJsonData(
        `${API_DATA.URL}/${API_DATA.AUTH}`,
        data
      );
      const {
        data: { token, message },
        code
      } = result;

      if (code === RESPONSE_TYPE.FORBIDDEN) {
        throw new Error(message);
      }

      onLogin(token);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Paper className="login-form-wrapper">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <TextField
            className="login-form__input"
            id="filled-basic"
            label="Username"
            onChange={this.handleUserNameChange}
            required
            variant="filled"
          />
          <TextField
            className="login-form__input"
            id="filled-basic"
            label="password"
            onChange={this.handlePasswordChange}
            required
            type="password"
            variant="filled"
          />
          <Button color="primary" type="submit" variant="contained">
            Login
          </Button>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Paper>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
