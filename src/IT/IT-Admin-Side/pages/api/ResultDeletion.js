
async function ResultDeletion(id) {
    console.log(id)
      await fetch(`/.netlify/functions/DeleteResult`, {
        method: 'post',
        body: JSON.stringify({ id: id})
    })
}
export default ResultDeletion;