import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreClothset'
import ClothDisplay from '../../components/ClothDisplay/ClothDisplay'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <ClothDisplay category={category}/>
    </div>
  )
}

export default Home