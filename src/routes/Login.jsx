import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import sky from '../assets/sky-bg.jpg'
import deep from '../assets/deep-bg.jpg'
import { ThemeContext } from '../contexts/ThemeContext'
import axios from '../lib/axios'

function Login() {
  const redirect = useNavigate()
  const [userPassword, setUserPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { setCreds, creds } = useUser()
  const [searchParams] = useSearchParams()
  const [theme] = useContext(ThemeContext)
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
      redirect(nextDestination ? `/${nextDestination}` : '/')
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
    <Box
      width='100%'
      height={'100vh'}
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url("${theme === 'light' ? sky : deep}")`,
      }}
    >
      <Box
        width='100%'
        height={'calc(100% - 76px)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          background: 'rgba(0, 0, 0, 25%)',
          borderRadius: 2,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10.5px)',
        }}
      >
        <Stack
          component={'form'}
          border={'3px solid #ddd'}
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
            border={'3px solid #ddd'}
            px={2}
            py={1}
            mb={'30px'}
            bgcolor='transparent'
            color='#ddd'
          >
            أنت إداري؟
          </Typography>
          <TextField
            autoComplete='off'
            sx={{
              direction: 'ltr',
              mb: 2,
              color: '#fff',
              '& input': {
                color: '#ddd',
              },
              '& fieldset': {
                border: '1px solid #ddd',
              },
              '&:hover fieldset': {
                borderColor: '#ddd !important',
              },
            }}
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
