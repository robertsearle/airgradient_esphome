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
        console.log("fetch pages", rawPages);
        if (isLoading) {
          console.log("setting pages", rawPages);
          setData(rawPages);
        }
      });
    } else {
      return { data };
    }
  }, []);


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
      setData(newData);
      setIsLoading(false);
    }
    return newData;
  };


  const generateYamlFile = () => {
    if (data === undefined || data === null) {
      return "N/A";
    }
    let newData = Object.assign({}, data);
    console.log("generateYamlFile", newData);
    return MainObjectType.formatYamlData(newData)
      .replaceAll(/^-/g, "  -")
      .replaceAll(/\n/g, "\n  ");
  };


  console.log("data", data, isLoading);
  if (isLoading) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <h2>Substitutions Page</h2>
        <SubstitutionsComponent props={ data } />
        <Link href="/Final">Next</Link>
        <Link href="/ScreensPage">Previous</Link>
        <br />
        <hr className="items-center justify-center  h-1 w-1/3 m-[5rem]  bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <form className="md:w-1/2">
          <p>
            Replace the file{" "}
            <code className="text-teal-200 dark:text-teal-700">
              includes/display_sh1106_128_64.yaml
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

