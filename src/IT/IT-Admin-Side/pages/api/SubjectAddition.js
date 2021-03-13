import Swal from 'sweetalert2'
async function SubjectAddition(sname) {

  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2']
  }).queue([
    {
      title: 'Subject Title',
      text: 'Enter Subject Title',
    },
    {
      title: 'Subject Credit-Hours',
      text: 'Enter Subject Credit-Hours',
      input: 'number',
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
    await fetch(`/.netlify/functions/AddSubject`, {
        method: 'post',
        body: JSON.stringify({ subject: `${sname}_${receive[0]}`, credit_hours: receive[1]  })
    })
  }
  // let inputSubject = prompt("Enter subject title");
  // if (inputSubject == null) {
  //   console.log("You entered nothing");
  // } else {
  //   await fetch(`/.netlify/functions/AddSubject`, {
  //     method: "post",
  //     body: JSON.stringify({ subject: `${sname}_${}`, credit_hours:  }),
  //   });
  // }
}
export default SubjectAddition;
