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
import AplicantByVacacant from "./Pages/Vacantes/AplicantByVacacant";
import UserDetails from "./Pages/RegistarUser/UserDetails";
import CreateVacant from "./Pages/Vacantes/CreateVacant";
import EditVacancy from "./Pages/Vacantes/EditVacancy";
import CreateUser from "./Pages/RegistarUser/CreateUser";
import Users from "./Pages/Users";


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
          {
            path: '/appVacants/:id',
            element: <AplicantByVacacant/>
          },
          {
            path: '/watchApp/:idApplicant',
            element: <UserDetails/>
          },
          
          {
            path: '/createVacant',
            element: <CreateVacant/>
          },
          {
            path: '/editVacant/:id',
            element: <EditVacancy/>
          },
          {
            path: '/createUser',
            element:<CreateUser/>
          },
          {
            path: '/users',
            element:<Users/>
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
