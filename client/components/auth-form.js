import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  const gitStyle = {
    backgroundImage:
      'url("https://tpc.googlesyndication.com/simgad/1681709168446687103")',
    height: 25,
    width: 200
  }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
      <br />
      <br />
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgcAAABhCAMAAAB1TfJnAAAAb1BMVEX///8AeNcAc9YAddYAbdQAcNUAcdUAbNTm8Pr4/P4AatTt9fzW5vfY6PjG3PSIteioye4zityuze9dneG+0/Dg7flVmOBAjt10qeSXwOvD2vOOuekqhtujxe3P4fVGk94Sftlqo+N5ruaSvOpgmuAxcLSZAAAD4klEQVR4nO3daZOiMBCA4Q25RBS8r9EBdf//b9xxD0cgHI7CCvM+n7umUkVPJwbS+fEDAAAAAAAAAACkLI6JtWJ18GtFj6O1HpppNGp4VGjXTGgphRDS2Kg6E5axNb+jPbsetzA6tGRuxZVJBhXRMyuv0dIeWhkhWhAbcUPKZWn0RN1GC7VtaZRo2EanHqyQSVn0yKajxTBsaZxo1LvKPFhhopLwvcxEl6cNumKVfbBC6OK14iKXNUJPWhwtGjLQuQdb9mQdWSOnLQ4XDVk48kAeC8NNPloM62064JW9OZ6s3BdFL7OrxAv13uaA0YiN53iysig6v6i8TCP8Yui+kysPkqLokSsPqAc9cHDNC+uiaN81L9jyjSd0gavSl2wg5LYPLlocLpqSOAp98XvEKF8+vE2Lo0VTzrkfjmUbAo7tBss7xz7wk2ypt2XrviibCIZy0A/ZFYI6l4av0z8wivca0DELfVsR7Kk82p/eLhFMErQzSDRvnFwzwZjqt0bH64coUs3ZU+6TSWK1MVrpqM6/92g+/Ig2ehizg9Q3y8VhO6v93akfTraTkFoAAAAAAAAAAAAAAAAAAPgUbqb703OOJs5W+/jMh8tdFKytJ6VRzzizfrTy8qfonNY9/04xSfH4v/H270EYSyJ0zvW86uPdjcLrWXhb1YITr+bzlLMpboZUy/LznJuhIHTM7bFlVdYusVJwc0xWzp81PrRjcHu29ZEFnj+9ORspfz5vhGhDkDrr/vVm2f709vQzHTE6J04nwhcrQjoNhFo8d5BoXKbpgXr7yh8J9qk0KG6vhZeV6WuivlDSlyLdScXws7GDVum+Jjq+9/TyTqfTQO0aGSeale2LJMV9/a6iTCvFinY6eFVBpgWevGe1GKwz/bL0g9tR+G9yV6vouO4MP8vMCcLEjQ4VTQqziSB1reI+iLNNWD3uYOiyXa5dsk4q9wD8U7YYfKQBLXI6bZdvpqrWpev+4E3mWusaqkHXhSbXOFuq/aHoo4TxxuT79LM26IGRcNy4pOV8kU+F8XmvHLc1KN4y9sFg77yRRXvTaDYa/Jn3g0F4OCY6XzvEo6+t8TL8leOqrksqeFp7IrmQxp0Dl0lk9r/Hj2d5c92yUot35yYkXlooXXNDNdor94w/d13AVUEa5oTeWeS3BSqyQK04udJD/km5l4JuNTYe0U3LeW7DuIiRfKLeY+8rXWPBKLU8sz7st/FGVhSFy7YzWdB/wWRtCzaNhPCUOHIHy3cxOKy0MjLz3ZqnbbLZUQq+FT/cHqeeVfoPpZL4NON75G8qGIWLD7twSRkAAAAAAAAAAAC42y9KMiPDIkPXiQAAAABJRU5ErkJggg==" />
      <a style={gitStyle} href="/auth/github">
        {displayName} with Github
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
