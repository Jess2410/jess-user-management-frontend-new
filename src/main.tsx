import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PermissionPage from "./features/Layout/permissions/PermissionPage.tsx";
import PermissionAddPage from "./features/Layout/permissions/PermissionAddPage.tsx";
import AccountPage from "./features/Layout/accounts/AccountPage.tsx";
import AccountAddPage from "./features/Layout/accounts/AccountAddPage.tsx";
import RolePage from "./features/Layout/roles/RolePage.tsx";
import RoleAddPage from "./features/Layout/roles/RoleAddPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/permissions",
    element: <PermissionPage />,
  },
  {
    path: "/permission/add",
    element: <PermissionAddPage />,
  },
  {
    path: "/permission/:id",
    element: <PermissionAddPage />,
  },
  {
    path: "/accounts",
    element: <AccountPage />,
  },
  {
    path: "/account/add",
    element: <AccountAddPage />,
  },
  {
    path: "/account/:id",
    element: <AccountAddPage />,
  },
  {
    path: "/roles",
    element: <RolePage />,
  },
  {
    path: "/role/add",
    element: <RoleAddPage />,
  },
  {
    path: "/role/:id",
    element: <RoleAddPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
