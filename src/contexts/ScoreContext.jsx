import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import sortDesc from '../utils/sortDesc'
import { useUser } from './UserContext'
import PropTypes from 'prop-types'
import axios from '../lib/axios'
const ScoreContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useScore() {
  return useContext(ScoreContext)
}

function ScoreContextProvider({ children }) {
  const { online } = useUser()
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem('groups')) || []
  )
  const [persons, setPersons] = useState(
    JSON.parse(localStorage.getItem('persons')) || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [personError, setPersonError] = useState('')
  const [groupError, setGroupError] = useState('')

  const addNewPerson = (person) => {
    const updatedPersons = [...persons, person]
    const sortedUpdatedPersons = sortDesc(updatedPersons)
    setPersons(sortedUpdatedPersons)
  }

  const addNewGroup = (group) => {
    const updatedGroup = [...groups, group]
    const sortedUpdatedGroup = sortDesc(updatedGroup)
    setGroups(sortedUpdatedGroup)
  }

  const removeGroup = (group) => {
    const updatedGroup = groups.filter((g) => g._id !== group._id)
    const sortedUpdatedGroup = sortDesc(updatedGroup)
    setGroups(sortedUpdatedGroup)
  }

  const removePerson = (person) => {
    const updatedPerson = persons.filter((p) => p._id !== person._id)
    const sortedUpdatedPerson = sortDesc(updatedPerson)
    setPersons(sortedUpdatedPerson)
  }

  const updateGroup = (group) => {
    const removeGroup = groups.filter((g) => g._id !== group._id)
    const updatedGroup = sortDesc([...removeGroup, group])
    setGroups(updatedGroup)
  }

  const updatePerson = (person) => {
    const removePerson = persons.filter((p) => p._id !== person._id)
    const updatedPerson = sortDesc([...removePerson, person])
    setPersons(updatedPerson)
  }

  useEffect(() => {
    const groupErrorMessage = 'في حاجه غلط حصلت و انا بجيب نقط المجاميع '
    const personErrorMessgae = 'في حاجه غلط حصلت و انا بجيب نقط المخدومين '
    ;(async () => {
      if (!online) return
      try {
        setGroupError('')
        setPersonError('')
        setIsLoading(true)
        const { data: groupsResponse } = await axios.get(`/groups`)
        console.log(groupsResponse)
        if (groupsResponse.success) {
          setGroups(groupsResponse.data)
          localStorage.setItem('groups', JSON.stringify(groupsResponse.data))
        } else {
          setGroupError(`${groupErrorMessage}${groupsResponse.message}`)
        }
        const { data: personsResponse } = await axios.get(`/members`)
        console.log(personsResponse)
        if (personsResponse.success) {
          setPersons(personsResponse.data)
          localStorage.setItem('persons', JSON.stringify(personsResponse.data))
        } else {
          setPersonError(`${personErrorMessgae}${personsResponse.message}`)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [online])
  return (
    <ScoreContext.Provider
      value={{
        groups,
        persons,
        isLoading,
        personError,
        groupError,
        addNewGroup,
        addNewPerson,
        removeGroup,
        removePerson,
        updateGroup,
        updatePerson,
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}

ScoreContextProvider.propTypes = {
  children: PropTypes.any,
}

export default ScoreContextProvider
