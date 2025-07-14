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
<div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90vh",
    width: "100vw",
    backgroundColor: "#f0f0f0",
    padding: "20px", 
    boxSizing: "border-box", 
  }}>
    <div style={{
      width: "80%", 
      maxWidth: "800px", 
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      overflowY: "auto",  
      padding: "20px",
    }}>
      {gptError ? (
        <div style={{ color: "red", overflowY: "auto" }}>{gptError}</div>
      ) : (
        <div style={{ color: "#333", lineHeight: "1.6", fontSize: "16px", fontFamily: "Arial, sans-serif" }} dangerouslySetInnerHTML={{ __html: gptResponse }} />
      )}
    </div>

    <form
      style={{
        width: "80%", 
        maxWidth: "800px",
        marginTop: "20px", 
        marginBottom:"30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        style={{
          borderRadius: "5px",
          resize: "none",
          width: "70%", 
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
          fontSize: "14px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
        {...register("prompt", { required: true })}
        autoComplete="off"
        rows="3"
        placeholder="Ask a question..."
      />
      <input
        type="submit"
        value="Send"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginLeft: "10px", 
        }}
      />
    </form>
  </div>
  )
}
export default Chats ;