const { expect } = require('chai')
const { pipe, scan } = require('callbag-basics')
const { PassThrough } = require('stream')
const toPromise = require('callbag-to-promise')
const { createInterface } = require('readline')
const fromReadline = require('.')

describe('callbag-from-readline', () => {
  it('should convert a readline interface to a callbag', () => {
    const input = new PassThrough()
    input.write('foo\nbar')
    input.write('norf\nbaz\n')
    input.write('worble\n')
    input.end()

    return pipe(
      createInterface({ input }),
      fromReadline,
      scan((acc, e) => acc.concat(e), []),
      toPromise
    ).then(result => {
      return expect(result).to.deep.equal(['foo', 'barnorf', 'baz', 'worble'])
    })
  })
})
