
import "./components/navbar/Navbar.jsx"
import HomePage from "./routes/homePage/homePage.jsx"
import ListPage from "./routes/listPage/listPage.jsx"
import Layout from "./routes/layout/layout.jsx"
import SinglePage from "./routes/singlePage/singlePage.jsx"
import "./index.scss"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProfilePage from "./routes/profilePage/profilePage.jsx"
import Register from "./routes/register/register.jsx"
import Login from "./routes/login/login.jsx"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout/>
      ),
      children: [
        { path: "/", element: <HomePage/> },
        { path: "/list", element: <ListPage/> },
        { path: "/:id", element: <SinglePage/> },
        { path: "/profile", element: <ProfilePage/> },
        { path: "/register", element: <Register/> },
        { path: "/login", element: <Login/> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App