import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../message/Message';
import './messages.css';


const Messages = ({ messages, name }) => (

    < ScrollToBottom className="messages">
        {messages.map((message, i) => <div className="py-1" key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom >
)

export default Messages;