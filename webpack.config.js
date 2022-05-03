module.exports = {
    // Other rules...
    target: 'node',
    resolve: {
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
          "stream-browserify": require.resolve('stream-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        } 
      },
}