import * as yaml from 'js-yaml';
import { readYamlFile, MainObjectType } from '../src/main'; // Adjust the path accordingly

describe('YAML Reader', () => {
  test('Read YAML file with pages field', () => {
    const filePath = 'test/display_sh1106_128_64.yaml';
    const result: MainObjectType[] = readYamlFile(filePath);
    // Your assertions here
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result[0].pages).toBeDefined();
    //
    //result[0].pages
    console.log(yaml.dump(result, { lineWidth: -1 } ));
  });

  // Add more tests as needed
});

