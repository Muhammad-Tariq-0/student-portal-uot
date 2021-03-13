import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const Result = () => {
  const { user } = useAuth0();
  const { email } = user;
  console.log(email);

  let gpa = 0;
  let Total_credit_hours = 0;

  //--------------------students Reading-------------------------
  const [Students, setStudents] = useState([]);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadStudent`);
      let data = await response.json();
      setStudents(data);
    }
    DataFetch();
  }, [Students]);
  //--------------------Results Reading-------------------------
  const [Result, setResult] = useState([]);
  useEffect(() => {
    async function DataFetch() {
      let response = await fetch(`/.netlify/functions/ReadResult`);
      let data = await response.json();
      setResult(data);
    }
    DataFetch();
  }, [Result]);

  //----------------------GPA Calculation----------------------------------
  {
    Students.map((student) => {
      if (student.data.email === email) {
        return (
          <>
            {Result.map((rsData, key) => {
              let sname = student.data.semester;
              let lastSem = sname.split("-");
              console.log(lastSem[2] - 1);
              let semN0 = lastSem[2] - 1;
              lastSem = `${lastSem[0]}-${lastSem[1]}-${semN0}`;
              console.log(lastSem);
              if (
                student.data.roll_n0 === rsData.data.rollN0 &&
                lastSem === rsData.data.semester
              ) {
                gpa = gpa + rsData.data.SubjectGPA * rsData.data.credit_hours;
                Total_credit_hours =
                  Total_credit_hours + parseInt(rsData.data.credit_hours);
              }
              return <div></div>;
            })}
          </>
        );
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
      <br />
      <br />
      <Row gutter={[32, 32]}>
        {/*------------------ Last Semester Result------------------------ */}

        <Col xs={24} sm={12} md={12} lg={24}>
          <Card className="card">
            <center>
              {" "}
              <h3> Result Sheet</h3>{" "}
            </center>
            {Students.map((student) => {
              if (student.data.email === email) {
                return (
                  <>
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
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Result.map((rsData, key) => {
                          let sname = student.data.semester;
                          let lastSem = sname.split("-");
                          console.log(lastSem[2] - 1);
                          let semN0 = lastSem[2] - 1;
                          lastSem = `${lastSem[0]}-${lastSem[1]}-${semN0}`;
                          console.log(lastSem);

                          // let SubsemN0 = res[0].split("-");
                          // console.log(SubsemN0[2])
                          if (
                            student.data.roll_n0 === rsData.data.rollN0 &&
                            lastSem === rsData.data.semester
                          ) {
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
                              </Tr>
                            );
                          }
                          return <div></div>;
                        })}
                      </Tbody>
                    </Table>
                  </>
                );
              }
              return <div></div>;
            })}
            <br />
            <center>
              <h3>GPA: {Total_GPA.toFixed(2)}</h3>
            </center>
            {/*------------------ All Result------------------------ */}
            <center>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Link to="/AllDegreeResult">
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

        {/*------------------ All Result------------------------ */}
       
      </Row>
    </div>
  );
};

export default Result;
