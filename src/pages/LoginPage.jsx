import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import SignInForm from "../features/SignInForm";

function LoginPage() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return <SignInForm />;
}

export default LoginPage;
