import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Signin from "./Pages/Signin";
import SignupForm from "./Pages/Signup";
import { Provider, useSelector} from "react-redux";


import "react-toastify/dist/ReactToastify.css";
import RegisterUser from "./Pages/RegistarUser/RegisterUser";
import HomeUser from "./Pages/homeUser/HomeUser";
import MainLayout from "./Pages/Layout/MainLayout";
import store from "./Store/store";
import Vacantes from "./Pages/Vacantes/Vacantes";


const ProtectedRoute = () => {
  const status = useSelector(state => state.applicant.status);
  if (status === "online") {
    return <Outlet />;
  }
  return <Navigate to='/' />;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element:<SignupForm />
      },
      {
        path: '/signin',
        element:<Signin/>
      }
    ]
  },
  
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
       
        children: [
        
        
          {
            path: '/registerUser/:id',
            element: <RegisterUser/>
          },
          {
            path: '/homeUser',
            element: <HomeUser />
          },
          {
            path: '/vacantes',
            element: <Vacantes/>
          },
        ]
      }
    ]
  }
]);

function App() {

  
       

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <ToastContainer />
      </RouterProvider>
    </Provider>
  );
}

export default App;
