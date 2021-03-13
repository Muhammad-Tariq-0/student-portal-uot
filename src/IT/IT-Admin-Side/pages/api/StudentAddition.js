import Swal from 'sweetalert2'
async function StudentAddition({ sname }) {
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
       },
  {
      title: 'Name',
      text: 'Enter Student Name',
  },
  {
      title: 'Email',
      text: 'Enter Email ',
      input: 'email',
  },
  {
      title: 'Gender',
      text: 'Select Student Gender',
      input: 'radio',
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
  await fetch(`/.netlify/functions/AddStudent`, {
      method: 'post',
      body: JSON.stringify({ studentRoll: receive[0], studentName: receive[1], studentEmail: receive[2], studentGender: receive[3],studentSemester: sname, })
  })
}

}
export default StudentAddition
