import React from 'react'
import { mobileNavigation } from '../constant/navigation';
import { NavLink } from 'react-router-dom';

function MobileNavigation() {
  return (
    <section className='md:hidden h-14 bg-balck bg-opacity-70 backdrop-blur-3xl  bottom-0 w-full fixed z-40'>
 <div className='flex items-center justify-between h-full text-neutral-400'>
    {
        mobileNavigation.map((nav,index)=>{
            return(
                <NavLink key={nav.label} to={nav.href} className={({isActive})=>`px-4 flex h-full items-center flex-col justify-center ${isActive  && "text-white"}`}>
                    <div className='text-2xl'>
                        {nav.icon}
                    </div>
                    <p className='text-sm'>{nav.label}</p>
                </NavLink>
            )
        })
    }
 </div>
    </section>
  )
}

export default MobileNavigation;