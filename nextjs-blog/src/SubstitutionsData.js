class SubstitutionsData {
  constructor(
    devicename = "",
    upperDevicename = "",
    esphomeConfigVersion = "",
    defaultDisplayTemp = "",
    co2AbcOffset = "",
  ) {
    devicename;
    upperDevicename;
    esphomeConfigVersion;
    defaultDisplayTemp;
    co2AbcOffset;
    this.devicename = devicename;
    this.upperDevicename = upperDevicename;
    this.esphomeConfigVersion = esphomeConfigVersion;
    this.defaultDisplayTemp = defaultDisplayTemp;
    this.co2AbcOffset = co2AbcOffset;
  }
}

export default SubstitutionsData;

