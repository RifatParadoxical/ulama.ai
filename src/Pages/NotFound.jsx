import { Link } from "react-router-dom";

const NotFound = () =>{
 return(
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
        <h1 style={{color:"#0053E7",textAlign:"center", marginTop:"37px", marginBottom:"30px"}}>Sorry, Page not found. 😔</h1>
        <img style={{height:"50vh", maxWidth:"50vw", aspectRatio:"4/3", borderRadius:"10px"}} src="https://i.pinimg.com/1200x/09/68/8f/09688fe3d5231711bcaded4b220923a0.jpg" alt="Page Not Found" />
        <Link to="/" style={{borderRadius:"5px", padding:"16px",marginTop:"22px", backgroundColor:"#ECE9D8", color:"#0053E7", border:"1px solid #0053E7", fontFamily:"sans-serif", fontSize:"600", textDecoration:"none" }}>Back to homepage</Link>
    </div>
  )
}

export default NotFound ;