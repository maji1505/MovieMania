import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { data } from 'autoprefixer';

function Explore() {
  const params=useParams();
  const [pageNo,setPageNo]=useState(1);
  const [data,setData]=useState([]);
  const[totalPageNO,setTotalPageNO]=useState(0);
  // console.log(params);
  
  const fetchData=async ()=>{
    try{
      const response=await axios.get(`/discover/${params.explore}`,
        {
          params:{
            page:pageNo
        }
        }
      )
      setData((preve)=>{
        return[
          ...preve,
          ...response.data.results
        ]
      })
      setTotalPageNO(response.data.total_pages);
    }catch(error){
         console.log(error);
    }
  }
  const handleScroll=()=>{
    if(window.innerHeight+window.scroll >= document.body.offsetHeight){
      setTotalPageNO(preve=>preve+1);
    }
  }
  useEffect(()=>{
    fetchData();
  },[pageNo]);
  useEffect(()=>{
    setPageNo(1);
    setData([]);
    fetchData();
  },[params.explore])
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
  },[])
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
  },[])

  return (
    <div className='py-16'>
      <div className='container mx-auto '>
        <h3 className='capitalize text-lg md:text-2xl font-semibold mb-2 mt-1'>Popular {params.explore} show</h3>
        <div className='grid grid-cols-[repeat(auto-fit,188px)] gap-5 justify-center md:justify-start'>
          {
            data.map((exploreData,index)=>{
              return(
                <Card data={exploreData} key={exploreData.id+'exploreSection'} media_type={params.explore}/>
            )
            })
          }
        </div>
      </div>
    </div>
  )
}


export default Explore