import { AuthApi } from '.'
import { FirebaseApi } from '../firebase-api'

const mockAuthSignIn = jest.fn()
const mockAuthSignOut = jest.fn()
const mockAuthDeleteUser = jest.fn()

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockAuthSignIn,
  signOut: mockAuthSignOut,
  deleteUser: mockAuthDeleteUser,
  createUserWithEmailAndPassword: jest
    .fn()
    .mockImplementation()
    .mockResolvedValue({ user: { uid: '0987654321' } }),
}))

jest.mock('@Firebase/firebaseClient', () => ({
  firebaseClient: function () {
    return {
      firestore: jest.fn(),
      auth: jest.fn(),
      firebaseApp: jest.fn(),
    }
  },
}))

let mockFirestoreCollection
let mockFirestoreDoc
let mockFirestoreSetDoc
let mockFirestoreUpdate

jest.mock('firebase/firestore', () => {
  mockFirestoreCollection = jest.fn().mockImplementation(() => ({ promise: '' }))
  mockFirestoreDoc = jest.fn().mockImplementation(() => ({ promise: '' }))
  mockFirestoreSetDoc = jest.fn()
  mockFirestoreUpdate = jest.fn()
  return {
    collection: mockFirestoreCollection,
    doc: mockFirestoreDoc,
    setDoc: mockFirestoreSetDoc,
    updateDoc: mockFirestoreUpdate,
  }
})

const authApi = new AuthApi()

describe('AuthApi', () => {
  it('returns an instance of AuthApi', () => {
    expect(authApi).toBeInstanceOf(AuthApi)
    expect(authApi).toBeInstanceOf(FirebaseApi)
  })
})
