import React, { useState, useEffect } from "react";
import StudentAddition from "./api/StudentAddition";
import { useParams } from "react-router-dom";
import StudentUpdation from "./api/StudentUpdation";
import StudentDeletion from "./api/StudentDeletion";
import { List, Avatar, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import spinner from "../../loader-images/final-uot.gif";

import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const Students = () => {
  let { sname } = useParams();

  //--------------------students Reading-------------------------
  const [mydata, setData] = useState([]);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadStudent`);
      let data = await response.json();
      setData(data);
    }
    DataFetch();
  }, [mydata]);
  return (
    <div>
      <h1>Students</h1>
      <Button
        onClick={() => {
          StudentAddition({ sname });
        }}
        type="primary"
      >
        Add Student <UserAddOutlined />
      </Button>

      <br />
      <br />
      {!mydata.length ? (
        <center>
          <img src={spinner} width={200} height={200} alt='' />
        </center>
      ) : (
        <div>
          {mydata.map((stData, key) => {
            if (stData.data.semester === sname){
              return (
                <List bordered itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={stData.data.name}
                      description={stData.data.roll_n0}
                      />

                    <span style={{ float: "right" }}>
                      <Tooltip title="Edit">
                        <Button
                          type="primary"
                          onClick={() => {
                            StudentUpdation(
                              stData.ref["@ref"].id,
                              stData.data.semester,
                              stData.data.name,
                              stData.data.roll_n0,
                              stData.data.email,
                              stData.data.gender
                            );
                          }}
                        >
                          <EditOutlined />
                        </Button>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Delete">
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            StudentDeletion(stData.ref["@ref"].id);
                          }}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Tooltip>
                      <Link
                        to={`/students/${sname}/yourResult/${sname}/${stData.data.roll_n0}`}
                        params={{ sname: sname, rollN0: stData.data.roll_n0 }}
                      >
                        <Tooltip title="View Result">
                          <Button
                            type="primary"
                            style={{ width: "70%", marginTop: "5px" }}
                          >
                          View Results
                          </Button>
                        </Tooltip>
                      </Link>
                    </span>
                  </List.Item>
                </List>
              );}
              return(<div></div>)
          })}
        </div>
      )}
    </div>
  );
};

export default Students;
