import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import TableHeader from '../TableHeader'
import SinglePerson from './SinglePerson'
import { useCallback, useEffect, useState, useTransition } from 'react'
import ControlPersonModal from './ControlPersonModal'
import { useScore } from '../../../contexts/ScoreContext'
import CustomCell from '../../reusable/CustomGroupCell'
import { useUser } from '../../../contexts/UserContext'

function PersonTable() {
  const { persons, isLoading, personError } = useScore()
  const [finalPersons, setfinalPersons] = useState(persons || [])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editContent, setEditContent] = useState({})
  const { creds } = useUser()
  const [searchName, setSearchName] = useState('')
  const [isPending, startTransition] = useTransition()
  const editHandler = useCallback((person) => {
    setShowEditModal(true)
    setEditContent(person)
  }, [])
  const closeModalHandle = useCallback(() => {
    setShowEditModal(false)
    setEditContent({})
  }, [])

  useEffect(() => {
    setfinalPersons(persons)
  }, [persons])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {personError?.length > 0 && (
              <TableRow>
                <TableCell align='center' sx={{ p: 2 }} colSpan={5}>
                  <Typography
                    component={'div'}
                    variant='caption'
                    color={'error'}
                  >
                    {personError}
                    <br />
                    لو المشكله فضلت معاك كلم المشرف
                    <br />
                    {`${
                      finalPersons.length > 0
                        ? 'المجاميع اللي قدامك دي قديمه لحد ما المجامبع الحديثه اوصلها'
                        : ''
                    }`}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableHeader
              actionHandler={() => {
                setEditContent({})
                setShowEditModal(true)
              }}
              columns={5}
              actoionText={'ضيف عضو'}
              txt='اعـــــــرف تــرتـــيـــبـــك'
            />
            <TableRow>
              <TableCell colSpan={creds ? 5 : 4} align='right' sx={{ py: 1 }}>
                <TextField
                  size='small'
                  disabled={isLoading}
                  placeholder='ابحث عن عضو'
                  fullWidth
                  value={searchName}
                  sx={{
                    '& svg': {
                      width: '100%',
                      height: '100%',
                    },
                  }}
                  InputProps={{
                    sx: {
                      pl: 1.4,
                    },
                    endAdornment: isPending ? (
                      <CircularProgress size={26} />
                    ) : null,
                  }}
                  onChange={(e) => {
                    setSearchName(e.target.value)
                    if (e.target.value) {
                      startTransition(() => {
                        const newOne = persons.filter((person) =>
                          person.name.includes(e.target.value)
                        )
                        setfinalPersons(newOne)
                      })
                    } else {
                      startTransition(() => {
                        setfinalPersons(persons)
                      })
                    }
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right' sx={{ py: 1 }}>
                ت
              </TableCell>
              <TableCell align='right' sx={{ py: 1 }}>
                الأسم
              </TableCell>
              <TableCell align='right' sx={{ py: 1 }}>
                الكنيسه
              </TableCell>
              <TableCell align='right' sx={{ py: 1, bgcolor: 'action.hover' }}>
                النقط
              </TableCell>
              {Boolean(creds) && <TableCell align='right' sx={{ py: 1 }} />}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={5}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    <CircularProgress />
                  </Typography>
                </CustomCell>
              </TableRow>
            ) : persons.length ? (
              finalPersons.map((person, i) => (
                <SinglePerson
                  person={person}
                  key={person._id}
                  i={i + 1}
                  onEdit={editHandler}
                />
              ))
            ) : (
              <TableRow>
                <TableCell align='center' sx={{ p: 2 }} colSpan={5}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    مفيش أعضاء
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ControlPersonModal
        open={showEditModal}
        onClose={closeModalHandle}
        person={editContent}
      />
    </>
  )
}

export default PersonTable
