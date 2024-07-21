// import React from 'react'
// import { MdClose } from "react-icons/md";
// import useFetchDetails from '../hooks/fetchDetails';

// function Video({data,close,media_type}) {
//     // console.log(data);/
//     const {data:videoData}=useFetchDetails(`/${media_type}/${data?.id}/videos`)
//     // console.log("kushal")
//     if (!videoData) {
//         return <div>Loading...</div>;
//       }
//     console.log(videoData.results[0].key);
    
//   return (
//     <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50  justify-center items-center flex'>
//         <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>
//         <button className=' absolute -right-1 -top-6 text-3xl text-white' onClick={close}>
//             <MdClose/>
//          </button>
//          <iframe src={`https://www.youtube.com/watch?v=${videoData?.results[0]?.key}`} frameborder="0"
//          className='w-full h-full'/>
//         </div>
        
//     </section>
//   )
// }

// export default Video

import React from 'react';
import { MdClose } from "react-icons/md";
import useFetchDetails from '../hooks/fetchDetails';

function Video({ data, close, media_type }) {
    const { data: videoData, loading } = useFetchDetails(`/${media_type}/${data?.id}/videos`);
    
    if (loading) {
        return <div>Loading...</div>;
    }


    if (!videoData || !videoData.results || videoData.results.length === 0) {
        return <div>No video available.</div>;
    }

    const videoKey = videoData.results[0]?.key;
    
    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
                <button className='absolute -right-1 -top-1 text-3xl text-white' onClick={close}>
                    <MdClose />
                </button>
                <iframe 
                    key={videoKey}
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                    frameBorder="0"
                     allow="autoplay; encrypted-media"
                    className='w-full h-full'
                    allowFullScreen
                    
                />
            </div>
        </section>
    );
}

export default Video;


