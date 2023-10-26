import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, Modal, Stack } from '@mui/material'
import axios from '../lib/axios'

const UserContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext)
}

function UserContextProvider({ children }) {
  const [creds, setCreds] = useState(localStorage.getItem('creds') || '')
  const [online, setOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        if (creds) {
          axios.defaults.headers.Authorization = creds
        }
        const { data } = await axios.get('/auth/check')
        if (!data.success) {
          setCreds('')
          return
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [online, creds])

  useEffect(() => {
    if (!navigator.onLine) {
      setOnline(false)
    }
    const onlineHandler = () => {
      setOnline(true)
    }
    const offLineHandler = () => {
      setOnline(false)
    }
    // If user being offline
    window.addEventListener('offline', offLineHandler)
    // If user back online after offline
    window.addEventListener('online', onlineHandler)
    return () => {
      window.addEventListener('offline', offLineHandler)
      window.addEventListener('online', onlineHandler)
    }
  }, [])

  async function logOut() {
    setCreds('')
    localStorage.removeItem('creds')
  }

  return (
    <UserContext.Provider value={{ creds, setCreds, online, logOut }}>
      {isLoading ? (
        <Modal
          open={true}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none !important',
            outline: 'none !important',
          }}
        >
          <Stack
            border={'none'}
            sx={{ outline: 'none' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            <CircularProgress />
          </Stack>
        </Modal>
      ) : (
        children
      )}
    </UserContext.Provider>
  )
}

export default UserContextProvider

UserContextProvider.propTypes = {
  children: PropTypes.any,
}
