import React, { useEffect, useState } from 'react'
import UploadImage from '../TimeTable/UploadImage'
import { Row, Col, Card } from 'antd'
import '../../../App.css'
import TodoList from '../TimeTable/TodoList'
import { useAuth0 } from '@auth0/auth0-react'


const Dashboard = () => {
    const { user } = useAuth0();
    const { email } = user;
    console.log(email)

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
    //--------------------subjects Reading-------------------------
    const [Subjects, setSubjects] = useState([]);
    useEffect(() => {
        async function DataFetch() {
            let response = await fetch(`/.netlify/functions/ReadSubjects`);
            let data = await response.json();
            setSubjects(data);
        }
        DataFetch();
    }, [Subjects]);

    return (
        <div className='container-fluid'>
            <br />
            <br />
            <Row gutter={[32, 32]}>
            {Students.map((student) => {
                if (student.data.email === email) {
                    return (<>
                        {Subjects.map((subjects) => {
                            let subject = subjects.data.title;
                            var res = subject.split("_");
                            if (res[0] === student.data.semester) {
                                return (                                  
                                      <Col xs={24} sm={12} md={8} lg={4}>
                                            <Card className="card">
                                                <h3>{res[1]}</h3>
                                                <h4>Credit-Hours: {subjects.data.credit_hours}</h4>
                                            </Card>
                                        </Col>
                                )
                            }
                            return(<div></div>)
                        })}

                    </>)
                }
                return(<div></div>)
            })}

            <br />
            <br />
                <Col xs={24} sm={12} md={12} lg={18}>
                    <Card className="card">
                        <UploadImage />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card className="card">
                        <TodoList />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
