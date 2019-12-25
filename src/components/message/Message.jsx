import React from 'react';
import ReactEmoji from 'react-emoji';
import './message.css'
const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ?
            (<div className="messageContainer justifyEnd">
                <p className="removeBottomMargin  sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite removeBottomMargin">{ReactEmoji.emojify(text)} </p>
                </div>
            </div>)
            : (<div className="messageContainer justifyStart">

                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark removeBottomMargin">{ReactEmoji.emojify(text)} </p>
                </div>
                <p className="removeBottomMargin sentText pl-10">{user}</p>
            </div>)
    );
}

export default Message;