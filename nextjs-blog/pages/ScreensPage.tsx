// pages/ScreensPage.js
import { createContext, useEffect, useContext, useState } from "react";
import MyContext from "../context/mycontext.context";
import Link from "next/link";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import ScreensPageComponent from "../components/ScreensPageComponent";
import ScreenData from "../src/ScreenData";
import * as MainObjectType from "../src/MainObjectType";

const ScreensPage = () => {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [yaml, setYaml] = useState(null);

  const handleDataUpdate = (updateData) => {
    console.log("update", updateData);
    let newData = Object.assign([], updateData);
    if (newData.filter((e) => e.favorite).length > 3) {
      alert("No more favorites can be selected");
    } else {
      setPages(newData);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchPages().then((rawPages) => {
        console.log("fetch pages", rawPages);
        if (isLoading) {
          console.log("setting pages", rawPages);
          setPages(rawPages);
        }
      });
    }
  }, []);

  const fetchPages = async () => {
    const res = await fetch("/airgradient_esphome/display_sh1106_128_64.yaml");
    const body = await res.text();
    const newYaml = MainObjectType.readYamlFile(body);
    if (newYaml === null) {
      console.error("Problem with the yaml", res);
      return null;
    }
    const pages = newYaml[0].pages.map(
      (s) => new ScreenData(s.id, true, false, s),
    );
    if (isLoading) {
      setPages(pages);
      setYaml(newYaml);
      setIsLoading(false);
    }
    return pages;
  };

  const generateYamlFile = () => {
    if (yaml === 0 || yaml.length == 0) {
      return "N/A";
    }
    let newYaml = Object.assign([], yaml);
    console.log("pages", pages);
    const newPages = newYaml[0].pages.filter((e) => {
      const l = pages.filter((e2) => e2.id == e.id);
      if (l.length > 0) {
        return l[0].show && !l[0].favorite;
      } else {
        return false;
      }
    });
    const favs = pages.filter((e) => e.favorite);
    if (favs.length > 0) {
      for (var i = newPages.length - 1; i >= 0; i--) {
        for (var j = favs.length - 1; j >= 0; j--) {
          let newPage = Object.assign({}, favs[j].object);
          newPage.id = newPage.id + "___" + i;
          newPages.splice(i, 0, newPage);
        }
      }
    }
    newYaml[0].pages = newPages;
    console.log("newYaml values", newYaml);
    return MainObjectType.formatYamlData(newYaml)
      .replaceAll(/^-/g, "  -")
      .replaceAll(/\n/g, "\n  ");
  };

  if (isLoading) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <h2>Screens Page</h2>
        <ScreensPageComponent
          props={{ pages }}
          onDataUpdate={handleDataUpdate}
        />
        <div className="grid grid-cols-3 md:grid-cols-4 ">
          <div />
          <div />
          <div className="place-content-end">
            <Link href="/Substitutions" className="button-primary">
              Next
            </Link>
          </div>
        </div>
        <br />
        <hr className="items-center justify-center  h-1 w-2/3 m-[5rem]  border-0 rounded bg-gray-700" />
        <form className="w-1/2">
          <p>
            Replace the file{" "}
            <code className="text-teal-550">
              includes/display_sh1106_128_64.yaml
            </code>
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

export default ScreensPage;
