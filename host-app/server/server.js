const express = require('express');
const path = require('path');

const app = express();
const port = 7000;
const baseDir = path.join(__dirname, '../build'); // 서비스할 디렉토리

app.use(express.static(baseDir));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});