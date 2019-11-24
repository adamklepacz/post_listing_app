import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactImage from 'react-image';

import Preloader from '../../../common/components/Prelodaer';

const GridItem = ({ data }) => {
  const { title, thumbnail, id } = data;

  return (
    <Paper className="grid-item">
      <Link to={`/posts/${id}`}>
        <Typography
          align="left"
          className="grid-item__heading"
          gutterBottom
          variant="h6"
        >
          {title}
        </Typography>
        <div className="grid-item__image-wrapper">
          <ReactImage
            alt="post thumbnail"
            className="grid-item__image"
            loader={<Preloader />}
            src={[thumbnail, 'https://via.placeholder.com/150x100']}
          />
        </div>
      </Link>
    </Paper>
  );
};

GridItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default GridItem;
