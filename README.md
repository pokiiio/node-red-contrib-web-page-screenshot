# node-red-contrib-web-page-screenshot
A Node-RED node for taking screenshots of web pages, and this is my fav GYOUZA(dumpling).


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

## Settings

In setting menu, there are some items like below.


![ポキオ Node-RED スクリーンショット puppeteer](https://lh3.googleusercontent.com/0mcWWpTsCMVrT7ajL9GSK6GarGhxRCLYE-nL5K0A26Ff6i3i2MexhBGkGmlN3SCwohGi1YWoVk8-tfSwnrDyCsOVhxNF6kpRDeGzHNIDFf-9Vg44PQCQZZJj2zm-Awdx4ozmLAOkB18=s600 "ポキオ Node-RED スクリーンショット puppeteer")

### Name (Optional)

You can set any name to the node. Blank is allowed.

### Web Page URL (Optional)

URL which you want to take a screenshot. If blank, this node will take a screenshot of http://example.com .

### executablePath (Optional)

You can specify chromium/chrome executable with the path. For those who use x86 arch, this can be blank, however, if you use this node on ARM arch (e.g. Raspberry Pi), you have to install headless-mode-available `chromium-browser` and set the path.

> Fortunately, [Raspbian OS](https://www.raspberrypi.org/downloads/raspbian/) (as of ver. April 2019) includes compatible `chromium-browser`, so just set `/usr/bin/chromium-browser` to this blank.

### [UPDATED] Class Name (only in `screenshot-class` node)

For partial screenshots, you can specify a class name of element you want to take screenshots. If blank, a whole screenshot will be taken.

### [UPDATED] ID Name (only in `screenshot-id` node)

For partial screenshots, you can specify a ID name of element you want to take screenshots. If blank, a whole screenshot will be taken.


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
