import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import ForgetPass from "./Pages/ForgetPass"
import NotFound from "./Pages/NotFound"
import Messages from "./Pages/Messages"

const App = () => {

    return(
        <Routes>
            <Route path="/" element={ <Messages />} />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/login" element={  <Login />} />
            <Route path="/forget-password" element={ <ForgetPass /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}
export default App ;