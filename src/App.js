import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppContextProvider } from "./AppContext";
import Home from "./containers/Home";
import Search from "./containers/Search";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
  ]);
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
