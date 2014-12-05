var regenerator = require('regenerator');

module.exports = function (source, map) {
    this.cacheable && this.cacheable();
    var result;

    if (source.indexOf('yield') > -1 || source.indexOf('function*') > -1 || source.indexOf('async') > -1 || source.indexOf('await') > -1) {
        result = regenerator.compile(source).code;
        if (result !== source) {
            // Ensure that regenerator runtime is included and initialized,
            // and drop source map, since Regenerator doesn't support it (yet)       
            return "require('regenerator/runtime');\n"+result;
        }
    } else {
        result = source;
    }

    
    // No change; pass through original source and map, if any, via async mode
    this.async().apply(
        this, [null].concat(Array.prototype.slice.call(arguments))
    );
};

