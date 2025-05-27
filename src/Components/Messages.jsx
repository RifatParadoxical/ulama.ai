import { useForm } from "react-hook-form"
import {db} from "../Context/Firebase"
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'

const Messages = () => {
const handleAdd = async(todo) => {
  const confirmed = window.confirm("I love you");
  if(!confirmed) return;
  try {
    await updateDoc(doc(db, "todos", ''))
    alert("Done.")
  } catch (error) {
    alert(error)
  }
}
  return(
    <>
    {/* <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("message")} placeholder="" />
     <input {...register("file")} type="file" />
    <input type="submit" />
    </form> */}
    
    <button style={{color:"black", backgroundColor:"orange", padding:"18px"}} onClick={handleAdd}>Click</button>
    </>
  )
}
export default Messages