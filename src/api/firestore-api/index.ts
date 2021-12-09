import { addBusinessDays } from 'date-fns'
import { FirebaseApi } from '../firebase-api'
import { collection, doc, query, where, setDoc, getDocs, getDoc } from 'firebase/firestore'
import { DocumentData } from '@google-cloud/firestore'

export interface SignupProps {
  email: string
  firstName: string
  lastName: string
  password: string
  squad: string
  username: string
}

export class FirestoreApi extends FirebaseApi {
  public async postHolidayRequest({ fromDate, reason, authedUser, totalDays, totalHours }): Promise<void> {
    const holidayCollectionRef = await collection(this.firestore, 'holidays')
    const holidayRequestDocRef = doc(holidayCollectionRef)
    const userCollection = await collection(this.firestore, 'users')
    const userRef = await doc(userCollection, authedUser.uid)

    await setDoc(holidayRequestDocRef, {
      ...this.formatRequestDetails({ fromDate, totalDays, totalHours }),
      user: userRef,
      status: 'pending',
      reason,
    })
  }

  public async getAllHolidayRequests({ userId }): Promise<DocumentData[]> {
    const holidayCollectionRef = await collection(this.firestore, 'holidays')
    const userCollection = await collection(this.firestore, 'users')
    const userRef = await doc(userCollection, userId)

    const q = query(holidayCollectionRef, where('user', '==', userRef))
    const querySnapshot = await getDocs(q)
    const holidayRequests = await querySnapshot.docs.map((request) => request.data())

    return holidayRequests
  }

  public async getUserDetails(userId): Promise<DocumentData> {
    const userCollection = await collection(this.firestore, 'users')
    const userRef = await doc(userCollection, userId)
    const userDetails = await getDoc(userRef)

    return userDetails.data()
  }

  private formatRequestDetails = ({ fromDate, totalDays, totalHours }) => {
    const durationInHours = this.getTotalHours(totalDays, totalHours)
    const toDate = addBusinessDays(fromDate, totalDays).toISOString()

    return {
      from: new Date(fromDate).toISOString(),
      to: toDate,
      duration: durationInHours,
    }
  }

  private getTotalHours = (days, hours): number => {
    const contractualHours = 7.5

    return contractualHours * days + hours
  }
}
