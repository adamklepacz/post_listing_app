import React, { PureComponent } from 'react';
import { Container, Typography, Button, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactImage from 'react-image';

import CommentModal from '../../common/components/CommentModal';
import Overlay from '../../common/components/Overlay';
import AuthorModal from '../../common/components/AuthorInfoModal';
import { putData, getData } from '../../common/fetchMethods';
import { API_DATA } from '../../common/config';
import { readLocalStorage } from '../../common/helpers';
import { USER_DATA } from '../../common/enums';
import Preloader from '../../common/components/Prelodaer';

class SinglePost extends PureComponent {
  constructor() {
    super();

    this.state = {
      comments: [],
      enterTime: null,
      isAuthorModalVisible: false,
      isCheckboxChecked: false,
      isCommentModalVisible: false,
      postData: null,
      userToken: null
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.handleEnterTime();
  }

  componentWillUnmount() {
    this.handleLeaveTime();
  }

  fetchUserData = () => {
    const { userToken } = readLocalStorage(USER_DATA.TOKEN);

    this.setState({ userToken }, () => this.fetchPostData());
  };

  fetchPostData = async () => {
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    const { userToken } = this.state;

    try {
      const result = await getData(`${API_DATA.URL}${pathname}`)(userToken);
      const { data } = result;

      this.setState({ postData: data });
    } catch (error) {
      /**
       * This is not a good practice to handle errors,
       * console error is only used temporary
       */
    }
  };

  handleEnterTime = () => {
    const enterTime = Date.now();

    this.setState({ enterTime });
  };

  handleLeaveTime = async () => {
    const { enterTime, userToken } = this.state;
    const leaveTime = Date.now();
    const time = leaveTime - enterTime;
    const {
      postData: { id }
    } = this.state;

    try {
      await putData(`${API_DATA.URL}/${API_DATA.PUT_TIME}/${id}`, { time })(
        userToken
      );
    } catch (error) {
      /**
       * This is not a good practice to handle errors,
       * console error is only used temporary
       */
    }
  };

  handleCommentSubmit = data => {
    const { comments } = this.state;
    const { userName, comment } = data;

    this.setState({ comments: [...comments, { userName, comment }] });
    this.hideCommentModal();
  };

  showCommentModal = () => this.setState({ isCommentModalVisible: true });

  hideCommentModal = () => this.setState({ isCommentModalVisible: false });

  showAuthorModal = () => this.setState({ isAuthorModalVisible: true });

  hideAuthorModal = () => this.setState({ isAuthorModalVisible: false });

  checkCheckbox = () => this.setState({ isCheckboxChecked: true });

  uncheckCheckbox = () => this.setState({ isCheckboxChecked: false });

  render() {
    const {
      isAuthorModalVisible,
      isCheckboxChecked,
      isCommentModalVisible,
      postData
    } = this.state;

    if (!postData) {
      return null;
    }

    const { date, content, title, thumbnail, authorId } = postData;

    return (
      <>
        <Container className="single-post" maxWidth="md">
          <Paper className="single-post__paper">
            <header className="single-post__header">
              <Typography
                className="single-post__heading"
                gutterBottom
                variant="h6"
              >
                {title}
              </Typography>
              <div className="single-post__img-wrapper">
                <ReactImage
                  alt="post thumbnail"
                  className="single-post__image"
                  loader={<Preloader />}
                  src={[thumbnail, 'https://via.placeholder.com/300x175']}
                />
              </div>
            </header>
            <div className="single-post__body">
              <div className="single-post__content-top">
                <Typography>{date}</Typography>
                <Button
                  color="default"
                  onClick={this.showAuthorModal}
                  variant="contained"
                >
                  i
                </Button>
              </div>
              <Typography className="single-post__content-text">
                {content}
              </Typography>
              <footer className="single-post__footer">
                <Button
                  color="primary"
                  onClick={
                    isCommentModalVisible
                      ? this.hideCommentModal
                      : this.showCommentModal
                  }
                  variant="contained"
                >
                  Comment
                </Button>
              </footer>
            </div>
          </Paper>
        </Container>
        {isCommentModalVisible && (
          <>
            <Overlay />
            <CommentModal
              isCheckboxChecked={isCheckboxChecked}
              onCheck={
                isCheckboxChecked ? this.uncheckCheckbox : this.checkCheckbox
              }
              onClose={this.hideCommentModal}
              onSubmit={this.handleCommentSubmit}
            />
          </>
        )}
        {isAuthorModalVisible && (
          <>
            <Overlay />
            <AuthorModal authorId={authorId} onClose={this.hideAuthorModal} />
          </>
        )}
      </>
    );
  }
}

SinglePost.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.any)
  }).isRequired
};

export default withRouter(SinglePost);
