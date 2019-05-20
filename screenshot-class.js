module.exports = function (RED) {
    function ScreenshotClassNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let url = config.url;
        let path = config.path;
        let className = config.classname;
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
                let option = {};

                const page = await browser.newPage();
                await page.goto(url);

                if (className) {
                    const clip = await page.$eval('.' + className, item => {
                        const {
                            width,
                            height,
                            top: y,
                            left: x
                        } = item.getBoundingClientRect()
                        return {
                            width,
                            height,
                            x,
                            y
                        }
                    });

                    option = {
                        clip,
                        type: 'png',
                        fullPage: false,
                        encoding: 'base64'
                    };
                } else {
                    option = {
                        type: 'png',
                        fullPage: true,
                        encoding: 'base64'
                    };
                }

                const base64String = await page.screenshot(option);
                await browser.close();

                msg.payload = base64String;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("screenshot-class", ScreenshotClassNode);
}