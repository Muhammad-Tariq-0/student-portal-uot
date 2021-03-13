async function ComplaintDeletion(id) {
 
    await fetch(`/.netlify/functions/DeleteComplaint`, {
      method: "post",
      body: JSON.stringify({
        complaintId: id,
      }),
    });
}
export default ComplaintDeletion