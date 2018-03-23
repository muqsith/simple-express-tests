const puppeteer = require('puppeteer'),
    config = {
        width: 1170,
        height: 600
    }
    ;

function screenshotDOMElement(opts = {}, page) {
    return (
        new Promise((resolve, reject) => {
            const padding = 'padding' in opts ? opts.padding : 0;
            const path = 'path' in opts ? opts.path : null;
            const selector = opts.selector;

            if (!selector)
                reject(Error('Please provide a selector.'));
            let rect = null;
            page.evaluate(selector => {
                const element = document.querySelector(selector);
                if (!element)
                    return null;
                const {x, y, width, height} = element.getBoundingClientRect();
                return {left: x, top: y, width, height, id: element.id};
            }, selector)
            .then((rect) => {
                if (!rect)
                    reject(Error(`Could not find element that matches selector: ${selector}.`));
                
                return page.screenshot({
                    path,
                    clip: {
                        x: rect.left - padding,
                        y: rect.top - padding,
                        width: rect.width + padding * 2,
                        height: rect.height + padding * 2
                    }
                });
            })
            .then((screenshot) => {
                resolve(screenshot);
            }); 
        })
    );
}

function getImage({url, selector, padding, path}) {
    return (
        new Promise((resolve, reject) => {
            let page = null, browser;
            puppeteer.launch()
            .then((_browser) => {
                browser = _browser;
                return browser.newPage();
            })
            .then((_page) => {
                page = _page;
                page.setViewport({width: config.width, height: config.height, deviceScaleFactor: 1});
                return page.goto(url, {waitUntil: 'networkidle2'});
            })
            .then(() => {
                return screenshotDOMElement({
                    path,
                    selector,
                    padding
                }, page)
            })
            .then(() => {
                browser.close();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        })
    );
}

module.exports = getImage;