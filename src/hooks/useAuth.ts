import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (id: string) => {
      // set locating effect
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // success
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: "Login", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "User not found", status: "error" });
            setLoading(false);
          }
        })
        // error
        .catch(() => showMessage({ title: "User not found", status: "error" }));
      setLoading(false);
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
