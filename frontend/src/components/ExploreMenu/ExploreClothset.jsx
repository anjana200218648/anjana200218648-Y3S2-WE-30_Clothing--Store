import React from 'react'
import './ExploreClothset.css'
import { clothset_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-clothset' id='explore-clothset'>
      <h1>Explore </h1>
      <p className='explore-clothset-text'>Dive into our diverse range of customizable clothing items and discover pieces that resonate with your unique style. From trendy T-shirts and cozy hoodies to chic dresses and versatile accessories, WEAREASE offers something for everyone. Start exploring now and find your new favorite wardrobe staples!</p>
      <div className="explore-clothset-list">
        {clothset_list.map((item,index)=>{
          return (
            <div>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu