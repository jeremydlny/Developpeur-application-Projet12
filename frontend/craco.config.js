const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@backend': path.resolve(__dirname, '../backend/app'),
        }
    },
};