module.exports = function (RED) {
    function ScreenshotClassNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;
        let path = config.path;
        let puppeteer = require('puppeteer');
        let option = {};

        if (path) {
            option.executablePath = path;
        }

        node.on('input', function (msg) {
            let url;
            let className;

            if (msg.url) {
                url = msg.url;
            } else if (config.url) {
                url = config.url;
            } else {
                // set to default.
                url = 'http://www.example.com/';
            }

            if (msg.classname) {
                className = msg.classname;
            } else if (config.classname) {
                className = config.classname
            }

            puppeteer.launch(option).then(async browser => {
                let option = {};

                const page = await browser.newPage();
                if (config.wait === 'delay') {
                    await page.goto(url)
                    await new Promise(resolve => setTimeout(resolve, config.delay));
                } else {
                    await page.goto(url, { waitUntil: config.wait });
                }

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