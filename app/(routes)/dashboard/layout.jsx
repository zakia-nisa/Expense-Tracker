import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
function DashboardLayout({children}) {
  return (
    <div>
      <div className='fixed md:wd-64 hidden md:block'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        Dashboard Header
        <DashboardHeader/>
      {children}
      </div>
    </div>
  )
}

export default DashboardLayout
