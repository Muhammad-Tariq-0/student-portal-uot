import React, { useEffect, useState } from "react";
import SubjectAddition from "./api/SubjectAddition";
import SubjectDeletion from "./api/SubjectDeletion";
import { Button, Row, Col, Card, Tooltip } from "antd";
import { PlusOutlined,DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import logo from "./images/book1.png";
import spinner from "../../loader-images/final-uot.gif";

const { Meta } = Card;

const Subjects = () => {
  let { sname } = useParams();

  //--------------------subjects Reading-------------------------
  const [mydata, setData] = useState([]);
  console.log(mydata);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadSubjects`);
      let data = await response.json();
      setData(data);
    }
    DataFetch();
  }, [mydata]);

  return (
    <div>
      <h1>Subjects of {sname}</h1>
      <Button
        type="primary"
        onClick={() => {
          SubjectAddition(sname);
        }}
      >
        Add Subject <PlusOutlined />
      </Button>
      <br />
      <br />
      {!mydata.length ? (
        <center>
          <img src={spinner} width={200} height={200} alt='' />
        </center>
      ) : (
        
      <Row gutter={[32, 32]}>
        {mydata.map((el, key) => {
          let subject = el.data.title;
          var res = subject.split("_");
          console.log(res[0]);
          if (res[0] === sname) {
            return (
              <Col xs={24} sm={24} md={12} lg={6}>
                <Card
                  className="card"
                  hoverable
                  cover={
                    <img alt="example" src={logo} height="150px" width="40px" />
                  }
                  actions={[
                    <Tooltip title="Delete">
                      
                      <DeleteOutlined
                        key="delete"
                        onClick={() => {
                          SubjectDeletion(el.ref["@ref"].id);
                        }}
                      />
                     &nbsp; Delete
                    </Tooltip>,
                  ]}
                >
                  <hr />
                  <Meta
                    title={res[1]}
                    description={`${el.data.credit_hours} Credit-Hours`}
                  />
                  
                </Card>
              </Col>
            );
          }
          return(<div></div>)
        })}
      </Row>
      )}
    </div>
  );
};

export default Subjects;
