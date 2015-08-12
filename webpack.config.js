var path = require("path");
var rewriteUrl = function(replacePath) {
    return function(req, opt) {  // gets called with request and proxy object
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
        req.url = req.path.replace(opt.path, replacePath) + query;
    };
};
module.exports = {
    entry: path.join(__dirname, "web", "client", "examples", "viewer", "app"),
    output: {
      path: path.join(__dirname, "web", "client", "dist"),
        publicPath: "/dist/",
        filename: "viewer.js"
    },
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel-loader" }
        ]
    },
    devServer: {
        proxy: [{
            path: new RegExp("/rest/geostore/(.*)"),
            rewrite: rewriteUrl("/geostore/rest/$1"),
            target: "http://mapstore.geo-solutions.it"
        }]
    },

    devtool: 'inline-source-map',
    debug: true
};
