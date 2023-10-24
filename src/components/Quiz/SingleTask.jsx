import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

function SingleTask({
  qusetion,
  i,
  choices,
  onSolve,
  _id,
  answer,
  showAnswers,
}) {
  return (
    <>
      <FormControl>
        <Typography component={'h4'}>
          {i + 1}- {qusetion}
        </Typography>
        <RadioGroup
          value={showAnswers ? choices?.find((c) => c.correct)?._id : answer}
          onChange={(_, value) => {
            if (showAnswers) return
            onSolve(_id, value)
          }}
        >
          {choices.map(({ choice, _id, correct }) => {
            return (
              <FormControlLabel
                key={_id}
                value={_id}
                label={choice}
                sx={(t) => ({
                  color:
                    (correct && answer === _id && showAnswers) ||
                    (correct && showAnswers)
                      ? t.palette.success.main
                      : !correct && answer === _id && showAnswers
                      ? t.palette.error.main
                      : 'primary',
                })}
                control={
                  <Radio
                    sx={(t) => ({
                      color:
                        (correct && answer === _id && showAnswers) ||
                        (correct && showAnswers)
                          ? t.palette.success.main
                          : !correct && answer === _id && showAnswers
                          ? t.palette.error.main
                          : 'primary',
                    })}
                    color={
                      (correct && answer === _id && showAnswers) ||
                      (correct && showAnswers)
                        ? 'success'
                        : !correct && answer === _id && showAnswers
                        ? 'error'
                        : 'primary'
                    }
                  />
                }
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </>
  )
}

SingleTask.propTypes = {
  qusetion: PropTypes.string,
  choices: PropTypes.array,
  i: PropTypes.number,
  answer: PropTypes.string,
  onSolve: PropTypes.func,
  _id: PropTypes.string,
  showAnswers: PropTypes.bool,
}

export default SingleTask
