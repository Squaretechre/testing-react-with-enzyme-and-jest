import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

Enzyme.configure({ adapter: new Adapter() } )