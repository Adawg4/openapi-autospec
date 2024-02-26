const http = require("http");
const net = require("net");
const httpProxy = require("http-proxy");
const url = require("url");
const HARFile = require("./har");



const ignoreWords = [
  "static",
  "png",
  "svg",
  "jpg",
  "jpeg",
  "webp",
  "json",
  "ico"
]


const startServer = (destPort, targetPort, outputFile) => {
  const PORT = destPort || 8687; 
  const TARGET_HOST = "127.0.0.1";
  const TARGET_PORT = targetPort || 3002;
  const OUTPUT_FILE = outputFile || "openapi.json";

  const proxy = httpProxy.createProxyServer({});

  // HTTP server to handle HTTP and HTTPS (via CONNECT method)
  const server = http.createServer((req, res) => {
    // Parse request details
    const fullUrl = `${req.protocol ? req.protocol : 'http'}://${req.headers.host}${req.url}`;
    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk;
    });
    req.on('end', () => {
        for (const word of ignoreWords) {
          if (fullUrl.includes(word)) {
            return;
          }
        }
        console.log(`[${req.method}] received for ${fullUrl}`);
        harFile.recordRequest(req, requestBody, fullUrl);
    });
    // Proxy the request
    proxy.web(req, res, { target: `http://${TARGET_HOST}:${TARGET_PORT}` });
  });

  
  server.on("connect", (req, cltSocket, head) => {
    // Connect to the target host and port
    const srvUrl = url.parse(`http://${req.url}`);
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
      cltSocket.write(
        "HTTP/1.1 200 Connection Established\r\n" +
          "Proxy-agent: Node.js-Proxy\r\n" +
          "\r\n"
      );
      srvSocket.write(head);
      srvSocket.pipe(cltSocket);
      cltSocket.pipe(srvSocket);
    });

    // Log the HTTPS request
    console.log(
      JSON.stringify({
        timestamp: new Date(),
        type: "https-connect",
        host: srvUrl.hostname,
        port: srvUrl.port,
      })
    );
  });

  proxy.on("proxyRes", (proxyRes, req, res) => {
    const fullUrl = `${req.protocol ? req.protocol : "http"}://${req.headers.host}${req.url}`;
    let responseData = "";
    proxyRes.on("data", (chunk) => {
      responseData += chunk;
    });
    proxyRes.on("end", () => {
      harFile.recordResponse(proxyRes, responseData, fullUrl);
      harFile.writeHARFile();
    });
  });

  // Error handling
  proxy.on("error", (err, req, res) => {
    console.error("Proxy error:", err);
    res.end(`Proxy error: ${err.message}`);
  });

  const harFile = new HARFile(OUTPUT_FILE);
  server.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
    console.log(`Configure your client to use proxy at ${TARGET_HOST}:${PORT}`);
    console.log(
      `All traffic will be forwarded to ${TARGET_HOST}:${TARGET_PORT}`
    );
  });
}

module.exports = startServer;
