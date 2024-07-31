import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Main from './Components/Main/Main'
import ContextProvider from './context/Context'
import './AiChatComp.css'
import MyNavbar from './Components/MyNavbar/MyNavbar'

const AiChatComp = () => {
  return (
    <>
   

<MyNavbar />
      <ContextProvider>
        <div className="ai-chat-comp">
          <Sidebar />
          <Main />
        </div>
      </ContextProvider>
    </>
  )
}

export default AiChatComp