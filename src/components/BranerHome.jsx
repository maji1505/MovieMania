
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function BranerHome() {
    const branerData = useSelector(state => state.movieoData.branerData);
    const imageURL = useSelector(state => state.movieoData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage(prev => (prev < branerData.length - 1 ? prev + 1 : 0));
    };

    const handlePrevious = () => {
        setCurrentImage(prev => (prev > 0 ? prev - 1 : branerData.length - 1));
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 4000);
        return () => clearInterval(interval);
    }, [branerData.length]);

    if (!branerData || branerData.length === 0) return null;

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {branerData.map((data, index) => (
                    <div
                        key={data.id + "branerHome" + index}
                        className='min-w-full min-h-[450px] md:min-h-full overflow-hidden relative group transition-all'
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        <div className='w-full h-full'>
                            <img src={imageURL + data.backdrop_path} alt="images" className='h-full w-full' />
                        </div>
                        <div className='absolute top-0 w-full h-full hidden items-center justify-between p-4 group-hover:md:flex'>
                            <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                <FaAngleLeft />
                            </button>
                            <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                                <FaAngleRight />
                            </button>
                        </div>
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                        <div className='container mx-auto'>
                            <div className='absolute bottom-0 max-w-md px-3'>
                                <h2 className='font-bold text-2xl md:text-4xl text-white drop-shadow-2xl'>
                                    {data.title || data.name}
                                </h2>
                                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                    <span>|</span>
                                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                                </div>
                               <Link to={"/"+data.media_type+"/"+data.id} >
                               <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                    Play Now
                                </button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BranerHome;
