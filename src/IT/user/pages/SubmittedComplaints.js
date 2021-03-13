import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Card, Row, Col } from "antd";
import '../../../App.css'

const SubmittedComplaints = () => {
    const { user } = useAuth0();
    const { email } = user;

    //--------------------Complaints Reading-------------------------
    const [Complaints, setComplaints] = useState([]);
    useEffect(() => {
        async function DataFetch() {
            let response = await fetch(`/.netlify/functions/ReadComplaints`);
            let data = await response.json();
            setComplaints(data);
        }
        DataFetch();
    }, [Complaints]);

    console.log(Complaints)
    return (
        <div className="container-fluid">
            <br /><br />
            <center><h2>Submitted Complaints</h2></center>
            <br />
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={12} md={12} lg={24}>
                    {Complaints.map((complaints) => {
                        if (complaints.data.email === email) {
                            return (
                                <Card className="card">
                                    <p> <strong style={{ fontSize: '15px' }}>Name:</strong> <span style={{ fontStyle: 'italic' }}>{complaints.data.StudentName}</span> </p>
                                    <p>  <strong style={{ fontSize: '15px' }}>Title:</strong> <span style={{ fontStyle: 'italic' }}>{complaints.data.title}</span> </p>
                                    <p><strong>Complaint:</strong>{complaints.data.description}</p>
                                </Card>
                            )
                        }
                        return (<div></div>)
                    })}
                </Col>
            </Row>

        </div>
    )
}

export default SubmittedComplaints
