module.exports = function (RED) {
    function ScreenshotNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let url = config.url;
        let path = config.path;
        let puppeteer = require('puppeteer');
        let option = {};

        if (!url) {
            // set to default.
            url = 'http://www.example.com/';
        }

        if (path) {
            option.executablePath = path;
        }

        node.on('input', function (msg) {
            puppeteer.launch(option).then(async browser => {
                const option = {
                    type: 'png',
                    fullPage: true,
                    encoding: 'base64'
                };
                const page = await browser.newPage();
                await page.goto(url);
                const base64String = await page.screenshot(option);
                await browser.close();

                msg.payload = base64String;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("screenshot", ScreenshotNode);
}
