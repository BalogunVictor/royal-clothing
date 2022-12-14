import React from "react";
import './header.style.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component.jsx' 
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.action";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <div className="header">
    <Link className="logo-container" to='/'>
      <Logo className= 'logo'/>
    </Link>
    <div className="options">
    <Link className="option" to='/shop'>
      SHOP
    </Link>
    <Link className="option" to='/shop'>
      CONTACT
    </Link>
    {
      currentUser ? (
      <div className="option" onClick={signOutStart}> SIGN OUT </div>)
      : (
      <Link className="option" to="/signin"> SIGN IN </Link>
    )} 
    <CartIcon />

    </div>
    
    {
      hidden ? null : <CartDropdown />
    }

  </div>

);

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Header);