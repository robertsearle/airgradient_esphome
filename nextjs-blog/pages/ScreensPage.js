// pages/ScreensPage.js
import { createContext, useEffect, useContext, useState } from "react";
import MyContext from "../context/mycontext.context";
import Link from "next/link";
import ScreensPageComponent from "../components/ScreensPageComponent";
import ScreenData from "../src/ScreenData";
import * as MainObjectType from "../src/MainObjectType";
import { InferGetStaticPropsType, GetStaticProps } from "next";


const ScreensPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleDataUpdate = (newData) => {
    let { data, setData } = useContext(MyContext);
    let old = data;
    setData({
      ...newData,
    });
  };


  useEffect(() => {
    if (null == data || data.length == 0) {
      fetchData().then((data) => {
        console.log("fetch data", data.props.pages);
        if (isLoading) {
          setData(data.props.pages);
        }
      });
    } else {
      return { props: {} };
    }
  }, []);


  const fetchData = async () => {
    console.log("pages start");
    //const res = await fetch("http://localhost:3000/airgradient_esphome/display_sh1106_128_64.yaml");
    const res = await fetch("http:display_sh1106_128_64.yaml");
    console.log("res", res);
    const body = await res.text();
    console.log("body", body);
    const yaml = MainObjectType.readYamlFile(body);
    console.log("yaml", yaml);
    const pages = yaml[0].pages.map(
      (s) => new ScreenData(s.id, true, false, s)
    );
    console.log("pages", pages);
    if (isLoading) {
      setData(pages);
      setIsLoading(false);
    }
    //let pagez = [new ScreenData("1", false, false, null)];
    return { props: { pages: pages } };
  };

  if (isLoading) {
    return (<p>Loading....</p>);
  } else {
    return (
      <div>
        <h2>Screens Page</h2>
        <ScreensPageComponent
          initialData={data}
          onDataUpdate={handleDataUpdate}
        />
        <Link href="/Substitutions">Next</Link> 
      </div>
    );
  }
};

export default ScreensPage;

