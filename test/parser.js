import test from 'ava'
import parser from '../lib/parser'

test('a', async t => {
  const tokens = await parser(`${__dirname}/fixtures/a.js`)
  t.deepEqual(tokens, [])
})

test.only('error', async t => {
  const tokens = await parser(`${__dirname}/fixtures/error.js`)
  t.deepEqual(tokens, [])
})
