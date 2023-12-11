import React, { useState } from "react";

const SubstitutionsComponent = ({ props, onDataUpdate }) => {
  console.log("SubstitutionsComponent", props);

  const [data, setData] = useState(
    props === undefined || props === null
      ? null
      : { data: { ...props.data }, defaults: { ...props.defaults } },
  );
  data.data.DEFAULT_DISPLAY_TEMP = data.defaults.DEFAULT_DISPLAY_TEMP;

  const handleInputChange = (fieldName, value) => {
    let newData = Object.assign({}, data);
    newData.data[fieldName] = value;
    console.log("handleInputChange", newData);
    onDataUpdate(newData);
  };

  if (data === undefined || data == null) {
    return <div>loading screen...</div>;
  } else {
    console.log("rendering", data);
    return (
      <div className="w-full max-w-xl ">
        <div className="grid auto-cols-max grid-cols-2 gap-4 ">
          <div className="h-1 m-[1rem] mt-[1.5rem] ">
            <label>Device Name: </label>
          </div>
          <div className="h-1 m-[1rem] mt-[1.5rem] ">
            <input
              type="text"
              placeholder={data.defaults.devicename}
              value={data.data.devicename}
              onChange={(e) => handleInputChange("devicename", e.target.value)}
            />
          </div>
          <div className="h-1 m-[1rem]  ">
            <label>Upper Device Name: </label>
          </div>
          <div className="h-1 m-[1rem]  ">
            <input
              type="text"
              placeholder={data.defaults.upper_devicename}
              value={data.data.upper_devicename}
              onChange={(e) =>
                handleInputChange("upper_devicename", e.target.value)
              }
            />
          </div>
          <div className="h-1 m-[1rem]  ">
            <label> EspHome Config Version: </label>
          </div>
          <div className="h-1 m-[1rem]  ">
            <input
              type="text"
              placeholder={data.defaults.ag_esphome_config_version}
              value={data.data.ag_esphome_config_version}
              onChange={(e) =>
                handleInputChange("ag_esphome_config_version", e.target.value)
              }
            />
          </div>
          <div className="h-1 m-[1rem]  ">
            <label>
              Default Display Temp: {data.defaults.DEFAULT_DISPLAY_TEMP}
            </label>
          </div>
          <div className="h-1 m-[1rem] ">
            <select
              type="text"
              placeholder={data.defaults.DEFAULT_DISPLAY_TEMP}
              value={data.data.DEFAULT_DISPLAY_TEMP}
              onChange={(e) =>
                handleInputChange("DEFAULT_DISPLAY_TEMP", e.target.value)
              }
            >
              {[
                "RESTORE_DEFAULT_OFF",
                "RESTORE_DEFAULT_ON",
                "RESTORE_INVERTED_DEFAULT_OFF",
                "RESTORE_INVERTED_DEFAULT_ON",
                "ALWAYS_OFF",
                "ALWAYS_ON",
              ].map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-[1.5rem] m-[1rem] ">
            <label htmlFor="text_CO2_ABC_OFFSET"> CO2 ABC Offset: </label>
          </div>
          <div className="mb-[1.5rem] m-[1rem] ">
            <input
              id="text_CO2_ABC_OFFSET"
              min="0"
              max="999"
              type="number"
              placeholder={data.defaults.CO2_ABC_OFFSET}
              value={data.data.CO2_ABC_OFFSET}
              onChange={(e) =>
                handleInputChange("CO2_ABC_OFFSET", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  }
};

export default SubstitutionsComponent;
