import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBranerData, setImageURL } from './store/movieoSlice'

function App() {
          const dispatch=useDispatch();

  const fetchTrendingData= async()=>{
    try{
      const response=await axios.get("/trending/all/week")
      dispatch(setBranerData(response.data.results));
      // console.log(response.data.results);
    }
    catch(error){
      console.log(error)
    }
  }
  const fetchConfiguration=async ()=>{
    try{
      const response= await axios .get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url+"original"))
      // console.log(response.data.images.secure_base_url+"original");
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
  fetchTrendingData();
  fetchConfiguration();
  },[])
  return (
    <main className='pb-14 md:pb-0'>
    <Header/>
     <div className='min-h-[91vh]'>
      <Outlet/>
     </div>
     <Footer/>
     <MobileNavigation/>
    </main>
  )
}

export default App
