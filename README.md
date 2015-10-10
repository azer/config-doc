## config-doc

Create and manage config documents

## Install

```bash
$ npm install config-doc
```

## Usage

```js
var NewConfig = require('config-doc');

var config = NewConfig('~/.settings')

config.get('user')
// => undefined

config.set('user', process.env.USER) // saves it to ~/.settings

config.get('user')
// => azer
```

Settings are saved as JSON into the specified file:

```js
var fs = require('fs')

fs.readFileSync('~/.settings').toString()
// => { "user": "azer" }
```
