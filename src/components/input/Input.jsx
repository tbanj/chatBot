import React from 'react';
import { AccountConsumer, AccountContext } from '../../account-context/AccountProvider';

import './input.css';

const Input = ({ message, sendMessage }) => (
    <React.Fragment>
        <AccountConsumer>
            {({ updateRoom, room, updateMessage }) =>
                <React.Fragment>
                    <form className="form">
                        <input className="input" value={message}
                            onChange={(event) => updateMessage(event.target.value)}
                            placeholder="Type a message..." type="text"
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />

                        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
                    </form>
                </React.Fragment>}
        </AccountConsumer>

    </React.Fragment>
)

// Input.contextType = AccountContext;
export default Input;