const fs = require("fs");
const path = require("path");

const publicDir = path.resolve("public/images");
const outputFile = path.resolve("imageData.ts");

// Helper: convert file name to variable-safe PascalCase
function toVarName(filename) {
  return filename
    .replace(/\.\w+$/, "")
    /*.replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());*/
}

// Recursively get all main images (skip -small files)
function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(fullPath));
    } else if (/\.(jpe?g|png|webp)$/i.test(file) && !file.includes("-small")) {
      results.push(fullPath);
    }
  });
  return results;
}

// Build nested object path
function setNested(obj, keys, value) {
  let curr = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!curr[key]) curr[key] = {};
    curr = curr[key];
  }
  curr[keys[keys.length - 1]] = value;
}

// Start processing
const images = getAllImages(publicDir);

let imports = [];
let imageObj = {};

images.forEach(file => {
  const relativePath = path.relative(path.dirname(outputFile), file).replace(/\\/g, "/");
  const varName = toVarName(path.basename(file));

  imports.push(`import ${varName} from "./${relativePath}";`);

  // Small image URL (undefined if not exists)
  const smallFile = file.replace(/(\.\w+)$/, "-small$1");
  const smallPath = fs.existsSync(smallFile)
    ? "\"/" + path.relative(path.resolve("public"), smallFile).replace(/\\/g, "/") + "\""
    : undefined;

  // Build object path based on folder structure
  const relativeFolders = path.relative(publicDir, file).split(path.sep);
  const keys = relativeFolders.map(f => toVarName(f));
  keys[keys.length - 1] = varName; // last key is variable name
  setNested(imageObj, keys, { main: varName, small: smallPath });
});

// Convert object to TypeScript string safely
function objToString(obj, indent = 2) {
  const pad = " ".repeat(indent);
  if (typeof obj === "string") return `"${obj}"`;
  if (obj === undefined) return "undefined";
  if (typeof obj === "object") {
    const entries = Object.entries(obj).map(([k, v]) => {
      const valueStr = typeof v === "object" ? objToString(v, indent + 2) : v;
      return `${pad}${k}: ${valueStr}`;
    });
    return `{\n${entries.join(",\n")}\n${" ".repeat(indent - 2)}}`;
  }
  return String(obj);
}

const fileContent = `/* AUTO-GENERATED FILE. DO NOT EDIT */;

import { StaticImageData } from \"next/image\";
${imports.join("\n")}

export interface IBlurSrc {main: StaticImageData, small?: string}

export const PubImages = ${objToString(imageObj)};
`;

fs.writeFileSync(outputFile, fileContent, "utf8");
console.log("✅ imageData.ts generated successfully!");