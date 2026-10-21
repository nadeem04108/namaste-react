// import User from "./User";
import React from "react";

class UserClass extends React.Component {
   constructor(props) {
        super(props);                       
        console.log(props);
        
    }
    render() {
        const { name, email, address } = this.props;
        return (
            <div className="user-card">
                <h2>Name : {name}</h2>
                <h2>Email: {email}</h2>
                <h2>Address: {address}</h2>
            </div>
        )
    }
}
export default UserClass;
