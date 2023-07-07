import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route } from "~/types";

const AuthLayout = lazy(() => import("~/layouts/AuthLayout"));
const MainLayout = lazy(() => import("~/layouts/MainLayout"));
const PrivateRoute = lazy(() => import("~/routes/PrivateRoute"));

const NotFound = lazy(() => import("~/pages/NotFound"));
const Login = lazy(() => import("~/pages/auth/Login"));
const Register = lazy(() => import("~/pages/auth/Register"));

const Home = lazy(() => import("~/pages/content/Home"));
const About = lazy(() => import("~/pages/content/About"));

const routes: Route[] = [
  {
    auth: true,
    layout: true,
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    layout: true,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    layout: true,
    name: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

const authCheck = (routes: Route[]) =>
  routes?.map((route: Route) => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.children) {
      route.children = authCheck(route.children);
    }
    if (route?.layout) {
      route.element = (
        <ErrorBoundary fallback={<div className="text-center">Bir hata oluştu</div>}>
          <Suspense fallback={<div>Yükleniyor...</div>}>{route.element}</Suspense>
        </ErrorBoundary>
      );
    } else {
      route.element = (
        <ErrorBoundary fallback={<div className="text-center">Bir hata oluştu</div>}>
          <Suspense fallback={<div>Yükleniyor...</div>}>{route.element}</Suspense>
        </ErrorBoundary>
      );
    }
    return route;
  });

const Routes = React.memo(() => {
  return <RouterProvider router={createBrowserRouter(authCheck(routes))} />;
  //   return <Suspense fallback={"Loading..."}>{useRoutes(routes)}</Suspense>;
});
export default Routes;
