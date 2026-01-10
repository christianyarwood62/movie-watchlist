import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, createAccount, googleLogin, resetError } from "./authSlice";
import { useNavigate } from "react-router-dom";

import { TbMovie } from "react-icons/tb";
import styled from "styled-components";
import { CiLogin } from "react-icons/ci";
import { CgUserAdd } from "react-icons/cg";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 84vh;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-lightblue-500);
  padding: 10px;
  border-radius: 100px;
  font-size: 30px;
  color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background-color: var(--color-blue-600);
  padding: 36px;
  border: rgba(238, 238, 238, 0.164) solid 1px;
  border-radius: 10px;
  gap: 24px;
`;

const UsernameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: var(--input-bg-color);
  padding: 8px;
`;

const MainLogInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 3rem;
  background-color: var(--color-lightblue-500);
  color: white;

  svg {
    font-size: 2rem;
  }

  &:hover {
    background-color: var(--color-lightblue-700);
  }
`;

const SignUpInButton = styled.button`
  color: var(--color-lightblue-500);

  &:hover {
    color: var(--color-lightblue-700);
  }
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  all: unset;
  text-align: center;
  background-color: red;
`;

const Error = styled.div`
  background: var(--error-opaque-red);
  border: red 1px solid;
  border-radius: 6px;
  padding: 8px;
  font-size: 1.6rem;
  color: var(--color-red-400);
`;

function SignInForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const { error: authError, loggedInUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser && !authError) navigate("/watch-list");
  }, [authError, navigate, loggedInUser]);

  const {
    register,
    handleSubmit,
    formState: { formErrors },
    reset,
  } = useForm();

  // This stores the user entered username and password as the loggedInUser
  function handleLogin(data) {
    // Login with the user filled in details
    dispatch(login({ username: data.username, password: data.password }));
  }

  // The user can click the button, and this uses their google email to log into the app
  function handleGoogleLogin(email) {
    dispatch(googleLogin(email));
  }

  // Create a new account based on the user supplied data in the form
  function handleCreateAccount(data) {
    console.log(data);

    // Create an account based on the inputted details
    dispatch(
      createAccount({ username: data.username, password: data.password })
    );
    // Reset the form inputs
    reset();
    // Navigate to the watch list so users can see their previous watch list
    navigate("/watch-list");
  }

  return (
    <Container>
      <Icon>
        <TbMovie />
      </Icon>
      <h2>MovieList</h2>
      {isSignUp ? (
        <p>Create an account to start your watch list</p>
      ) : (
        <p>Sign in to access your watch list</p>
      )}
      <StyledForm
        onSubmit={handleSubmit((data) =>
          isSignUp ? handleCreateAccount(data) : handleLogin(data)
        )}
      >
        <UsernameArea>
          <label htmlFor="usernameInput">Username</label>
          <StyledInput
            placeholder="Enter your username"
            id="usernameInput"
            {...register("username")}
          />
        </UsernameArea>

        <PasswordArea>
          <label htmlFor="passwordInput">Password</label>
          <StyledInput
            placeholder="Enter your password"
            id="passwordInput"
            type="password"
            {...register("password")}
          />
        </PasswordArea>

        {authError && <Error>{authError}</Error>}

        {!isSignUp ? (
          <MainLogInButton type="submit">
            <CiLogin /> Sign in
          </MainLogInButton>
        ) : (
          <>
            <PasswordArea>
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <StyledInput
                placeholder="Confirm your username"
                id="confirmPasswordInput"
                type="password"
                {...register("confirm-password")}
              />
            </PasswordArea>
            <MainLogInButton type="submit">
              <CgUserAdd /> Sign up
            </MainLogInButton>
          </>
        )}

        <SignUpInButton
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp(!isSignUp);
            dispatch(resetError());
            reset();
          }}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Dont have an account? Sign up"}
        </SignUpInButton>

        <GoogleContainer>
          <StyledGoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponseDecoded);
              handleGoogleLogin(credentialResponseDecoded.email);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleContainer>
      </StyledForm>
    </Container>
  );
}

export default SignInForm;
