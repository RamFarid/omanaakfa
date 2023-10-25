import { Button, Chip, Pagination, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

function ShowQuiz({ quiz, back, members }) {
  const [questionShown, setQuestionShown] = useState(1)
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={3}
      >
        <Typography
          component={'h2'}
          variant='h6'
          margin={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
        >
          {quiz.title}
        </Typography>
        <Button onClick={back} disableElevation variant='contained'>
          للخلف
        </Button>
      </Stack>

      <Typography component={'h4'} variant='h6'>
        {questionShown}- {quiz?.questions[questionShown - 1].question}
      </Typography>
      {quiz?.questions[questionShown - 1]?.choices?.map((ch) => (
        <Typography
          component={'div'}
          key={ch._id}
          display={'flex'}
          alignItems={'center'}
          color={(t) =>
            ch.correct ? t.palette.success.main : t.palette.text.primary
          }
        >
          - {ch.choice} {ch.correct && <CheckIcon />}
        </Typography>
      ))}
      <Typography
        component={'h5'}
        fontWeight={600}
        fontSize={12}
        mt={3}
        mb={0.7}
      >
        أعضاء لسه مختُبيروش:{' '}
      </Typography>
      <Stack gap={1.1} direction={'row'} flexWrap={'wrap'}>
        {members?.map((member) => (
          <Chip key={member._id} label={<>{member.name}</>} />
        ))}
      </Stack>
      <Stack spacing={1} mt={3}>
        <Pagination
          page={questionShown}
          color='primary'
          count={quiz?.questions?.length}
          sx={{ direction: 'ltr' }}
          onChange={(_e, page) => setQuestionShown(page)}
        />
      </Stack>
    </>
  )
}

ShowQuiz.propTypes = {
  quiz: PropTypes.object,
  back: PropTypes.func,
  members: PropTypes.array,
}

export default ShowQuiz
