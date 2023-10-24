import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function DashboardLayout() {
  const { creds } = useUser()

  return creds ? <Outlet /> : <Navigate to='/' replace />
}

export default DashboardLayout
