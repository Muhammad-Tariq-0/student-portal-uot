async function SubjectResultAddition(sname,rollN0,subj,credit_hours,Mid,Final,Sessional,total,SubjectGPA) {
    console.log(sname,rollN0,subj,Mid,Final,Sessional,total)
      await fetch(`/.netlify/functions/AddResult`, {
        method: "post",
        body: JSON.stringify({ sname:sname, rollN0:rollN0, subj:subj, credit_hours: credit_hours, Mid:Mid, Final:Final, Sessional:Sessional, total: total, SubjectGPA: SubjectGPA }),
      });
  }
  export default SubjectResultAddition;
  