import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "./authSlice";
import { useNavigate } from "react-router-dom";

import { TbMovie } from "react-icons/tb";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
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
`;

const UsernameArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  all: unset;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: var(--input-bg-color);
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

  function handleLogin(data) {
    // Login with the user filled in details
    dispatch(login({ username: data.username, password: data.password }));
  }

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
            {...register("password")}
          />
        </PasswordArea>
        {!isSignUp && <button type="submit">Log in</button>}
        {isSignUp && (
          <>
            <label htmlFor="confirmPasswordInput">Confirm Password</label>
            <StyledInput
              placeholder="Confirm your username"
              id="confirmPasswordInput"
              {...register("confirm-password")}
            />
            <button type="submit">Sign up</button>
          </>
        )}

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp(!isSignUp);
              reset();
            }}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Dont have an account? Sign up"}
          </button>
        </div>
        <div>{authError}</div>
      </StyledForm>
    </Container>
  );
}

export default SignInForm;
