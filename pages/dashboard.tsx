import { withProtection } from '@Services/withProtection'
import { useRequests } from '@Context/requestContext'
import HolidayScheduler from '@Components/HolidayScheduler'

const Dashboard = () => {
  const { holidayRequests } = useRequests()

  return (
    <>
      {holidayRequests && <HolidayScheduler />}
      <div>{!holidayRequests && <p>No Holiday requests made</p>}</div>
    </>
  )
}

export default withProtection(Dashboard)
