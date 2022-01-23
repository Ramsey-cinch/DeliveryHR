import { addBusinessDays } from 'date-fns'
import { FirebaseApi } from '../firebase-api'
import { collection, doc, query, where, setDoc, getDocs, getDoc } from 'firebase/firestore'
import { DocumentData } from '@google-cloud/firestore'
import { id } from 'date-fns/locale'

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

  public async getAllApprovedHolidayRequests({ weekStart, weekEnd }) {
    const holidayCollectionRef = await collection(this.firestore, 'holidays')
    const q = query(
      holidayCollectionRef,
      where('from', '>=', weekStart.toISOString()),
      where('from', '<=', weekEnd.toISOString()),
    )
    const querySnapshot = await getDocs(q)
    const holidayRequests = await querySnapshot.docs.map((request) => request.data())
    const approvedOnlyRequests = holidayRequests.filter((holidayRequest) => holidayRequest.status === 'approved')
    const userDetailsMapped = Promise.all(
      approvedOnlyRequests.map(async (request) => {
        const userDetails = await getDoc(request.user)

        return {
          ...request,
          user: userDetails.data(),
          id: request.user.id,
        }
      }),
    )

    return userDetailsMapped
  }

  public async getAllPendingHolidayRequests() {
    const holidayCollectionRef = await collection(this.firestore, 'holidays')
    const q = query(holidayCollectionRef, where('status', '==', 'pending'))
    const querySnapshot = await getDocs(q)
    const holidayRequests = await querySnapshot.docs.map((request) => request.data())

    return holidayRequests
  }

  private async getAllUserDetails() {
    const userCollectionRef = await collection(this.firestore, 'users')
    const usersDocs = await getDocs(userCollectionRef)
    const userDetails = usersDocs.docs.map((user) => ({ userId: user.id, ...user.data() }))

    return this.sanitiseUserDetails(userDetails)
  }

  protected sanitiseUserDetails = (userDetails) => {
    return userDetails.map((user) => ({
      id: user.userId,
      name: `${user.firstName} ${user.lastName.slice(0, 1)}`,
    }))
  }
}
