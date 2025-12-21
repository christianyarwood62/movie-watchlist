import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "./authSlice";

function SignInForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { formErrors },
  } = useForm();

  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);

  function handleLogin(data) {
    console.log(data);
    dispatch(login({ username: data.username, password: data.password }));
  }

  function handleCreateAccount(data) {
    console.log(data);
    dispatch(
      createAccount({ username: data.username, password: data.password })
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        isSignUp ? handleCreateAccount(data) : handleLogin(data)
      )}
    >
      <label htmlFor="usernameInput">Username</label>
      <input id="usernameInput" {...register("username")} />
      <label htmlFor="passwordInput">Password</label>
      <input id="passwordInput" {...register("password")} />
      {!isSignUp && <button type="submit">Log in</button>}
      {isSignUp && (
        <>
          <label htmlFor="confirmPasswordInput">Confirm Password</label>
          <input id="confirmPasswordInput" {...register("confirm-password")} />
          <button type="submit">Sign up</button>
        </>
      )}

      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          }}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Dont have an account? Sign up"}
        </button>
      </div>
      <div>{authError}</div>
    </form>
  );
}

export default SignInForm;
