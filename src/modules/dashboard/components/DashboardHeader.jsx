import React from 'react';
import PropTypes from 'prop-types';

import DisplayModeDropdown from './DisplayModeDropdown';
import SortDropdown from './SortDropdown';
import { SORT_OPTION } from '../../../common/enums';

const nameSortOptions = [
  { value: SORT_OPTION.ASCENDING, label: 'Sort A - Z' },
  { value: SORT_OPTION.DESCENDING, label: 'Sort Z - A' }
];

const dateSortOptions = [
  { value: SORT_OPTION.NEWEST_FIRST, label: 'Latest' },
  { value: SORT_OPTION.OLDEST_FIRST, label: 'Oldest' }
];

const DashboardHeader = ({
  dateDropdownDefaultValue,
  displayMode,
  nameDropdownDefaultValue,
  onDateDropdownChange,
  onDisplayModeChange,
  onNameDropdownChange
}) => (
  <header className="dashboard-header">
    <div className="dashboard-header__dropdowns">
      <SortDropdown
        defaultValue={nameDropdownDefaultValue}
        label="Sort by name"
        onChange={onNameDropdownChange}
        options={nameSortOptions}
      />
      <SortDropdown
        defaultValue={dateDropdownDefaultValue}
        label="Sort by date"
        onChange={onDateDropdownChange}
        options={dateSortOptions}
      />
    </div>

    <DisplayModeDropdown
      displayMode={displayMode}
      handleDisplayModeChange={onDisplayModeChange}
    />
  </header>
);

DashboardHeader.propTypes = {
  dateDropdownDefaultValue: PropTypes.string.isRequired,
  displayMode: PropTypes.string.isRequired,
  nameDropdownDefaultValue: PropTypes.string.isRequired,

  onDateDropdownChange: PropTypes.func.isRequired,
  onDisplayModeChange: PropTypes.func.isRequired,
  onNameDropdownChange: PropTypes.func.isRequired
};

export default DashboardHeader;
