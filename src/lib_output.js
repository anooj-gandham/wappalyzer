const Wappalyzer = require('./drivers/npm/driver')
const jsdom = require('jsdom')
const { JSDOM, VirtualConsole } = jsdom

const url = 'https://developer.mozilla.org/en-US/docs/Web/API/Document/links'

const options = {
  debug: false,
  delay: 1000,
  headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 30000,
  recursive: true,
  probe: true,
  userAgent: 'Wappalyzer',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
}

const wappalyzer = new Wappalyzer(options)

;(async function () {
  try {
    await wappalyzer.init()
    const headers = {}
    const site = await wappalyzer.open(url, headers)
    const results = await site.analyze()
    const dom = new JSDOM(results._html, {
      url,
      virtualConsole: new VirtualConsole(),
    })

    const { document } = dom.window
    console.log(document.links)
    // console.log(results._html)
  } catch (error) {
    // console.error(error);
  }

  await wappalyzer.destroy()
})()
