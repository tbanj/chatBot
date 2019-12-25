import React from 'react';
import style from './textContainerMobile.module.css';
const { activeContainer, activeItem, textContainer } = style
const TextContainerMobile = ({ users }) => (
    <div className={`${textContainer} py-2`}>
        <div>
            <h1>Realtime Chat Application by Alabi Temitope Wahab <span role="img" aria-label="emoji">💬</span></h1>
            <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>People currently chatting:</h1>
                        <div className={activeContainer}>
                            <h2>
                                {users.map(({ name }) => (
                                    <div key={name} className={activeItem}>
                                        {name}
                                        <span><i className="fa fa-window-maximize"></i></span>
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

export default TextContainerMobile;