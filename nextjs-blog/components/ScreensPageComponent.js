// components/ScreensPageComponent.js
import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import ScreenData from '../src/ScreenData';
import * as MainObjectType from '../src/MainObjectType';

const ScreensPageComponent = ({ initialData, onDataUpdate }) => {
  const [dataRows, setDataRows] = useState(initialData);

  const handleCheckboxChange = (index, checkboxName) => {
      if (dataRows == null) 
	return;
      let newData = Object.assign({}, dataRows); 
      newData[index] = { ...newData[index], [checkboxName]: !newData[index][checkboxName] };
      console.log (newData, index, checkboxName);
      onDataUpdate(newData); // Call the callback to update the parent component
  };

  return (
    <Table striped bordered hover>
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
            <td>
              <label
                type="text"
              >{dataRow.id}</label>
            </td>
            <td>
              <Form.Check
                checked={dataRow.show}
                onChange={() => handleCheckboxChange(index, 'show')}
              />
            </td>
            <td>
              <Form.Check
                checked={dataRow.favorite}
                onChange={() => handleCheckboxChange(index, 'favorite')}
              />
            </td>
            <td>
              <label
                type="text"
              ><pre>{MainObjectType.formatYamlData(dataRow.object)}</pre></label>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScreensPageComponent;

