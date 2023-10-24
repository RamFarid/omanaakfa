import { Button } from '@mui/material'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import { Link } from 'react-router-dom'

function SpeedDial() {
  return (
    <>
      <Button
        LinkComponent={Link}
        to='https://www.omanaakfa.com'
        size='small'
        fullWidth
        target='_blank'
        sx={{ gap: 1, mb: 3 }}
        variant='outlined'
        endIcon={<OpenInBrowserIcon />}
      >
        العودة للصفحة الرئيسية
      </Button>
    </>
  )
}

export default SpeedDial
