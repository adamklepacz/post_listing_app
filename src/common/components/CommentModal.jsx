import React, { PureComponent } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextareaAutosize,
  TextField,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

class CommentModal extends PureComponent {
  constructor(props) {
    super(props);

    const { isCheckboxChecked } = this.props;

    this.state = {
      authorName: '',
      comment: '',
      isCheckboxChecked
    };
  }

  componentDidUpdate(prevProps) {
    const { isCheckboxChecked: prevIsChecked } = prevProps;
    const { isCheckboxChecked } = this.props;

    if (isCheckboxChecked !== prevIsChecked) {
      this.handleCheckboxUpdate();
    }
  }

  handleCheckboxUpdate = () => {
    const { isCheckboxChecked } = this.props;

    this.setState({ isCheckboxChecked });
  };

  handleNameChange = event => {
    const { value } = event.target;

    this.setState({ authorName: value });
  };

  handleCommentChange = event => {
    const { value } = event.target;

    this.setState({ comment: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { authorName, comment, isCheckboxChecked } = this.state;
    const data = {
      authorName,
      comment
    };

    if (isCheckboxChecked) {
      return onSubmit(data);
    }
  };

  render() {
    const { isCheckboxChecked, onCheck, onClose } = this.props;

    return (
      <Paper className="comment-modal">
        <form onSubmit={this.handleSubmit}>
          <header className="comment-modal__header">
            <Typography align="left" gutterBottom>
              Add comment
            </Typography>
          </header>
          <div className="comment-modal__body">
            <TextField
              className="comment-modal__input"
              id="filled-basic"
              label="Your name"
              onChange={this.handleNameChange}
              required
              variant="filled"
            />
            <TextareaAutosize
              className="comment-modal__textarea"
              onChange={this.handleCommentChange}
              placeholder="Your comment"
              required
              rows={3}
            />
            <FormControlLabel
              className="comment-modal__consent"
              control={
                <Checkbox
                  checked={isCheckboxChecked}
                  color="primary"
                  id="checkbox1"
                  onChange={onCheck}
                  required
                />
              }
              label="I accept Privacy Policy."
            />
          </div>
          <footer className="comment-modal__footer">
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
            <Button color="default" onClick={onClose} variant="contained">
              Close
            </Button>
          </footer>
        </form>
      </Paper>
    );
  }
}

CommentModal.propTypes = {
  isCheckboxChecked: PropTypes.bool.isRequired,

  onCheck: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CommentModal;
