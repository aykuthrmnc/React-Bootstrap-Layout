import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import TablePage from "~/pages/TablePage";
import { Route } from "~/types";

const AuthLayout = lazy(() => import("~/layouts/AuthLayout"));
const MainLayout = lazy(() => import("~/layouts/MainLayout"));
const PrivateRoute = lazy(() => import("~/routes/PrivateRoute"));

const NotFound = lazy(() => import("~/pages/NotFound"));
const Login = lazy(() => import("~/pages/auth/Login"));
const Register = lazy(() => import("~/pages/auth/Register"));

const Home = lazy(() => import("~/pages/Home"));
const Profile = lazy(() => import("~/pages/Profile"));

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
        path: "table",
        element: <TablePage />,
      },
      {
        path: "personeller",
        element: <Profile />,
      },
      {
        path: "izinler",
        element: <div></div>,
      },
      {
        path: "takvim",
        element: <div></div>,
      },
      {
        path: "sirket",
        element: <div></div>,
      },
      {
        path: "raporlar",
        element: <div></div>,
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
    auth: true,
    layout: true,
    path: "hesapmen",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <div></div>
      },
      {
        path: "cari",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div></div>
          },
          {
            path: ":id",
            element: <div></div>
          },
          {
            path: "list",
            element: <div></div>
          },
        ],
      },
      {
        path: "cari-islemleri/:id",
        element: <div></div>,
      },
      {
        path: "devir-islemleri/:id",
        element: <div></div>,
      },
      {
        path: "cari-hareket",
        element: <div></div>,
      },
      {
        path: "cari-ekstre",
        element: <div></div>
      },
      {
        path: "cari-bakiye",
        element: <div></div>
      },
      {
        path: "stock",
        element: <div></div>,
      },
      {
        path: "inventories",
        element: <div></div>,
      },
      {
        path: "inventory",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <div></div>,
          },
        ],
      },
      {
        path: "add-stock-receipt/:id",
        element: <div></div>,
      },
      {
        path: "stock-receipt/:id/:evrakNo",
        element: <div></div>,
      },
      {
        path: "stock-categories",
        element: <div></div>,
      },
      {
        path: "stock-category",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div></div>,
          },
          {
            path: ":id",
            element: <div></div>,
          },
        ],
      },
      {
        path: "stock-movement",
        element: <div></div>,
      },
      {
        path: "stock-extract",
        element: <div></div>,
      },
      {
        path: "offers",
        element: <div></div>,
      },
      {
        path: "offer",
        element: <Outlet />,
        children: [
          {
            path: ":teklifId",
            element: <div></div>,
          },
          {
            path: ":id/:evrakno",
            element: <div></div>,
          },
        ],
      },
      {
        path: "create-offer/:id",
        element: <div></div>,
      },
      {
        path: "orders",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div></div>,
          },
          {
            path: ":siparisId",
            element: <div></div>,
          },
        ],
      },
      {
        path: "create-order/:id",
        element: <div></div>,
      },
      {
        path: "bills",
        element: <div></div>,
      },
      {
        path: "bill/:faturaId",
        element: <div></div>,
      },
      {
        path: "create-bill/:id",
        element: <div></div>,
      },
      {
        path: "expense-bill",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <div></div>,
          },
          {
            path: ":id/:evrakno",
            element: <div></div>,
          },
        ],
      },
      {
        path: "check-and-bill",
        element: <div></div>,
      },
      {
        path: "check/:id",
        element: <div></div>,
      },
      {
        path: "create-check/:id",
        element: <div></div>,
      },
      {
        path: "staff/:id",
        element: <div></div>,
      },
      {
        path: "add-staff",
        element: <div></div>,
      },
      {
        path: "branch/:id",
        element: <div></div>,
      },
      {
        path: "add-branch",
        element: <div></div>,
      },
      {
        path: "store/:id",
        element: <div></div>,
      },
      {
        path: "add-store",
        element: <div></div>,
      },
      {
        path: "unit",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div></div>,
          },
          {
            path: ":id",
            element: <div></div>,
          },
        ],
      },
      {
        path: "settings",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div></div>,
          },
          {
            path: ":tabKey",
            element: <div></div>,
          },
        ],
      },
      {
        path: "company",
        element: <div></div>,
      },
      {
        path: "refresh/*",
        element: <div></div>,
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
