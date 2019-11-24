import React, { PureComponent } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactImage from 'react-image';

import { getData } from '../fetchMethods';
import { readLocalStorage } from '../helpers';
import { USER_DATA } from '../enums';
import { API_DATA } from '../config';
import Preloader from './Prelodaer';

class AuthorModal extends PureComponent {
  constructor() {
    super();

    this.state = {
      authorData: null,
      userToken: null
    };
  }

  componentDidMount() {
    this.getUserToken();
  }

  getUserToken = () => {
    const { userToken } = readLocalStorage(USER_DATA.TOKEN);

    this.setState({ userToken }, () => this.fetchAuthorDetails());
  };

  fetchAuthorDetails = async () => {
    const { authorId } = this.props;
    const { userToken } = this.state;

    try {
      const result = await getData(
        `${API_DATA.URL}/${API_DATA.GET_AUTHOR}/${authorId}`
      )(userToken);
      const { data } = result;

      this.setState({ authorData: data });
    } catch (error) {
      /**
       * This is not a good practice to handle errors
       * this is only temporary solution
       */
    }
  };

  render() {
    const { onClose } = this.props;
    const { authorData } = this.state;

    if (!authorData) {
      return null;
    }

    const { name, description, avatar } = authorData;

    return (
      <Paper className="author-modal">
        <header className="author-modal__header">
          <Typography align="left" gutterBottom>
            {name}
          </Typography>
          <div className="author-modal__image-wrapper">
            <ReactImage
              className="author-modal__image"
              loader={<Preloader />}
              src={[avatar, 'https://via.placeholder.com/20x20']}
            />
          </div>
        </header>
        <div className="author-modal__body">
          <Typography align="left">{description}</Typography>
        </div>
        <footer className="author-modal__footer">
          <Button
            className="author-modal__close"
            color="default"
            onClick={onClose}
            variant="contained"
          >
            Close
          </Button>
        </footer>
      </Paper>
    );
  }
}

AuthorModal.propTypes = {
  authorId: PropTypes.string.isRequired,

  onClose: PropTypes.func.isRequired
};

export default AuthorModal;
