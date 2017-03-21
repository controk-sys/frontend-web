module.exports = (() => {
  global.uploadCoverage = eval("***codeCoverage***") ? element(by.css("#code-coverage")).click : () => {
  }
})()
