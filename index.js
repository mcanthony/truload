#! /usr/bin/env node

/*
Copyright 2015 Hewlett-Packard Development Company, L.P.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var argv = require('optimist').argv;
var command = process.argv[2]

var options = { tenant_id: argv.tid
              , url: argv.url || "https://stormrunner-load.saas.hp.com/"
              , user: argv.u
              , password: argv.p
              , proxy: argv.proxy
              , skipLogin: argv.skipLogin }


if (command=='dashboard') {  
  var Dashboard = require('./lib/dashboard/view.js')
  options.run_id = argv.rid
  var d = new Dashboard(options)
  d.display()  
}
else if (command=='run') {
  var TestManagement = require('./lib/mgmt/model')
  var m = new TestManagement(options)
  m.uploadAndRun()
}
else if (command=='stop') {
  var TestManagement = require('./lib/mgmt/model')
  options.run_id = argv.rid
  var m = new TestManagement(options)
  m.stopRun()
}
else {
  console.log("unknown command")
}

