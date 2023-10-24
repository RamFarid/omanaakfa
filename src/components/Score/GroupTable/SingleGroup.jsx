import { TableRow } from '@mui/material'
import ActionsCell from '../ActionsCell'
import CustomCell from '../../reusable/CustomGroupCell'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useScore } from '../../../contexts/ScoreContext'
import { useUser } from '../../../contexts/UserContext'
import PropTypes from 'prop-types'
import axios from '../../../lib/axios'

function SingleGroup({ group, i, onEdit }) {
  const [isLoading, setIsLoading] = useState(false)
  const { online, creds } = useUser()
  const { removeGroup } = useScore()
  const deleteHandler = useCallback(async () => {
    if (!online) return toast('طب ما انت معكش نت')
    try {
      setIsLoading(true)
      const { data } = await axios.delete(`/groups/${group._id}`)
      if (data.message) {
        toast.success(data.message)
        removeGroup(group)
        return
      }
      toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [group, online, removeGroup])
  return (
    <TableRow
      sx={{
        bgcolor: i % 2 ? 'action.hover' : 'background.default',
      }}
    >
      <CustomCell>{i}</CustomCell>
      <CustomCell align='right'>{group.name}</CustomCell>
      <CustomCell align='right'>{group.points}</CustomCell>
      {Boolean(creds) && (
        <ActionsCell
          onEdit={() => onEdit(group)}
          onDelete={deleteHandler}
          isLoading={isLoading}
        />
      )}
    </TableRow>
  )
}

SingleGroup.propTypes = {
  group: PropTypes.object,
  onEdit: PropTypes.func,
  i: PropTypes.number,
}

export default SingleGroup
