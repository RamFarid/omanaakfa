import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { useCallback, useContext, useState } from 'react'
import Drawer from './Drawer/Drawer'
import SignalCellularConnectedNoInternet4BarRoundedIcon from '@mui/icons-material/SignalCellularConnectedNoInternet4BarRounded'
import SignalCellular4BarRoundedIcon from '@mui/icons-material/SignalCellular4BarRounded'
import { ThemeContext } from '../contexts/ThemeContext'

function Header() {
  const { creds, online } = useUser()
  const [theme] = useContext(ThemeContext)
  const [isDrawer, setIsDrawer] = useState(false)
  const openDrawer = useCallback(() => setIsDrawer(true), [])
  const closeDrawer = useCallback(() => setIsDrawer(false), [])
  return (
    <>
      <AppBar position='sticky' sx={{ top: 0 }}>
        <Toolbar>
          <Stack
            alignItems={'center'}
            direction={'row'}
            color={'#fff'}
            flex={1}
            gap={2}
          >
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction={'row'}
              component={NavLink}
              to='/'
              color={'#fff'}
            >
              <Box
                width={'76px'}
                height={'76px'}
                component={'img'}
                src={'/LOGO.jpg'}
              />
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'}>
              {online ? (
                <SignalCellular4BarRoundedIcon color='success' />
              ) : (
                <SignalCellularConnectedNoInternet4BarRoundedIcon color='error' />
              )}
              <Typography
                color={online ? 'success' : 'error'}
                variant='caption'
              >
                {online ? 'متصل' : 'غير متصل'}
              </Typography>
            </Stack>
          </Stack>
          <Button
            component={NavLink}
            // variant='contained'
            to={
              window.location.pathname.slice(1) === 'score'
                ? `/login?next=${window.location.pathname.slice(1)}`
                : '/login'
            }
            sx={{
              mx: 1.3,
              fontWeight: 900,
              color: theme === 'dark' ? 'primary' : '#fff',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-disabled': {
                bgcolor: '#ffffffa6',
                color: 'primary',
              },
            }}
            disabled={Boolean(creds)}
          >
            {creds ? 'انت فعلا خادم' : 'خادم؟'}
          </Button>
          <IconButton onClick={openDrawer} color='inherit'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer isDrawer={isDrawer} closeDrawer={closeDrawer} />
      {/* <BottomNavigation value={isDrawer} setValue={openDrawer} /> */}
    </>
  )
}

export default Header
