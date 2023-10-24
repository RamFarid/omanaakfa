import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  colors,
  createTheme,
} from '@mui/material'
import { useContext, useEffect, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeLayout from './routes/HomeLayout'
import Home from './routes/Home'
import Score from './routes/Score'
import Login from './routes/Login'
import UserContextProvider from './contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScoreContextProvider from './contexts/ScoreContext'
import { ThemeContext } from './contexts/ThemeContext'
import QRCode from './routes/QRCode'
import ErrorBoundary from './components/ErrorBoundary'
import Quiz from './routes/Quiz'
import Dashboard from './routes/Dashboard'
import DashboardLayout from './routes/DashboardLayout'
import Gallery from './routes/Gallery'
import 'react-photo-view/dist/react-photo-view.css'

function App() {
  const [theme] = useContext(ThemeContext)
  const location = useLocation()
  const themeConstructor = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          direction: 'rtl',
          primary: colors['blue'],
          firstSecondary: {
            light: '#E6E6FA',
            dark: '#bebdd7ba',
          },
          secondSecondary: {
            light: '#FFDAB9',
            dark: '#e6c49ebf',
          },
          thirdSecondary: {
            light: '#BEBAA7',
            dark: '#9c9885b0',
          },
        },
        typography: {
          fontFamily: "'Cairo', sans-serif",
        },
        components: {
          MuiSpeedDialAction: {
            styleOverrides: {
              staticTooltipLabel: {
                width: '120px',
                fontSize: '14px',
              },
            },
          },
        },
      }),
    [theme]
  )

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [location.pathname])

  return (
    <ThemeProvider theme={themeConstructor}>
      <UserContextProvider>
        <ScoreContextProvider>
          <GlobalStyles
            styles={{
              '*': {
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
                fontFamily: "'Cairo', sans-serif",
              },
              body: {
                fontFamily: "'Cairo', sans-serif",
              },
              '.MuiFormHelperText-root': {
                textAlign: 'right !important',
              },
              '*::-webkit-scrollbar': {
                width: '5px',
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: themeConstructor.palette.primary.main,
                borderRadius: '8px',
                width: '5px',
              },
              '.lds-ellipsis > div': {
                backgroundColor:
                  themeConstructor.palette.mode === 'dark'
                    ? themeConstructor.palette.primary.dark
                    : themeConstructor.palette.primary.light,
              },
            }}
          />
          <CssBaseline />
          <Routes>
            <Route element={<HomeLayout />} path='/'>
              <Route
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
                index
              />
              <Route
                element={
                  <ErrorBoundary>
                    <Quiz />
                  </ErrorBoundary>
                }
                path='/quiz'
              />
              <Route
                element={
                  <ErrorBoundary>
                    <Score />
                  </ErrorBoundary>
                }
                path='/score'
              />
              <Route
                element={
                  <ErrorBoundary>
                    <Gallery />
                  </ErrorBoundary>
                }
                path='/gallery'
              />
              <Route element={<DashboardLayout />}>
                <Route
                  element={
                    <ErrorBoundary>
                      <QRCode />
                    </ErrorBoundary>
                  }
                  path='/qrcode'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  }
                  path='/dashboard'
                />
              </Route>
            </Route>
            <Route element={<Login />} path='/login' />
          </Routes>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </ScoreContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
