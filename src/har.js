const Parser = require('./parser'); 
const fs = require('fs');
const generateSpec = require("har-to-openapi");

class HARFile {
    constructor(file_path) {
        this.version = "1.2";
        this.creator = {
            name: "Allybind",
            version: "1.0"
        };
        this.entries = [];
        this.parser = new Parser();
        this.file_path = file_path;
        this.store = {}
    }

    recordRequest(req, reqBody, reqUrl) {
      const request = this.parser.parseRequest(req, reqBody);
      this.store[reqUrl] = request;
    }

    recordResponse(res, resBody, reqUrl) {
      if (!this.store[reqUrl]) {
        return;
      }
      const request = this.store[reqUrl];
      delete this.store[reqUrl];
      const response = this.parser.parseResponse(res, resBody);
      const entry = {
        startedDateTime: new Date().toISOString(),
        time: 121
      }; 
      entry.request = request;
      entry.response = response;
      this.entries.push(entry);
    }

    async writeHARFile() {
       const harfile = this.generateHARFormat();
        const openapi = await generateSpec.generateSpec(harfile, { relaxedMethods: true });
        const { spec, yamlSpec } = openapi;
        fs.writeFile(this.file_path, JSON.stringify(spec, null, 2), err => {
            const timestamp = Date.now(); 
            const date = new Date(timestamp);
            const dateString = date.toLocaleString();
            let message = err ? "Error detected" : `File written successfully at ${dateString}`;
            console.log(message);
        });
    }

    generateHARFormat() {
        const harfile = {
            log: {
                version: this.version,
                creator: this.creator,
                entries: this.entries
            }
        };
        return harfile;
    }
}

module.exports = HARFile; 
