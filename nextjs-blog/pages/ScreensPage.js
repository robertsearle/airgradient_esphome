// pages/ScreensPage.js
import { createContext, useEffect, useContext, useState } from "react";
import MyContext from "../context/mycontext.context";
import Link from "next/link";
import ScreensPageComponent from "../components/ScreensPageComponent";
import ScreenData from "../src/ScreenData";
import * as MainObjectType from "../src/MainObjectType";
//import { InferGetStaticPropsType, GetStaticProps } from "next";
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
    if (newData.filter(e => e.favorite).length > 3){
      alert ("No more favorites can be selected");
    } else {
      setData(newData);
    }
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
    //const res = await fetch("http://localhost:3000/display_sh1106_128_64.yaml");
    const res = await fetch("https://robertsearle.github.io/airgradient_esphome/display_sh1106_128_64.yaml");
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
     let newYaml = Object.assign([], yaml);
     console.log ("data", data);
     const newPages = newYaml[0].pages.filter( e => {
       const l = data.filter(e2  => e2.id == e.id);
       if (l.length > 0) {
         return l[0].show  && !l[0].favorite;
       } else {
         return false;
       }
     });
     const favs = data.filter( e => e.favorite);
     if (favs.length > 0) {
       for (var i = newPages.length-1; i>= 0;  i--) {
         for (var j = favs.length-1; j>=0; j--) {
           let newData = Object.assign({}, favs[j].object);
           newData.id = newData.id + "_" + i;
           newPages.splice(i, 0, newData); 
         }
       }
     }
     newYaml[0].pages = newPages;
     console.log("newYaml values", newYaml);
     return MainObjectType.formatYamlData(newYaml)
       .replaceAll(/^-/g, '  -')
       .replaceAll(/\n/g, '\n  ');
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
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
        <Form.Group className="" style={{width:"90%"}} >
          <Form.Label>Replace the file <code className="text-teal-200 dark:text-teal-700" >includes/display_sh1106_128_64.yaml</code></Form.Label>
          <br/>
          <Form.Control readOnly as="textarea"  className="text-xs font-mono block p-2.5 w-full text-sm text-gray-900 bg-teal-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="20" value={generateYamlFile()} />
        </Form.Group>
      </div>
    );
  }
};

export default ScreensPage;

