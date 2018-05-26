import { fetchUser } from './api'
import fetchMock from 'fetch-mock'

const dummyUser = {
  id: 1,
  name: 'Jack Franklin',
  website: 'https://javascriptplayground.com',
}

describe('fetchUser', () => {
  it('fetches the user', async () => {
    const url = 'https://jsonplaceholder.typicode.com/users/1'

    fetchMock.getOnce(url, dummyUser)

    await expect(fetchUser(1)).resolves.toEqual(dummyUser)
  })
})