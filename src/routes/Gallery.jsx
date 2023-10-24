import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import UploadPopup from '../components/Gallery/UploadPopup'
import { listAll, ref } from 'firebase/storage'
import { storage } from '../lib/firebase'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Gallery() {
  const [imgs, setImgs] = useState([])
  const [isPopup, setIsPopup] = useState(false)
  useEffect(() => {
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

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={6}
      >
        <Typography variant='h4' align='center' component={'h1'}>
          معرض الصور
        </Typography>
        <Button variant='contained' onClick={() => setIsPopup(true)}>
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
              <Button
                component='a'
                download='url'
                href={imgs[component.index]}
                target='_blank'
              >
                تنزيل
              </Button>
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
                <Box height={'100%'} width={'100%'} overflow={'hidden'}>
                  <LazyLoadImage
                    component={'img'}
                    src={url}
                    width={'100%'}
                    height={'80px'}
                    effect='blur'
                    style={{
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
