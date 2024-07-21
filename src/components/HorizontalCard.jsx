import React from 'react'
import Card from './Card'
import { useRef } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

function HorizontalCard({ data = [], heading,trending,media_type }) {
    const containerRef = useRef()
    const handleNext=()=>{
        containerRef.current.scrollLeft +=300
    }
    const handlePrevious=()=>{
        containerRef.current.scrollLeft -=300
    }
    return (
        <div className=' container mx-auto px-2 md:px-1 my-6 '>
            <h2 className='text-xl md:2xl font-bold mb-2 text-white capitalize'>{heading}</h2>

            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,190px)] grid-flow-col overflow-x-scroll overflow-hidden z-10 relative gap-4 scroll-smooth transition-all scrolbar-none'>

                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
                            )
                        })
                    }
                </div>

                    <div className='absolute top-0 hidden  md:flex justify-between w-full h-full items-center '>
                        <button onClick={handlePrevious} className='bg-white text-black rounded-full -ml-1 z-10 '>
                            <FaAngleLeft/>
                        </button>
                        <button onClick={handleNext} className='bg-white text-black rounded-full -mr-1 z-10 '>
                            <FaAngleRight/>
                        </button>
                    </div>
            </div>
        </div>

        
    )
}

export default HorizontalCard