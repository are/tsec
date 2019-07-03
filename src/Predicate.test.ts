import test from 'ava'
import { its } from './Predicate'

test('.whitespace should work', t => {
  const predicate = its.whitespace
  const input = '\n'
  const expected = true
  const actual = predicate(input)

  t.is(actual, expected)
})

test('.not should invert .whitespace result', t => {
  const predicate = its.not.whitespace
  const input = '\n'
  const expected = false
  const actual = predicate(input)

  t.is(actual, expected)
})
