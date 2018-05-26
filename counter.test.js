import React from 'react'
import Counter from './counter'
import { shallow } from 'enzyme'

describe('Counter component', () => {
  it('starts with a count of 0 - checking component state', () => {

    // shallow  - component not full rendered into DOM, but creates a JSON representation of what would be rendered,
    //            good for straightforward components
    const wrapper = shallow(<Counter />)

    // don't test against state, test from the perspective of a user
    // test against output
    const countState = wrapper.state().count
    expect(countState).toEqual(0)
  })

  it('starts with a count of 0 - checking against output', () => {
    const wrapper = shallow(<Counter />)
    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: 0')
  })
})