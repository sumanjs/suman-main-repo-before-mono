#!/usr/bin/env node

// const fs = require('fs');
// const assert = require('assert');
// console.log(process.argv);
//
// fs.open(__filename, 'r+', function (err, fd) {
//
//   if (err) throw err;
//
//   const b = Buffer.alloc(4);
//
//   fs.read(fd, b, 0, 4, 0, function (err, bytesRead, buffer) {
//
//     if (err) throw err;
//
//     console.log('data: ', bytesRead);
//     console.log('buffer: ', String(buffer));
//     assert(buffer === b);
//
//   });
// });
//

const a = function (o,z,k) {
  Array.from(arguments).forEach(function (a, index) {
    console.log(index, a);
  });
};

const b = function (o,z,k) {
  a.apply(null,arguments.slice());
};


b(1,2,3);


