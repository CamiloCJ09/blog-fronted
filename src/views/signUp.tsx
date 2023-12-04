import SignUpForm from "../components/signUp/signUpForm";
import '../index.css';
import { Link } from "react-router-dom"


const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mt-4 text-slate-950 text-4xl">
        <h2 className="mt-4 text-slate-950 text-4xl">Sign Up</h2>
      </div>
      <SignUpForm />
      <div className=" text-gray-500 hover:text-gray-800">
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
};
export default SignUp;