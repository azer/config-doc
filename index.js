var struct = require("new-struct");
var read = require("read-json").sync;
var write = require("write-json").sync;
var debug = require("local-debug");
var call = require("try-call");
var debounce = require("debounce-fn");
var expandHomeDir = require("expand-home-dir");

var Config = struct({
  get: get,
  load: load,
  log: log,
  reset: reset,
  save: save,
  set: set
});

module.exports = NewConfig;

function NewConfig (filename) {
  var c = Config({
    filename: expandHomeDir(filename),
    logger: debug(filename),
    writer: debounce(write)
  });

  c.load();
  return c;
}

function get (config, attr) {
  return config.document[attr];
}

function load (config) {
  config.log('Loading...');
  call(read.bind(null, config.filename), function (error, document) {
    if (error) {
      config.log(error);
      config.log('Failed to read, will reset the document.');
      config.reset();
      return;
    }

    config.document = document;
    config.log('Loaded successfully');
  });
}

function reset (config) {
  config.log('Resetting...');
  config.document || (config.document = {});
  config.save();
}

function save (config) {
  config.log('Writing...');
  config.writer(config.filename, config.document);
}

function log (config) {
  config.logger.apply(null, Array.prototype.slice.call(arguments, 1));
}

function set (config, attr, value) {
  config.log('Setting %s', attr);
  config.document || (config.document = {});
  config.document[attr] = value;
  config.save();
}
