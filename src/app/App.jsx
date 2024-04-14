"use client"
import React, {useState, useEffect} from 'react';

import Dashboard from './components/Dashboard';
// import LogIn from '@/components/UserAccountComponents/LogIn';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    // if (loggedIn == false) {
    //     return <LogIn
    //         loggedIn={loggedIn}
    //         setLoggedIn={setLoggedIn}
    //     />
    //   } else {
        return (
          <Dashboard
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
           
          />
        )
    //   }
}

export default App