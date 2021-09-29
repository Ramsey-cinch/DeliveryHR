import { withProtection } from '@Services/withProtection'

const Dashboard = () => {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <a href="/holiday-request">Make a holiday request</a>
      </div>
    </>
  )
}

export default withProtection(Dashboard)
