import * as yaml from 'js-yaml';

export interface MainObjectType {
  pages: any[];
}


export const readYamlFile = (fileContents: string): MainObjectType[] => {
  try {
    const data = yaml.load(fileContents) as MainObjectType[];
    return data;
  } catch (error) {
    console.error('Error reading YAML file:',  fileContents, error);
    throw error;
  }
};

export const formatYamlData = (data: MainObjectType): string => {
  const processedYaml = yaml.dump(data, { lineWidth: -1 });
  return processedYaml;
};


// Example usage
//const filePath = 'path/to/your/file.yaml';
//const result = readYamlFile(filePath);
//console.log(result);
