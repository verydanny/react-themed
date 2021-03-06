import { expect } from 'chai'
import compose from './compose'

describe('compose', () => {
  it('composes themes', () => {
    const theme1 = { foo: 'foo', bar: 'bar' }
    const theme2 = { foo: 'bar', baz: 'baz' }
    const result = compose({}, theme1, theme2)
    expect(result).to.eql({
      foo: 'foo bar',
      bar: 'bar',
      baz: 'baz',
    })
  })

  it('composes themes into a target object', () => {
    const target = {}
    const theme1 = { foo: 'foo', bar: 'bar' }
    const theme2 = { foo: 'bar', baz: 'baz' }
    const result = compose(target, theme1, theme2)
    expect(result).to.equal(target)
  })

  it('composes themes recursively', () => {
    const theme1 = { foo: { bar: { baz: 'baz' } } }
    const theme2 = { foo: { bar: { baz: 'bat' } } }
    const result = compose({}, theme1, theme2)
    expect(result).to.eql({
      foo: {
        bar: {
          baz: 'baz bat',
        },
      },
    })
  })

  it('composes theme functions', () => {
    const theme1 = { foo: () => '.foo{}' }
    const theme2 = { foo: () => '.bar{}' }
    const result = compose({}, theme1, theme2)
    expect(result.foo()).to.eql('.foo{}.bar{}')
  })

  it('only composes similar value types', () => {
    const theme1 = { foo: 'foo', bar: 'bar' }
    const theme2 = { foo: {}, bar: () => {} }
    const result = compose({}, theme1, theme2)
    expect(result).to.eql({
      foo: 'foo',
      bar: 'bar',
    })
  })

  it('strips out null values', () => {
    const theme1 = { foo: null }
    const theme2 = { bar: 'bar' }
    const result = compose({}, theme1, theme2)
    expect(result).to.eql({
      bar: 'bar',
    })
  })
})
