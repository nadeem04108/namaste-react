const User  = (props)=>{
return (
    <div className="user-card">
        <h2>Name : {props.name}</h2>
        <h2>Email: {props.email}</h2>
        <h2>Address: {props.address}</h2>
    </div>
)
}
export default User;

