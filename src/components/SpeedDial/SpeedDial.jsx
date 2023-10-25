import { Button } from '@mui/material'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import { Link } from 'react-router-dom'

function SpeedDial() {
  return (
    <>
      <Button
        LinkComponent={Link}
        to='https://www.omanaakfa.com'
        size='large'
        fullWidth
        target='_blank'
        sx={{ gap: 1, mb: 3 }}
        endIcon={<OpenInBrowserIcon />}
        variant='contained'
        disableElevation
      >
        العودة للصفحة الرئيسية
      </Button>
    </>
  )
}

export default SpeedDial
