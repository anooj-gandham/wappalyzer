const Wappalyzer = require('./drivers/npm/driver')
const jsdom = require('jsdom')
const { JSDOM, VirtualConsole } = jsdom
const fs = require('fs')
const { doc } = require('prettier')

const url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video'

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

    // fs.writeFile('./html.txt', results.output._html, (err) => {
    //   return null
    // })
    var _html = results.output._html
    // var _html = fs.readFileSync('./html.txt', 'utf8')
    const dom = new JSDOM(_html, {
      url,
      virtualConsole: new VirtualConsole(),
    })
    const { document } = dom.window
    const urlRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    const urls = _html.match(urlRegex)

    linkElements = document.links
    var links = []
    for (let i = 0; i < linkElements.length; i++) {
      let item = linkElements[i]
      links.push(item.href)
    }

    imageElements = document.images
    var images = []
    for (let i = 0; i < imageElements.length; i++) {
      let imgElement = imageElements[i]
      imgProperties = {
        height: imgElement.height,
        width: imgElement.width,
      }
      images.push(imgProperties)
    }

    title = document.title

    h1Elements = document.querySelectorAll('h1')
    var h1 = []
    for (let i = 0; i < h1Elements.length; i++) {
      let item = h1Elements[i]
      h1.push(item.textContent)
    }

    nTags = document.querySelectorAll('*')

    nInputs = document.querySelectorAll('input').length

    console.log(nInputs)
  } catch (error) {
    console.error(error)
  }

  await wappalyzer.destroy()
})()
