import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ItAdmin from './IT/ItAdmin'
import ItStudent from './IT/ItStudent'
import uot33 from './IT/loader-images/uot33.gif'

function App() {
  // navigator.serviceWorker.register('/firebase-messaging-sw.js');
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [role, setRole] = React.useState();
  const { loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (user) {
      setRole(user["https://fauna.com/user_metadata"].role);
    }
  }, [user]);

  if (isLoading) {
    return (
      <center>
    <img style={{marginTop:'15%'}} src={uot33} alt='loading...' width={200} height={200}/>;
    </center>
    )
  }

  if (isAuthenticated) {
    console.log(role)
    return (
      <React.Fragment>
        <>
          {role === "admi" && <ItAdmin />}
          {role === "student" && <ItStudent />}
        </>
      </React.Fragment>
    );
  } else {
    loginWithRedirect();
  }
}

export default App;

















// import React from 'react'
// import IT_Admin from './IT/IT_Admin'
// // import IT_Student from './IT/IT_Student'

// const App = () => {
//   return (
//     <div>
//       <IT_Admin/>
//       {/* <IT_Student/> */}
//     </div>
//   )
// }

// export default App
