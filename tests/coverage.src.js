module.exports = (function () {
    global.uploadCoverage = eval("***codeCoverage***") ? element(by.css("#code-coverage")).click : function () {};
})();