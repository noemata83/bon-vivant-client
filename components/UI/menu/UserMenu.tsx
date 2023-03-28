import React, { useState } from "react"
import Link from "next/link"
import UserButton from "./UserButton"
import styled from "styled-components"
import logout from "../../../lib/logout"

const UserMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleUserMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }
  return (
    <UserMenuContainer>
      <UserButton toggleUserMenu={toggleUserMenu} />
      <Menu aria-expanded={menuIsOpen ? "true" : "false"}>
        <MenuList>
          <MenuItem>
            <Link href="/my-cocktail-book">
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </MenuItem>
        </MenuList>
      </Menu>
    </UserMenuContainer>
  );
}

const UserMenuContainer = styled.div`
  position: relative;
  margin-left: auto;
`

const Menu = styled.div`
  visibility: hidden;
  pointer-events: none;
  padding: 1rem;
  font-size: 1.8rem;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${({ theme }) => theme.color.accentLight};
  &[aria-expanded="true"] {
    visibility: visible;
    pointer-events: auto;
  }
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuItem = styled.li`
  padding: 1rem 0;
  a {
    color: inherit;
    text-decoration: none;
  }
`

const LogoutButton = styled.button`
  font-family: ${({ theme }) => theme.type.body.fontFamily};
  font-size: ${({ theme }) => theme.type.body.fontSize};
  color: inherit;
  font-size: inherit;
  padding: 0;
  letter-spacing: inherit;
  border: none;
  background-color: transparent;
`

export default UserMenu
