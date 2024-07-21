import React, { useEffect, useState } from 'react'
import BranerHome from '../components/BranerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HorizontalCard from '../components/HorizontalCard'
import axios from 'axios'
import useFetch from '../hooks/useFetch'

function Home() {
  const trendingData = useSelector(state => state.movieoData.branerData);
  const {data : nowPlayingData}= useFetch("/movie/now_playing");
  const {data: topRated}=useFetch("/movie/top_rated");
  const {data: popularTvShowData}=useFetch("/tv/popular");
  const {data:onTheAirShowData}=useFetch("/tv/on_the_air")



  
  return (
    <div>
      <BranerHome />
      <HorizontalCard data={trendingData} heading={"Trending"} trending={true}/>
      <HorizontalCard data={nowPlayingData} heading={"Now Playing"} media_type={'movie'}/>
      <HorizontalCard data={topRated} heading={"Top Rated"} media_type={'movie'}/>
      <HorizontalCard data={popularTvShowData} heading={"Popular Tv Show"} media_type={'tv'}/>
      <HorizontalCard data={onTheAirShowData} heading={"On The Air"} media_type={'tv'}/>

    </div>
  )
}

export default Home