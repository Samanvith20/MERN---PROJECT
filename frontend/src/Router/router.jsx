import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Home/Signup";

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
            }
        ]

    },
    {
        path:"/signup",
        element:<Signup/>
    }

]
)
 export default router