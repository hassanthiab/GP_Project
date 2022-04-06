import React from "react";
import { useState, useEffect } from "react";
import FilterBar from "./Searchbar";
import Cardview from "./Cardview";

import axios from "../axios/axios";

function Tournament() {
  const [allData, setData] = useState("");

  useEffect(() => {
    axios()
      .get("/api/tournaments")
      .then((response) => {
        console.log(response.data.data)
        setData(response.data.data);
      })
      .catch((error) => {
        if(!error.response)
        return
      });
  }, []);

  // const generatesizeDataForDropdown = () => {
  //   return [...new Set(data.map((item) => item.size))];
  // };

  // const handleFilterName = (name) => {
  //   const filteredData = data.filter((item) => {
  //     const fullName = `${item.name} ${item.coordinator}`;
  //     if (fullName.toLowerCase().includes(name.toLowerCase())) {
  //       return item;
  //     }
  //   });

import Pagetop from "../Homepage/Pagetop";
import SimpleAccordion from "./Sidebar";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function Tournament() {
  const [allData, setData] = useState(data);
  const [filters, setFilter] = useState({
    size: "",
    coordinator: "",
    location: "",
    before:"",
    after:"",
  });
  const generatesizeDataForDropdown = () => {
    return [...new Set(data.map((item) => item.size))];
  };

  const handleFilterName = (name) => {
    const filteredData = allData.filter((item) => {
      const fullName = `${item.name} ${item.coordinator}`;
      if (fullName.toLowerCase().includes(name.toLowerCase())) {
        return item;
      }
    });


  //   setData(filteredData);
  // };


  // const handleFilterLocation = (location) => {
  //   const filteredData = data.filter((item) => {
  //     if (item.location.toLowerCase().includes(location.toLowerCase())) {
  //       return item;
  //     }
  //   });

  const handleFilterLocation = (location) => {
    let Sfilter = { ...filters };
    Sfilter["location"] = location;
    setFilter(Sfilter);
    const filteredData = data.filter((item) => {
      if (item.location.toLowerCase().includes(filters["location"].toLowerCase()) && item.size == filters["size"]) {
        return item;
      }
    });


  //   setData(filteredData);
  // };


  // const handleFilterSize = (size) => {
  //   const filteredData = data.filter((item) => {
  //     if (item.size == size) {
  //       return item;
  //     }
  //   });

  const handleFilterSize = (size) => {
    let Sfilter = { ...filters };
    Sfilter["size"] = size;
    setFilter(Sfilter);
    const filteredData = data.filter((item) => {
      if (filters) {
        setData
        return item;
      }
    });


  //   setData(filteredData);
  // };


  // const handleFilterDate = (date, field) => {
  //   const filteredData = data.filter((item) => {
  //     if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
  //       return item;
  //     }
  //   });

  const handleFilterDate = (date, field) => {
    const filteredData = allData.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
    });


  //   setData(filteredData);
  // };
  return (
    <React.Fragment>
      <Pagetop></Pagetop>
 
    <div className="container">
      <div className="row">
        <div className="col-sm-3">

          <FilterBar />

        <SimpleAccordion>
          
        </SimpleAccordion>

        </div>
        <div className="col-sm-9">
          <div className="row md-5">
            {!allData?"":allData.map((item) => (
              <Cardview items={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Tournament;
