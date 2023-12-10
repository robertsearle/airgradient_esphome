// pages/Substitutions.js
import { createContext, useEffect, useContext, useState } from "react";
import Link from "next/link";
import SubstitutionsComponent from "../components/SubstitutionsComponent";
import * as MainObjectType from "../src/MainObjectType";

const Substitutions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);


  useEffect(() => {
    if (isLoading) {
      fetchData().then((rawPages) => {
        console.log("fetch data", rawPages);
        if (isLoading) {
          console.log("setting data", rawPages);
          setData(rawPages);
          setIsLoading(false);
        }
      });
    } else {
      return { data };
    }
  }, []);

  const emptyValues = () => {return {
    devicename: "",
    upper_devicename: "",
    ag_esphome_config_version: "",
    DEFAULT_DISPLAY_TEMP: "",
    CO2_ABC_OFFSET: "" 
  };};

  const fetchData = async () => {
    const res = await fetch("/airgradient_esphome/substitutions.yaml",);
    const body = await res.text();
    console.log("fetchData", "body", body);
    const newData= MainObjectType.readYamlFile(body);
    console.log("fetchData", "newData", newData);
    if (newData === null) {
      console.error("Problem with the yaml", res);
      return null;
    }
    if (isLoading) {
      console.log("fetchData", "loading", newData);
      return {data: emptyValues(), defaults: {...newData} };
    } else {
      return null;
    }
  };


  const generateYamlFile = () => {
    if (data === undefined || data === null) {
      return "loading...";
    }
    let userData = Object.assign({}, data.data);
    for (var prop in userData) {
      if (Object.prototype.hasOwnProperty.call(userData, prop)) {
        if (userData[prop] == "") {
          delete userData[prop];
        }
      }
    }
    let combinedData = Object.assign({}, data.defaults);
    combinedData = Object.assign(combinedData, userData);
    console.log("generateYamlFile", userData, combinedData);
    combinedData = { substitutions: combinedData};
    return MainObjectType.formatYamlData(combinedData)
      .replaceAll(/substitutions\:\n/g, "");
  };


  const onDataUpdate = (newData) => {
    console.log("onDataUpdate", newData);
    setData(newData);
  }

  console.log("data", data, isLoading);
  if (isLoading) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <h2>Substitutions Page</h2>
        <SubstitutionsComponent props={ data }  onDataUpdate={onDataUpdate} />
        <Link href="/ScreensPage" className="button-prev">Previous</Link>
        <Link href="/Final" className="button-primary">Next</Link>
        <br />
        <hr className="items-center justify-center  h-1 w-1/3 m-[5rem]  bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <form className="md:w-1/2">
          <p>
            Replace the file{" "}
            <code className="text-teal-200 dark:text-teal-550">
              includes/substitutions.yaml
            </code>
          </p>
          <br />
          <textarea
            readOnly
            as="textarea"
            className="textarea"
            rows="10"
            value={generateYamlFile()}
          />
        </form>
      </div>
    );
  }
};

export default Substitutions;

