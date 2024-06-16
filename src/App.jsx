import { useState, useEffect } from 'react'
import Chat from './Chat'
import './App.css'

function App() {
  // const [config, setconfig] = useState({ "titleClosed": "Click to chat!", "titleOpen": "Let's chat!", "closedStyle": "chat", "closedChatAvatarUrl": "", "cookieExpiration": 1, "introMessage": "Hello! How can we help you?", "autoResponse": "Looking for the first available admin (It might take a minute)", "autoNoResponse": "It seems that no one is available to answer right now. Please tell us how we can contact you, and we will get back to you as soon as we can.", "placeholderText": "Send a message...", "displayMessageTime": true, "mainColor": "#1f8ceb", "alwaysUseFloatingButton": false, "desktopHeight": 450, "desktopWidth": 370 })
  const [config, setconfig] = useState({})
  const [host, sethost] = useState(null)
  const [adminId, setadminId] = useState(null)

  const [visitorId, setvisitorId] = useState(() => {
    if (localStorage.getItem('widgetbot')) {
      return JSON.parse(localStorage.getItem('widgetbot'))
    }
    else {
      let genRandomId = Math.random().toString(16).substring(2, 8);
      localStorage.setItem('widgetbot', JSON.stringify(genRandomId))
      return genRandomId
    }
  })

  useEffect(() => {
    function getUrlParameter() {
      const params = Object.fromEntries(new URLSearchParams(location.search));
      sethost(params?.host)
      setadminId(params?.id)
      setconfig(JSON.parse(params?.config))
    }
    getUrlParameter()
  }, [])

console.log("configure,",config)
  return (
    <>
      {
        host ? <Chat adminId={adminId} visitorId={visitorId} host={host} config={config} /> : ""
      }

    </>
  )
}

export default App
