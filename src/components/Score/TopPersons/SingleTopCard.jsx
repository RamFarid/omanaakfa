import { Avatar, Box, Stack, Typography } from '@mui/material'
import minimalString from '../../../utils/minimalString'
import goldMedal from '../../../assets/gold-medal.svg'
import silverMedal from '../../../assets/medal-silver.svg'
import bronzeMedal from '../../../assets/medal-bronze.svg'
import PropTypes from 'prop-types'
// theme.palette.firstSecondary
// theme.palette.secondSecondary
// theme.palette.thirdSecondary

function SingleTopCard({ person: { name, points, church }, i }) {
  return (
    <Stack
      mt={i === 1 ? 0 : 3.6}
      px={1}
      zIndex={i === 1 ? 2 : 'unset'}
      flex={1}
      bgcolor={'#BEBAA7'}
      borderRadius={'100px 100px 0 0'}
      maxWidth={'121px'}
      alignItems={'center'}
      justifyContent={'center'}
      position={'relative'}
      height={'250px'}
      pt={'70px'}
      sx={{
        scale: i === 1 ? '1' : '0.9',
        '& > *': {
          color: '#fff',
        },
        clipPath:
          'polygon(0% -50%, 220% 0%, 100% 100%, 18% 56%, 58% 70%, 0% 100%, -110% 0%)',
      }}
    >
      <Stack position={'absolute'} bottom={'50%'}>
        <Typography
          component={'div'}
          color={'text.secondary'}
          textAlign={'center'}
        >
          {name}
        </Typography>

        <Box
          bgcolor={'#BEBAA7'}
          borderRadius={'50%'}
          p={1}
          boxShadow={4}
          position={'relative'}
        >
          <Box
            position={'absolute'}
            height={'32px'}
            width={'32px'}
            zIndex={1}
            top={'10px'}
            right={'10px'}
          >
            <Box
              width={'100%'}
              height={'100%'}
              component={'img'}
              src={i === 1 ? goldMedal : i === 2 ? silverMedal : bronzeMedal}
            />
          </Box>
          <Avatar
            sx={{
              width: '120px',
              height: '120px',
              fontSize: '40px',
              // position: 'absolute',
            }}
          >
            {minimalString(name)}
          </Avatar>
        </Box>
      </Stack>
      <Typography component={'div'} variant='h5'>
        {points}
      </Typography>
      <Typography
        component={'div'}
        variant='caption'
        textAlign={'center'}
        mb={3}
        noWrap
        maxWidth={'100%'}
      >
        {church.replace('كنيسة', '')}
      </Typography>
    </Stack>
  )
}

SingleTopCard.propTypes = {
  person: PropTypes.object,
  i: PropTypes.number,
}

export default SingleTopCard
