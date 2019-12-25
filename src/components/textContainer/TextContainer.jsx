import React from 'react';
import { Link } from 'react-router-dom';
import './textContainer.css';
const TextContainer = ({ users }) => (
    <div className="textContainer">
        <div>
            <h1>Realtime Chat Application by Alabi Temitope Wahab <span role="img" aria-label="emoji">💬</span></h1>
            <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>People currently chatting:</h1>
                        <div className="activeContainer">
                            <h2>
                                {users.map(({ name, room }) => (
                                    <div key={name} className="activeItem">
                                        <Link className="text-white" to={`/chat?name=${name}&room=${room}`}>
                                            {name}
                                        </Link>
                                        <span className="mx-2"><i className="fa fa-window-maximize"></i></span>
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
)

export default TextContainer;