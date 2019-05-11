# node-red-contrib-web-page-screenshot
A Node-RED node for taking screenshots of web pages.


![ポキオ Node-RED スクリーンショット puppeteer](https://lh3.googleusercontent.com/z25gY7MZSmXLBvdY6eY2ijMcgPV0Di6WtCx76Ojc6DYUYqsqtRW6yTfemdVxCwfIC_BMPDAAzT-VmWBjtnOv4_L-yR8c-aJAvGFY8U_Fdjqj-bnw4rxdu7OcD-bi_F_-aSD7AahiZS4=s600 "ポキオ Node-RED スクリーンショット puppeteer")



## Install 

```
cd ~/.node-red
npm install node-red-contrib-web-page-screenshot
```

## Usage

 - If this node is triggered, this node will take a screenshot of the configured web page in setting screen. 
 - This node takes a screenshot as PNG image, and encodes with base64.
 - The base64 string will be returned.

## Example


This flow provides a web page with a screenshot of a configured URL.


![ポキオ Node-RED スクリーンショット puppeteer](https://lh3.googleusercontent.com/HEV140oV1nbe1nNlXuG2s-FRrMT2--_jzE_CLOdhhA_UZbuXsCIveZUXyHmU1XDPwFZSYlGGjt7wfYLsKkeN_yFxJl2ME5m6StdJ89fHFZ29CF91i8srzmBrY-bvhnjUEv6E0PIYSEU=s600 "ポキオ Node-RED スクリーンショット puppeteer")


```json
[{"id":"67c61941.053d58","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"2660a5a5.ba220a","type":"http in","z":"67c61941.053d58","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":180,"y":140,"wires":[["2fe6f48.ec2f80c"]]},{"id":"2fe6f48.ec2f80c","type":"screenshot","z":"67c61941.053d58","name":"","url":"https://relativelayout.hatenablog.com/","x":300,"y":200,"wires":[["86463a3a.b78058"]]},{"id":"86463a3a.b78058","type":"template","z":"67c61941.053d58","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"<html>\n    <body>\n        <img src=\"data:image/png;base64,{{payload}}\">\n    </body>\n</html>","output":"str","x":420,"y":260,"wires":[["769165e4.dc545c"]]},{"id":"769165e4.dc545c","type":"http response","z":"67c61941.053d58","name":"","statusCode":"","headers":{},"x":520,"y":320,"wires":[]}]
```


A point is, in HTML string of HTTP response, the base64 string is included like following.


```html
<html><body><img src=\"data:image/png;base64,{{payload}}\"></body></html>
```


If you access the endpoint...


![ポキオ Node-RED スクリーンショット puppeteer](https://lh3.googleusercontent.com/ibg7c2k_L4rHw2ShaTbGvM6f5SMa8JgF4pN1Z0pk6ninthLp2Vqg-iFJWlXkzs1hwQHR1EahLHQs7areyZybhnhJpmqW1tQd1x1rxZGdan7TTda1v5_KBCzl1lcD7TS8aiPkTX147Xs=s600 "ポキオ Node-RED スクリーンショット puppeteer")


You can see the screenshot on a web page.


## Details and Issues

 - This node uses `puppeteer` for taking screenshots.
 - This node currently does not work on ARM environment.
 - That is due to `chromium` included in `puppeteer`, the workaround will be released soon. 
