import Swal from 'sweetalert2'
async function SemesterAddition({pname}) {
  const { value: inputSemester } = await Swal.fire({
    input: 'number',
    inputLabel: 'Your Semester Number',
    inputPlaceholder: 'Enter Semester ',
    showCancelButton: true
  })
  
  if (inputSemester) {
    Swal.fire(`Entered Semester: ${inputSemester}`)
  }
  // let inputSemester = prompt("Enter semester");
  if (inputSemester === undefined) {
    console.log("You entered nothing");
  } else {
    await fetch(`/.netlify/functions/AddSemester`, {
      method: "post",
      body: JSON.stringify({ semester: `${pname}-Semester-${inputSemester}` }),
    });
  }
}
export default SemesterAddition;
