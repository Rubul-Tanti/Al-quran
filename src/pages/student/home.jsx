import React from 'react'
import Header from '../../components/Student/header'
import Sidebar from '../../components/Student/sidebar'
import { Outlet } from 'react-router-dom'
import Mobilenav from '../../components/mobileNavTab';

const Layoutpage = () => {
  return (
    <div className="h-max">
      <Header />
      <div className="flex  flex-row">
        <Sidebar />
        <div className="overflow-hidden sm:h-[89vh] max-h-[90.5vh]  min-h-[80vh]  overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
<Mobilenav/>
    </div>
  );
};


export default Layoutpage
