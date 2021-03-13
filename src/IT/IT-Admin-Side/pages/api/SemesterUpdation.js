import Swal from 'sweetalert2'
import React from 'react'
async function SemesterUpdation(pname, sname, id, StudentData, SubjectData) {
  console.log(pname, sname, id, StudentData)
  let semN0 = sname.split("-");
  console.log(semN0[2])
  // let inputNewSemester = prompt("Enter New Semester Number");
  const { value: inputNewSemester } = await Swal.fire({
    input: 'number',
    inputLabel: 'Your Semester Number',
    inputValue: semN0[2],
    inputPlaceholder: 'Enter Semester ',
    showCancelButton: true
  })

  if (inputNewSemester) {
    Swal.fire(`Entered Semester: ${inputNewSemester}`)
  }
  if (inputNewSemester === undefined) {
    console.log("You entered nothing")
  }
  else {
    await fetch(`/.netlify/functions/UpdateSemester`, {
      method: 'post',
      body: JSON.stringify({ id: id, NewSemesterValue: `${pname}-Semester-${inputNewSemester}` })
    })
  }

  StudentData.map((stData) => {
    if (sname === stData.data.semester) {
      console.log(stData.ref["@ref"].id)
      if (inputNewSemester === undefined) {
        console.log("You entered nothing")
      }
      else {
        fetch(`/.netlify/functions/UpdateStudentSemester`, {
          method: 'post',
          body: JSON.stringify({ id: stData.ref["@ref"].id, NewSemesterValue: `${pname}-Semester-${inputNewSemester}` })
        })
      }
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
        body: JSON.stringify({ id: el.ref["@ref"].id })
      })
    }
    return(<div></div>)
  })
}
export default SemesterUpdation;