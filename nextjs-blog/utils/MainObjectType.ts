import * as fs from "fs";
import * as yaml from "js-yaml";

interface MainObjectType {
  [key: string]: MyObjectType[];
}

type MyObjectType = Record<string, any>;

const readYamlFile = (filePath: string): MainObjectType => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as MainObjectType;
    return data;
  } catch (error) {
    console.error(`Error reading YAML file: ${filePath}`, error);
    throw error;
  }
};

// Example usage
const filePath = "path/to/your/file.yaml";
const result = readYamlFile(filePath);
console.log(result);
