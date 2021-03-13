
async function SemesterDeletion(id) {
    console.log(id)
      await fetch(`/.netlify/functions/DeleteSubject`, {
        method: 'post',
        body: JSON.stringify({ id: id})
    })
}
export default SemesterDeletion;