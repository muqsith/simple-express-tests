const fs = require('fs');


exports.getSizeFromSizeString = function (size_str) {
  let size = {
    width: -1,
    height: -1
  };
  if (size_str && size_str.indexOf('x') !== -1) {
    let s = size_str.split('x');
    size.width = s[0];
    size.height = s[1];
  }
  return size;
}

exports.copyFile = function (source, target, cb) {
  let cbCalled = false;

  let rd = fs.createReadStream(source);
  rd.on("error", function (err) {
    done(err);
  });
  let wr = fs.createWriteStream(target);
  wr.on("error", function (err) {
    done(err);
  });
  wr.on("close", function (ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
exports.getErrorString = function (err) {
  let s = err;
  if (typeof err === 'object') {
    if (err instanceof Error) {
      s = err.toString();
    } else {
      s = JSON.stringify(err);
    }
  }
  return s;
}