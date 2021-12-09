import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/table'
import { Box } from '@chakra-ui/layout'

const mockedTableData = {
  tableHeader: ['Name', 19, 20, 21, 22, 23],
  days: [0, 1, 2, 3, 4],
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
      datesOff: [],
      pendingHolidays: [],
    },
  ],
}
const backgroundColor = (pendingHolidays, approvedHolidays, day): string => {
  const colour = pendingHolidays.includes(day) ? 'lightgrey' : approvedHolidays.includes(day) ? 'green' : ''

  return colour
}

const HolidayScheduler: React.FC = () => {
  return (
    <Box margin="10px" border="1px solid lightgrey" borderRadius="16px">
      <Table variant="simple">
        <Thead justifyContent="space-evenly">
          <Tr>
            {mockedTableData.tableHeader.map((heading) => (
              <Th textAlign="center" key={`heading-${heading}`}>
                {heading}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {mockedTableData.tableBody.map((row, ind) => (
            <Tr key={`day-${row.name}`}>
              <Td textAlign="center" width="10px" height="25px">
                {row.name}
              </Td>
              {mockedTableData.tableHeader.slice(1).map((day) => (
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
