import { useEffect, useState } from "react";
import axios from "axios";

function UsersAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isManag, setIsManag] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("users/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsManag(true) : setIsManag(false);
          setUserInfo(res.data);
   
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);



  return {
    isLogged: [isLogged, setIsLogged],
    isManag: [isManag, setIsManag],
    userInfo: [userInfo, setUserInfo]
  };
}

export default UsersAPI;
