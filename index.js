const readline = require('readline')
const { once } = require('events')

const fromReadline = options => (start, sink) => {
  if (start !== 0) return

  const rl = readline.createInterface(options)

  const handler = value => {
    sink(1, value)
  }

  sink(0, t => {
    if (t === 2) rl.off('line', handler)
  })

  rl.on('line', handler)
  once(rl, 'close').then(() => sink(2))
}

module.exports = fromReadline
