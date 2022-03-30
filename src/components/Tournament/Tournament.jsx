import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { data } from "./garbage_data";
import FilterBar from "./Searchbar";
import Cardview from "./Cardview";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function Tournament() {
  const [allData, setData] = useState(data);

  const generatesizeDataForDropdown = () => {
    return [...new Set(data.map((item) => item.size))];
  };

  const handleFilterName = (name) => {
    const filteredData = data.filter((item) => {
      const fullName = `${item.name} ${item.coordinator}`;
      if (fullName.toLowerCase().includes(name.toLowerCase())) {
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterLocation = (location) => {
    const filteredData = data.filter((item) => {
      if (item.location.toLowerCase().includes(location.toLowerCase())) {
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterSize = (size) => {
    const filteredData = data.filter((item) => {
      if (item.size == size) {
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterDate = (date, field) => {
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
    });

    setData(filteredData);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <FilterBar
            sizes={generatesizeDataForDropdown()}
            onNameFilter={handleFilterName}
            onlocationFilter={handleFilterLocation}
            onsizeFilter={handleFilterSize}
            onDateFilter={handleFilterDate}
          />
        </div>
        <div className="col-sm-9">
          <div className="row mt-5">
            {allData.map((item) => (
              <Cardview items={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
