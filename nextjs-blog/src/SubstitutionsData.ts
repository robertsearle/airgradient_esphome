class SubstitutionsData {
  devicename: string;
  upperDevicename: string;
  esphomeConfigVersion: string;
  defaultDisplayTemp: string;
  co2AbcOffset: string;

  constructor(
    devicename = "",
    upperDevicename = "",
    esphomeConfigVersion = "",
    defaultDisplayTemp = "",
    co2AbcOffset = "",
  ) {
    this.devicename = devicename;
    this.upperDevicename = upperDevicename;
    this.esphomeConfigVersion = esphomeConfigVersion;
    this.defaultDisplayTemp = defaultDisplayTemp;
    this.co2AbcOffset = co2AbcOffset;
  }
}

export default SubstitutionsData;
