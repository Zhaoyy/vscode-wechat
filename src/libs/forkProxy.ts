/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
// Handle uncaught exceptions
process.on('uncaughtException', function (err) {
    process.send({
        type: 'exception',
        data: err.toString()
    });
});
console.log = function (message) {
    process.send({
        type: 'console.log',
        data: message.toString()
    });
};
console.error = function (message) {
    process.send({
        type: 'console.error',
        data: message.toString()
    });
};
console.warn = function (message) {
    process.send({
        type: 'console.warn',
        data: message.toString()
    });
};
console.info = function (message) {
    process.send({
        type: 'console.info',
        data: message.toString()
    });
};
require('wept/bin/wept');

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/e7545c89bf548204e4780a7b7378c14416e9029c/extensions/wxmlpreview/client/out/wxml/proxy/forkProxy.js.map
