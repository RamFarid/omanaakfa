import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useScore } from '../../../contexts/ScoreContext'
import { useUser } from '../../../contexts/UserContext'
import generateQRImg from '../../../utils/generateQRImg'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import axios from '../../../lib/axios'
import churches from '../../../data/chuches'

function ControlPersonModal({ person, open, onClose }) {
  const { addNewPerson, updatePerson } = useScore()
  const { online } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [points, setPoints] = useState('')
  const [church, setChurch] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    points: '',
    church: '',
  })
  const [remoteUserName, setRemoteUserName] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [downloadURL, setDownloadURL] = useState('')
  const qrCodeImageRef = useRef(null)

  const handleScreenshot = () => {
    const divToCapture = qrCodeImageRef.current

    // Use html2canvas to take the screenshot
    html2canvas(divToCapture)
      .then(function (canvas) {
        // Convert the canvas to an image URL
        const screenshotUrl = canvas.toDataURL('image/png')

        setDownloadURL(screenshotUrl)
        setIsLoading(false)
      })
      .catch(console.log)
  }

  useEffect(() => {
    if (Object.keys(person).length) {
      setName(person.name)
      setChurch(person.church)
    }
  }, [person])

  const handlePersonSave = async () => {
    if (!online) return toast('انت معكش نت')
    const upoints =
      -Number(points) > person.points ? -person.points : Number(points)
    const uname = name.trim()
    try {
      setIsLoading(true)
      if (Object.keys(person).length === 0) {
        const personData = {
          name: uname,
          points: upoints === '' ? 0 : upoints,
          church,
        }
        const { data } = await axios.post('/members/new', personData)
        if (data.success) {
          toast.success(data.message)
          addNewPerson(data.data)
          const link = await generateQRImg(data.data._id)
          setRemoteUserName(data.data.name)
          setQrCode(link)
          setTimeout(handleScreenshot, 700)
          return
        }
        setIsLoading(false)
        toast.error(data.message)
        return
      }

      const { data } = await axios.put(`/members/${person._id}`, {
        name: uname,
        points: person.points + upoints,
        church,
      })
      if (data.success) {
        toast.success(data.message)
        updatePerson(data.data)
        console.log(data.data)
        closeHandler()
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      toast.error(data.message)
      return
    } catch (error) {
      toast.error(error.message)
      console.error(error)
      setIsLoading(false)
    }
  }

  const closeHandler = () => {
    setChurch('')
    setName('')
    setPoints('')
    setQrCode('')
    setDownloadURL('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>
        {qrCode.length > 0
          ? `الQR code بتاع ${remoteUserName}`
          : Object.keys(person).length > 0
          ? 'تعديل بيانات '
          : 'اضافة عضو'}
        <Typography
          color={'primary'}
          component={'span'}
          fontSize={'inherit'}
          fontWeight={'inherit'}
        >
          {person.name || ''}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden', display: 'flex' }}>
        <Stack
          overflow={'hidden'}
          sx={{
            transition: 'all .6s',
            flexBasis: qrCode.length > 0 ? '100%' : '0',
          }}
        >
          <Stack ref={qrCodeImageRef}>
            <Box
              component={'img'}
              src={qrCode}
              alt='Photo of user'
              maxWidth={'300px'}
              maxHeight={'300px'}
              overflow={'hidden'}
              mx={'auto'}
            />
            <Typography align='center' variant='h5'>
              {remoteUserName}
            </Typography>
          </Stack>
          <Button
            disabled={isLoading}
            sx={{ mt: 3 }}
            component={'a'}
            href={downloadURL}
            variant='contained'
            download={`${remoteUserName}-qrcode.png`}
          >
            {isLoading ? 'بحمل الqrcode' : 'نزل الصورة'}
          </Button>
        </Stack>
        <Stack
          overflow='hidden'
          sx={{
            transition: 'all .6s',
            flexBasis: qrCode.length > 0 ? '0' : '100%',
          }}
        >
          <TextField
            value={name}
            margin='dense'
            size='small'
            fullWidth
            sx={{ marginInlineEnd: 1.5 }}
            error={Boolean(errors.name.length)}
            helperText={errors.name.length ? errors.name : ''}
            onChange={(e) => {
              setErrors((pre) => ({ ...pre, name: '' }))
              const { value } = e.target
              if (value.trim().length > 20) {
                setErrors((pre) => ({ ...pre, name: 'الاسم طويل كده' }))
                setName(value)
              }
              setName(value)
            }}
            label='الأسم'
            type='text'
          />
          <Stack direction={'row'} my={2} gap={2}>
            <TextField
              defaultValue={person.points}
              size='small'
              disabled
              type='number'
              label='النقط'
              sx={{
                flex: 4,
                display: Object.keys(person).length ? 'inline-flex' : 'none',
              }}
            />
            <TextField
              value={points}
              error={Boolean(errors.points.length)}
              helperText={errors.points.length ? errors.points : ''}
              label={person?.points ? 'تعديل بـ' : 'النقط'}
              type='number'
              size='small'
              sx={{ flex: 2 }}
              onChange={(e) => {
                setErrors((pre) => ({ ...pre, points: '' }))
                setPoints(e.target.value)
              }}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id='church-menu-label'>الكنيسه</InputLabel>
            <Select
              margin='dense'
              size='small'
              labelId='church-menu-label'
              id='church-menu'
              value={church}
              label='الكنيسه'
              onChange={(e) => setChurch(e.target.value)}
            >
              {churches.map((church, i) => {
                return (
                  <MenuItem key={i + 4} value={church}>
                    {church}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      {!qrCode && (
        <DialogActions>
          <Button onClick={closeHandler} color='error'>
            اغلاق
          </Button>
          <Button
            onClick={handlePersonSave}
            disabled={
              isLoading ||
              Boolean(errors.name.length) ||
              Boolean(errors.points.length) ||
              Boolean(errors.church.length) ||
              !name.trim() ||
              !points ||
              !church ||
              (name.trim() === person.name &&
                !Number(points) &&
                Number(church) === Number(person.church))
            }
          >
            {isLoading ? 'بحمل..' : 'حفظ'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

ControlPersonModal.propTypes = {
  person: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ControlPersonModal
