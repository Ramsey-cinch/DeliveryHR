import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/table'
import { Box } from '@chakra-ui/layout'
import { TableDecorator } from './utils/tableDecorator'
import { useEffect, useState } from 'react'

const mockedTableData = {
  tableHeader: ['Name', 19, 20, 21, 22, 23],
  tableBody: [
    {
      name: 'Ramsey',
      datesOff: [],
      pendingHolidays: [20, 21],
    },
    {
      name: 'Mark',
      datesOff: [20, 21],
      pendingHolidays: [],
    },
    {
      name: 'Ollie',
      datesOff: [20, 21, 23],
      pendingHolidays: [],
    },
    {
      name: 'Soi',
      datesOff: [],
      pendingHolidays: [],
    },
    {
      name: 'Alex',
      datesOff: [19, 20],
      pendingHolidays: [],
    },
    {
      name: 'Kay',
    },
  ],
}
const backgroundColor = (pendingHolidays, approvedHolidays, day): string => {
  let colour = ''

  if (approvedHolidays) {
    const hasApproved = approvedHolidays.some((date) => date.includes(day))
    colour = hasApproved ? 'rgba(255,123,123,0.4)' : ''
  }

  return colour
}

const HolidayScheduler: React.FC = () => {
  const tableDecorator = new TableDecorator()
  const [results, setResults] = useState<any>()
  const getData = async () => {
    const data = await tableDecorator.getTableData()

    setResults(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box margin="10px" border="1px solid lightgrey" borderRadius="16px">
      <Table variant="simple">
        <Thead justifyContent="space-evenly">
          <Tr>
            {results &&
              results.tableHeader.map((heading) => (
                <Th textAlign="center" key={`heading-${heading}`}>
                  {heading}
                </Th>
              ))}
          </Tr>
        </Thead>

        <Tbody>
          {results &&
            results.tableBody.map((row) => (
              <Tr key={`day-${row.id}`}>
                <Td textAlign="center" width="10px" height="25px">
                  {row.name}
                </Td>
                {results.tableHeader.slice(1).map((day) => (
                  <Td
                    borderLeft={'1px solid lightgrey'}
                    key={`day-row${day}`}
                    backgroundColor={backgroundColor(row.pendingHolidays, row.datesOff, day)}
                  />
                ))}
              </Tr>
            ))}
        </Tbody>

        <Tfoot>
          <Tr>
            <Th>Delivery Squad</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

export default HolidayScheduler
