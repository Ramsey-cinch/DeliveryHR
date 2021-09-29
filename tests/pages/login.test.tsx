import Login from '@Pages/login'
import { render, fireEvent } from '@testing-library/react'

const mockFirebaseLogin = jest.fn()

jest.mock('@Firebase-api/auth-api', () => ({
  AuthApi: function () {
    return { login: mockFirebaseLogin }
  },
}))

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

describe('Login', () => {
  it('renders the login form', () => {
    const { getByText } = render(<Login />)

    expect(getByText('DeliveryHR')).toBeInTheDocument()
  })

  describe('Login action', () => {
    it('calls the firebase login method when a form is submitted', () => {
      const email = 'test@gmail.com'
      const password = '123456'
      const { getByTestId } = render(<Login />)
      const emailInput = getByTestId('email')
      const passwordInput = getByTestId('password')
      const loginButton = getByTestId('button')

      fireEvent.change(emailInput, { target: { value: email } })
      fireEvent.change(passwordInput, { target: { value: password } })
      fireEvent.click(loginButton)

      expect(mockFirebaseLogin).toBeCalledWith({ email, password })
    })

    it('disables the login button until a user has entered an email AND password', () => {
      const { getByTestId } = render(<Login />)
      const emailInput = getByTestId('email')
      const passwordInput = getByTestId('password')
      const loginButton = getByTestId('button')

      fireEvent.change(emailInput, { target: { value: '' } })
      fireEvent.change(passwordInput, { target: { value: '' } })

      expect(loginButton).toHaveAttribute('disabled')
    })
  })
})
