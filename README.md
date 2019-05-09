# node-red-contrib-web-page-screenshot
A Node-RED node for taking screenshots of web pages.

## Install 

```
cd ~/.node-red
npm install node-red-contrib-web-page-screenshot
```

## Usage

 - If this node is triggered, this node will take a screenshot of the configured web page in setting screen. 
 - This node takes a screenshot as PNG image, and encodes with base64.
 - The base64 string will be returned.

## Details and Issues

 - This node uses `puppeteer` for taking screenshots.
 - This node currently does not work on ARM environment.
 - That is due to `chromium` included in `puppeteer`, the workaround will be released soon. 
