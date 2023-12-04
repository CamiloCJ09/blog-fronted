import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../views/login"
import Posts from "../views/posts"
import SignUp from "../views/signUp"

interface Props {
  children: React.ReactComponentElement<any>
}

const ProtectedRoutes = ({ children }: Props) => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />
  } else {
    return children
  }
}

const IsNotLogged = ({ children }: Props) => {
  console.log(localStorage.getItem("token"))
  if (localStorage.getItem("token") !== null) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

const ThemeRoutes = () => {
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/sign_up" element={<SignUp></SignUp>} />
          <Route
            path="/posts"
            element={
              <IsNotLogged>
                <Posts/>
              </IsNotLogged>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default ThemeRoutes
