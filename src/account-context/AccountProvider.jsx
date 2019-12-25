import React, { Component } from "react";
// import { requiredDate } from '../data/helper';

// Set Up The Initial Context
export const AccountContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AccountConsumer = AccountContext.Consumer;
export class AccountProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: [], name: "", room: '', users: [], userCount: 0, marginMobileShop: '', addClass: "fixed-top px-4",
      customerDetail: { name: '', email: '', phone: '', streetName: '', city: '', state: '' },
      messages: [], message: '',
      updateCustomerDetail: updateCustomer => this.updateCustomerDetail(updateCustomer),
      updateName: newName => this.updateName(newName),
      updateRoom: newRoom => this.updateRoom(newRoom),
      updateMessages: newMessages => this.updateMessages(newMessages),
      updateMessage: newMessage => this.updateMessage(newMessage),
      updateUsers: newUser => this.updateUsers(newUser),
    };


  }




  updateItemsQuntityInCart = updateCartQuantity => {
    const newData = Object.assign({}, this.state);
    let cartInList = newData.itemsInCart.find(x => x.title === updateCartQuantity.title);
    const index = newData.itemsInCart.indexOf(cartInList);
    newData.itemsInCart[index] = { ...newData.itemsInCart[index] };
    newData.itemsInCart[index].quantity += 1;
    this.setState({ itemsInCart: newData.itemsInCart });
    this.totalItems();


  }


  totalItems() {
    let newData = Object.assign({}, this.state);
    let totalUnits = newData.itemsInCart.reduce((prev, curr) => prev = curr.quantity + prev, 0);
    let totalProductsAmount = newData.itemsInCart.reduce((acc, val) => {
      return acc + (val.price * val.quantity);
    }, 0);
    this.setState({ totalItems: { totalUnits, totalProductsAmount } });
  }





  // to update customer information
  updateCustomerDetail = (updateCustomer) => {
    const newData = Object.assign({}, this.state);
    newData.customerDetail = updateCustomer;
    this.setState({ customerDetail: newData.customerDetail });
    console.log(this.state.customerDetail);
  }

  updateRoom = data => {
    const newData = Object.assign({}, this.state);
    newData.room = data;
    this.setState({ room: newData.room });
    console.log(this.state.room);
  }

  updateName = name => {
    const newData = Object.assign({}, this.state);
    newData.name = name;
    this.setState({ name: newData.name });
    console.log(this.state.name);
  }

  updateMessages = messages => {
    let newData = Object.assign({}, this.state);
    let appendNew = [...newData.messages, messages];

    this.setState({ messages: appendNew });
    console.log('aa: ', this.state.messages);
  }

  updateMessage = message => {
    let newData = Object.assign({}, this.state);
    newData.message = message;
    this.setState({ message: newData.message });
    console.log(this.state.message);
  }

  updateUsers = newUser => {
    let newData = Object.assign({}, this.state);
    newData.users = newUser;
    this.setState({ users: newData.users });
    console.log(this.state.users);
  }


  componentDidMount() {
    // this.getTestApi();
  }

  // setData(data) {
  //   this.setState({
  //     username: data.username,
  //     dateJoined: data.dateJoined,
  //     membershipLevel: data.membershipLevel
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        {/* value prop is where we define what values 
             that are accessible to consumer components */}
        <AccountContext.Provider
          value={{
            name: this.state.name,
            room: this.state.room,
            products: this.state.products,
            messages: this.state.messages,
            message: this.state.message,
            users: this.state.users,
            addClass: this.state.addClass,
            itemsInCart: this.state.itemsInCart,
            totalItems: this.state.totalItems,
            customerDetail: this.state.customerDetail,
            userCount: this.state.userCount,
            updateItemsQuntityInCart: this.updateItemsQuntityInCart,
            updateCustomerDetail: this.updateCustomerDetail,
            updateName: this.updateName,
            updateRoom: this.updateRoom,
            updateMessages: this.updateMessages,
            updateMessage: this.updateMessage,
            updateUsers: this.updateUsers,
          }}
        >
          {this.props.children}
        </AccountContext.Provider>
      </React.Fragment>
    );
  }
}

export default AccountProvider;
