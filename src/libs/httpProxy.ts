/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
var ports_1 = require('./ports');
var cp = require('child_process');
var path = require('path');
function createServer(cwd) {
    return new Promise(function (c, e) {
        var port = Math.floor(40000 + Math.random() * 10000);
        ports_1.findFreePort(port, 20, 5000, function (freePort) {
            c(freePort);
        });
    }).then(function (port) {
        return new Promise(function (c, e) {
            // let wept = cp.exec(`node ${path.join(__dirname, "../../../node_modules/wept/bin/wept")} --port ${port}`, {
            //     cwd: cwd,
            //     encoding: "utf-8"
            // });


            // wept.stdout.once('data', data => {
            //     c();
            // });

            // wept.stderr.on('data', err => {
            //     console.log('err = ', err)
            //     c(err);
            // })
            
            // c(port);

            var wept = cp.fork(path.join(__dirname, './forkProxy'), ['--port', port.toString()], {
                cwd: cwd
            });
            var onMessage = function (data) {
                if (data.type === 'console.log') {
                    if (data.data.indexOf && data.data.indexOf('service.js build success') >= 0) {
                        wept.removeListener('message', onMessage);
                        return c(port);
                    }
                }
            };
            wept.on('message', onMessage);
            setTimeout(function () {
                c(port);
            }, 10000);
        });
    });
}
exports.createServer = createServer;

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/e7545c89bf548204e4780a7b7378c14416e9029c/extensions/wxmlpreview/client/out/wxml/proxy/httpProxy.js.map
