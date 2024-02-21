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
    <img width="80%" src="resources/demo.gif">
</p>

OpenAPI AutoSpec is a local server proxy that generates new OpenAPI specifications from network requests. When running, it will connect your local HTTP traffic to the proxy. Once that happens, it will automatically convert network traffic into the specification.

*Features*:
- Generate OpenAPI 3.0 specifications automatically for any local website or application
- Capture and document new requests & responses, including headers, bodies, and query parameters
- Review generated specifications in real-time on your terminal and download them with ease
- Export your OpenAPI file for sharing
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
To start the server:
```console
$ node proxy.js

```

This will initiate the server that listens to network requests from your locally running websites, automatically documenting their API interactions.
</br></br>


## Usage

Once the server is running, it will automatically begin documenting the API behavior of your local web applications. The documentation process is based on the network requests observed, so you don't need to do any additional setup within your applications.

The server provides real-time printouts of the generated OpenAPI specifications. From here:
- Fill out all fields you wish to be documented for forms
- Export the OpenAPI specification for external use or sharing
- You should find and replace all instances of ‘localhost’ or ‘127.0.0.1:8000’ in the exported doc with your actual website
- Filter hosts and parameterize paths to fine-tune the documentation properly for server stubs
- Restart the documentation process at any time to refresh the generated specifications
</br>

## Roadmap

Want an easy way to automatically build and manage your SDKs, Zapier/Make integrations, Docs, Webhooks, RPA plugins, and custom plugins to marketplaces like Salesforce, Zoom, GSuite all in one spot while getting your app AI-agent ready? [Contact us](https://calendly.com/aidan_/demo). We can custom tailor this and more.

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
