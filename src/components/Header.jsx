import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { navigation } from '../constant/navigation';


function Header() {
    const location=useLocation();
    const removeSpace=location?.search?.slice(3).split('%20').join(" ")
    const[searchInput,setSearchInput]=useState(removeSpace);
    const navigate=useNavigate();
   


    useEffect(()=>{
        if(searchInput){
            navigate(`/search?q=${searchInput}`);
        }
       
    },[searchInput]);
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <header className=' fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40'>
        <div className='  container   mx-auto  px-2 flex items-center h-full  '>
            <NavLink to={"/"}>
                <img src={logo} alt="logo" width={120} />
                
            </NavLink>
                 <nav className='hidden  md:flex  items-center gap-2 ml-4 '>
                    {
                        navigation.map((nav,ind)=>(<div>
                            <NavLink key={nav.label} to={nav.href} className={({ isActive }) =>
  `px-3 hover:text-neutral-100 ${isActive ? 'text-neutral-200' : ''}`
}>
                                {nav.label}</NavLink>
                        </div>))
                    }
                 </nav>
                 <div className='ml-auto flex items-center gap-4'>
                    <form className='flex items-center  gap-1 ' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Search here...' className='bg-transparent px-4 py-1 outline-none hidden md:block'
                        onChange={(e)=>setSearchInput(e.target.value)} value={removeSpace}/>
                    <button className='text-2xl text-white hidden md:block'>
                    <IoSearch/>
                    </button>
                    </form>
                    <div className='w-9 h-9 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all '>
                        <img src={user} alt="user" width="h-ful w-ful"/>
                    </div>
                 </div>
        </div>
    </header>
  )
}

export default Header