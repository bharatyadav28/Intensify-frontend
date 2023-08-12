import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";

const Signup = () => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <SignupForm />
    </div>
  );
};

const Login = () => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <LoginForm />
    </div>
  );
};
export { Signup, Login };
