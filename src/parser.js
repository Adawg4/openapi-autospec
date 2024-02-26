const url = require("url");

class Parser {
  parseRequest(req_data, reqBody) {
    const request = {};
    const headers = [];
    request.method = req_data.method.toUpperCase();
    const url_parts = url.parse(req_data.url);
    request.url = "http://" + url_parts.hostname + url_parts.pathname;
    for (const [header, value] of Object.entries(req_data.headers)) {
      headers.push({
        name: header,
        value: value,
      });
    }
    request.headers = headers;
    request.queryString = [];
    if (request.method === "POST") {
      const post_data = {
        mimeType: req_data.headers['content-type'],
        text: reqBody,
      };
      request.postData = post_data;
    }
    return request;
  }

  parseResponse(server_response, resBody) {
    const response = {};
    response.status = server_response.statusCode;
    response.statusText = server_response.statusMessage;
    response.httpVersion = "HTTP/1.1";
    const headers = [];
    for (const [header, value] of Object.entries(server_response.headers)) {
      headers.push({
        name: header,
        value: value,
      });
    }
    response.headers = headers;
    const content_type = server_response.headers["content-type"];
    const content = {
      size: resBody.length,
      mimeType: content_type,
      text: resBody,
    };
    response.content = content;
    return response;
  }
}

module.exports = Parser;
