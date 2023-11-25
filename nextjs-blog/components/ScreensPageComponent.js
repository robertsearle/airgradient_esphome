import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ScreensPageComponent = () => {
  const [dataRow, setDataRow] = useState({
    checkbox1: false,
    checkbox2: false,
    id: '',
    text: '',
  });

  const handleCheckboxChange = (checkboxName) => {
    setDataRow((prevDataRow) => ({
      ...prevDataRow,
      [checkboxName]: !prevDataRow[checkboxName],
    }));
  };

  const handleInputChange = (fieldName, value) => {
    setDataRow((prevDataRow) => ({
      ...prevDataRow,
      [fieldName]: value,
    }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="ID"
            value={dataRow.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
          />
        </Col>
        <Col>
          <Form.Check
            label="Checkbox 1"
            checked={dataRow.checkbox1}
            onChange={() => handleCheckboxChange('checkbox1')}
          />
        </Col>
        <Col>
          <Form.Check
            label="Checkbox 2"
            checked={dataRow.checkbox2}
            onChange={() => handleCheckboxChange('checkbox2')}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Text"
            value={dataRow.text}
            onChange={(e) => handleInputChange('text', e.target.value)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ScreensPageComponent;
