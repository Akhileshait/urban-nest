
import "./components/navbar/Navbar.jsx"
import Navbar from "./components/navbar/Navbar.jsx"
import HomePage from "./routes/homePage/homePage.jsx"
import ListPage from "./routes/listPage/listPage.jsx"
import Layout from "./routes/layout/layout.jsx"
import SinglePage from "./routes/singlePage/singlePage.jsx"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


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
      ],
    },
  ]);

  return (
    
    <RouterProvider router={router}/>
  )
}

export default App