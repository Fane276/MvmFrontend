import React from 'react'
import UsersTable from '../components/Admin/UsersTable'
import Card from '../components/Cards/Card'
import AppLayout from '../components/Layout/AppLayout'

const DashboardAdmin = () => {
  return (
    <AppLayout>
      <Card>
        <UsersTable endpoint='/api/services/app/User/GetAll'/>
      </Card>
    </AppLayout>
  )
}

export default DashboardAdmin