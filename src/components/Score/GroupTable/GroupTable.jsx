import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TableHeader from '../TableHeader'
import SingleGroup from './SingleGroup'
import CustomCell from '../../reusable/CustomGroupCell'
import { useCallback, useState } from 'react'
import ControlGroupModal from './ControlGroupModal'
import { useScore } from '../../../contexts/ScoreContext'
import { useUser } from '../../../contexts/UserContext'

function GroupTable() {
  const { groups, isLoading, groupError } = useScore()
  const [showEdit, setShowEdit] = useState(false)
  const [contentEdit, setContentEdit] = useState({})
  const { creds } = useUser()
  const editHandler = useCallback((group) => {
    setShowEdit(true)
    setContentEdit(group)
  }, [])
  const closeModalHandler = useCallback(() => {
    setShowEdit(false)
    setContentEdit({})
  }, [])
  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 7 }}>
        <Table>
          <TableHead
            sx={{
              color: '#fff',
            }}
          >
            {groupError?.length > 0 ? (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography
                    component={'div'}
                    variant='caption'
                    color={'error'}
                  >
                    {groupError}
                    <br />
                    لو المشكله فضلت معاك كلم المشرف
                    <br />
                    {`${
                      groups.length > 0
                        ? 'المجاميع اللي قدامك دي قديمه لحد ما المجامبع الحديثه اوصلها'
                        : ''
                    }`}
                  </Typography>
                </CustomCell>
              </TableRow>
            ) : null}
            <TableHeader
              actionHandler={() => {
                setContentEdit({})
                setShowEdit(true)
              }}
              columns={4}
              actoionText={'ضيف مجموعه'}
              txt='المجموعــات'
            />
            <TableRow>
              <CustomCell>ت</CustomCell>
              <CustomCell align='right'>المجموعه</CustomCell>
              <CustomCell align='right'>النقاط</CustomCell>
              {Boolean(creds) && <CustomCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    <CircularProgress />
                  </Typography>
                </CustomCell>
              </TableRow>
            ) : groups.length ? (
              groups.map((group, i) => (
                <SingleGroup
                  onEdit={editHandler}
                  group={group}
                  i={i + 1}
                  key={group._id}
                />
              ))
            ) : (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    مفيش مجموعات لسه
                  </Typography>
                </CustomCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ControlGroupModal
        open={showEdit}
        onClose={closeModalHandler}
        group={contentEdit}
      />
    </>
  )
}

export default GroupTable
