import React from 'react';
import PropTypes from 'prop-types';

import { DISPLAY_MODE } from '../../../common/enums';
import Dropdown from '../../../common/components/Dropdown';

const options = [
  { value: DISPLAY_MODE.GRID, label: 'Grid' },
  { value: DISPLAY_MODE.LIST, label: 'List' }
];

const DisplayModeDropdown = ({ displayMode, handleDisplayModeChange }) => (
  <>
    <Dropdown
      defaultValue={displayMode}
      label="Display mode"
      onChange={handleDisplayModeChange}
      options={options}
    />
  </>
);

DisplayModeDropdown.propTypes = {
  displayMode: PropTypes.string.isRequired,

  handleDisplayModeChange: PropTypes.func.isRequired
};

export default DisplayModeDropdown;
