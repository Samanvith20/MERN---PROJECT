import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Home/Signup";
import UserProfile from "../pages/Dashboard/UpdateProfile";

const router= createBrowserRouter(
    [
        {
            path:"/",
            element:<Main/>,
            children:[
                {
                 path:"/",
                 element:<Home/>
            },
            {
                path:"/menu",
                element:<Menu/>
            },
            {
                path: "/update-profile",
                element: <UserProfile/>
              },
        ]

    },
    {
        path:"/signup",
        element:<Signup/>
    }

]
)
 export default router