import React from 'react'
import Header from '../../components/Student/header'
import Sidebar from '../../components/Student/sidebar'
import { Outlet } from 'react-router-dom'

const Student = () => {
  return (
    <div className="h-max">
      <Header />
      <div className="flex  flex-row">
        <Sidebar />
        <div className="overflow-hidden h-[87vh] overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Student
