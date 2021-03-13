var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const messageBody = JSON.parse(event.body);
    var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });

    const result = await adminClient.query(
      q.Update(q.Ref(q.Collection("results"),messageBody.Id),
      { data: {  Mid : messageBody.mid, Final : messageBody.final, Sessional: messageBody.sessional, total: messageBody.total, SubjectGPA: messageBody.SubjectGPA} },
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message:  result.ref.id}),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}