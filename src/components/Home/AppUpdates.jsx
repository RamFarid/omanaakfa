import { Box, Typography } from '@mui/material'

function AppUpdates() {
  return (
    <Box component='section'>
      <Typography component={'h2'} variant='h5'>
        ازاي تستقبل تحديثات؟
      </Typography>
      <Box component={'ul'} px={2}>
        <Box component='li'>
          اقفل كل الـTabs (علامات التبويب) المفتوح فيها الموقع
        </Box>
        <Box component='li'>خش على الموقع</Box>
        <Box component='li'>اقفله</Box>
        <Box component='li'>افتحه تاني</Box>
      </Box>
      <Typography>
        لو حصل و نبهنا عليكم أن في تحديث اقفل كل علامات التبويب اللي مفتوح فيها
        الموقع و افتح الموقع و اقفله{' '}
      </Typography>
    </Box>
  )
}

export default AppUpdates
