import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Card, Row, Col } from "antd";

const AllSemesterResult = () => {
  const { user } = useAuth0();
  const { email } = user;
  console.log(email)
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
  //----------------------CGPA Calculation----------------------------------
  {
    Students.map((student) => {
      if (student.data.email === email) {
        return (
          <>
            {Result.map((rsData, key) => {
              if (student.data.roll_n0 === rsData.data.rollN0 && student.data.semester !== rsData.data.semester) {
                gpa = gpa + rsData.data.SubjectGPA * rsData.data.credit_hours;
                Total_credit_hours = Total_credit_hours + parseInt(rsData.data.credit_hours);
              }
              return (<div></div>)
            })}
          </>
        )
      }
      return (<div></div>)
    })
  }
    console.log(gpa, Total_credit_hours)
    let Total_CGPA = gpa / Total_credit_hours;
    console.log(Total_CGPA.toFixed(2))
    //---------------------------------------------------------------------- 
  

  return (
    <div>
      <br />
      <br />
      <Row gutter={[32, 32]}>
        {/*------------------ All Semester Result------------------------ */}

        <Col xs={24} sm={12} md={12} lg={24}>
          <Card className="card">
            <center> <h3>All Semester Results</h3> </center>
            {Students.map((student) => {
              if (student.data.email === email) {
                return (
                  <>
                    <Table border='1'>
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
                          console.log(student.data.roll_n0, rsData.data.rollN0)
                          if (student.data.roll_n0 === rsData.data.rollN0 && student.data.semester !== rsData.data.semester) {
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
                            )
                          }
                          return (<div></div>)
                        })}
                      </Tbody>
                    </Table>
                  </>
                )
              }
              return (<div></div>)
            })}
             <br />
            <center>
              <h3>CGPA: {Total_CGPA.toFixed(2)}</h3>
            </center>
          </Card>
        </Col>
      </Row>


    </div>
  )
}

export default AllSemesterResult
