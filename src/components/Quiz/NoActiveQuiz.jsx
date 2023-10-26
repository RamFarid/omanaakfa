import { Stack, Typography } from '@mui/material'
import QuizIcon from '@mui/icons-material/Quiz'
function NoActiveQuiz() {
  return (
    <Stack
      gap={1.4}
      minHeight={'77vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <QuizIcon sx={{ width: '130px', height: '130px' }} color='success' />
      <Typography component={'h1'} variant='h4' color={'success.main'}>
        فارغ!
      </Typography>
      <Typography component={'div'} variant='body1'>
        مفيش اختبارات في الوقت الحالي
      </Typography>
    </Stack>
  )
}

export default NoActiveQuiz
