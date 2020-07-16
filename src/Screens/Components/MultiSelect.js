import React from 'react';
import Select from 'react-select';
import './Style.css';

const MultiSelect = ({ errorServices, handleChange, selectedService, options, className="w-90"}) => {
  return <Select className={className} clearValue closeMenuOnSelect={false} isMulti value={selectedService} onChange={handleChange} options={options} />;
};

export default MultiSelect;
