import "../styles/globals.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://assessment.api.vweb.app/user").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
