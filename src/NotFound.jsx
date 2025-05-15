import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
        <h1 style={{color:"black",textAlign:"center", marginBottom:"20px"}}>Sorry, Page not found. 😔</h1>
        <img style={{height:"50vh", maxWidth:"50vw", aspectRatio:"4/3", borderRadius:"10px"}} src="https://i.pinimg.com/1200x/09/68/8f/09688fe3d5231711bcaded4b220923a0.jpg" alt="Page Not Found" />
        <Link to="/" style={{border:"3px solid black", borderRadius:"5px", padding:"10px",marginTop:"7px"}}>Back to homepage...</Link>
    </div>
  )
}

export default NotFound