// import { Navigate, useLocation } from "react-router-dom";
// import { Preloader } from "../ui/preloader/preloader";
// import { useSelector } from "../../services/store";

// type ProtectedProps = {
//   component: React.JSX.Element;
//   onlyUnAuth?: boolean;
// };

// export const Protected = ({
//   component,
//   onlyUnAuth = false
// }: ProtectedProps): React.JSX.Element => {
//   const user = useSelector(selectUser);
//   const location = useLocation();
//   // const isAuthenticated = useSelector(selectIsAuthenticated);
//   const isAuthChecked = useSelector(selectIsAuthChecked);

//   if (!isAuthChecked) {
//     return <Preloader />;
//   }
//   // if (!onlyUnAuth && !isAuthenticated) {
//   //   return <Navigate to='/login' state={{ from: location }} />;
//   // }

//   if (!onlyUnAuth && !user) {
//     return <Navigate to='/login' state={{ from: location }} />;
//   }

//   if (onlyUnAuth && user) {
//     const from = location.state?.from || { pathname: '/' };
//     return <Navigate to={from} />;
//   }

//   //onlyUnAuth && !user for autorized and unautorized
//   //!onlyUnAuth && user or autorized and autorized
//   return component;
// };
