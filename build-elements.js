const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/runtime.js',
    './dist/polyfills.js',
    './dist/main.js'
  ];

  await concat(files, './dist/chat-panel.js');
})();