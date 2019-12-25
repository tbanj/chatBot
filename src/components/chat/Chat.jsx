import React, { Component } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { AccountConsumer, AccountContext } from '../../account-context/AccountProvider';
import Storage from '../../service/Storage.js';
import InfoBar from '../infobar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../textContainer/TextContainer';
import TextContainerMobile from '../textContainer/textContainerMobile/TextContainerMobile';
import './chat.css';





// initialiaze a value for the socket which we are going to link with our endpoint;
let socket;


class Chat extends Component {
    static contextType = AccountContext;
    constructor(props) {
        super(props);
        this.state = {}

        // const location = this.props;
        // console.log(queryString.parse(location.location.search));

        // initialize local storage
        this.storage = new Storage();
        const ENDPOINT = `https://majachat.herokuapp.com/`;
        socket = io(ENDPOINT);

        this.listToMessage();
        this.getUsers()


    }

    componentDidMount() {
        // const location = this.props;
        const { updateRoom, updateName } = this.context;
        if (this.storage.getItemsFromStorageObject("userDetail") !== null) {
            // const { name, room } = queryString.parse(location.search);
            const data = this.storage.getItemsFromStorageObject("userDetail")
            console.log(data.name, ": nndata.name")
            updateName(data.name);
            updateRoom(data.room);
        }

        // if (location.location.search) {
        //     const { name, room } = queryString.parse(location.location.search)
        //     console.log("ade: ", name);
        //     this.context.updateName(name);
        //     this.context.updateRoom(room);
        // }

        this.sampleEmit();

    }

    listToMessage() {
        // is use to receive data from  backend api which will be render in frontend
        socket.on('message', (message) => {
            this.context.updateMessages(message);
        })
    }

    getUsers() {
        // is use to receive data from  backend api which will be render in frontend
        socket.on('roomData', (roomData) => {
            const { users } = roomData;
            this.context.updateUsers(users);
            // import("../../service/helper").then(helper => {
            //     const memberList = helper.filterData(users, this.context.name);
            // });
        })
    }

    sampleEmit() {
        // const location = this.props;

        if (this.storage.getItemsFromStorageObject("userDetail") !== null) {
            // const { updateRoom, name, room, updateName } = this.context;
            // const { name, room } = queryString.parse(location.location.search)
            const data = this.storage.getItemsFromStorageObject("userDetail")
            const name = data.name;
            const room = data.room;
            this.context.updateName(data.name);
            this.context.updateRoom(data.room);

            // below is socket event use to send data to api and also with a callback of error to display to user
            // socket.emit('join', { name, room }, ({ error }) => {
            //     alert(error);
            // });

            // below is socket event use to send data to api and also with a callback of greetings to display to user
            // socket.emit('join', { name, room }, ({ greetings }) => {
            //     alert(greetings);
            // });


            // below is socket event use to send data to api and also with a callback of function with a key salaryState to display to user
            // socket.emit('join', { name, room }, ({ salaryState }) => {
            //     alert(salaryState.name);
            // });
            // to clear the socket when its is done
            socket.emit('join', { name, room }, () => {

            });

            return () => {
                socket.emit('disconnect');
                socket.off();
            }
        } else {
            this.props.history.push('/')
        }

    }

    handleMessage = (event) => {
        const { updateMessage, message, messages } = this.context;
        updateMessage(event.target.value)
        console.log(message, ":", messages)
    }


    sendMessage = (event) => {
        event.preventDefault();
        console.log("sendMessage event: ", event.target.value);
        const { message, updateMessage } = this.context;
        console.log(message, "newdata");
        if (message) {
            // this is use to send data as a variable name message to the backend api through socket.io
            socket.emit('sendMessage', message, () => {
                updateMessage('')
            })
        }

        console.log(message, this.context.messages)

    }

    render() {
        // this.listToMessage();
        return (
            <React.Fragment>
                {/* <div>Testing Chat</div> */}
                <AccountConsumer>
                    {({ updateName, name, updateRoom, room, updateMessage, updateMessages, message, }) =>
                        <React.Fragment>
                            {/* <div> {name} </div> */}

                            {/* function for sending messages */}
                            <div className="container-fluid py-3" style={{ backgroundColor: '#1A1A1D' }}>
                                <TextContainerMobile />
                                <div className="outerContainer">
                                    {/* <div className="row">
                                    <div className="col-md-8"></div>
                                    <div className="col-md-4"></div>
                                </div> */}
                                    <TextContainer users={this.context.users} />
                                    <div className="container1">
                                        <InfoBar room={this.context.room} />
                                        <Messages messages={this.context.messages} name={this.context.name} />

                                        <Input message={this.context.message} sendMessage={this.sendMessage} />
                                        {/* <input className="text-dark" name={this.context.message} value={message} onChange={this.handleMessage}
                                        onKeyPress={event => event.key === 'Enter' ? this.sendMessage(event) : null} type="text" />
                                 */}
                                    </div>

                                    {/* to display list of people in chats */}

                                </div>
                            </div>
                        </React.Fragment>}
                </AccountConsumer>
            </React.Fragment>);
    }
}


// Chat.contextType = AccountContext;
export default Chat;