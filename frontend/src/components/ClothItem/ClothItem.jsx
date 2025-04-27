import React, { useContext } from 'react'
import './ClothItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ClothItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='cloth-item'>
        <div className="cloth-item-img-container">
            <img className='cloth-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id]
                //Need to add button later
            }
        </div>
        <div className='cloth-item-info'>
            <div className='cloth-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='cloth-item-desc'>{description}</p>
            <p className='clothitem-price'>Rs {price}.00</p>

        </div>

    </div>
  )
}

export default ClothItem