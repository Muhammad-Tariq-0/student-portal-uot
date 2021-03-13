import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import ProgramAddition from "./api/ProgramAddition";
import { PlusOutlined } from "@ant-design/icons";
import logo from "../../loader-images/final-uot.gif";
import Form from "../TimeTable/Form";
import TodoList from "../TimeTable/TodoList";
import UploadImage from "../TimeTable/UploadImage";

const Programs = () => {
  const [mydata, setData] = useState([]);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadPrograms`);
      let data = await response.json();
      setData(data);
    }
    DataFetch();
  }, [mydata]);

  return (
    <div className="container-fluid">
      <br />
      <h4>Programs</h4>
      <Button onClick={ProgramAddition} type="primary">
        Add Program <PlusOutlined />
      </Button>
      <br />
      <br />
      <br />
      {!mydata.length ? (
        <center>
          <img src={logo} width={200} height={200} alt=''/>
        </center>
      ) : (
        <Row gutter={[32, 32]}>
          {mydata.map((e, key) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6}>
                <Link
                  to={`/semester/${e.data.program}`}
                  params={{ pname: e.data.program }}
                >
                  <Card className="card" key={key}>
                    <h2 className="card-title" style={{ textAlign: "center" }}>
                      {e.data.program}
                    </h2>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
      <br />
      <br />
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} md={12} lg={18}>
          <Card className="card">
            <UploadImage />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="card">
            <h4>Add Notification</h4>
            <hr/>
            <TodoList />
            <br/>
            <Form />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Programs;
