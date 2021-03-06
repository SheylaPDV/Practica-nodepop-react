// import { useMemo, useState, useCallback, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Button from "../../common/button";
// import { login } from "../service";
// import FormField from "../../common/FormField";
import "../../../assets/css/LoginPage.css";
// import T from "prop-types";

// function useRenders() {
//   const count = useRef(1);

//   useEffect(() => {
//     count.current++;
//   });
//   return count.current;
// }

// function LoginPage({ onLogin }) {
//   const renders = useRenders();
//   const ref = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log(ref.current);
//     ref.current.focus();
//   }, []);

//   const { email, password, remember } = credentials;

//   const handleChange = useCallback((event) => {
//     setCredentials((credentials) => ({
//       ...credentials,
//       [event.target.name]:
//         event.target.type === "checkbox"
//           ? event.target.checked
//           : event.target.value,
//     }));
//   }, []);

//   const resetError = () => setError(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       resetError();
//       setIsLoading(true);
//       await login(credentials);
//       setIsLoading(false);
//       onLogin();
//       const from = location.state?.from?.pathname || "/adverts";
//       navigate(from, { replace: true });
//     } catch (error) {
//       setError(error);
//       setIsLoading(false);
//     }
//   };

//   const buttonDisabled = useMemo(() => {
//     console.log("calculando...");
//     return !email || !password || isLoading;
//   }, [email, password, isLoading]);

//   return (
//     <div className="loginPage">
//       {renders}
//       <h1 className="loginPage-title">Log in to Nodepop</h1>
//       <form className="loginForm" onSubmit={handleSubmit}>
//         <FormField
//           type="text"
//           name="email"
//           label="email"
//           className="loginForm-field"
//           value={credentials.email}
//           onChange={handleChange}
//         />
//         <FormField
//           type="password"
//           name="password"
//           label="password"
//           className="loginForm-field"
//           value={password}
//           onChange={handleChange}
//           ref={ref}
//         />
//         <input
//           type="checkbox"
//           name="remember"
//           checked={remember}
//           value="remember"
//           onChange={handleChange}
//         />
//         <label>Recordar contrase??a</label>

//         <Button
//           className="loginForm-submit"
//           type="submit"
//           variant="primary"
//           disabled={buttonDisabled}
//         >
//           Log in
//         </Button>
//       </form>
//       {error && (
//         <div onClick={resetError} className="loginPage-error">
//           {error.message}
//         </div>
//       )}
//     </div>
//   );
// }

// LoginPage.propTypes = {
//   onLogin: T.func,
// };

// export default LoginPage;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context";
import { login } from "../service";
import LoginForm from "./LoginForm";
import useMutation from "../../hooks/useMutation";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin } = useAuth();
  const { isLoading, error, execute, resetError } = useMutation(login);

  const handleSubmit = (credentials) => {
    execute(credentials)
      .then(handleLogin)
      .then(() => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
