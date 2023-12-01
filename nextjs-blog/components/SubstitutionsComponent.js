import React, { useState } from "react";

class SubstitutionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicename: "",
      upperDevicename: "",
      esphomeConfigVersion: "",
      defaultDisplayTemp: "",
      co2AbcOffset: "",
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
      <form className="flex flex-wrap items-center my-10">
          <div className="w-1/3">
            <label>Device Name: </label>
          </div>
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Device Name"
              value={devicename}
              onChange={(e) =>
                this.handleInputChange("devicename", e.target.value)
              }
            />
          </div>
          <div className="w-1/3">
            <label>Upper Device Name: </label>
          </div>
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Upper Device Name"
              value={upperDevicename}
              onChange={(e) =>
                this.handleInputChange("upperDevicename", e.target.value)
              }
            />
          </div>
          <div className="w-1/3">
            <label> EspHome Config Version: </label>
          </div>
          <div className="w-2/3">
            <input
              type="text"
              placeholder="ESPHome Config Version"
              value={esphomeConfigVersion}
              onChange={(e) =>
                this.handleInputChange("esphomeConfigVersion", e.target.value)
              }
            />
          </div>
          <div className="md:w-1/3">
            <label>Default Display Temp: </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              placeholder="Default Display Temp"
              value={defaultDisplayTemp}
              onChange={(e) =>
                this.handleInputChange("defaultDisplayTemp", e.target.value)
              }
            />
          </div>
          <div className="md:w-1/3">
            <label> CO2 ABC Offset: </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              placeholder="CO2 ABC Offset"
              value={co2AbcOffset}
              onChange={(e) =>
                this.handleInputChange("co2AbcOffset", e.target.value)
              }
            />
        </div>
      </form>
    );
  }
}

const Substitutions = () => {
  return <SubstitutionsForm />;
};

export default SubstitutionsComponent;

