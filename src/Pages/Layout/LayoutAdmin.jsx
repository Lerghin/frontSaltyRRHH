import { useState } from "react";

import Nav from "../../Componentes/Nav";
import { LINKSHOME, LINKSLOG } from "../../Utils/enums";
import LogInDropdown from "../../Componentes/LogInDropdown";
import { Outlet } from 'react-router-dom';
import './MainLayout.css';



const LayoutAdmin = () => {
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <>
    <div className="w-100 h-[10vh]  bg-teal-700 relative">
      <header className="w-100 h-100  d-flex  justify-content-between align-items-center   ">
        <div className=" d-flex align-items-center    overflow-hidden ">
          <img
            src="https://i.ibb.co/vY4WCxQ/logo.png"
            alt="Logo"
            className="logo"
          />
          <h1 className=" logo-h1 hidden sm:block text-1xl text-white uppercase translate-y-0.3 translate-x-8 font-bold w-80 ">
           Saltysnack Tuyero C.A.
          </h1>
          
          
          
         
          <LogInDropdown  setLogin={setLogin} login={login} />
          { login &&(
             <Nav className="log-right  nav-init absolute flex right-5  z-1  text-white  font-medium text-lg flex-col gap-4 bg-teal-700 p-4 border border-gray-400 rounded-md" links={LINKSLOG}/>
             
         ) }
       
          { menu &&(
             <Nav className="sm:hidden absolute z-1 flex right-24 top-12 text-white  font-medium text-lg flex-col gap-4 bg-teal-700 p-4 border border-gray-400 rounded-md"links={LINKSHOME}/>
             
         ) }
        
        </div>
        
          
      
      </header>
   
    <div className="min-h-screen  w-100">
         {/*children*/}
         <Outlet />
    </div>
    </div>
    </>
  );
};

export default LayoutAdmin;