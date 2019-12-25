import React from 'react';
import { Link } from 'react-router-dom';
import Storage from '../../service/Storage';
// import style from './infobar.module.css';
import './infobar.css';

const storage = new Storage()

const InfoBar = ({ room }) => {
    return (<React.Fragment>
        <div className="infoBar">
            <div className="leftInnerContainer">
                <span><i className="fa fa-window-maximize"></i></span>
                <h3 className="mx-1">{room}</h3>
            </div>
            <div className="RightInnerContainer mx-1">
                {/* <Link to="/"><i className="fa fa-window-close " style={{
                    color: 'white'
                }}></i></Link> */}
                <a onClick={() => storage.removeItemFromStorage('userDetail')} href="/"><i className="fa fa-window-close " style={{
                    color: 'white'
                }}></i></a>
            </div>
        </div>
    </React.Fragment>);


}

export default InfoBar;