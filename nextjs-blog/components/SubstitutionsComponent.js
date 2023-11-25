import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

class SubstitutionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicename: '',
      upperDevicename: '',
      esphomeConfigVersion: '',
      defaultDisplayTemp: '',
      co2AbcOffset: '',
    };
  }

  handleInputChange = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  render() {
    const {
      devicename,
      upperDevicename,
      esphomeConfigVersion,
      defaultDisplayTemp,
      co2AbcOffset,
    } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Device Name"
              value={devicename}
              onChange={(e) => this.handleInputChange('devicename', e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Upper Device Name"
              value={upperDevicename}
              onChange={(e) => this.handleInputChange('upperDevicename', e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="ESPHome Config Version"
              value={esphomeConfigVersion}
              onChange={(e) => this.handleInputChange('esphomeConfigVersion', e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Default Display Temp"
              value={defaultDisplayTemp}
              onChange={(e) => this.handleInputChange('defaultDisplayTemp', e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="CO2 ABC Offset"
              value={co2AbcOffset}
              onChange={(e) => this.handleInputChange('co2AbcOffset', e.target.value)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const Substitutions = () => {
  return <SubstitutionsForm />;
};

export default Substitutions;

