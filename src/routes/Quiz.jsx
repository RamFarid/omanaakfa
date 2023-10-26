import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MultiTask from '../components/Quiz/MultiTask'
import SingleTask from '../components/Quiz/SingleTask'
import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import Examiner from '../components/Quiz/Examiner'
import { toast } from 'react-toastify'
import PageLoader from '../components/PageLoader'
import NoActiveQuiz from '../components/Quiz/NoActiveQuiz'
import EnsureSubmit from '../components/Quiz/EnsureSubmit'

function Quiz() {
  const [questionShown, setQuestionShown] = useState(1)
  const [activeQuiz, setActiveQuiz] = useState({})
  const [showAnswers, setShowAnswers] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [degree, setDegree] = useState(0)
  const [isEnsure, setIsEnsure] = useState(false)
  const [pageState, setPageState] = useState({
    message: '',
    isLoading: true,
    code: '',
  })
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (showAnswers) return
      try {
        setPageState({
          code: '',
          message: '',
          isLoading: true,
        })
        const { data } = await axios.get('/quizzes/active')
        if (data?.success) setActiveQuiz(data?.data)
        if (data?.code === 'NO_ACTIVE_QUIZ') {
          setPageState({
            code: 'NO_ACTIVE_QUIZ',
            message: 'مفيش كويزات في الوقت الحالي',
            isLoading: false,
          })
        } else {
          setPageState((p) => ({
            ...p,
            message: !data.success ? data.message : '',
            isLoading: false,
          }))
        }
      } catch (error) {
        toast.error(error.message)
        setPageState({
          message: error.message,
          isLoading: false,
        })
        console.log(error)
      } finally {
        setPageState((c) => ({
          ...c,
          isLoading: false,
        }))
      }
    })()
  }, [showAnswers])

  const solveQuestion = (targetID, answer) => {
    if (!targetID) return

    const targetQuestion = activeQuiz?.questions?.find(
      ({ _id }) => _id === targetID
    )
    targetQuestion.answer = answer
    setActiveQuiz((p) => {
      return {
        ...p,
        questions: p.questions.map((q) => {
          if (q._id === targetQuestion._id) return targetQuestion
          return q
        }),
      }
    })
  }

  const displayQuestion = () => {
    if (!activeQuiz) return
    const reqQ = activeQuiz?.questions[questionShown - 1]
    console.log(reqQ)
    if (reqQ.type === 'multi') {
      return (
        <MultiTask
          key={reqQ.question}
          qusetion={reqQ.question}
          choices={reqQ.choices}
          answer={reqQ.answer}
          i={questionShown - 1}
          onSolve={solveQuestion}
          _id={reqQ._id}
          showAnswers={showAnswers}
        />
      )
    }
    return (
      <SingleTask
        _id={reqQ._id}
        onSolve={solveQuestion}
        key={reqQ.question}
        qusetion={reqQ.question}
        choices={reqQ.choices}
        i={questionShown - 1}
        answer={reqQ.answer}
        showAnswers={showAnswers}
      />
    )
  }

  const calculateDegrees = () => {
    let userDegree = 0
    for (let index = 0; index < activeQuiz?.questions?.length; index++) {
      const question = activeQuiz?.questions[index]
      if (question?.type === 'multi') {
        const possibleCorrect = question?.choices.filter((q) => q.correct)
        const answersNo = question?.answer?.length || 0
        let allCorrect = false
        if (
          possibleCorrect?.length === answersNo &&
          possibleCorrect?.length !== 0
        ) {
          for (let i = 0; i < possibleCorrect?.length; i++) {
            const choice = possibleCorrect[i]
            if (question.answer.includes(choice._id)) {
              allCorrect = true
            } else {
              allCorrect = false
              break
            }
          }
        }
        if (allCorrect) userDegree += 1
      } else {
        const choosenChoice = question?.choices.find(
          (q) => q._id === question?.answer
        )
        if (choosenChoice && choosenChoice?.correct) {
          userDegree += 1
        }
      }
    }
    return userDegree
  }

  const submitQuiz = async () => {
    if (showAnswers) return
    if (!currentUser?._id) return toast.error('اختار اسمك عشان تعرف تحل')
    try {
      const degree = calculateDegrees()
      setPageState({ isLoading: true, message: '' })
      const { data } = await axios.post(`/quizzes/${activeQuiz?._id}/answer`, {
        degree,
        fromUserID: currentUser._id,
      })
      if (data.success) {
        setShowAnswers(true)
        setDegree(degree)
        setShowAnswers(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPageState({ isLoading: false, message: '' })
      setIsEnsure(false)
    }
  }

  const solvedNoShown = () => {
    const answeredQuestions = activeQuiz?.questions?.filter((q) => {
      if (Array.isArray(q?.answer)) {
        if (q?.answer?.length) return true
      } else if (q?.answer) {
        return true
      } else {
        return false
      }
    })
    return answeredQuestions?.length
  }

  return pageState.isLoading ? (
    <PageLoader />
  ) : pageState.code === 'NO_ACTIVE_QUIZ' ? (
    <NoActiveQuiz />
  ) : pageState.message ? (
    <Typography align='center' variant='h4' component={'h2'} color={'error'}>
      {pageState.message}
    </Typography>
  ) : (
    <>
      <Stack
        sx={(t) => ({
          width: '100%',
          zIndex: 3,
          bgcolor: t.palette.background.default,
          flexDirection: 'row',
          py: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        })}
      >
        {currentUser || Object.keys(currentUser || {}).length > 0 ? (
          <Button
            variant='contained'
            disableElevation
            onClick={() => {
              if (activeQuiz?.questions?.length - +solvedNoShown()) {
                setIsEnsure(true)
              } else {
                submitQuiz()
              }
            }}
          >
            انهاء
          </Button>
        ) : null}
        <Typography variant='h5' align='center'>
          {activeQuiz.title}
        </Typography>
        <Typography
          component={'time'}
          variant={showAnswers ? 'h5' : 'caption'}
          fontWeight={showAnswers ? 900 : 500}
          maxWidth={'25%'}
          align='center'
          color={(t) => (showAnswers ? t.palette.success.main : 'inherit')}
        >
          {showAnswers
            ? `النتيجه: ${degree}/${activeQuiz?.questions?.length}`
            : `${solvedNoShown()}/${activeQuiz?.questions?.length}`}
        </Typography>
      </Stack>
      <Examiner
        quizID={activeQuiz?._id}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      {currentUser || Object.keys(currentUser || {}).length > 0 ? (
        <ListItem
          sx={{ direction: 'ltr', listStyle: 'none' }}
          ContainerProps={{ style: { listStyle: 'none' } }}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={currentUser?.name}
            secondary={currentUser?.church}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                setCurrentUser(null)
                setShowAnswers(false)
                setDegree(0)
                console.log('asasd')
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) : null}
      {currentUser || Object.keys(currentUser || {}).length > 0 ? (
        <>
          <Box mt={1} mb={9}>
            {displayQuestion()}
            <Stack spacing={1} mt={3}>
              <Pagination
                page={questionShown}
                color='primary'
                count={activeQuiz?.questions.length}
                sx={{ direction: 'ltr' }}
                onChange={(_e, page) => setQuestionShown(page)}
              />
            </Stack>
          </Box>
        </>
      ) : null}
      <EnsureSubmit
        open={
          isEnsure && Boolean(activeQuiz?.questions?.length - +solvedNoShown())
        }
        remainsQuestions={activeQuiz?.questions?.length - +solvedNoShown()}
        onSubmit={submitQuiz}
        onClose={() => setIsEnsure(false)}
      />
    </>
  )
}

export default Quiz
