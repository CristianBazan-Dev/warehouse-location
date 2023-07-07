import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import  {ReactComponent as Logo}  from "../../assets/logo.svg";

function Header(props) {
  const state = useContext(GlobalState);
  const [isRegister, setIsRegister] = state.isRegister;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [userInfo, setUserInfo] = state.userAPI.userInfo;
  const [showModal, setShowModal] = state.showModal
  const [mapModal, setMapModal] = state.mapModal

  const logout = () => {
    localStorage.removeItem("firstLogin")
    window.location.reload()
  }

 
 

  return (
    <header  className={ 
      showModal || mapModal
        ? " blur-sm transition ease-out relative overflow-x-auto"
        : ""
    }>
      <Link to="/">
        <Logo/>
      </Link>

      {isLogged ? (
       
          <nav>
          <h3>Bienvenido {userInfo.name}</h3> 
            <ul>
              <li onClick={() => {logout()}}>Cerrar sesión</li>
            </ul>
          </nav>
      ) : (
        <nav>
          <ul>
            <Link
              to="/login"
              onClick={() => {
                setIsRegister(false);
              }}
            >
              <li>Login</li>
            </Link>

            <Link
              to="/register"
              onClick={() => {
                setIsRegister(true);
              }}
            >
              <li>Register</li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
