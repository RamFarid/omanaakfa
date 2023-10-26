import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import UploadPopup from '../components/Gallery/UploadPopup'
import { deleteObject, listAll, ref } from 'firebase/storage'
import { storage } from '../lib/firebase'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import getImageName from '../utils/getImageName'
import { Zoom, toast } from 'react-toastify'
import { useUser } from '../contexts/UserContext'

function Gallery() {
  const [imgs, setImgs] = useState([])
  const [isPopup, setIsPopup] = useState(false)
  const { creds } = useUser()

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const wholeImgs = await listAll(ref(storage, ''))
      wholeImgs.items.forEach((img) => {
        setImgs((pre) => [
          ...pre,
          `https://firebasestorage.googleapis.com/v0/b/omanaakfa2024.appspot.com/o/${img.fullPath}?alt=media`,
        ])
      })
    })()
  }, [])

  const closePopup = () => {
    setIsPopup(false)
  }

  const deleteImg = async (imgIndex) => {
    try {
      const filePath = getImageName(imgs[imgIndex])
      if (filePath) {
        await deleteObject(ref(storage, filePath))
        toast.success('تم مسح الصورة', { transition: Zoom })
        setImgs(imgs.filter((f) => !f.includes(filePath)))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={6}
        borderBottom={(t) => `1px solid ${t.palette.divider}`}
        pb={2}
      >
        <Typography
          variant='h4'
          align='center'
          component={'h1'}
          color={'primary'}
        >
          معرض الصور
        </Typography>
        <Button
          variant='contained'
          onClick={() => setIsPopup(true)}
          disableElevation
        >
          ارفع صور
        </Button>
      </Stack>
      <Box
        sx={{
          direction: 'ltr',
          '& *': {
            direction: 'ltr',
          },
        }}
      >
        <PhotoProvider
          loop={false}
          toolbarRender={(component) => {
            return (
              <>
                <Button
                  component='a'
                  download='url'
                  href={imgs[component.index]}
                  target='_blank'
                  size='small'
                >
                  تنزيل
                </Button>
                {creds && (
                  <Button
                    color='error'
                    size='small'
                    onClick={() => deleteImg(component.index)}
                  >
                    مسح
                  </Button>
                )}
              </>
            )
          }}
        >
          <Box
            display={'grid'}
            gridTemplateColumns={'repeat(5, 1fr)'}
            gridAutoRows={'1fr'}
            gap={1}
          >
            {imgs.map((url) => (
              <PhotoView key={url} src={url}>
                <Box width={'100%'} overflow={'hidden'} borderRadius={'6px'}>
                  <LazyLoadImage
                    component={'img'}
                    src={url}
                    width={'100%'}
                    height={'80px'}
                    placeholderSrc='/Placeholder_view.svg.webp'
                    effect='blur'
                    style={{
                      borderRadius: '6px',
                      objectPosition: 'center center',
                      objectFit: 'cover',
                      minWidth: '80px',
                    }}
                  />
                </Box>
              </PhotoView>
            ))}
          </Box>
        </PhotoProvider>
      </Box>
      <UploadPopup isPopup={isPopup} closePopup={closePopup} />
    </>
  )
}

export default Gallery
