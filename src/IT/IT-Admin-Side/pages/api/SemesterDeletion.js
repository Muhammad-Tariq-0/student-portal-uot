import React from 'react'
async function SemesterDeletion(sname, id, StudentData,SubjectData) {
    console.log(sname, id, StudentData,SubjectData)
      await fetch(`/.netlify/functions/DeleteSemester`, {
        method: 'post',
        body: JSON.stringify({ id: id})
    })
    StudentData.map((stData) => {
        if (sname === stData.data.semester) {
            console.log(stData.ref["@ref"].id)
              fetch(`/.netlify/functions/DeleteThisSemesterStudents`, {
                method: 'post',
                body: JSON.stringify({ id: stData.ref["@ref"].id})
            })
        }
        return(<div></div>)
    })
    SubjectData.map((el, key) => {
      let subject = el.data.title;
      var res = subject.split("_");
      console.log(res[0])
      if (res[0] === sname) {
       console.log(el.ref["@ref"].id)
       fetch(`/.netlify/functions/DeleteThisSemesterSubjects`, {
        method: 'post',
        body: JSON.stringify({ id: el.ref["@ref"].id})
    })
      }
      return(<div></div>)
    })
   
}
export default SemesterDeletion;