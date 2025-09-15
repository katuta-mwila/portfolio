const fs = require("fs");
const path = require("path");

const inputDir = path.resolve("./public/svgs");
const outputFile = path.resolve("svgdata.ts");

const fileList = fs.readdirSync(inputDir)

const importData = [] // {importName, importPath}

/*What must be capitalized
  - first char
  - any char following a hyphen
  then hyphens are removed
*/
const toPascalCase = function(text){
  let pascal = []
  for (let i = 0; i < text.length; i++){
    if (i == 0 || text[i-1] === '-'){
      pascal.push(text[i].toUpperCase())
    } else if (text[i] !== '-')
      pascal.push(text[i])
  }
  return pascal.join('')
}

fileList.forEach(file =>{
  if (!/\.svg$/i.test(file)) return
  const importName = toPascalCase(file.substring(0, file.length - 4))
  const importPath = "./" + path.relative(path.dirname(outputFile), path.join(inputDir, file)).replace(/\\/g, "/")

  importData.push({importName, importPath})
})

let importStrings = importData.map(id =>{
  return `export {default as ${id.importName}} from "${id.importPath}"\n`
})

const fileContent = `/* AUTO-GENERATED FILE. DO NOT EDIT */;

${importStrings.join('')}
`

fs.writeFileSync(outputFile, fileContent, "utf8")
console.log("✅ svgdata.ts generated successfully!");