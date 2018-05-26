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

  it('can increment the count when the button is clicked', () => {
    const wrapper = shallow(<Counter />)
    const incrementBtn = wrapper.find('button.increment')

    incrementBtn.simulate('click')

    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: 1') 
  })

  it('can decrement the count when the decrement button is clicked', () => {
    const wrapper = shallow(<Counter />)
    const decrementBtn = wrapper.find('button.decrement')

    decrementBtn.simulate('click')

    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: -1') 
  })
})