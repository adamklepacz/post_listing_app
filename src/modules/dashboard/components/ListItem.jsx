import React, { PureComponent } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactImage from 'react-image';

import Preloader from '../../../common/components/Prelodaer';

class ListItem extends PureComponent {
  constructor() {
    super();

    this.state = {
      isExcerptVisible: false
    };
  }

  showExcerpt = () => this.setState({ isExcerptVisible: true });

  hideExcerpt = () => this.setState({ isExcerptVisible: false });

  handleOnInfoClick = () => {
    const {
      onInfoClick,
      data: { authorId }
    } = this.props;

    onInfoClick(authorId);
  };

  render() {
    const { isExcerptVisible } = this.state;
    const { data } = this.props;
    const { date, excerpt, id, title, thumbnail } = data;

    return (
      <Paper className="list-item">
        <div className="list-item__container">
          <div className="list-item__img-wrapper">
            <ReactImage
              alt="post thumbnail"
              loader={<Preloader />}
              src={[thumbnail, 'https://via.placeholder.com/75x50']}
            />
          </div>
          <div className="list-item__content">
            <span className="list-item__date">
              <Typography>{date}</Typography>
            </span>
            <Typography
              align="left"
              className="list-item__heading"
              variant="h5"
            >
              <Link to={`/posts/${id}`}>{title}</Link>
            </Typography>
          </div>
          <div className="list-item__controllers">
            <Button
              className="list-item__button"
              color="primary"
              onClick={isExcerptVisible ? this.hideExcerpt : this.showExcerpt}
              variant="contained"
            >
              e
            </Button>
            <Button
              className="list-item__button"
              color="default"
              onClick={this.handleOnInfoClick}
              variant="contained"
            >
              i
            </Button>
          </div>
        </div>
        {isExcerptVisible && (
          <div className="list-item__excerpt">
            <Typography align="left" gutterBottom>
              {excerpt}
            </Typography>
          </div>
        )}
      </Paper>
    );
  }
}

ListItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,

  onInfoClick: PropTypes.func.isRequired
};

export default ListItem;
