const babylon = require('babylon')
const fs = require('fs')

function nodeToOutline (node, outline = [], depth = 0) {
  if (Array.isArray(node.body)) {
    return node.body.reduce((a, b) => {
      return nodeToOutline(b, a, depth)
    }, outline)
  }

  if (node.type === 'ExportDefaultDeclaration') {
    return nodeToOutline(node.declaration, outline, depth)
  }

  if (node.type === 'FunctionDeclaration') {
    return outline.concat({
      type: 'function',
      name: node.id.name,
      loc: node.loc,
      depth
    })
  }

  if (node.type === 'ClassDeclaration') {
    return nodeToOutline(node.body, outline.concat({
      type: 'class',
      name: node.id.name,
      loc: node.loc,
      depth
    }), ++depth)
  }

  if (node.type === 'MethodDefinition') {
    return nodeToOutline(node.value, outline.concat({
      type: 'method',
      name: node.key.name,
      loc: node.loc,
      depth
    }), ++depth)
  }

  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((item) => {
      outline.push({
        type: 'variable',
        name: item.id.name,
        loc: item.loc,
        depth,
        kind: node.kind
      })
    })
    return outline
  }

  if (node.type === 'FunctionExpression') {
    return nodeToOutline(node.body, outline, depth)
  }

  return outline
}

function astToOutline (ast) {
  let outline = []

  return nodeToOutline(ast.program, outline)

  // let preToken
  // ast.tokens.forEach(token => {
  //   if (preToken) {
  //     outline.push({
  //       type: preToken.type.label,
  //       value: token.value,
  //       depth,
  //       loc: token.loc
  //     })
  //     preToken = null
  //   }
  //
  //   if (depth === 1 && token.value) {
  //     // console.log(token)
  //   }
  //
  //   switch (token.type.label) {
  //     case 'var':
  //     case 'const':
  //     case 'let':
  //     case 'class':
  //     case 'function':
  //       preToken = token
  //       return
  //
  //     case '{':
  //       depth += 1
  //       return
  //
  //     case '}':
  //       depth -= 1
  //   }
  // })
}

function parseJsCode (code) {
  const ast = babylon.parse(code, {
    // @todo config
    sourceType: 'module',
    plugins: [
      'estree',
      'jsx',
      'flow',
      'classProperties'
    ]
  })

  return astToOutline(ast)
}

module.exports = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, {
      encoding: 'utf8'
    }, (err, code) => {
      if (err) {
        reject(err)
      } else {
        resolve(parseJsCode(code))
      }
    })
  })
}
