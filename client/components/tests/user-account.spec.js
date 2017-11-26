import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserIndex from '../user-account-page/index'

// Globally mount environment for component to be rendered and then tested.

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('User Account', () => {
  let props
  let mountedUserIndex
  const userIndex = () => {
    if (!mountedUserIndex) {
      mountedUserIndex = mount(<UserIndex {...props} />)
    }
    return mountedUserIndex
  }

  beforeEach(() => {
    props = {
      user: undefined,
      categories: undefined
    }
    mountedUserIndex = undefined
  })

  xit('renders a div', () => {
    const divs = userIndex().find("div");
    expect(divs.length).toBeGreaterThan(0);
  })

})

