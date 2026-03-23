const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const toolsDir = path.join(repoRoot, "tools");
const outputFile = path.join(repoRoot, "index.html");

const files = fs
  .readdirSync(toolsDir)
  .filter((file) => file.endsWith(".html"))
  .sort();

const links = files
  .map((file) => {
    const name = path.basename(file, ".html");
    const title = name
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return `<li><a href="tools/${file}">${title}</a></li>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tools</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 16px;
      line-height: 1.5;
    }
    h1 {
      margin-bottom: 16px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <h1>Tools</h1>
  <ul>
    ${links}
  </ul>
</body>
</html>`;

fs.writeFileSync(outputFile, html, "utf8");
console.log(`Generated index.html with ${files.length} tools.`);