import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccountConsumer, AccountContext } from '../../account-context/AccountProvider';
import Storage from '../../service/Storage.js';
import './join.css'

const storage = new Storage();
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.storage = new Storage();
    }

    handleCheckerGuest = (event) => {
        const { updateName, updateRoom, name, room } = this.context;
        event.preventDefault();
        updateName('Guest');
        updateRoom('Trial');
        storage.storeItemObject({ "name": 'guest', "room": 'trial' }, 'userDetail')
        this.props.history.push(`/chat`)
        // this.props.history.push(`/chat?name=${this.context.name}&room=${this.context.room}`);
    }
    // handleInput = ({ currentTarget }) => {
    //     console.log(currentTarget.valiue);
    // }
    handleSignIn = (event) => {
        const { name, room } = this.context;
        if (!name || !room) {
            return event.preventDefault();
        }
        storage.storeItemObject({ "name": name.toLowerCase(), "room": room.toLowerCase() }, 'userDetail')
        return null;
    }
    render() {

        return (<React.Fragment>
            <div>Join</div>
            <AccountConsumer>
                {({ updateName, name, updateRoom, room }) =>
                    <React.Fragment><div>{name}</div>
                        <div className="joinOuterContainer">.
                            <div className="joinInnerContainer">
                                <h1 className="heading">Join</h1>
                                <div><input placeholder="Name" className="joinInput" onChange={(event) => updateName(event.target.value)} type="text" /></div>
                                <div><input placeholder="Room" className="joinInput" onChange={(event) => updateRoom(event.target.value)} type="text" /></div>
                                <Link onClick={this.handleSignIn} to={`/chat`}>
                                    <button className="button" type="submit">Sign In</button>
                                </Link>
                            </div>

                            {/* Guest Button */}
                            <div className="mx-4">
                                {/*  Test without signin up*/}
                                <hr className="bg-white " />
                                <button onClick={this.handleCheckerGuest} className="btn btn-success" type="submit">Try it as a Guest</button>

                                {/* <Link onClick={this.handleCheckerGuest} to={`/chat`}>
                                    <button className="button" type="button">Try it as a Guest</button>
                                </Link> */}
                            </div>

                        </div>


                    </React.Fragment>
                }
            </AccountConsumer>
        </React.Fragment>);
    }
}

Join.contextType = AccountContext;
export default Join;