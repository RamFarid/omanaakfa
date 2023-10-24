import { Box, Typography } from '@mui/material'

function AppInstallInstructions() {
  return (
    <Box component={'section'}>
      <Typography component={'h2'} variant='h5'>
        ازاي تنزله ابليكاشن؟
      </Typography>
      <Typography mt={2.4} fontWeight={700}>
        اندرويد:
      </Typography>
      <Box component={'ul'} px={2}>
        <Box component='li' position='relative'>
          أتاكد انك فاتح الموقع من على جوجل كروم{' '}
          <Box
            component='img'
            src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg'
            width='22px'
            height='22px'
          />{' '}
          مش اي متصفح تاني
        </Box>
        <Box component='li'>
          دوس على التلت نقط اللي فوق على اليمين أو الشمال لو عربي
        </Box>
        <Box component='li'>هتلاقي كلمة تثبيت أو "Install app"</Box>
        <Box component='li'>دوس عليها</Box>
        <Box component='li'>خليك فاتح كروم لحد ما يتحمل خالص</Box>
      </Box>
      <Typography fontWeight={700} mt={2.4}>
        أيفون:
      </Typography>
      <Box component={'ul'} px={2}>
        <Box component='li' position='relative'>
          أتاكد انك فاتح الموقع من على سفاري{' '}
          <Box
            // position='absolute'
            // left='-23px'
            // top='50%'
            // translate='0 -50%'
            component='img'
            src='https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg'
            width='22px'
            height='22px'
          />{' '}
          مش اي متصفح تاني
        </Box>
        <Box component='li'>
          دوس على التلت نقط اللي تحت على اليمين أو على الشمال لو عربي
        </Box>
        <Box component='li'>هتلاقي كلمة تثبيت تطبيق أو "Install app"</Box>
        <Box component='li'>دوس عليها</Box>
        <Box component='li'>خليك فاتح سفاري لحد ما يتحمل خالص</Box>
      </Box>
    </Box>
  )
}

export default AppInstallInstructions
