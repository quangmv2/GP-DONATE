import Dashboard from "components/PrivatePages/Dashboard/Dashboard";

export const singleRoutes = [
    {
        path: "/client",
        component: Dashboard,
        exact: true
    },
    {
        path: "/client/dashboard",
        component: Dashboard,
        exact: true
    }
];
