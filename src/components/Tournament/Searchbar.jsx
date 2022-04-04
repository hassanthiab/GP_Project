import { useState } from "react";
import React from "react";
const FilterBar = ({
  sizes,
  onNameFilter,
  onlocationFilter,
  onsizeFilter,
  onDateFilter,
}) => {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    size: "",
    from: "",
    to: "",
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "name":
        onNameFilter(value);
        break;
      case "location":
        onlocationFilter(value);
        break;
      case "size":
        onsizeFilter(value);
        break;
      case "from":
        onDateFilter(value, "from");
        break;
      case "to":
        break;
      default:
        break;
    }
  };

  return (
    <div className="row my-5">
      <div className="col">
        <h4 className="border-bottom">Filters</h4>
      </div>
      <div className="col-sm-12 my-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={filters.name}
          onChange={handleInput("name")}
        />
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          onChange={handleInput("location")}
        />
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="size">size</label>
        <select
          className="form-control"
          id="size"
          onChange={handleInput("size")}
        >
          <option value="All">Select</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          
        </select>
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="startDate">From</label>
        <input
          type="date"
          className="form-control"
          id="startDate"
          onChange={handleInput("from")}
        />
      </div>
      <div className="col-sm-12 my-2">
        <label htmlFor="endDate">To</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          onChange={handleInput("to")}
        />
      </div>
    </div>
  );
};

export default FilterBar;
