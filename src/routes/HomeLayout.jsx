import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <>
      <Container component={'main'} maxWidth='xs' sx={{ my: 2, mb: '180px' }}>
        <Outlet />
      </Container>
    </>
  )
}

export default HomeLayout
