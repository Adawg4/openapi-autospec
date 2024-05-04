<a name="readme-top"></a>

<div align="center">
<img height="120" src="logo.png">

# OpenAPI AutoSpec

Need last-minute docs? Quickly capture API behavior with a server proxy that automatically generates OpenAPI specifications in real-time from any locally running website or service.

<img src="https://img.shields.io/badge/license-MIT-blue" alt="license"/> [![Join Discord](https://img.shields.io/badge/Discord-Join-grey?style=flat&logo=Discord)](https://discord.gg/CRnxg7uduH)
<a target="_blank" href="https://twitter.com/intent/tweet?text=OpenAPI AutoSpec is a proxy server that generates API specs for any app or website on localhost! Try it out: https://github.com/adawg4/openapi-autospec" class="item"><img src="https://img.shields.io/twitter/url?label=Tweet&amp;style=social&amp;url=https://github.com/adawg4/openapi-autospec"></a>
</div>

## About
<p align="center" width="100%">
    <img width="80%" src="autospec.gif">
</p>
OpenAPI AutoSpec is a local server proxy that generates new OpenAPI specifications from network requests. When running, it will connect your local HTTP traffic to the proxy. Once that happens, it will automatically convert network traffic into the specification.

*Features*:
- Generate OpenAPI 3.0 specifications automatically for any local website or application
- Capture and document new requests & responses, including headers, bodies, and query parameters
- Review generated specifications in real-time on your terminal and download them with ease
- Export your OpenAPI file for sharing
- Ignores static file URLs: .js, .css, .svg, .png, .jpeg, .ico.
</br>

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation steps:
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install openapi-autospec
```
</br>

## Usage
Start the server, it generates a link for you to use, and then use the new link from the proxy server to catch traffic on a target server. To generate the document you want: visit pages, fill out forms/all the fields or data you wish to track, and perform the actions you want to document from your APIs. For more information on getting documentation from a full-stack server versus both frontend and backend servers - <a href="#readme-misc">use this reference</a>.

To start the server:
```console
$ npx autospec --portTo PORT --portFrom PORT --filePath openapi.json
```

- --portTo choose the port your localhost webserver is running from.
- --portFrom (optional) is for if another port is in use.
- --filePath is where you would like to export the spec.

</br>
Once the server is running, it will automatically begin documenting the API behavior of your local web applications. The documentation process is based on the network requests observed, so you don't need to do any crazy setup within your applications beyond the below.


The server provides real-time printouts of the generated OpenAPI specifications. From here:
- Fill out all fields you wish to be documented for forms
- Export the OpenAPI specification for external use or sharing (exports where you are in the terminal if you don't specify the --filePath flag)
- You should find and replace all instances of ‘localhost’ or ‘127.0.0.1:8000’ in the exported doc with your actual website
- Filter hosts and parameterize paths to fine-tune the documentation properly for server stubs
- Restart the documentation process at any time to refresh the generated specifications
</br>

## Roadmap

Want an easy way to automatically build and manage your SDKs, Zapier/Make integrations, Docs, Webhooks, RPA plugins, and custom plugins to marketplaces like Salesforce, Zoom, GSuite all in one spot while getting your app AI-agent ready? [Contact us](https://calendly.com/aidan_/demo). We can custom tailor this and more with our paid service.

As for the repo:
- [Path parameterization](https://www.abstractapi.com/api-glossary/path-parameters) tools
- HTTPS and OpenAPI 3.1 Specification support
- Run on GCP, AWS, Azure, Docker, and Kubernetes
</br>

## What is OpenAPI?
OpenAPI specifications provide a standardized description of an API's expected requests and responses, making APIs easier to understand and integrate with. Governed by the OpenAPI Initiative and the Linux Foundation, they are the modern standard for documenting RESTful APIs.
</br>
</br>

## Community

[Join our Discord!](https://discord.gg/CRnxg7uduH) We are here to answer questions and help you get the most out of our OpenAPI tool.
</br>
</br>

## Contributing

We welcome community contributions. For guidelines, refer to our [CONTRIBUTING.md](/CONTRIBUTING.md).



Shoutouts to [Awesome API DevTools](https://github.com/yosriady/awesome-api-devtools) and [OpenAPI Devtools](https://chromewebstore.google.com/detail/openapi-devtools/jelghndoknklgabjgaeppjhommkkmdii).
</br>


<a name="readme-misc"></a>
## Running proxies for multiple servers

### Full-Stack Web Frameworks (e.g., Django)

1. Run your website and note down the port and localhost information. Ex. 127.0.0.1:8000
2. Run the script and specify the localhost information where traffic should be routed. Ex. npx autospec --portTo 8000. 
```
$ npx autospec --portTo PORT --portFrom PORT--filePath openapi.json
```
- The --portTo flag should be followed by the localhost information where you want the traffic to be routed. Ex. "127.0.0.1:8000"
- The optional --portFrom flag can be used to specify a different port to run the proxy, in case the default port is already in use. The value following this would be the port you want to use for the proxy. Ex. "3000" 
3. Copy the output URL (Ex. localhost:7928) and use your website or application as described above.
4. Access the newly created file - named with the current timestamp.

### Frontend and Backend Separately (e.g., a Node backend and React frontend)

For applications with a separate frontend and backend, run proxies for both.

1. Run your frontend and note down the host and port information. E.g., 127.0.0.1:3000

2. Operate your backend on a different port and note the host and port information. E.g., 127.0.0.1:5000 (For detailed guidelines on how to change port info, visit <a href="#readme-bottom">here</a>).

3. Run the proxy for the frontend, specifying the frontend's host and port information where traffic should be routed. If necessary, you can specify a different port for the proxy to operate from.

```console
$ npx autospec --portTo FRONTEND_PORT --filePath frontend.json
```

4. Similarly, run the proxy for the backend, specifying the backend's host and port where the frontend normally sends information.

```console
$ npx autospec --portTo NEW_BACKEND_PORT --portFrom NORMAL_BACKEND_PORT --filePath backend.json
```

This will initiate the server that listens to network requests from your locally running websites, automatically documenting their API interactions.

## Changing backend ports

<a name="readme-bottom"></a>
```markdown
### 1. Express.js (Node.js)
To change the port for an Express.js application, you can set the port in your application code before starting the server. For example:

```javascript
const express = require('express');
const app = express();
const port = 3001; // Change to your desired port

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### 2. Django (Python)
For Django, you can specify the port when you run the runserver command from the command line:

```shell
python manage.py runserver 8080
```
This command runs the server on port 8080.

### 3. Flask (Python)
In Flask, you can specify the port when calling the app.run() method:

```python
from flask import Flask
app = Flask(__name__)

if __name__ == '__main__':
    app.run(port=5001) // Change to your desired port
```

### 4. Rails (Ruby)
For a Rails application, you can specify the port with the -p option when starting the server:

```shell
rails server -p 4000
```
This command runs the server on port 4000.

### 5. Spring Boot (Java)
In Spring Boot, you can specify the server port in the application.properties or application.yml file located in the src/main/resources directory:

```
server.port=8081
```

### 6. ASP.NET Core (C#)
For an ASP.NET Core application, you can specify the port in the launchSettings.json file found in the Properties folder of your project. Alternatively, you can use the --urls command-line argument:

```shell
dotnet run --urls="http://localhost:5002"
```
This command runs the server on port 5002.

### 7. Laravel (PHP)
In Laravel, you can specify the port with the --port option when serving the application:

```shell
php artisan serve --port=8001
```
This command runs the server on port 8001.

### 8. Vue.js (Node.js)
For a Vue.js project created with vue-cli, you can specify the port in the vue.config.js file:

```javascript
module.exports = {
  devServer: {
    port: 8081
  }
}
```

### 9. React (Node.js)
For a React application created with create-react-app, you can set the port by modifying the start script in your package.json file, or by setting the PORT environment variable before running the npm start command:

```shell
PORT=3001 npm start
```

### 10. Angular (Node.js)
For an Angular application, you can specify the port with the --port option when serving the application:

```shell
ng serve --port 4201
```

These are references - Always refer to the official documentation for the most accurate and up-to-date information.

