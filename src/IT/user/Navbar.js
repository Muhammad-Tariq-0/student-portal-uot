import React from "react";
import { useAuth0 } from '@auth0/auth0-react'
import faunadb, { query as q } from "faunadb";
import "./Navbar.css";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "./uot.png";



const Navbar = () => {
  //-------------Database logout user session----------------
  const { logout, user } = useAuth0();
  const handleLogout = () => {
    const client = new faunadb.Client({
      secret: user["https://fauna.com/user_metadata"].secret,
    });
    client.query(q.Logout(true));
    logout();
  };

  return (
    <div className="top-nav">
      <ul>
        <li style={{ fontSize: "20px", fontFamily: 'Akaya Telivigala' }}>
          <img src={logo} alt="logo" width={60} height={60} />
          <br />
          University Of Thal
        </li>
        <li className="user" style={{ cursor: 'pointer' }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href='#'
            onClick={handleLogout}

          >
            <LogoutOutlined />Logout
      </a>
        </li>

      </ul>
    </div>
  );
};

export default Navbar;
