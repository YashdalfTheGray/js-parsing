const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const { parse } = require('path');
const espree = require('espree');
const { generate } = require('escodegen');
const { traverse, replace } = require('estraverse');
const { cloneDeep, chain, map, zip } = require('lodash');

try {
    const filePaths = [
        'simple.js',
        'functions.js',
        'requires.js',
        'angular1.js',
        'angular2.js'
    ].map(n => `./testfiles/${n}`);

    const asts = getAst(...filePaths);

    asts.forEach(a => {
        console.log('\n============= AST start =============');
        traverse(a, {
            enter: function(node, parent) {
                // if (node.type === 'VariableDeclaration') {
                //     const newNode = cloneDeep(node);
                //     newNode.kind = 'const';
                //     return newNode;
                // }
                console.log(node.type);
            }
        });
        console.log('============== AST end ==============\n');
    });

    if (!existsSync('./build')) {
        mkdirSync('./build');
    }

    writeAstsToFile(filePaths, asts);
}
catch (e) {
    console.log(e);
}

function getAst(...files) {
    return files
    .map(f => readFileSync(f, 'utf-8'))
    .map(c => espree.parse(c));
}

function writeAstsToFile(paths, asts) {
    return chain(paths)
    .map(fp => `./build/${parse(fp).base}`)
    .zip(asts.map(a => generate(a)))
    .forEach(p => writeFileSync(...p))
    .value();
}
