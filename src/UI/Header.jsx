import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { IoIosLogOut } from "react-icons/io";
import { logout } from "../features/authSlice";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: var(--color-blue-300);
  padding: 1.2rem 4.8rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: var(--color-grey-600);
  padding: 1rem;
  font-size: 2.4rem;
  border-radius: 1rem;
  cursor: pointer;

  &.active {
    background: var(--color-indigo-100);
    color: var(--color-grey-800);
  }
  &.active:hover {
    background: var(--color-indigo-100);
  }

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const LogoutLogo = styled.button`
  padding: 10px;
  color: var(--color-grey-600);
  font-size: 2.4rem;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Styledh1 = styled.h1`
  font-size: 2.4rem;
  color: var(--color-grey-600);
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Divider = styled.div`
  background-color: grey;
  width: 1px;
`;

function Header() {
  const { loggedInUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  return (
    <StyledHeader>
      <Styledh1>Movie App</Styledh1>
      <StyledNav>
        <ul>
          <ListItem>
            <StyledNavLink to="/">Movie list</StyledNavLink>
          </ListItem>
        </ul>
        <ul>
          <ListItem>
            <StyledNavLink to="watch-list">Watch list</StyledNavLink>
          </ListItem>
        </ul>
        <Divider></Divider>
        <ul>
          <ListItem>
            <StyledNavLink to="login">
              {loggedInUser ? <>@{loggedInUser.username}</> : "Login"}
            </StyledNavLink>
          </ListItem>
        </ul>
        {loggedInUser && (
          <ul>
            <ListItem>
              <LogoutLogo>
                <IoIosLogOut onClick={() => dispatch(logout())} />
              </LogoutLogo>
            </ListItem>
          </ul>
        )}
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
