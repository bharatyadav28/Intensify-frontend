import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";

const Signup = () => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <SignupForm />
    </div>
  );
};

const Login = ({ createLoginStorage }) => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <LoginForm createLoginStorage={createLoginStorage} />
    </div>
  );
};
export { Signup, Login };
