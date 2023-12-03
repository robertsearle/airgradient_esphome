import React, { useState } from "react";

const SubstitutionsComponent = (props, onDataUpdate) => {
  console.log("SubstitutionsComponent", props);

  const [data, setData] = useState(
    props === undefined || props === null ? null : {data: {...props.props.substitutions}, defaults: {...props.props.substitutions} } 
  );

  const handleInputChange = (fieldName, value) => {
    let newData = Object.assign({}, data);
    newData.data[fieldName] = value;
    setData(newData);
  };


  if (data === undefined || data == null) {
    return (<div>loading screen...</div>);
  } else {
    console.log("rendering", data);
    return (
      <form className="flex flex-wrap items-center my-10">
        <div className="w-1/3">
          <label>Device Name: </label>
        </div>
        <div className="w-2/3">
          <input
            type="text"
            placeholder={data.defaults.devicename}
            value={data.data.devicename}
            onChange={(e) =>
              handleInputChange("devicename", e.target.value)
            }
          />
        </div>
        <div className="w-1/3">
          <label>Upper Device Name: </label>
        </div>
        <div className="w-2/3">
          <input
            type="text"
            placeholder={data.defaults.upper_devicename}
            value={data.data.upper_devicename}
            onChange={(e) =>
              handleInputChange("upper_devicename", e.target.value)
            }
          />
        </div>
        <div className="w-1/3">
          <label> EspHome Config Version: </label>
        </div>
        <div className="w-2/3">
          <input
            type="text"
            placeholder={data.defaults.ag_esphome_config_version}
            value={data.data.ag_esphome_config_version}
            onChange={(e) =>
              handleInputChange("ag_esphome_config_version", e.target.value)
            }
          />
        </div>
        <div className="md:w-1/3">
          <label>Default Display Temp: </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            placeholder={data.defaults.DEFAULT_DISPLAY_TEMP}
            value={data.data.DEFAULT_DISPLAY_TEMP}
            onChange={(e) =>
              handleInputChange("DEFAULT_DISPLAY_TEMP", e.target.value)
            }
          />
        </div>
        <div className="md:w-1/3">
          <label> CO2 ABC Offset: </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            placeholder={data.defaults.CO2_ABC_OFFSET}
            value={data.data.CO2_ABC_OFFSET}
            onChange={(e) =>
              handleInputChange("CO2_ABC_OFFSET", e.target.value)
            }
          />
        </div>
      </form>
    );
  }
};


export default SubstitutionsComponent;


