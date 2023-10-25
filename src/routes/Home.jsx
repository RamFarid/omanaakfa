import { Button, Link, Stack } from '@mui/material'
import SpeedDial from '../components/SpeedDial/SpeedDial'
function Home() {
  return (
    <Stack justifyContent={'center'} height={'87vh'} gap={3}>
      <SpeedDial />
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA/%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A9'
      >
        المسابقات
      </Button>
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA/%D8%A7%D9%84%D9%86%D8%AA%D9%8A%D8%AC%D8%A9'
      >
        النتايج
      </Button>
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/%D8%A7%D9%84%D8%B5%D9%88%D8%B1'
      >
        معرض الصور
      </Button>
    </Stack>
  )
}

export default Home
