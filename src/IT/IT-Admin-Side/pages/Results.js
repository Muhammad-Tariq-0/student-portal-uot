import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { List } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import spinner from "../../loader-images/final-uot.gif";

const Results = () => {
  let { sname } = useParams();
  //-------------------Subjects Reading------------------------
  const [mydata, setData] = useState([]);
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
      <h1>Add Results of {sname}</h1>
      <br />
      {!mydata.length ? (
        <center>
          <img src={spinner} width={200} height={200} alt=''/>
        </center>
      ) : (
        <div>
          {mydata.map((el, key) => {
            let subject = el.data.title;
            var res = subject.split("_");
            console.log(res[0]);
            if (res[0] === sname) {
              return (
                <List bordered>
                  <Link
                    to={`/students/${sname}/results/${sname}/${res[1]}`}
                    params={{ sname: sname, subj: res[1] }}
                  >
                    <List.Item>
                      <List.Item.Meta
                        avatar={<FilePdfOutlined />}
                        title={res[1]}
                      />
                    </List.Item>
                  </Link>
                </List>
              );
            }
            return(<div></div>)
          })}
        </div>
      )}
    </div>
  );
};

export default Results;
