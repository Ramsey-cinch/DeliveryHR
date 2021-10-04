import { FirebaseApi } from '../firebase-api'
import { signInWithEmailAndPassword, signOut, deleteUser, createUserWithEmailAndPassword } from 'firebase/auth'

export interface SignupProps {
  email: string
  firstName: string
  lastName: string
  password: string
  squad: string
  username: string
}

export class AuthApi extends FirebaseApi {
  public async signup({ password, username, email, firstName, lastName, squad }: SignupProps): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password)

    this.user = user
    if (this.user) {
      await this.addFirestoreUser({ username, role: this.defaultSetupRole, email, firstName, lastName, squad })
    }
  }

  public async login({ email, password }: { email: string; password: string }): Promise<void> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password)
    this.user = user
  }

  public async logout(): Promise<void> {
    await signOut(this.auth)
  }

  public async deleteUser(): Promise<void> {
    this.user && (await deleteUser(this.user))
  }
}
