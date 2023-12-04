import { Link } from "react-router-dom"
import LoginForm from "../components/login/loginForm"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import '../index.css';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl absolute inset-x0 top-0 mt-3">
        <Header />
      </div>

      <div className="mt-4 text-slate-950 text-4xl ">
        <h1 className="mt-4 text-3xl ">Login to continue</h1>
      </div>
      <LoginForm />
      <div className=" text-gray-500 hover:text-gray-800">
        <Link to="/sign_up">No account yet? Signin here</Link>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  )
}

export default Login
