import { firebaseClient } from '@Firebase/firebaseClient'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { SignupProps } from './auth-api'

type SignupWithoutPassword = Omit<SignupProps, 'password'>

interface FirestoreNewUserProps extends SignupWithoutPassword {
  role: string
}

export class FirebaseApi {
  protected firebaseClient
  protected firestore
  protected auth
  protected firebaseApp
  protected user
  protected defaultSetupRole = 'basic'

  constructor() {
    this.firebaseClient = firebaseClient()
    this.firestore = this.firebaseClient.firestore
    this.auth = this.firebaseClient.auth
    this.firebaseApp = this.firebaseClient.firebaseApp
  }

  protected async addFirestoreUser({
    username,
    role,
    email,
    firstName,
    lastName,
    squad,
  }: FirestoreNewUserProps): Promise<void> {
    const userCollection = await collection(this.firestore, 'users')
    const userDocRef = await doc(userCollection, this.user.uid)
    const squadsRef = await collection(this.firestore, 'squads')
    const squadRef = await doc(squadsRef, squad)

    await updateDoc(squadRef, { [`${username}`]: userDocRef })
    await setDoc(userDocRef, { squad: squadRef, role, email, firstName, lastName, username })
  }
}
