import Swal from 'sweetalert2'
async function ResultUpdation(id,Mid,Final,Sessional) {
Swal.mixin({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3']
}).queue([
  {
      title: 'Mid Marks',
      text: 'Enter Updated Marks',
      input: 'number',
      inputValue: Mid
       },
  {
      title: 'Final Marks',
      text: 'Enter Updated Marks',
      input: 'number',
      inputValue: Final
  },
  {
      title: 'Sessional Marks',
      text: 'Enter Updated Marks ',
      input: 'number',
      inputValue: Sessional
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
  let total = parseInt(receive[0]) + parseInt(receive[1]) + parseInt(receive[2]);
  if (total >= 85) {
    let SubjectGPA = 4.00;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 80 && total <= 84) {
    let SubjectGPA = 3.70;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 75 && total <= 79) {
    let SubjectGPA = 3.30;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 70 && total <= 74) {
    let SubjectGPA = 3.00;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 65 && total <= 69) {
    let SubjectGPA = 2.70;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 61 && total <= 64) {
    let SubjectGPA = 2.30;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 58 && total <= 60) {
    let SubjectGPA = 2.00;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 53 && total <= 57) {
    let SubjectGPA = 1.70;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total >= 50 && total <= 52) {
    let SubjectGPA = 1.00;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
else if (total < 50) {
    let SubjectGPA = 0.00;
    await fetch(`/.netlify/functions/UpdateResult`, {
      method: 'post',
      body: JSON.stringify({ Id: id, mid: receive[0], final: receive[1], sessional: receive[2], total : total, SubjectGPA: SubjectGPA })
  })
}
}

}
export default ResultUpdation

















