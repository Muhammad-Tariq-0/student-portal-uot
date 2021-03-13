import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Card, Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ResultUpdation from "./api/ResultUpdation";
import ResultDeletion from "./api/ResultDeletion";

const ResultReading = () => {
  let { sname } = useParams();
  let { rollN0 } = useParams();
  let gpa = 0;
  let Total_credit_hours = 0;
  //--------------------students Reading-------------------------
  const [mydata, setData] = useState([]);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadResult`);
      let data = await response.json();
      setData(data);
    }
    DataFetch();
  }, [mydata]);

  //----------------------GPA Calculation----------------------------------
  {
    mydata.map((rsData, key) => {
      let lastSem = sname.split("-");
      console.log(lastSem[2] - 1);
      let semN0 = lastSem[2] - 1;
      lastSem = `${lastSem[0]}-${lastSem[1]}-${semN0}`;
      console.log(lastSem);

      if (rollN0 === rsData.data.rollN0 && lastSem === rsData.data.semester) {
        gpa = gpa + rsData.data.SubjectGPA * rsData.data.credit_hours;
        Total_credit_hours =
          Total_credit_hours + parseInt(rsData.data.credit_hours);
      }
      return <div></div>;
    });
  }
  console.log(gpa, Total_credit_hours);
  let Total_GPA = gpa / Total_credit_hours;
  console.log(Total_GPA.toFixed(2));
  //----------------------------------------------------------------------

  return (
    <div>
      <Row gutter={[32, 32]}>
        {/*------------------ Current Semester Result------------------------ */}

        <Col xs={24} sm={12} md={12} lg={24}>
          <Card className="card">
            <center>
              {" "}
              <h3>Current Results</h3>{" "}
            </center>
            <Table border="1">
              <Thead>
                <Tr>
                  <Th>Semester</Th>
                  <Th>Subject</Th>
                  <Th>Credit-Hours</Th>
                  <Th>Mid</Th>
                  <Th>Final</Th>
                  <Th>Sessional</Th>
                  <Th>Total</Th>
                  <Th>Subject GPA</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mydata.map((rsData, key) => {
                  if (
                    rollN0 === rsData.data.rollN0 &&
                    sname === rsData.data.semester
                  ) {
                    // console.log(rsData.data.SubjectGPA*rsData.data.credit_hours);
                    return (
                      <Tr>
                        <Td>{rsData.data.semester}</Td>
                        <Td>{rsData.data.subject}</Td>
                        <Td>{rsData.data.credit_hours}</Td>
                        <Td>{rsData.data.Mid}</Td>
                        <Td>{rsData.data.Final}</Td>
                        <Td>{rsData.data.Sessional}</Td>
                        <Td>{rsData.data.total}</Td>
                        <Td>{rsData.data.SubjectGPA}</Td>
                        <Td>
                          <Tooltip title="Edit">
                            <Button
                              onClick={() => {
                                ResultUpdation(
                                  rsData.ref["@ref"].id,
                                  rsData.data.Mid,
                                  rsData.data.Final,
                                  rsData.data.Sessional
                                );
                              }}
                            >
                              <EditOutlined />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button
                              onClick={() => {
                                ResultDeletion(rsData.ref["@ref"].id);
                              }}
                            >
                              <DeleteOutlined />
                            </Button>
                          </Tooltip>
                        </Td>
                      </Tr>
                    );
                  }
                  return <div></div>;
                })}
              </Tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      {/*------------------ Last Semester Result------------------------ */}
      <Row>
        <Col xs={24} sm={12} md={12} lg={24}>
          <Card className="card">
            <center>
              {" "}
              <h3>Last Semester Result</h3>{" "}
            </center>
            <Table border="1">
              <Thead>
                <Tr>
                  <Th>Semester</Th>
                  <Th>Subject</Th>
                  <Th>Credit-Hours</Th>
                  <Th>Mid</Th>
                  <Th>Final</Th>
                  <Th>Sessional</Th>
                  <Th>Total</Th>
                  <Th>Subject GPA</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mydata.map((rsData, key) => {
                  let lastSem = sname.split("-");
                  let semN0 = lastSem[2] - 1;
                  lastSem = `${lastSem[0]}-${lastSem[1]}-${semN0}`;

                  // let SubsemN0 = res[0].split("-");
                  // console.log(SubsemN0[2])
                  if (
                    rollN0 === rsData.data.rollN0 &&
                    lastSem === rsData.data.semester
                  ) {
                    console.log(
                      rsData.data.SubjectGPA * rsData.data.credit_hours
                    );
                    return (
                      <Tr>
                        <Td>{rsData.data.semester}</Td>
                        <Td>{rsData.data.subject}</Td>
                        <Td>{rsData.data.credit_hours}</Td>
                        <Td>{rsData.data.Mid}</Td>
                        <Td>{rsData.data.Final}</Td>
                        <Td>{rsData.data.Sessional}</Td>
                        <Td>{rsData.data.total}</Td>
                        <Td>{rsData.data.SubjectGPA}</Td>
                        <Td>
                          <Tooltip title="Edit">
                            <Button
                              onClick={() => {
                                ResultUpdation(
                                  rsData.ref["@ref"].id,
                                  rsData.data.Mid,
                                  rsData.data.Final,
                                  rsData.data.Sessional
                                );
                              }}
                            >
                              <EditOutlined />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button
                              onClick={() => {
                                ResultDeletion(rsData.ref["@ref"].id);
                              }}
                            >
                              <DeleteOutlined />
                            </Button>
                          </Tooltip>
                        </Td>
                      </Tr>
                    );
                  }
                  return <div></div>;
                })}
              </Tbody>
            </Table>
            <br />
            <center>
              <h3>GPA: {Total_GPA.toFixed(2)}</h3>
            </center>
            {/*------------------ All Result------------------------ */}
            <center>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link
                to={`/students/${sname}/yourResult/${sname}/${rollN0}/AllDegreeResult`}
              >
                <Card className="card">
                  <center>
                    {" "}
                    <h3>View All Semesters Result</h3>{" "}
                  </center>
                </Card>
              </Link>
            </Col>
            </center>
          </Card>
        </Col>
        <br/>
        <br/>
        {/*------------------ All Result------------------------ */}
      </Row>
      {/* <Row>
      <Col xs={24} sm={12} md={12} lg={6} >
          <Link to={`/students/${sname}/yourResult/${sname}/${rollN0}/AllDegreeResult`}>
            <Card className="card">
              <center> <h3>View All Semesters Result</h3> </center>
            </Card>
          </Link>
        </Col>
      </Row> */}
    </div>
  );
};

export default ResultReading;
