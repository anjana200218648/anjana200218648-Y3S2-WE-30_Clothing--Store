import React, { useContext } from 'react'
import './ClothDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ClothItem from '../ClothItem/ClothItem'

const ClothDisplay = ({ category }) => {

    const { cloth_list } = useContext(StoreContext)

    return (
        <div className='cloth-display' id='cloth-disply'>
            <h2>Top collections</h2>
            <div className="cloth-display-list">
                {cloth_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <ClothItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
            </div>

        </div>
    )
}

export default ClothDisplay