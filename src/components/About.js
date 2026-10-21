import User from "./User";
import UserClass from "./UserClass";
const About = ()=>{
    return(
        <div>
            <h1>About</h1>
            <h2> this is namaste react web series</h2>
            <h3><a href="/">Home</a></h3>
            <User name={"John Doe(function)"} email={"john.doe@example.com"} address={"123 Main St, City, Country"} />
            <UserClass name={"John Doe(class)"} email={"john.doe@example.com"} address={"123 Main St, City, Country"} />
        </div>
    )
}
export default About;