import React, { useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/fetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Devider from '../components/Devider';
import { Container } from 'postcss';
import HorizontalCard from '../components/HorizontalCard';
import Video from '../components/Video';


function Detail() {
  const params = useParams();
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params.explore}/${params?.id}/credits`)
  const {data:similarData}=useFetch(`/${params.explore}/${params?.id}/similar`)
  const {data:recomendedData}=useFetch(`/${params.explore}/${params?.id}/recommendations`)
  const [playVideo,setPlayVideo]=useState(false);
  const [playVideoId,setPlayVideoId]=useState("");
  
  if (!data) {
    return <div>Loading...</div>;
  }
  const handlePlayVideo=(data)=>{
 setPlayVideoId(data);
 setPlayVideo(true);
  }

  const duration = (data?.runtime/60).toFixed(1).split(".");
  return (
    <div >
      <div className='w-full h-[275px] relative hidden md:block'>
        <div className='w-full h-full'>
          <img src={imageURL + data?.backdrop_path} alt="" className='h-full w-full object-cover' />
        </div>
        <div className='absolute h-full w-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>
      <div className='container  mx-auto px-3 py-16 md:py-0 flex flex-col gap-4 md:flex-row md:gap-10'>
        <div className='md:-mt-24 relative mx-auto w-fit md:mx-0 min-w-60'>
          <img src={imageURL + data?.poster_path} alt="" className='h-[320px] w-64  md:w-60 rounded object-cover' />
          <button className='bg-white px-8 py-2 text-black font-bold rounded mt-3 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'
          onClick={()=>handlePlayVideo(data)}>
                                    Play Now
                                </button>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-white md:text-3xl'>{data.title || data.name}</h2>
          <p className='text-neutral-400'>{data.tagline}</p>
           <Devider/>
          <div className='flex items-center  gap-2'>
            <p>
              Rating : {Number(data.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              Views : {Number(data.vote_count)}
            </p>
            <span>|</span>
            {
              (params.explore=="movie" && <p> Duration : {duration[0]}h {duration[1]}m </p> ||
                <p>Season : {data.number_of_seasons}</p>
              )

            }
          </div>
          <Devider/>
          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview :</h3>
            <p>{data.overview}</p>
            <Devider/>
            <div className='flex items-center gap-2 my-3 '>
              <p>Status : {data.status}</p>
            <span>|</span>
            <p>Release Date : {moment (data.release_date).format("MMMM Do YYYY")}</p>
          <span>|</span>
          <p>Revenue : {Number(data.revenue)}</p>
            </div>
            <Devider/>
          </div>
          <div>
            <p><span className='text-white'>Director : </span> {castData?.crew[0]?.name}</p>
            {/* <p><span className='text-white'>Writer : </span> </p> */}
          </div>
          <Devider/>
          <h2 className='font-bold text-lg '>Cast : </h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-4'>
            {
              castData?.cast?.filter(el=>el?.profile_path).map((cast,index)=>{
                return(
                  <div> 
                    <div> 
                      <img src={imageURL+cast?.profile_path} alt="" className='w-24 h-24 object-cover rounded-full' />
                      </div>
                      <p className='font-bold text-center text-sm text-neutral-400'>{cast?.name}</p>
                    </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div>
        <HorizontalCard data={similarData} heading={'Similar ' + params.explore}  media_type={params.explore}/>
        <HorizontalCard data={recomendedData} heading={'Recommendation ' + params.explore}  media_type={params.explore}/>
      </div>
      {
        playVideo && (<Video data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>)
      }
    </div>
  )
}

export default Detail