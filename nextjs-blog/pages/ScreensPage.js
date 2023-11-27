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
    let newData = Object.assign([], updateData); 
    setData(newData);
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


  const generateYamlFile = () => {
     if (yaml === 0 || yaml.length == 0)
       return "N/A";
     let newYaml = { ...yaml, };
     console.log ("data", data);
     newYaml = newYaml[0].pages.filter( e => {
       const l = data.filter(e2  => e2.id == e.id);
       if (l.length > 0) {
         return l[0].show  && !l[0].favorite;
       } else {
         return false;
       }
     });
     const favs = data.filter( e => e.favorite);
     if (favs.length > 0) {
       for (var i = newYaml.length-1; i>= 0;  i--) {
         for (var j = favs.length-1; j>=0; j--) {
           let newData = Object.assign({}, favs[j].object);
           newData.id = newData.id + "_" + i;
           newYaml.splice(i, 0, newData); 
         }
       }
     }
     console.log("newYaml values", newYaml);
     return MainObjectType.formatYamlData(newYaml);
  }


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
          <Form.Label>Replace the file <code>includes/display_sh1106_128_64.yaml</code></Form.Label>
          <br/>
          <Form.Control as="textarea" style={{width:"100%"}} rows="20" value={generateYamlFile()} />
        </Form.Group>
      </div>
    );
  }
};

export default ScreensPage;

