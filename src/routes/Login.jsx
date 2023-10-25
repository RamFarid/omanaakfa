import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../lib/axios'

function Login() {
  const redirect = useNavigate()
  const [userPassword, setUserPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { setCreds, creds } = useUser()
  const [searchParams] = useSearchParams()
  const nextDestination = searchParams.get('next')
  if (creds) return <Navigate to='/' replace />

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await axios.post('/auth/login', {
        password: userPassword,
      })
      if (!data.success) return setError(data.message)
      toast.success(data.message)
      localStorage.setItem('creds', data.data)
      setCreds(userPassword)
      redirect(nextDestination ? `/${nextDestination}` : '/dashboard')
    } catch (error) {
      toast.error(
        error.message === `Failed to fetch`
          ? 'تقريبا معكش نت مش عارف اجيب البيانات'
          : error.message
      )
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Box width='100%' height={'100vh'}>
      <Box
        width='100%'
        height={'calc(100% - 76px)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack
          component={'form'}
          border={(t) => `3px solid ${t.palette.text.primary}`}
          width={'87%'}
          maxWidth={'370px'}
          borderRadius={'32px'}
          p={4}
          onSubmit={submitHandler}
        >
          <Typography
            component={'h1'}
            variant='h4'
            mx={'auto'}
            borderRadius={'60px'}
            border={(t) => `3px solid ${t.palette.text.primary}`}
            px={2}
            py={1}
            mb={'30px'}
            bgcolor='transparent'
          >
            تسجيل دخول
          </Typography>
          <TextField
            autoComplete='off'
            required
            type='text'
            size='small'
            label='ايه هو الباسورد؟'
            margin='dense'
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value)
              setError('')
            }}
            error={Boolean(error.length)}
            helperText={error}
          />
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? 'بشوف انت خادم ولا لا...' : 'اتأكد'}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
