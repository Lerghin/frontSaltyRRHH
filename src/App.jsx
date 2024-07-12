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
import Applicants from "./Pages/RegistarUser/Applicants";
import CreateAdmin from "./Pages/CreateAdmin";
import VerCV from "./Pages/RegistarUser/VerCv";
import VacancyUser from "./Pages/Vacantes/VacancyUser";
import MyApp from "./Pages/RegistarUser/MyApp";


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
        path: '/signUpUser',
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
            path: '/homeUser',
            element: <HomeUser />
          },
          {
            path: '/homeUser/:idApplicant',
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
            path: '/vacantUser',
            element: <VacancyUser/>
          },
          
        
        
          {
            path: '/users',
            element:<Users/>
          },
          {
            path: '/aplicantes',
            element:<Applicants/>
          },
          {
            path: '/myApp',
            element: <MyApp/>
          },
          {
            path: '/',
            element: <MainLayout/>,
            children: [
              {
                path: '/createAdmin',
                element:<CreateAdmin />
              },
              {
                path: '/createUser',
                element:<CreateUser/>
              },
              {
                path: '/registerUser/:id',
                element: <RegisterUser/>
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
                path: '/verCV/:idApplicant',
                element: <VerCV/>
              },
             
             
            ]
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
