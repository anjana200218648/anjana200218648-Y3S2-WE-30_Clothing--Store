import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from '../../assets/assets'
import UpdateClothModal from '../Update/updateClothmodel'

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [selectedCloth, setSelectedCloth] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/cloth/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error")
        }
    }

    const removeCloth = async (clothId) => {
        const response = await axios.post(`${url}/api/cloth/remove`, { id: clothId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error("Error");
        }
    }

    const openUpdateModal = (cloth) => {
        setSelectedCloth(cloth);
        setIsUpdateModalOpen(true);
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCloth(null);
    }

    const handleUpdateCloth = async (updatedCloth) => {
        const response = await axios.put(`${url}/api/cloth/update/${updatedCloth._id}`, updatedCloth);
        if (response.data.success) {
            toast.success(response.data.message);
            fetchList();
        } else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Clothing Items</p>
            <div className='list-table'>
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.category}</p>
                            <p>Rs {item.price}.00</p>
                            <div>
                                <p onClick={() => openUpdateModal(item)} className='cursor'>Edit</p>
                                <p onClick={() => removeCloth(item._id)} className='cursor'>x</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isUpdateModalOpen && (
                <UpdateClothModal
                    cloth={selectedCloth}
                    onClose={closeUpdateModal}
                    onUpdate={handleUpdateCloth}
                />
            )}
        </div>
    )
}

export default List