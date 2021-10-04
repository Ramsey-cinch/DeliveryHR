import Signup from '@Pages/signup'
import { render, fireEvent } from '@testing-library/react'
import nextRouter from 'next/router'

const mockFirebaseSignup = jest.fn()
const mockRouterReplace = jest.fn()
const mockDeleteUser = jest.fn()
nextRouter.push = mockRouterReplace

jest.mock('@Firebase-api/auth-api', () => ({
  AuthApi: function () {
    return { signup: mockFirebaseSignup, deleteUser: mockDeleteUser }
  },
}))

const renderComponent = ({ email, password, squad, firstName, lastName, username }) => {
  const { getByTestId } = render(<Signup />)
  const emailInput = getByTestId('email')
  const passwordInput = getByTestId('password')
  const usernameInput = getByTestId('username')
  const squadInput = getByTestId('squad')
  const firstNameInput = getByTestId('firstname')
  const lastNameInput = getByTestId('lastname')
  const signupButton = getByTestId('button')

  fireEvent.change(emailInput, { target: { value: email } })
  fireEvent.change(passwordInput, { target: { value: password } })
  fireEvent.change(squadInput, { target: { value: squad } })
  fireEvent.change(firstNameInput, { target: { value: firstName } })
  fireEvent.change(lastNameInput, { target: { value: lastName } })
  fireEvent.change(usernameInput, { target: { value: username } })
  fireEvent.click(signupButton)
}

const signupDetails = {
  email: 'test@gmail.com',
  password: '1234',
  squad: 'Delivery',
  firstName: 'Test',
  lastName: 'Tester',
  username: 'Tester1',
}

describe('Login', () => {
  it('renders the login form', () => {
    const { getByText } = render(<Signup />)

    expect(getByText('DeliveryHR')).toBeInTheDocument()
  })

  describe('Login action', () => {
    it('calls the firebase login method when a form is submitted', () => {
      renderComponent(signupDetails)
      expect(mockFirebaseSignup).toBeCalledWith(signupDetails)
    })

    it('redirects the user to the dashboard upon successful signup', () => {
      renderComponent(signupDetails)

      expect(mockRouterReplace).toHaveBeenCalledWith('/dashboard')
    })
  })
})
