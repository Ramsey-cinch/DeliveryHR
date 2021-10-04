import { renderHook } from '@testing-library/react-hooks'
import useFirebaseAuth from './useFirebaseAuth'

const mockOnAuthStateChanged = jest.fn().mockReturnValue(jest.fn)

jest.mock('@Firebase/firebaseClient', () => ({
  firebaseClient: function () {
    return {
      auth: {
        onAuthStateChanged: mockOnAuthStateChanged,
      },
    }
  },
}))

describe('useFirebaseAuth', () => {
  it('calls the firebaseAuth onstatechanged method', () => {
    renderHook(() => useFirebaseAuth())

    expect(mockOnAuthStateChanged).toHaveBeenCalled()
  })

  it('returns an auth object authedUser and loading properties', () => {
    const { result } = renderHook(() => useFirebaseAuth())

    expect(result.current).toEqual({ authedUser: null, loading: true })
  })
})
