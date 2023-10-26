import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import PropTypes from 'prop-types'
function EnsureSubmit({ open, remainsQuestions, onClose, onSubmit }) {
  return (
    <Dialog open={open} sx={{ direction: 'rtl' }} onClose={onClose}>
      <DialogTitle color={'error'}>أنت متأكد؟</DialogTitle>
      <DialogContent>
        <DialogContentText>
          في {remainsQuestions} سؤال أنت محلتهمش. هتسلم و أنت مش حاللهم؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={onClose}>
          إلغاء
        </Button>
        <Button color='primary' onClick={onSubmit}>
          تسليم
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EnsureSubmit.propTypes = {
  open: PropTypes.bool,
  remainsQuestions: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default EnsureSubmit
