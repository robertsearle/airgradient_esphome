// pages/ScreensPage.js
import { createContext, useEffect, useContext, useState } from "react";
import MyContext from "../context/mycontext.context";
import Link from "next/link";
import ScreensPageComponent from "../components/ScreensPageComponent";
import ScreenData from "../src/ScreenData";
import * as MainObjectType from "../src/MainObjectType";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import Form from 'react-bootstrap/Form';

const ScreensPage = () => {
  //let { data, setData } = useContext(MyContext);
  //const [data, setData] = useContext(MyContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [yaml, setYaml] = useState(null);

  const handleDataUpdate = (updateData) => {
    console.log("update", updateData);
    let newData = Object.assign({}, updateData); 
    setData({ ...newData, });
  };


  useEffect(() => {
    if (isLoading) {
      fetchData().then((data) => {
        console.log("fetch data", data.props.pages);
        if (isLoading) {
          console.log("setting data", data.props.pages);
          setData(data.props.pages);
        }
      });
    } else {
      return { props: {} };
    }
  }, []);


  const fetchData = async () => {
    console.log("pages start");
    const res = await fetch("http://localhost:3000/display_sh1106_128_64.yaml");
    //const res = await fetch("https://robertsearle.github.io/airgradient_esphome/display_sh1106_128_64.yaml");
    console.log("res", res);
    const body = await res.text();
    console.log("body", body);
    const newYaml = MainObjectType.readYamlFile(body);
    console.log("newYaml", newYaml);
    if (newYaml === null) {
      console.error("Problem with the yaml", res);
      return null;
    }
    const pages = newYaml[0].pages.map(
      (s) => new ScreenData(s.id, true, false, s)
    );
    console.log("pages", pages);
    if (isLoading) {
      setData(pages);
      setYaml(newYaml);
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
        <br/>
        <Form.Group style={{width:"100%"}} >
          <Form.Label>Replace the file <code>includes/display_sh1106_128_64.yaml</code></Form.Label><br/>
          <Form.Control as="textarea" style={{width:"100%"}} rows="20">
            {
              MainObjectType.formatYamlData(yaml)
            }
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
};

export default ScreensPage;

