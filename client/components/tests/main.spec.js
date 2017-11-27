/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Main from '../../components/main'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Main', () => {
  let main, shallowMain

  beforeEach(() => {
    main = <Main handleLogout={() => {}} isLoggedIn={false} />
    shallowMain = shallow(<Main handleLogout={() => {}} isLoggedIn={false} />)
  })

  it('contains properties handleLogout and isLoggedIn', () => {
    let mainProps = Object.keys(main.props)
    expect(mainProps).to.be.length(2)
    expect(mainProps[0]).to.equal('handleLogout')
    expect(mainProps[1]).to.equal('isLoggedIn')
  })

})
