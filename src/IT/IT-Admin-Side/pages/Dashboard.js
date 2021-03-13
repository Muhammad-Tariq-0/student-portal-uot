import React from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import Students from "./Students";
import Subjects from "./Subjects";
import Results from "./Results";
import SubjectResultAdd from "./SubjectResultAdd";
import ResultReading from "./ResultReading";
import { Menu } from "antd";
import {
  PieChartOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AllSemesterResult from "./AllSemesterResult";
import './Dashboard.css'

const Tabs = () => {
  let { sname } = useParams();

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      style={{ backgroundColor: "#eff0f3", textAlign: "center" }}
      mode="horizontal"
    >
      <Menu.Item key="1" icon={<TeamOutlined />} className='size'>
        <Link to={`/students/${sname}`} className="menu-item">
          Students
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ProfileOutlined />} className='size'>
        <Link to={`/students/${sname}/subjects/${sname}`} className="menu-item">
          Subjects
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<PieChartOutlined />} className='size'>
        <Link to={`/students/${sname}/results/${sname}`} className="menu-item">
         Add Results
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const Dashboard = () => {
  return (
    <div>
      <br/>
      <Tabs />
      <div className="container-fluid">
        <br />
        <Routes>
          <Route name="students" path="/" element={<Students />} exact />
          <Route
            name="subjects"
            path="subjects/:sname"
            element={<Subjects />}
            exact
          />
          <Route
            name="results"
            path="results/:sname"
            element={<Results />}
            exact
          />
          <Route
            name="SubjectResultAdd"
            path="results/:sname/:subj"
            element={<SubjectResultAdd />}
            exact
          />
          <Route
            name="ResultReading"
            path="yourResult/:sname/:rollN0"
            element={<ResultReading />}
            exact
          />
           <Route
            name="AllDegreeresult"
            path="yourResult/:sname/:rollN0/AllDegreeresult"
            element={<AllSemesterResult />}
            exact
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
