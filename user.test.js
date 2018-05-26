import React from 'react'
import { shallow } from 'enzyme'
import User from './user'
import fetchMock from 'fetch-mock'

const nextTick = async() => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

const dummyUser = {
  id: 1,
  name: 'Jack Franklin',
  website: 'https://javascriptplayground.com',
}

const url = 'https://jsonplaceholder.typicode.com/users/1'

const mockUrlWithUser = user => fetchMock.getOnce(url, {
  status: 200,
  body: user,
})

describe('User', () => {
  it('shows the loading text before the data is fetched', async () => {
    // getOnce  - once a call is made to the mocked API the stub is cleared away
    //          - prevent other tests also calling the mocked API
    mockUrlWithUser(dummyUser)

    // shallow rendering does call component life cycle methods
    const wrapper = shallow(<User id={1} />)
    expect(wrapper.find('p').text()).toEqual('Loading!')
  })

  it('shows the data once it has been fetched', async () => {
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
    expect(wrapper.find('p').text()).toContain (dummyUser.website )
  })

  afterEach(() => {
    fetchMock.restore()
  })
})