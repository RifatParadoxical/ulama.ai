import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useForm } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { AppContext } from "../Context/Firebase";
import "../index.css"

const Chats = () => {
  const {db} = useContext(AppContext)
  const { register, handleSubmit } = useForm()
  const [ gptResponse, setGptResponse ] = useState(" As salamu alaikum ya akhi. I am interested to listen How was your day?")
  const [gptError, setGptError] = useState(null)
  const instruction = ` 
         Instructions: Think & act like an ulama/alem though you have some limitations,
         try to focus on deeni learning sources and lifestyle like a practicing muslim.
         ensure you are a good listener, listen more and more 
         and answer as shortly as possible but not too short or long.
         give some Quran, Hadith, Fiqh referance as a quota if possible. 
         Don't forget to make some headings.
          `


  const onSubmit = async (data) => {
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_API_KEY , dangerouslyAllowBrowser: true })
      const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [{ text: ` ${data.prompt} ${instruction}`}]
      }] ,
  });
    const md = response.candidates[0].content.parts[0].text
    const htmx = DOMPurify.sanitize(marked(md))
    const html = htmx.replace(/\\n/g, '<br />');
      setGptResponse(html)

    const saveMessage = async ( text, sender ) => {
      const messagesRef = collection(db, "chats", "chat-id", "messages")
      await addDoc(messagesRef,{
        text,
        sender,
        timestamp : serverTimestamp(),
      })
    }
    await saveMessage(data.prompt, "user")
    await saveMessage(md, "ai")
    
    } catch (errors) {
      setGptError(errors.name)
    }
  }

  return (
    <div style={{width:"100vw", height:"90vh", display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"gray", overflowY:"auto"}}>
    {gptError 
     ? <div style={{color: "red", overflowY:"scroll"}}> { setGptError } </div>
     : <div style={{ color: "white", marginLeft:"10vw"}} dangerouslySetInnerHTML={{ __html: gptResponse }} />
    }
      <form style={{position:"absolute", bottom:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <textarea style={{borderRadius:"5px", resize:"none", width:"60vw", fontFamily:"Arial",lineHeight:"1.5", fontSize:"14px" }} 
      {...register("prompt",{required: true })} autoComplete="off" rows="3"></textarea>
      <input style={{position:"relative", left:"-50px", top:"-25px"}} type="submit" value="Send"/>
      </form>
    </div>
  )
}
export default Chats ;