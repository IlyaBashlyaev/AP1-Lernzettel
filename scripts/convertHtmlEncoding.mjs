import fs from 'fs';
import path from 'path';

const sourceDir = path.resolve('AP1_Lernzettel_HTML');
const targetHtmlDir = path.resolve('public/pages/html');
const targetPngDir = path.resolve('public/pages/png');

fs.mkdirSync(targetHtmlDir, { recursive: true });
fs.mkdirSync(targetPngDir, { recursive: true });

const copyHtml = () => {
  const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith('.html'));
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetHtmlDir, file);
    const content = fs.readFileSync(sourcePath, 'latin1');
    const converted = content.replace(/charset=ISO-8859-1/gi, 'charset=UTF-8');
    fs.writeFileSync(targetPath, converted, 'utf8');
  });
  return files.length;
};

const copyPng = () => {
  const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith('.png'));
  files.forEach((file) => {
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetPngDir, file));
  });
  return files.length;
};

const htmlCount = copyHtml();
const pngCount = copyPng();

console.log(`Copied ${htmlCount} HTML files and ${pngCount} PNG files with proper encoding.`);
