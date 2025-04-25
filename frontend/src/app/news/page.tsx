import React from 'react'
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function News() {
  return (
    <div className=" bg-gray-200 w-screen">
          <NavBar/>
          <div className='min-h-screen w-screen'>
            {/*Phần News*/}
            <div className='flex flex-col w-screen bg-red-50'>

              {/*Phần banner*/}
              <div className='flex justify-center items-center mt-20 min-h-screen'>
                <h1 className='text-black'>Phần banner New</h1>
              </div>
              {/*Phần menumenu*/}
              <div className='flex justify-center items-center mt-20 min-h-screen'>
                <h1 className='text-black'>Phần Menu New</h1>
              </div>
              {/*Phần banner*/}
              <div className='flex justify-center items-center mt-20 min-h-screen'>
                <h1 className='text-black'>Phần banner New</h1>
              </div>
            </div>
            
          </div>
          <Footer/>
        </div>
    
  )
}
