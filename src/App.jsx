import { useState, useEffect } from 'react'
import Chat from './Chat'
import './App.css'

function App() {
  const [config, setconfig] = useState({ "titleClosed": "Click to chat!", "titleOpen": "Let's chat!", "closedStyle": "chat", "closedChatAvatarUrl": "", "cookieExpiration": 1, "introMessage": "Hello! How can we help you?", "autoResponse": "Looking for the first available admin (It might take a minute)", "autoNoResponse": "It seems that no one is available to answer right now. Please tell us how we can contact you, and we will get back to you as soon as we can.", "placeholderText": "Send a message...", "displayMessageTime": true, "mainColor": "#1f8ceb", "alwaysUseFloatingButton": false, "desktopHeight": 450, "desktopWidth": 370 })
  // const [config, setconfig] = useState({})
  // const [host, sethost] = useState("127.0.0.1:5500")
  const [host, sethost] = useState(window.location.host)
  // const [adminId, setadminId] = useState("1379160926")
  const [adminId, setadminId] = useState(window.TelechatbotId)

  const [visitorId, setvisitorId] = useState(()=>{
    if (localStorage.getItem('widgetbot')) {
      return JSON.parse(localStorage.getItem('widgetbot'))
    }
    else {
      let genRandomId = Math.random().toString(16).substring(2, 8);
      localStorage.setItem('widgetbot', JSON.stringify(genRandomId))
      return genRandomId
    }
  })


  
  // const params = Object.fromEntries(new URLSearchParams('https://www.intergram.xyz/chat.html?id=1379160926&host=127.0.0.1:5500&conf=%7B%22titleClosed%22%3A%22Click%20to%20chat!%22%2C%22titleOpen%22%3A%22Let's%20chat!%22%2C%22closedStyle%22%3A%22chat%22%2C%22closedChatAvatarUrl%22%3A%22%22%2C%22cookieExpiration%22%3A1%2C%22introMessage%22%3A%22Hello!%20How%20can%20we%20help%20you%3F%22%2C%22autoResponse%22%3A%22Looking%20for%20the%20first%20available%20admin%20(It%20might%20take%20a%20minute)%22%2C%22autoNoResponse%22%3A%22It%20seems%20that%20no%20one%20is%20available%20to%20answer%20right%20now.%20Please%20tell%20us%20how%20we%20can%20contact%20you%2C%20and%20we%20will%20get%20back%20to%20you%20as%20soon%20as%20we%20can.%22%2C%22placeholderText%22%3A%22Send%20a%20message...%22%2C%22displayMessageTime%22%3Atrue%2C%22mainColor%22%3A%22%231f8ceb%22%2C%22alwaysUseFloatingButton%22%3Afalse%2C%22desktopHeight%22%3A450%2C%22desktopWidth%22%3A370%7D'));

  function getUrlParameter() {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    setconfig(JSON.parse(params?.conf))
    sethost(params?.host)
    setchatId(params?.id)
  }

  return (
    <>
      <Chat adminId={adminId} visitorId={visitorId} host={host} config={config} />
      {/* {document.getElementById('intergramChat')} */}
    </>
  )
}

export default App
