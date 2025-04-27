// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import './updateClothmodel.css';

// const UpdateClothModal = ({ cloth, onClose, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         name: cloth.name,
//         description: cloth.description,
//         price: cloth.price,
//         category: cloth.category,
//         image: cloth.image
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedCloth = { ...formData, _id: cloth._id };
//             onUpdate(updatedCloth);
//             onClose();
//         } catch (error) {
//             toast.error("Error updating cloth");
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Update Cloth</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Name:
//                         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Description:
//                         <input type="text" name="description" value={formData.description} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Price:
//                         <input type="number" name="price" value={formData.price} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Category:
//                         <input type="text" name="category" value={formData.category} onChange={handleChange} />
//                     </label>
//                     <button type="submit">Update</button>
//                     <button type="button" onClick={onClose}>Cancel</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateClothModal;


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './updateClothmodel.css' // Import the CSS file

const UpdateClothModal = ({ cloth, onClose, onUpdate }) => {
    // Initialize form data with existing cloth details
    const [formData, setFormData] = useState({
        name: cloth.name,
        description: cloth.description,
        price: cloth.price,
        category: cloth.category,
        image: cloth.image
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCloth = { ...formData, _id: cloth._id };
            onUpdate(updatedCloth);
            onClose();
        } catch (error) {
            toast.error("Error updating cloth");
        }
    };

    return (
        <div className="update-modal-overlay">
            <div className="update-modal-content">
                <h2>Update Cloth</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </label>
                    <label>
                        Category:
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Pants & Shorts">Pants & Shorts</option>
                            <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Hats & Caps">Hats & Caps</option>
                        </select>
                    </label>
                    <div className="update-modal-buttons">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClothModal;