import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import faunadb, { query as q } from "faunadb";
import { Layout, Menu } from "antd";
import { LogoutOutlined, InboxOutlined } from "@ant-design/icons";
import logo from "../../loader-images/uot.png";
import "./Menu.css";
import { BrowserRouter as Router, Link } from "react-router-dom";


const { Header } = Layout;

const Menubar = () => {
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
    <Layout>
      <Header className="header">
        <div className="logo" style={{ marginLeft: "3%" }}>
          <a href='/'>
            <img src={logo} alt="logo" width={60} height={60} />
            <span className="title">University Of Thal</span>
          </a>

        </div>

        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key="1">
            
            <Link to="/complaints">
              Complaints &nbsp; <InboxOutlined />
            </Link>
          
          </Menu.Item>
          <Menu.Item key="2">
            <a rel="noopener noreferrer" href='#' onClick={handleLogout}>
              Logout &nbsp; <LogoutOutlined />
            </a>
          </Menu.Item>
        </Menu>

      </Header>
    </Layout>
  );
};

export default Menubar;