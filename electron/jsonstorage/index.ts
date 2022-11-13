import { readFileSync, writeFileSync } from 'fs';
import { app } from 'electron';
import { join } from 'path';

const directory = app.getPath('userData');
const filename = 'config.json';
const filePath = join(directory, filename);

class JSONStorage {
  static get<D = unknown>(key: string, def?: D) {
    const json = this.readJson();
    return json[key] || def;
  }

  static set(key: string, value: unknown) {
    const json = this.readJson();
    json[key] = value;
    this.writeJson(json);
  }

  static clear() {
    this.writeJson({});
  }

  /**
   * @private
   */
  static readJson() {
    try {
      const json = readFileSync(filePath, 'utf-8');
      return JSON.parse(json);
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  /**
   * @private
   */
  static writeJson(json: Record<string, unknown>) {
    try {
      writeFileSync(filePath, JSON.stringify(json));
    } catch (e) {
      console.error(e);
    }
  }
}
export { JSONStorage };
