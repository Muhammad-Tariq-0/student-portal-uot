import React from "react";
import Navbar from './user/Navbar'
import Sidebar from './user/Sidebar'

const ItStudent = () => {
  return (
    <div>
     <Navbar />
     <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    </div>
  );
};

export default ItStudent;
