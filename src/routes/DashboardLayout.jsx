import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function DashboardLayout() {
  const { creds } = useUser()

  return creds ? <Outlet /> : <Navigate to='/login' replace />
}

export default DashboardLayout
