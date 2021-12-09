import { withProtection } from '@Services/withProtection'
import { useRequests } from '@Context/requestContext'

const Dashboard = () => {
  const { holidayRequests } = useRequests()

  return (
    <>
      <div>{holidayRequests && <p>Holiday requests made</p>}</div>
      <div>{!holidayRequests && <p>No Holiday requests made</p>}</div>
    </>
  )
}

export default withProtection(Dashboard)
