import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Reducer/auth';
import profile from '../../assests/images/profile.png';
import logout from '../../assests/images/logout1.png';
import './NavBar.css';
const NavBar = (props: any) => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [showDiv, setShowDiv] = useState(false);
  const handleProfile = () => {
    setShowDiv(!showDiv);
  };
  useEffect(() => {
    const headers: any = {
      userID: localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : '1'
    };
    async function getUser() {
      const response = await axios.get(
        `https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user?userID=${localStorage.getItem(
          'userId'
        )}`,
        { headers: headers }
      );
      setUser(response.data[0].name);
    }
    getUser();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(authActions.logout());
    window.location.href = '/';
  };
  return (
    <>
      <div className="nav_header">
        {props.flag && (
          <div>
            <input type="search" className="nav_search" placeholder="Search" />
          </div>
        )}
        {!props.flag && <div className="nav_search"></div>}
        <div className="nav_user">
          <p>{user}</p>
          <img src={profile} alt="" onClick={handleProfile} />
          {showDiv && (
            <div onClick={handleLogout}>
              <img src={logout} alt="" /> Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default NavBar;
