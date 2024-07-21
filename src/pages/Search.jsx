import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

function Search() {
  const location=useLocation();
  const [data,setData]=useState([]);
  const[page,setPage]=useState(1);
  const navigate=useNavigate();
  const query=location?.search?.slice(3)

  const fetchData=async ()=>{
    try{
      const response=await axios.get(`search/multi`,
        {
          params:{
            query:location?.search?.slice(3),
            page
        }
        }
      )
      setData((preve)=>{
        return[
          ...preve,
          ...response.data.results
        ]
      })
    }catch(error){
         console.log(error);
    }
  }
  useEffect(()=>{
    if(query){
    setPage(1);
    setData([])
    fetchData();
  }
  },[location?.search]);
  const handleScroll=()=>{
    if(window.innerHeight+window.scroll >= document.body.offsetHeight){
      setPage(preve=>preve+1);
    }
  }
  useEffect(()=>{
    if(query){
      fetchData();
    }
    
  },[page]);
  return (
    <div className='py-16 '>
      <div className='md:hidden my-2 mx-2 text-neutral-900 sticky top-[67px] z-30'>
        <input type='text' placeholder='Search here...' onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
        className='px-4 py-1 text-lg w-full bg-white rounded-full' value={query.split("%20").join(" ")}/>
      </div>
      <div className='container mx-auto '>
      <h3 className='capitalize text-lg md:text-2xl font-semibold mb-2 mt-1'>Search Results</h3>
      <div className='grid grid-cols-[repeat(auto-fit,188px)] gap-5 justify-center md:justify-start'>
          {
            data.map((searchData,index)=>{
              return(
                <Card data={searchData} key={searchData.id+'search'} media_type={searchData.id}/>
            )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Search;