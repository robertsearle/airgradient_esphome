// components/ScreensPageComponent.js
import React, { useState } from "react";
import ScreenData from "../src/ScreenData";
import * as MainObjectType from "../src/MainObjectType";

const ScreensPageComponent = ({ props, onDataUpdate }) => {
  console.log("ScreensPageComponent", props);

  const [dataRows, setDataRows] = useState(props.pages);

  const handleCheckboxChange = (index, checkboxName) => {
    if (dataRows == null || dataRows.length === 0) {
      return;
    } else {
      let newData = Object.assign([], dataRows);
      if (checkboxName === "show") {
        newData[index].show = !newData[index].show;
      } else if (checkboxName === "favorite") {
        newData[index].favorite = !newData[index].favorite;
      } else {
        console.error("Error with check box problem", index, checkboxName);
      }
      console.log("components update", newData, index, checkboxName);
      onDataUpdate(newData);
    }
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>
            Show
            <i className="text-xs">({dataRows.filter((e) => e.show).length})</i>
          </th>
          <th>
            Favorite
            <i className="text-xs">
              ({dataRows.filter((e) => e.favorite).length})
            </i>
          </th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {dataRows !== undefined &&
          dataRows != null &&
          dataRows.map((dataRow, index) => (
            <tr
              key={index}
              // className={
              // (index % 2)
              // ? "bg-sky-100  dark:bg-sky-100    border-b dark:border-sky-500  hover:bg-sky-100 dark:hover:bg-sky-600"
              // : "bg-sky-200  dark:bg-sky-200    border-b dark:border-sky-500  hover:bg-sky-100 dark:hover:bg-sky-600"
              // }
            >
              <td>
                <label type="text" className="text-base disabled">
                  {dataRow.id}
                </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  disabled={dataRow.id == "boot" || dataRow.favorite}
                  checked={
                    (!dataRow.favorite && dataRow.show) || dataRow.favorite
                  }
                  onChange={() => handleCheckboxChange(index, "show")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  disabled={dataRow.id == "boot"}
                  checked={dataRow.favorite}
                  onChange={() => handleCheckboxChange(index, "favorite")}
                />
              </td>
              <td>
                <label type="text" className="text-[0.625rem] whitespace-pre">
                  {MainObjectType.formatYamlData(dataRow.object)}
                </label>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ScreensPageComponent;
