const parser = require('./lib/parser')

parser(`${__dirname}/lib/babel-outline-view.js`).then(value => {
  let body = '\n'
  value.forEach((item) => {
    body += '  '.repeat(item.depth)

    switch (item.type) {
      case 'variable':
        body += `${item.kind} ${item.name}`
        break
      case 'method':
        body += `${item.name} ()`
        break
      default:
        body += `${item.type} ${item.name}`
    }
    body += '\n'
  })
  console.log(body)
})
