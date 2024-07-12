

import { Outlet } from 'react-router-dom';
import './MainLayout.css';



const MainLayout = () => {


  return (
    <>
    <div className="w-100 h-[10vh]  bg-teal-700 relative">
      <header className="w-100 h-100  d-flex  justify-content-between align-items-center   ">
        <div className=" d-flex align-items-center    overflow-hidden ">
      
          <h1 className=" logo-h1 hidden sm:block text-1xl  m-1 uppercase translate-y-0.3 translate-x-8 font-bold w-80 ">
           Saltysnack Tuyero C.A.
          </h1>
       
       
        
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

export default MainLayout;
