import React, { useEffect } from 'react'
import dateFormat from 'dateformat';
import './App.css'


function MessageArea({ messages, config }) {

    const dayInMillis = 60 * 60 * 24 * 1000;
    const currentTime = new Date()

    useEffect(() => {
        var chatDiv = document.getElementById("chatcont");
        chatDiv?.scrollTo({ top: chatDiv.scrollHeight, behavior: "smooth" });
        return () => {};
    }, [messages]);

    return (
        <div id='chatcont' className='chat pt-2 pb-1 px-2 h-[400px] bg-slate-200 flex flex-col gap-1 overflow-y-auto' style={{backgroundColor:config?.chatareabgcolor?config.chatareabgcolor:'#E2E8F0'}}>
            {messages?.map((data, index) => {
                if (data?.from === 'visitor') {
                    data.name = config?.visitorPronoun ? config?.visitorPronoun : 'You';

                }
                return (
                    <div key={index} className={`${data?.from === 'visitor' ? 'justify-end' : 'justify-start'}  flex text-black  `}>
                        <div className={`bg-white shadow-sm rounded-md px-2 max-w-[80%] whitespace-normal`}>
                            <p className=' text-left'>{data?.name ? data?.name + ': ' + data?.text : data?.text}</p>
                            {config.displayMessageTime ? <div className={`flex justify-end text-gray-400 text-xs`}>{currentTime - new Date(data?.time) < dayInMillis ? dateFormat(data?.time, "HH:MM") : dateFormat(data?.time, "m/d/yy HH:MM")} </div> : ''}
                        </div>
                    </div>
                );
            })}

        </div>


    )
}

export default MessageArea
