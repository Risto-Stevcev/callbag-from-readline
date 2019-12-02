# callbag-from-readline

Create a callbag from a readline interface


## Install

```sh
yarn install callbag-from-readline
```


## Usage

```js
const { createInterface } = require('readline')
const { PassThrough } = require('stream')
const { pipe, forEach } = require('callbag-basics')
const fromReadline = require('callbag-from-readline')

const input = new PassThrough()
input.write('foo\nbar')
input.write('norf\nbaz\n')
input.write('worble\n')
input.end()

pipe(
  createInterface({ input }),
  fromReadline,
  forEach(console.log)
)
/*
foo
barnorf
baz
worble
*/
```


## License

See LICENSE
