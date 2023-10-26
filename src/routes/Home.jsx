import { Button, Link, Stack } from '@mui/material'
import SpeedDial from '../components/SpeedDial/SpeedDial'
import { useUser } from '../contexts/UserContext'
function Home() {
  const { logOut, creds } = useUser()
  return (
    <Stack justifyContent={'center'} height={'87vh'} gap={3}>
      <SpeedDial />
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/quizes/quiz'
      >
        المسابقات
      </Button>
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/quizes/score'
      >
        النتايج
      </Button>
      <Button
        variant='contained'
        disableElevation
        size='small'
        LinkComponent={Link}
        href='https://www.omanaakfa.com/gallery'
      >
        معرض الصور
      </Button>
      {creds && (
        <Button disableElevation size='small' color='error' onClick={logOut}>
          تسجيل خروج
        </Button>
      )}
    </Stack>
  )
}

export default Home
