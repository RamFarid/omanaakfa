import { CloseOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Slide,
  Stack,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import makeImageBlob from '../../utils/makeImageBlob'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import UploadBtn from './UploadBtn'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
function UploadPopup({ isPopup, closePopup }) {
  const [imgsLink, setImgsLink] = useState([])
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [uploadState, setUploadState] = useState([])

  const updateFiles = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]?.type.startsWith('image'))
      console.log(e.target.files[i]?.type)
      if (!e.target.files[i]?.type.startsWith('image')) {
        toast.warning('الصور بس اللي مسموح بيها', {
          toastId: 'onlyimagesareallowed',
        })
        continue
      }
      const img = makeImageBlob(e.target.files[i])
      setImgsLink((p) => [...p, img])
      setFiles((p) => [...p, e.target.files[i]])
    }
  }

  const submitAndUpload = async () => {
    try {
      setIsLoading(true)
      const imgsPromises = files.map((file) => {
        const tracker = uploadBytesResumable(
          ref(storage, `${v4()}.${file?.type?.split('/')[1]}`),
          file
        )
        // tracker.on('state_changed', (e) => {
        //   let newConstr = uploadState.map((c, i) =>
        //     i === index
        //       ? {
        //           total: e.totalBytes,
        //           current: (e.bytesTransferred / e.totalBytes) * 100,
        //         }
        //       : c
        //   )
        //   setUploadState(newConstr)
        // })
        return tracker
      })
      const res = await Promise.all(imgsPromises)
      toast.success('تم رفع الصور بنجاح')
      setFiles([])
      setImgsLink([])
      // setUploadState([])
      console.log(res)
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = (index) => {
    setImgsLink(imgsLink.filter((_e, i) => i !== index))
    setFiles(files.filter((_e, i) => i !== index))
  }

  return (
    <Modal
      open={isPopup || false}
      onClose={closePopup}
      sx={{
        display: {
          xs: 'block',
          md: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Slide direction={'up'} unmountOnExit in={isPopup}>
        <Box
          height={{
            xs: '100vh',
            md: '500px',
          }}
          width={{
            xs: '100%',
            md: '450px',
          }}
          margin={'auto'}
          bgcolor='background.default'
          p={2}
          borderRadius='10px'
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            maxHeight={'9%'}
          >
            <IconButton onClick={closePopup}>
              <CloseOutlined />
            </IconButton>
            {imgsLink.length > 0 && (
              <Stack
                gap={1}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Button
                  variant='contained'
                  size='small'
                  disabled={isLoading}
                  endIcon={
                    isLoading && (
                      <CircularProgress
                        sx={{ width: '100%', height: '100%' }}
                        size={20}
                        color='inherit'
                      />
                    )
                  }
                  onClick={submitAndUpload}
                >
                  حفظ و خروج
                </Button>
                <UploadBtn
                  updateFiles={updateFiles}
                  variant={'outlined'}
                  disabled={isLoading}
                >
                  المزيد
                </UploadBtn>
              </Stack>
            )}
          </Stack>
          <Box
            maxWidth={'100%'}
            mx='auto'
            mt={2}
            position='relative'
            height={'89%'}
            sx={{ overflowY: 'scroll' }}
          >
            {imgsLink?.length === 0 ? (
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
              >
                <Box
                  width={'70%'}
                  height={'40%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  border={(t) => `2px dashed ${t.palette.text.primary}`}
                  gap={1}
                >
                  <FileUploadIcon
                    sx={{ width: '100px', height: '100px' }}
                    color='primary'
                  />
                  <UploadBtn updateFiles={updateFiles} disabled={isLoading}>
                    أرفع الصور
                  </UploadBtn>
                </Box>
              </Stack>
            ) : (
              <PhotoProvider
                loop={false}
                toolbarRender={(e) => (
                  <Button
                    color='error'
                    disabled={isLoading}
                    onClick={() => removeImage(e.index)}
                  >
                    Remove
                  </Button>
                )}
              >
                <Box
                  display={'grid'}
                  gridTemplateColumns={'repeat(5, 1fr)'}
                  gridAutoRows={'1fr'}
                  gap={1}
                >
                  {imgsLink.map((url) => (
                    <PhotoView key={url} src={url}>
                      <Box
                        height={'100%'}
                        position={'relative'}
                        width={'100%'}
                        overflow={'hidden'}
                      >
                        {/* {isLoading && (
                          <>
                            <Backdrop sx={{ position: 'absolute' }} open />
                            <Box
                              display={'flex'}
                              mb={2}
                              alignItems={'center'}
                              sx={{ inset: 0 }}
                              position={'absolute'}
                              justifyContent={'center'}
                              flexDirection={'column'}
                            >
                              <LinearProgress
                                sx={{
                                  width: '90%',
                                  borderRadius: '10px',
                                }}
                                variant='determinate'
                                value={uploadState[i]?.current}
                              />
                              <Box minWidth={'37px'}>
                                <Typography component={'span'} fontSize={12}>
                                  {uploadState[i]?.current}%
                                </Typography>
                              </Box>
                            </Box>
                          </>
                        )} */}
                        <Box
                          component={'img'}
                          src={url}
                          width={'100%'}
                          height={'100%'}
                          maxHeight={'80px'}
                          sx={{ objectFit: 'cover' }}
                        />
                      </Box>
                    </PhotoView>
                  ))}
                </Box>
              </PhotoProvider>
            )}
          </Box>
        </Box>
      </Slide>
    </Modal>
  )
}

UploadPopup.propTypes = {
  isPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  children: PropTypes.any,
  direction: PropTypes.string,
  updateFiles: PropTypes.func,
}

export default UploadPopup
