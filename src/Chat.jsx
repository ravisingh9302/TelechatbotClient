import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import MessageArea from './MessageArea'
import './App.css'
// autoResponse: "Looking for the available customer executive."chatareabgcolor: "#E2E8F0"
// visitorPronoun


function Chat({ adminId, visitorId, host, config }) {
    const socketRef = useRef(null)
    const [message, setmessage] = useState([])
    const [input, setinput] = useState('')

    let key = `host_${host}`





    const writeMsgInlocal = (e) => {
        e.time = new Date()
        try {
            let a = JSON.parse(localStorage.getItem(key))
            a.push(e)
            setmessage(a)
            localStorage.setItem(key, JSON.stringify(a))
        } catch (error) {
            // console.log('faild to add message in localStorage')
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
        // console.log(" INcomming messages MESSAGE", msg)
        writeMsgInlocal(msg)
    }

    useEffect(() => {
        if (localStorage.getItem(key)) {
            setmessage(JSON.parse(localStorage.getItem(key)))
        }
        else {
            localStorage.setItem(key, JSON.stringify([]))
            writeMsgInlocal({ text: config?.introMessage, from: 'admin' })
        }
        return () => {
        };
    }, []);

    
    
    useEffect(() => {
        if (!socketRef.current) {
            // Initialize the socket connection only if it doesn't already exist

            socketRef.current = io('https://telechatbotserver.onrender.com/');

            socketRef.current.on('connect', () => {
                socketRef.current.emit('register', { adminId, visitorId })
            });

            socketRef.current.on('disconnect', () => {
            });

            socketRef.current.on(visitorId, IncomingMessage)
            socketRef.current.on(adminId, IncomingMessage)
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

        <div className=' flex flex-col  max-h-screen h-screen overflow-hidden'>
            <div className='h-10 min-h-10 max-h-10 font-medium px-4 m-0' style={{ backgroundColor: config?.titlebgcolor }}>
                <p className='' style={{ color: config?.titlecolor }}>
                    {config.title ? config.title : 'Customer Care Support!'}
                </p>
            </div>

            <MessageArea messages={message} config={config} />

            <div className='' >
                <input id='inputtg' className={`outline-none z-50 px-1 ${config?.placeholderTxtcolor?config.placeholderTxtcolor:'placeholder:text-gray-500'} mb-2  h-9  min-h-10 max-h-20 w-full font-medium`} style={{ color: config?.inputTxtcolor ? config.inputTxtcolor : "#000000", backgroundColor: config?.inputBgcolor ? config.inputBgcolor : "#ffffff" }} type="text" placeholder={config?.placeholderText ? config.placeholderText : "Type your message..."} value={input} onChange={(e) => setinput(e.target?.value)} onKeyDown={handlesubmit} />
            </div>
        </div>

    )
}

export default Chat