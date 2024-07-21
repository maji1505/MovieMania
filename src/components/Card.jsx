import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

function Card({data,trending,index,media_type}) {
    const imageURL = useSelector(state => state.movieoData.imageURL)
const mediaType=data.media_type || media_type
  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[190px] max-w-[190px] h-50 overflow-hidden block rounded relative hover:scale-105 transition-all'>
        {
          data?.poster_path?(
            <img src={imageURL+data?.poster_path} alt="image" />
          ):
          <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>No Image Found</div>
        }
       
    <div className='absolute top-4'>
        {
             trending && (
            <div className='py-1 px-2 bg-black/60 backdrop-blur-3xl rounded-r' >
                #{index} Trending
                </div>
             )
        }
    </div>
    <div className='absolute bg-black/60 p-2 backdrop-blur-3xl w-full bottom-0 h-12 '>
   <h4 className='text-ellipsis line-clamp-1 text-sm text-white'>{data.title || data.name}
   </h4>
   <div>
    <p className='text-sm text-neutral-400'>{moment (data.release_date).format("MMMM Do YYYY")}</p>
   </div>
    </div>
    </Link>
  )
}

export default Card