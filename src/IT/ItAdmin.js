import React from "react";
import '../App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menubar from "./IT-Admin-Side/components/Menu";
import Semester from "./IT-Admin-Side/pages/Semester";
import Programs from "./IT-Admin-Side/pages/Programs";
import Dashboard from "./IT-Admin-Side/pages/Dashboard";
import ComplaintBox from "./IT-Admin-Side/pages/ComplaintBox";


const ItAdmin = () => {
  return (
    <div>

      <Router>
        <Menubar />
        <Routes>
          <Route path="/" element={<Programs />} exact />
          <Route path="/complaints" element={<ComplaintBox />} exact />
          <Route
            name="semester"
            path="/semester/:pname"
            element={<Semester />}
            exact
          />
          <Route
            name="students"
            path="/students/:sname/*"
            element={<Dashboard />}
            exact
          />

        </Routes>
      </Router>
    </div>
  );
};

export default ItAdmin;
