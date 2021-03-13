import React from 'react';
import './Sidebar.css'
import { slide as Menu } from 'react-burger-menu';
import {
  CalendarOutlined,
  PieChartOutlined,
  FileOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import Result from "../user/pages/Result";
import Dashboard from '../user/pages/Dashboard';
import AllSemesterResult from '../user/pages/AllSemesterResult';
import Complaint from './pages/Complaint';
import SubmittedComplaints from './pages/SubmittedComplaints';

const Sidebar = () => {
  return (
    <Router>
      <Menu>
        <Link className="menu-item" to='/'>
          <DashboardOutlined />&nbsp; Dashboard
      </Link>
      <Link className="menu-item" to='/Complaint'>
          <FileOutlined />&nbsp; Add Complaint
      </Link>
        <Link className="menu-item" to="/submittedComplaints">
          <CalendarOutlined />&nbsp; Your Complaints
      </Link>
        <Link className="menu-item" to="/result">
          <PieChartOutlined />&nbsp; Results
      </Link>
      </Menu>
      <Routes>
        <Route path="/" element={<Dashboard />} exact />
        <Route path="/result" element={<Result />} exact />
        <Route path="/AllDegreeResult" element={<AllSemesterResult />} exact />
        <Route path="/Complaint" element={<Complaint />} exact />
        <Route path="/submittedComplaints" element={<SubmittedComplaints />} exact />
      </Routes>
    </Router>
  );
}
export default Sidebar