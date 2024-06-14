import React, { useEffect, useState,useRef } from 'react'
import { io } from 'socket.io-client'
import MessageArea from './MessageArea'

function Chat({ adminId, visitorId, host, config }) {
    const socketRef = useRef(null)
    const [message, setmessage] = useState([])
    const [input, setinput] = useState('')
    console.log("adminID:", adminId, " visitorID:", visitorId, " HOST:", host, " CONFIG: ", config)

    let key = `host_${host}`
    


    const writeMsgInlocal = (e) => {
        e.time = new Date()
        try {
            let a = JSON.parse(localStorage.getItem(key))
            a.push(e)
            setmessage(a)
            localStorage.setItem(key, JSON.stringify(a))
        } catch (error) {
            console.log('faild to add message in localStorage')
        }
    }

    const handlesubmit = (e) => {
        if (e.keyCode === 13 && input != '') {
            socketRef.current.emit('fromvisitor', { adminId, visitorId, msg: input, host })
            setinput('')
            writeMsgInlocal({ text: input, from: 'visitor' })
        }
        else {
            // console.log("please write some thing")
        }
    }

    const IncomingMessage = (msg) => {
        console.log(" INcomming messages MESSAGE", msg)
        writeMsgInlocal(msg)
    }

    useEffect(() => {
        if (localStorage.getItem(key)) {
            setmessage(JSON.parse(localStorage.getItem(key)))
        }
        else {
            localStorage.setItem(key, JSON.stringify([]))
            writeMsgInlocal({ text: config.introMessage, from: 'admin' })
        }
        return () => {
        };
    }, []);



    useEffect(() => {
        if (!socketRef.current) {
          // Initialize the socket connection only if it doesn't already exist

          socketRef.current = io('http://localhost:8000/');

          socketRef.current.on('connect', () => {
              console.log('Connected');
              socketRef.current.emit('register', { adminId, visitorId })
          });
    
          socketRef.current.on('disconnect', () => {
            console.log('Disconnected');
          });

          socketRef.current.on(visitorId,IncomingMessage)
          socketRef.current.on(adminId,IncomingMessage)
        }
    
        // Cleanup function
        return () => {
          if (socketRef.current) {
            socketRef.current.off('connect');
            socketRef.current.off('disconnect');
            socketRef.current.disconnect();
          }
        };
      }, []);




    return (
        <div className=' flex flex-col   shadow-lg'>

            <div className=' h-10 bg-blue-400 font-medium px-4 m-0'>
                <p className=''>
                    Customer Care Support!
                </p>
            </div>

            <MessageArea messages={message} config={config} />

            <div className=''>
                <input className=" outline-none z-50 pl-1 text-black border-t-2 border-gray-200 bg-white h-9 w-full font-medium" type="text" placeholder="Type your message...." value={input} onChange={(e) => setinput(e.target?.value)} onKeyDown={handlesubmit} />
            </div>
        </div>

    )
}

export default Chat