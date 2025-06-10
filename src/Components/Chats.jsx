import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import "../index.css"

const Chats = () => {
  const { register, handleSubmit } = useForm()
  const [ gptResponse, setGptResponse ] = useState("As salamu alaikum ya akhi. I am interested to listen How was your day?")
  const onSubmit = async (data) => {
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_API_KEY , dangerouslyAllowBrowser: true })
      const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [{ text: data.prompt }]
      }] ,
  });
    const answer = JSON.stringify(response.candidates[0].content.parts[0].text)
      setGptResponse(answer) 
    } catch (errors) {
      const string = JSON.stringify(errors.name)
      const text = string.replace(/['"{}]/g, '')
      setGptResponse(text)
      console.log(errors)
    }
  }
  return (
    <div style={{width:"75vw", height:"100vh", backgroundColor:"black"}}>
      <p style={{color:"white"}}> {gptResponse} </p>
      <form onSubmit={handleSubmit(onSubmit)}>
      <textarea style={{borderRadius:"5px", resize:"none", width:"60vw", fontFamily:"Arial",lineHeight:"1.5", fontSize:"14px" }} 
      {...register("prompt",{required: true })} autoComplete="off" rows="6"></textarea>
      <input type="submit" value="Send"/>
      </form>
    </div>
  )
}
export default Chats ;