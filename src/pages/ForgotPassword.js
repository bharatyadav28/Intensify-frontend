import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <div className="d-flex align-items-center mt-5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

const ResetPasssword = () => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <div className="d-flex align-items-center mt-5">
        <ForgotPasswordForm reset={true} />
      </div>
    </div>
  );
};

export { ForgotPassword, ResetPasssword };
