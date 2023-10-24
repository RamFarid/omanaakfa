import { Box, Button } from '@mui/material'
import CollectionsIcon from '@mui/icons-material/Collections'
import PropTypes from 'prop-types'

function UploadBtn({ children, updateFiles, variant, disabled }) {
  return (
    <Button
      color='primary'
      component='label'
      size='small'
      htmlFor='media'
      variant={variant || 'contained'}
      startIcon={<CollectionsIcon />}
      disabled={disabled}
      sx={{ pointerEvents: disabled ? 'none' : 'all' }}
    >
      <Box
        component='input'
        type='file'
        id='media'
        multiple
        // accept='image/png,image/jpg,image/jpeg'
        display={'none'}
        onChange={updateFiles}
        disabled={disabled}
        sx={{ pointerEvents: disabled ? 'none' : 'all' }}
      />
      {children}
    </Button>
  )
}

UploadBtn.propTypes = {
  updateFiles: PropTypes.func,
  children: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
}

export default UploadBtn
