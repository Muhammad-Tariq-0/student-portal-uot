async function StudentDeletion(id) {
 
    await fetch(`/.netlify/functions/DeleteStudent`, {
      method: "post",
      body: JSON.stringify({
        studentId: id,
      }),
    });
}
export default StudentDeletion