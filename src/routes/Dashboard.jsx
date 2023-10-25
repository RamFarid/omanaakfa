import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ShowQuiz from '../components/Dashboard/ShowQuiz'
import axios from '../lib/axios'
import { toast } from 'react-toastify'
import QuizCards from '../components/Dashboard/QuizCards'
import PageLoader from '../components/PageLoader'

function Dashboard() {
  const [targetQuiz, setTargetQuiz] = useState(null)
  const [quizzes, setQuizzes] = useState([])
  const [pageState, setPageState] = useState({
    isQuizLoading: true,
    isStatisticsLoading: true,
    isSavingLoading: false,
  })

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      setPageState((pre) => ({ ...pre, isQuizLoading: true }))
      const { data } = await axios.get('/members/waiting-members')
      setPageState((pre) => ({ ...pre, isQuizLoading: false }))
      if (!data.success) return toast.error(data.message)
      setQuizzes(data.data)
    })()
  }, [])

  const showQuiz = async (id) => {
    try {
      setPageState((p) => ({ ...p, isQuizLoading: true }))
      const { data } = await axios.get(`/quizzes/${id}/target`)
      setPageState((p) => ({ ...p, isQuizLoading: false }))
      if (!data.success) return toast.error(data.message)
      setTargetQuiz(data.quiz)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateActiveQuiz = async (targetID) => {
    try {
      setPageState((p) => ({ ...p, isSavingLoading: true }))
      const { data } = await axios.put(`/quizzes/${targetID}/active`)
      setPageState((p) => ({ ...p, isSavingLoading: false }))
      if (!data.success) return toast.error(data.message)
      const updatedQuizs = quizzes.reduce((pre, current) => {
        if (current._id === targetID) {
          return [
            ...pre,
            {
              ...current,
              active: !current.active,
            },
          ]
        }
        return [
          ...pre,
          {
            ...current,
            active: false,
          },
        ]
      }, [])
      setQuizzes(updatedQuizs)
    } catch (error) {
      toast.error(error.mesaa)
      console.log(error)
    }
  }

  const returnToCards = () => {
    setTargetQuiz(null)
  }

  return (
    <>
      <Typography variant='h4' align='center' component={'h1'} mb={6}>
        وحدة التحكم و الاحصائيات
      </Typography>
      {pageState.isQuizLoading ? (
        <PageLoader />
      ) : (
        <>
          {targetQuiz ? (
            <ShowQuiz
              quiz={targetQuiz}
              back={returnToCards}
              members={
                quizzes.find((t) => {
                  return targetQuiz._id === t._id
                })?.members || []
              }
            />
          ) : (
            <QuizCards
              showQuiz={showQuiz}
              quizzes={quizzes}
              updateActiveQuiz={updateActiveQuiz}
              isSavingLoading={pageState.isSavingLoading}
            />
          )}
        </>
      )}
    </>
  )
}

export default Dashboard
