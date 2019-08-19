import React from "react"
import styled from "styled-components"

const User = ({ toggleUserMenu }) => {
  return (
    <UserButton onClick={toggleUserMenu}>
      <UserSVG
        xmlns="http://www.w3.org/2000/UserSVG"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
      >
        <path d="M100,48.9C99.4,22.2,77.8,0.6,51.1,0C22.7-0.6-0.6,22.7,0,51.1C0.6,77.8,22.2,99.4,48.9,100  C77.3,100.6,100.6,77.3,100,48.9z M50.4,17.3c10.5,0.2,19.1,8.8,19.3,19.3C70,47.8,60.8,57,49.6,56.8C39,56.5,30.5,48,30.3,37.5  C30,26.2,39.2,17,50.4,17.3z M77,73.9c-7.6,5.6-16.9,8.9-27,8.9c-10.1,0-19.4-3.3-27-8.9c-2.1-1.5-2.8-4.3-1.9-6.7  c2.5-6.2,7.4-11.1,13.6-13.6c4,3.7,9.4,6,15.3,6c5.9,0,11.2-2.3,15.3-6c6.2,2.5,11.1,7.4,13.6,13.6C79.8,69.6,79.1,72.3,77,73.9z" />
      </UserSVG>
    </UserButton>
  )
}

const UserButton = styled.button`
  outline: none;
  background: transparent;
  border: none;
  margin-left: auto;
  path {
    fill: white;
  }
`

const UserSVG = styled.svg`
  height: 2.8rem;
`

export default User
