import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';

const Dropdown = ({ defaultValue, onChange, options, label }) => (
  <FormControl className="dropdown">
    <InputLabel id="dropdown__label">{label}</InputLabel>
    <Select labelId="dropdown__label" onChange={onChange} value={defaultValue}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

Dropdown.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,

  onChange: PropTypes.func.isRequired
};

export default Dropdown;
