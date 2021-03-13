import Swal from 'sweetalert2'
async function ProgramAddition() {
  const { value: inputProgram } = await Swal.fire({
    input: 'text',
    inputLabel: 'Program Title',
    inputPlaceholder: 'Enter title ',
    showCancelButton: true
  })
  if (inputProgram) {
    Swal.fire(`Entered Program: ${inputProgram}`)
  }
    // let inputProgram = prompt("Enter Progam Name");
    if (inputProgram === undefined){
      console.log("You entered nothing")
    }
    else{
      await fetch(`/.netlify/functions/AddProgram`, {
        method: 'post',
        body: JSON.stringify({ program: inputProgram})
    })
    }
  }
export default ProgramAddition;