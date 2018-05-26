import React from 'react'
import { shallow, mount } from 'enzyme'
import CounterList from './counter-list'

describe('CounterList', () => {
  it.skip('just for demo!', () => {
    const shallowWrapper = shallow(<CounterList />)
    const mountWrapper = mount(<CounterList />)

    // shallow render only goes one level deep and is not rendered to the DOM
    // counters in CounterList rendered as "<Counter />" only
    // prefer shallow tests as there's less of an overhead
    console.log('shallow HTML', shallowWrapper.debug())

    // mount renders entire tree into the DOM
    // counters in CounterList renders full JSX for each <Counter /> component
    console.log('mount HTML', mountWrapper.debug())
  })

  it('should render two counters by default', () => {
    const wrapper = shallow(<CounterList />)

    // find Counter components by name
    // keep CounterList from knowing any details about Counter
    const counters = wrapper.find('Counter')
    expect(counters.length).toEqual(2)
  })

  it('can add more counters when we click the button', () => {
    const wrapper = shallow(<CounterList />)

    const btn = wrapper.find('button') 
    btn.simulate('click')

    const counters = wrapper.find('Counter')
    expect(counters.length).toEqual(3)
  })
})