import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";
import loading from "./assets/img/brand/loading.gif";

function Loading() {
  return (
    <div className="text-center">
      <img
        src={loading}
        alt="loading"
        style={{ marginTop: "5%", height: "50%", width: "50%" }}
      />
    </div>
  );
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading
});

// const Admin = Loadable({
//   loader: () => import("./views/Admin"),
//   loading: Loading
// });

const Checklist = Loadable({
  loader: () => import("./views/Checklist"),
  loading: Loading
});

// const Login = Loadable({
//   loader: () => import("./views/Login"),
//   loading: Loading
// });

const MobilTangki = Loadable({
  loader: () => import("./views/MobilTangki"),
  loading: Loading
});

const User = Loadable({
  loader: () => import("./views/User"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/mobiltangki", name: "MobilTangki", component: MobilTangki },
  // { path: "/admin", name: "Admin", component: Admin },
  { path: "/checklist", name: "Checklist", component: Checklist },
  // { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/user", exact: true, name: "User", component: User }
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
