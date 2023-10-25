import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../lib/axios'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
function Examiner({ currentUser, setCurrentUser, quizID }) {
  const [searchName, setSearchName] = useState('')
  const [searchList, setSearchList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let ref
    if (!searchName || currentUser) return
    ;(async () => {
      ref = setTimeout(async () => {
        setIsLoading(true)
        const { data } = await axios.get(`/members/search?q=${searchName}`)
        if (!data.success) return toast.error(data.message)
        setIsLoading(false)
        setSearchList(data.data)
      }, 700)
    })()

    return () => {
      clearTimeout(ref)
    }
  }, [currentUser, searchName])

  return !currentUser ? (
    <Autocomplete
      options={searchList}
      getOptionLabel={(option) => {
        return `${option.name}: ${option.church}`
      }}
      loading={isLoading}
      onInputChange={(_e, newInputValue) => {
        setSearchName(newInputValue)
      }}
      onChange={(_e, v, r) => {
        if (r === 'clear') return
        setCurrentUser(v)
      }}
      getOptionDisabled={(opt) => {
        console.log(opt)
        return opt?.quizzesDone?.includes(quizID)
      }}
      renderInput={(params) => (
        <TextField
          helperText='أتاكد من أسمك و من كنيستك كويس'
          {...params}
          label='أكتب أسمك الأول'
          variant='outlined'
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>{isLoading ? <CircularProgress color='primary' /> : null}</>
            ),
          }}
        />
      )}
    />
  ) : null
}

Examiner.propTypes = {
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  quizID: PropTypes.string,
}

export default Examiner
