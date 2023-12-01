// components/ScreensPageComponent.js
import React, { useState } from 'react';
import ScreenData from '../src/ScreenData';
import * as MainObjectType from '../src/MainObjectType';

const ScreensPageComponent = ({ initialData, onDataUpdate }) => {
  const [dataRows, setDataRows] = useState(initialData);

  const handleCheckboxChange = (index, checkboxName) => {
      if (dataRows == null) return;
      let newData = Object.assign([], dataRows); 
      if (checkboxName === 'show') {
        newData[index].show = ! newData[index].show;
      } else if (checkboxName === 'favorite') {
        newData[index].favorite = !newData[index].favorite; 
      } else {
        console.error("Error with check box problem", index, checkboxName);
      }
      console.log ("components update", newData, index, checkboxName);
      onDataUpdate(newData); // Call the callback to update the parent component
  };

  return (
    <table >
      <thead> 
        <tr>
          <th>ID</th>
          <th>Show</th>
          <th>Favorite</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        { dataRows != null && dataRows.map((dataRow, index) => (
          <tr key={index}>
            <td >
              <label type="text" className="text-base" >{dataRow.id}</label>
            </td>
            <td >
              <input type="checkbox" 
                disabled={dataRow.id == 'boot' || dataRow.favorite}
                hidden={dataRow.favorite}
                checked={!dataRow.favorite && dataRow.show}
                onChange={() => handleCheckboxChange(index, 'show')}
              />
            </td>
            <td >
              <input type="checkbox"
                disabled={dataRow.id == 'boot'}
                checked={dataRow.favorite}
                onChange={() => handleCheckboxChange(index, 'favorite')}
              />
            </td>
            <td >
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

