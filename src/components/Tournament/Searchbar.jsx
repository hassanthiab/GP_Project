import { useState } from "react";
import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "../axios/axios";


const FilterBar = ({setData,setCount,setSearch}) => {

  const [filters, setFilters] = useState({
    name: "",
    location: "",
    size: "",
    from: "",
    to: "",
  });

 
let options=[ { id: 1, label: 'Small', },
              { id: 2, label: 'Medium'  },
              { id: 3,label: 'Large'  },
]
const search=()=>{

  axios()
  .get('/api/search',  {
    params: filters
  })
  .then((response) => {

    setData(response.data.data)
    setCount(response.data.last_page)
    setSearch(true)

  })
  .catch((error) => {
    if(!error.response)
    return
  });
}
  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "name":
       
        break;
      case "location":
        
        break;
      case "size":
       
        break;
      case "from":
      
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

      <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={options}
  sx={{ width: 150}}
  onChange={ (e, obj) => {
    if(obj){
     setFilters({
      ...filters,
      ['size']: obj.label,
    });
  }
  else{
    setFilters({
      ...filters,
      ['size']:"",
    });
  }
      } }
  // onChange={handleInput("size",event)}
  renderInput={(params) => <TextField {...params} label="Size" />}
/>

      
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
      <div className="col-sm-12 my-2">
      <Button onClick={search} variant="outlined">Search</Button>   
         </div>
    </div>
  );
};

export default FilterBar;
