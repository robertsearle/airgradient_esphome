// pages/Substitutions.js
import { createContext, useEffect, useContext, useState } from "react";
import Link from "next/link";
import SubstitutionsComponent from "../components/SubstitutionsComponent";
import SubstitutionsAdvance from "../components/SubstitutionsAdvance";
import * as MainObjectType from "../src/MainObjectType";

const Substitutions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showAdvance, setShowAdvance] = useState(false);

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
    }
  }, []);

  const emptyValues = () => {
    return {
      devicename: "",
      upper_devicename: "",
      ag_esphome_config_version: "",
      DEFAULT_DISPLAY_TEMP: "",
      CO2_ABC_OFFSET: "",
    };
  };

  const fetchData = async () => {
    const res = await fetch("/airgradient_esphome/substitutions.yaml");
    const body = await res.text();
    console.log("fetchData", "body", body);
    const newData = MainObjectType.readYamlFile(body);
    console.log("fetchData", "newData", newData);
    if (newData === null) {
      console.error("Problem with the yaml", res);
      return null;
    }
    if (isLoading) {
      console.log("fetchData", "loading", newData);
      return { data: emptyValues(), defaults: { ...newData } };
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
    combinedData = { substitutions: combinedData };
    return MainObjectType.formatYamlData(combinedData).replaceAll(
      /substitutions\:\n/g,
      "",
    );
  };

  const onDataUpdate = (newData) => {
    console.log("onDataUpdate", newData);
    setData(newData);
  };

  console.log("data", data, isLoading);
  if (isLoading) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <h2>Substitutions Page</h2>
        <div className="w-full max-w-xl text-sky-400">
          <div className="grid auto-cols-max grid-cols-2 gap-4 ">
            <SubstitutionsComponent props={data} onDataUpdate={onDataUpdate} />
            <div>
              <i
                className=" bg-sky-800 hover:bg-blue-700 "
                onClick={(e) => setShowAdvance(!showAdvance)}
              >
                Show Advance &gt;&gt;&gt;
              </i>
            </div>
            <div />
            <SubstitutionsAdvance
              props={data}
              onDataUpdate={onDataUpdate}
              className={" " + (showAdvance ? " " : " hidden")}
            />
          </div>
        </div>
        <div className="mb-[1.5rem] m-[1rem] " />

        <div className="w-full max-w-xl ">
          <Link href="/ScreensPage" className="button-prev">
            Previous
          </Link>
          <Link href="/Final" className="button-primary">
            Next
          </Link>
        </div>

        <br />

        <hr className="items-center justify-center  h-1 w-1/3 m-[5rem]  border-0 rounded bg-gray-700" />

        <form className="md:w-1/2">
          <p>
            Replace the file{" "}
            <code className="text-teal-550">includes/substitutions.yaml</code>
          </p>
          <br />
          <textarea
            readOnly
            className="textarea"
            rows={10}
            value={generateYamlFile()}
          />
        </form>
      </div>
    );
  }
};

export default Substitutions;
