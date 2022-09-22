import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./Navelement.js"
const Navbar = (props) => {
  return (
    <>
      <Nav>
        <NavLogo to="/">Application-tracker</NavLogo>
        <Bars />

        <NavMenu>
          
                  <NavLink to={props.path1} activeStyle={{ color: "black" }}>
            {props.name}
          </NavLink>
          <NavBtn>
                      <NavBtnLink to={props.path2}>{props.sign }</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
