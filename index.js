const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const espree = require('espree');
const { generate } = require('escodegen');

try {
    const contents = readFileSync('./testfiles/simple.js', 'utf-8');

    const ast = espree.parse(contents, { range: false, loc: false });
    ast.body[0].kind = 'const';

    if (!existsSync('./build')) {
        mkdirSync('./build');
    }

    writeFileSync('./build/simple.js', generate(ast));
}
catch (e) {
    console.log(e);
}
