import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Card, Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ResultUpdation from './api/ResultUpdation';
import ResultDeletion from './api/ResultDeletion';


const AllSemesterResult = () => {
  let { rollN0 } = useParams();
  let { sname } = useParams();
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
  console.log(mydata)
  //----------------------CGPA Calculation----------------------------------
  {
    mydata.map((rsData, key) => {
      if (rollN0 === rsData.data.rollN0 && sname !== rsData.data.semester) {
        gpa = gpa + rsData.data.SubjectGPA * rsData.data.credit_hours;
        Total_credit_hours = Total_credit_hours + parseInt(rsData.data.credit_hours);
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
      <Row gutter={[32, 32]}>
        {/*------------------ All Result------------------------ */}
        <Col xs={24} sm={12} md={12} lg={24}>
          <Card className="card">
            <center> <h3>All Semesters Result</h3> </center>
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
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mydata.map((rsData, key) => {
                  if (rollN0 === rsData.data.rollN0 && sname !== rsData.data.semester) {
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
                          <Tooltip title="Edit"><Button onClick={() => { ResultUpdation(rsData.ref["@ref"].id, rsData.data.Mid, rsData.data.Final, rsData.data.Sessional) }}><EditOutlined /></Button></Tooltip>
                          <Tooltip title="Delete"><Button onClick={() => { ResultDeletion(rsData.ref["@ref"].id) }}><DeleteOutlined /></Button></Tooltip>
                        </Td>
                      </Tr>
                    )
                  }
                  return (<div></div>)
                })}
              </Tbody>
            </Table>
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
