import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SpeedDial from '../components/SpeedDial/SpeedDial'

function HomeLayout() {
  return (
    <>
      <Container component={'main'} maxWidth='xs' sx={{ my: 2, mb: 13 }}>
        <SpeedDial />
        <Outlet />
      </Container>
    </>
  )
}

export default HomeLayout
