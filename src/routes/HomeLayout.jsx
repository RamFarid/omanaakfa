import { Container } from '@mui/material'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import SpeedDial from '../components/SpeedDial/SpeedDial'

function HomeLayout() {
  return (
    <>
      <Header />
      <Container component={'main'} maxWidth='xs' sx={{ my: 2 }}>
        <Outlet />
      </Container>
      <SpeedDial />
    </>
  )
}

export default HomeLayout
