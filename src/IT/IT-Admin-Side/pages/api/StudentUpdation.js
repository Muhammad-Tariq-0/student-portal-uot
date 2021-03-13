import Swal from 'sweetalert2'
async function StudentUpdation(id,sname,name,rollN0,email,gender) {
const inputOptions = {
  'Male': 'Male',
  'Female': 'Female',
  'Other': 'Other'
}

Swal.mixin({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3', '4']
}).queue([
  {
      title: 'Roll Number',
      text: 'Enter Student Roll Number',
      inputValue: rollN0
       },
  {
      title: 'Name',
      text: 'Enter Student Name',
      inputValue: name
  },
  {
      title: 'Email',
      text: 'Enter Email ',
      input: 'email',
      inputValue: email
  },
  {
      title: 'Gender',
      text: 'Select Student Gender',
      input: 'radio',
      inputValue: gender,
      inputOptions: inputOptions,
  },
]).then((result) => {
  if (result.value) {
      console.log(result.value[0])
      Swal.fire({
          title: 'All done!',
          confirmButtonText: 'ok!'
      })
      SendData(result.value);
  }
})

async function SendData(receive) {
  console.log(receive);
  await fetch(`/.netlify/functions/UpdateStudent`, {
      method: 'post',
      body: JSON.stringify({ studentId: id, studentRoll: receive[0], studentName: receive[1], studentEmail: receive[2], studentGender: receive[3],studentSemester: sname, })
  })
}

}
export default StudentUpdation




















// async function StudentUpdation(id) {
//   let inputStudent = prompt("Enter Student Name");
//   let inputRollN0 = prompt("Enter Student Roll Number");
//   let inputEmail = prompt("Enter Student Email");
//   console.log(id,inputStudent,inputRollN0,inputEmail)
//   if (inputStudent == null && inputRollN0 == null && inputEmail == null) {
//     console.log("You entered nothing");
//   } else {
//     await fetch(`/.netlify/functions/UpdateStudent`, {
//       method: "post",
//       body: JSON.stringify({
//         studentId: id,
//         studentName: inputStudent,
//         studentRoll: inputRollN0,
//         studentEmail: inputEmail,
//       }),
//     });
//   }
// }
// export default StudentUpdation