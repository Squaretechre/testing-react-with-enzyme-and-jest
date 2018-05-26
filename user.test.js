import React from 'react'
import { shallow } from 'enzyme'
import User from './user'
import * as api from './api'

const nextTick = async () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

const dummyUser = {
  id: 1,
  name: 'Jack Franklin',
  website: 'https://javascriptplayground.com',
}

// jest will spy on when fetchUser is called and what it's called with
// jest spys are not disposed between tests, need to call restoreAllMocks()
const mockFetchUserResponse = user =>
  jest
    .spyOn(api, 'fetchUser')
    .mockImplementation(() => {
      return Promise.resolve(dummyUser)
    })

describe('User', () => {
  beforeEach(() => {
    // reset all spies between tests
    jest.restoreAllMocks()
  })

  it.skip('shows the loading text before the data is fetched', async () => {
    // getOnce  - once a call is made to the mocked API the stub is cleared away
    //          - prevent other tests also calling the mocked API
    mockUrlWithUser(dummyUser)

    // shallow rendering does call component life cycle methods
    const wrapper = shallow(<User id={1} />)
    expect(wrapper.find('p').text()).toEqual('Loading!')
  })

  it.skip('shows the data once it has been fetched', async () => {
    // getOnce  - once a call is made to the mocked API the stub is cleared away
    //          - prevent other tests also calling the mocked API
    mockUrlWithUser(dummyUser)

    const wrapper = shallow(<User id={1} />)

    // wait until next tick
    await nextTick()

    // wrappers do not dynamically update when a component does
    // must explicitly update it
    wrapper.update()

    expect(wrapper.find('h4').text()).toEqual(dummyUser.name)
    expect(wrapper.find('p').text()).toContain(dummyUser.website)
  })

  it('shows the loading text before the data is fetched', async () => {
    mockFetchUserResponse(dummyUser)

    const wrapper = shallow(<User id={1} />)
    expect(wrapper.find('p').text()).toEqual('Loading!')
  })

  it('shows the data once it has been fetched', async () => {
    mockFetchUserResponse(dummyUser)
    const wrapper = shallow(<User id={1} />)

    await nextTick()
    wrapper.update()

    expect(wrapper.find('h4').text()).toEqual(dummyUser.name)
    expect(wrapper.find('p').text()).toContain(dummyUser.website)
  })
})