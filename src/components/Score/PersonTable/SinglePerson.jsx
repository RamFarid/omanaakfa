import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import ActionsCell from '../ActionsCell'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useScore } from '../../../contexts/ScoreContext'
import { useUser } from '../../../contexts/UserContext'
import SuperscriptIcon from '@mui/icons-material/Superscript'
import generateQRImg from '../../../utils/generateQRImg'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import axios from '../../../lib/axios'

function SinglePerson({ person, onEdit, i }) {
  const [isLoading, setIsLoading] = useState(false)
  const { online, creds } = useUser()
  const { removePerson, updatePerson } = useScore()
  const qrCodeImageRef = useRef(null)
  const [qrCode, setQrCode] = useState({
    isQRCode: false,
    qrCodeImage: '',
    qrCodeDowmload: '',
  })
  const deleteHandler = useCallback(async () => {
    if (!online) return toast('طب ما انت معكش نت')
    try {
      setIsLoading(true)
      const { data } = await axios.delete(`/members/${person._id}`)
      if (data.success) {
        toast.success(data.message)
        removePerson(person)
        return
      }
      toast.error(data.message)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [online, person, removePerson])

  const quickScoreUpHandler = useCallback(async () => {
    const { data } = await axios.put(`/qrcode?id=${person._id}`)
    if (data.success) {
      toast.success(`${person.name} زاد نقطتين`, {
        progress: 0,
        icon: <SuperscriptIcon color='success' />,
      })
      updatePerson(data.data)
    }
  }, [person, updatePerson])

  // #E6E6FA
  // #FFDAB9
  // #BEBAA7
  return (
    <>
      <TableRow sx={{ bgcolor: 'transparent' }}>
        <CustomCell align='right'>{i || '107'}</CustomCell>
        <CustomCell
          align='right'
          onClick={async () => {
            try {
              setIsLoading(true)
              const link = await generateQRImg(person._id)
              setQrCode((pre) => ({
                ...pre,
                isQRCode: true,
                qrCodeImage: link,
              }))
              setTimeout(() => {
                const divToCapture = qrCodeImageRef.current
                html2canvas(divToCapture)
                  .then((canvas) => {
                    const screenshotUrl = canvas.toDataURL('image/png')
                    setQrCode((pre) => ({
                      ...pre,
                      qrCodeDowmload: screenshotUrl,
                    }))
                  })
                  .finally(() => setIsLoading(false))
              }, 1000)
              // Use html2canvas to take the screenshot
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {person.name}
        </CustomCell>
        <CustomCell align='right'>
          {person.church?.replace('كنيسة', '')}
        </CustomCell>
        <CustomCell
          align='right'
          sx={{
            bgcolor: creds ? 'action.hover' : 'transparent',
          }}
        >
          {person.points}
        </CustomCell>
        {Boolean(creds) && (
          <ActionsCell
            onEdit={() => onEdit(person)}
            onDelete={deleteHandler}
            isLoading={isLoading}
            onHold={quickScoreUpHandler}
          />
        )}
      </TableRow>
      <Dialog
        open={qrCode.isQRCode}
        onClose={() => setQrCode({ isQRCode: false })}
      >
        <DialogTitle>QR code {person.name}</DialogTitle>
        <DialogContent>
          <Stack ref={qrCodeImageRef}>
            <Box
              component={'img'}
              src={qrCode.qrCodeImage}
              alt='Photo of user'
              maxWidth={'300px'}
              maxHeight={'300px'}
              overflow={'hidden'}
              mx={'auto'}
            />
            <Typography align='center' variant='h5'>
              {person.name}
            </Typography>
          </Stack>
          <Button
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3 }}
            component={'a'}
            href={qrCode.qrCodeDowmload}
            variant='contained'
            download={`${person.name}-qrcode.png`}
          >
            {isLoading ? 'بحمل الqrcode...' : 'نزل الصورة'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

const CustomCell = styled(TableCell)({
  paddingBlock: '8px',
})

SinglePerson.propTypes = {
  person: PropTypes.object,
  onEdit: PropTypes.func,
  i: PropTypes.number,
}

export default SinglePerson
