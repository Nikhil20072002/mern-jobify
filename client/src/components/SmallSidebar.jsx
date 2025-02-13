import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
const SmallSidebar = () => {

  const {showSidebar,toggleSidebar} = useDashboardContext();

  const handleToggleSidebar=()=>{
    toggleSidebar(!showSidebar)
  }

  return (
   <Wrapper>
    <div className={showSidebar?"sidebar-container show-sidebar":'sidebar-container'}>
        <div className="content">
            <button type="button" className="close-btn" onClick={handleToggleSidebar}>
                <FaTimes/>
            </button>
            <header>
                <Logo/>
            </header>
            <NavLinks/>
        </div>
    </div>
   </Wrapper>
  )
}

export default SmallSidebar