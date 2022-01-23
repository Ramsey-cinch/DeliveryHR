import { startOfWeek, addDays, eachDayOfInterval, getDate } from 'date-fns'
import { FirestoreApi } from '@Firebase-api/firestore-api'

export class TableDecorator {
  private firestore
  private startOfBusinessWeek
  private endOfBusinessWeek

  constructor() {
    this.firestore = new FirestoreApi()
    this.startOfBusinessWeek = addDays(startOfWeek(new Date()), 1)
    this.endOfBusinessWeek = addDays(this.startOfBusinessWeek, 4)
  }

  public async getTableData() {
    return {
      tableHeader: await this.getTableHeader(),
      tableBody: await this.getTableBody(),
    }
  }

  protected async getAllHolidayRequests() {
    const userPendingHols = await this.firestore.getAllPendingHolidayRequests()
    const approvedHolidays = await this.firestore.getAllApprovedHolidayRequests({
      weekStart: this.startOfBusinessWeek,
      weekEnd: this.endOfBusinessWeek,
    })

    return {
      approvedHolidays,
      userPendingHols,
    }
  }

  protected getTableHeader() {
    const currentWeekDays = eachDayOfInterval({ start: this.startOfBusinessWeek, end: this.endOfBusinessWeek })
    const datesOfWeek = currentWeekDays.map((day) => getDate(day))

    return ['Name', ...datesOfWeek]
  }

  protected async getTableBody() {
    const users = await this.firestore.getAllUserDetails()
    const { approvedHolidays } = await this.getAllHolidayRequests()

    return users.map((user) => {
      const userApprovedHolidays = []
      approvedHolidays.forEach((request) => {
        const isInCurrentWeek = new Date(request.from) <= new Date(this.endOfBusinessWeek)

        if (request.id === user.id && isInCurrentWeek) {
          userApprovedHolidays.push(request)
        }
      })

      return {
        ...user,
        datesOff: userApprovedHolidays.length ? userApprovedHolidays.map((hol) => this.getHolidayDates(hol)) : null,
      }
    })
  }

  protected getHolidayDates({ from, to }) {
    const datesOff = eachDayOfInterval({ start: new Date(from), end: new Date(to) })
    const days = datesOff.map((day) => getDate(day))

    return days
  }
}
