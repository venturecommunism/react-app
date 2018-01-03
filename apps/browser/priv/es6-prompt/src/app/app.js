// https://stackoverflow.com/questions/45763072/repeatedly-prompt-user-until-resolved-using-nodejs-async-await
// when this code is used with babel-polyfill it makes it so you can't use parseInt because babel-polyfill won't work with async/await apparently? https://github.com/babel/babel/issues/4107

var puppeteer = require('puppeteer')
var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
var fs = require('fs')

// the only changes are in promptAge()
// an internal function executes the asking, without generating a new Promise
function promptAge(object) {
  return new Promise(function(resolve, reject) {
    var ask = function(object) {
      // if (object.content) { console.log(object.content, "got content") }
      rl.question('Enter your input (will keep asking until we get a number):  ', async function(answer) {
        age = parseInt(answer)
        switch (answer) {
          case 'goto':
            await object.page.goto('http://thedrupalblog.com/')
              .catch(error => console.error(error))
            console.log("Navigate to URL")
            ask(object)
            break
          case 'waitfor':
            await object.page.waitForSelector('.menu-item')
              .catch(error => console.error(error))
            console.log("Load a screen selector we've seen before")
            ask(object)
            break
          case 'insert-ids':
            let listLength = await object.page.evaluate((sel) => {
              function uuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
                  return v.toString(16)
                })
              }
              function loop(node) {
                // do some thing with the node here

                node.className += " generatedclass-" + uuid()

                var nodes = node.childNodes
                for (var i = 0; i <nodes.length; i++){
                  if(!nodes[i]){
                    continue
                  }

                  if(nodes[i].childNodes.length > 0){
                    loop(nodes[i])
                  }
                }
              }
              loop(document)
            }, 'menu-item')
            console.log("Insert unique classes into the dom")
            ask(object)
            break
          case 'record':
            object.content = await object.page.content()
            console.log("Record page content with unique classes")
            ask(object)
            break
          case 'filewrite':
            await fs.writeFile('html/file-withids.html', object.content, (err) => {
              if (err) throw err
              console.log('Save the unique classes file')
              ask(object)
            })
            break
          case 'end':
            console.log("Should be ending")
            resolve(age, reject)
            break
          default:
            console.log('No match')
            resolve(age, reject)
        }
      }, object)
    }
    ask(object)
  }, object)
}

(async function start() {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  const page = await browser.newPage()
  console.log("Open a new tab")

  const object = {}
  object.page = page

  var userAge =  await promptAge(object)
  console.log('GOT A NUMBER: ' + userAge)

  await browser.close()
  console.log("Ultimately closes the browser")
  process.exit()
})()
