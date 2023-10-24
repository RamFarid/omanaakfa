import { IconButton } from '@mui/material'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import { Link } from 'react-router-dom'

function SpeedDial() {
  return (
    <>
      <IconButton
        LinkComponent={Link}
        to='https://www.omanaakfa.com'
        size='large'
        target='_blank'
        sx={(t) => ({
          position: 'fixed',
          bgcolor: t.palette.primary.main,
          bottom: '30px',
          right: '20px',
        })}
      >
        <OpenInBrowserIcon />
      </IconButton>
    </>
  )
}

export default SpeedDial
