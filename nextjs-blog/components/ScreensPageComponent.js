// components/ScreensPageComponent.js
import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
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
    <Table className="table-auto">
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
          <tr key={index} className={ (index%2) ? "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-100 hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" : "border-b bg-white dark:border-neutral-500 dark:bg-neutral-200 hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"}>
            <td className="whitespace-nowrap px-6 py-4">
              <label
                type="text"
              >{dataRow.id}</label>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
              <Form.Check 
                disabled={dataRow.favorite}
                hidden={dataRow.favorite}
                checked={!dataRow.favorite && dataRow.show}
                onChange={() => handleCheckboxChange(index, 'show')}
              />
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
              <Form.Check
                checked={dataRow.favorite}
                onChange={() => handleCheckboxChange(index, 'favorite')}
              />
            </td>
            <td className="whitespace-nowrap text-xs px-6 py-4 text-sm ">
              <label type="text" >
                <pre> 
                    {MainObjectType.formatYamlData(dataRow.object)}
                </pre> 
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScreensPageComponent;

