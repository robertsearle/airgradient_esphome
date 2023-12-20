import React, { useState } from "react";

const SubstitutionsAdvance = ({ props, onDataUpdate, className }) => {
  console.log("SubstitutionsAdvance", props);

  const [data, setData] = useState(
    props === undefined || props === null
      ? null
      : { data: { ...props.data }, defaults: { ...props.defaults } },
  );

  const handleInputChange = (fieldName, value) => {
    let newData = Object.assign({}, data);
    newData.data[fieldName] = value;
    console.log("handleInputChange", newData);
    onDataUpdate(newData);
  };

  if (data === undefined || data == null) {
    return <div>loading screen...</div>;
  } else {
    if (
      data.data.DEFAULT_DISPLAY_TEMP === undefined ||
      data.data.DEFAULT_DISPLAY_TEMP === "" ||
      data.data.DEFAULT_DISPLAY_TEMP === null
    ) {
      data.data.DEFAULT_DISPLAY_TEMP = data.defaults.DEFAULT_DISPLAY_TEMP;
    }
    console.log("rendering", data);

    return (
      <>
        <div className={className + " h-1 m-[1rem] "}>
          <label className={className} htmlFor="text_DEFAULT_DISPLAY_TEMP">
            <i>Default Display Temp:</i>
          </label>
        </div>
        <div
          className={
            className +
            " h-1 m-[1rem] " +
            (data.data.DEFAULT_DISPLAY_TEMP ===
            data.defaults.DEFAULT_DISPLAY_TEMP
              ? " text-default "
              : " ")
          }
        >
          <select
            id="text_DEFAULT_DISPLAY_TEMP"
            className={className}
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
                {x === data.defaults.DEFAULT_DISPLAY_TEMP ? x + "*" : x}
              </option>
            ))}
          </select>
        </div>

        <div className={className + " h-1 m-[1rem] row-start-auto  "}>
          <label htmlFor="text_CO2_ABC_OFFSET">
            <i>CO2 ABC Offset:</i>
          </label>
        </div>
        <div className={className + " h-1 m-[1rem] w-[5rem]"}>
          <input
            className={className + " w-[3.5rem]"}
            id="text_CO2_ABC_OFFSET"
            min="-99"
            max="499"
            type="number"
            placeholder={data.defaults.CO2_ABC_OFFSET}
            value={data.data.CO2_ABC_OFFSET}
            onChange={(e) =>
              handleInputChange("CO2_ABC_OFFSET", e.target.value)
            }
          />
        </div>
      </>
    );
  }
};

export default SubstitutionsAdvance;
