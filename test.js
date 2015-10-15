var test = require("prova");
var fs = require("fs");
var Doc = require("./");

test('initialization', function (t) {
  t.plan(2);

  var doc = Doc(rnd());

  t.notOk(doc.get('yo'));
  doc.set('yo', 'lo');
  t.equal(doc.get('yo'), 'lo');
});

test('expanding the home directory', function (t) {
  var doc = Doc('~/.yoo');
  t.plan(1);
  t.equal(doc.filename, process.env.HOME + '/.yoo');
});

test('saving', function (t) {
  t.plan(4);

  var filename = rnd();
  var doc = Doc(filename);
  doc.set('yo', 'lo');
  doc.set('foo', 123);
  doc.set('bar', 456);
  doc.set('pi', 3.14);

  setTimeout(function () {
    var saved = JSON.parse(fs.readFileSync(filename));
    t.equal(saved.yo, 'lo');
    t.equal(saved.foo, 123);
    t.equal(saved.bar, 456);
    t.equal(saved.pi, 3.14);
  }, 500);
});

function rnd () {
  return '/tmp/foo' + Math.floor(Math.random() * 99999);
}
