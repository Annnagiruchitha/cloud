import React, { useState , useRef , useEffect } from "react";
import AdminNavBar from "../../common/topBar";
import "./adminCategory.css";
import SideBar from "../../common/sideBar";
import blank from "../../images/blank.svg";
import create from "../../images/create.svg";
import fox from "../../images/admin01.svg";
import delet from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../constant";

const AdminCategory = () => {
  const [activeItem, setActiveItem] = useState("category");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpDelete, setIsPopUpDelete] = useState(false);
  const [isPopUpEdit, setIsPopUpEdit] = useState(false);
  const [categoryDataList, setCategoryDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen)
    setIsPopUpEdit(false);
    setIsPopUpDelete(false);;
  };

  const togglePopUpDelete = (categoryData) => {
    setIsPopUpDelete(!isPopUpDelete);
    setIsPopUpOpen(false);
    setIsPopUpEdit(false);
    setSelectedCategory(categoryData); 
  };

  const toggleEdit = (categoryData) => {
    setIsPopUpEdit(!isPopUpEdit);
    setIsPopUpOpen(false);
    setIsPopUpDelete(false);
    setSelectedCategory(categoryData); // Set selected category in state
  };
  

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  useEffect(() => {
    // Fetch category data from the backend
    axios.get(`${BASE_URL}/category/getAllCategory`)
      .then(response => {
        // Access the array of categories from the response data
        const categories = response.data.allCategory;
        setCategoryDataList(categories);
        console.log(categoryDataList)

      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);
   // Empty dependency array to ensure useEffect runs only once


  return (
    <div className="admin-category-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="admin-category-main">
        <div className="admin-category-content">
          <div className="admin-category-heading">
            <h1>Category</h1>
          </div>
          <div className=" admin-category-card-container">
          <div className="admin-category-card">
            <img
              className="admin-category-card-img"
              src={blank}
              alt="Background"
            />
            <div className="admin-category-card-create" onClick={togglePopUp}>
              <img
                className="admin-category-create"
                src={create}
                alt="Create"
              />
              <h1 className="admin-category-create-text">Create</h1>
            </div>
          </div>
          <div className="admin-category-card-container-main">
      {categoryDataList.map(categoryData => (
         <div key={categoryData._id} className="admin-category-card">
          <img
            className="admin-category-card-img"
            // src={fox}
            src={categoryData.imageUrl}
            alt="Background"
          />
          <div className="admin-category-card-create">
            <h1 className="admin-category-create-text">{categoryData.categoryName}</h1>
            <img className="admin-category-create" src={edit} 
            alt="Edit" 
            onClick={() => toggleEdit(categoryData)}/>
            <h1 className="admin-category-create-text">|</h1>
            <img
              className="admin-category-create"
              src={delet}
              alt="Delete"
              onClick={() => togglePopUpDelete(categoryData)}
            />
          </div>
        </div>
      ))}
    </div>
    </div>
        </div>
      </div>
      {isPopUpOpen && <PopUpComponent onClose={togglePopUp} />}
      {isPopUpDelete && <PopUpComponentDelete onClose={togglePopUpDelete} category={selectedCategory} />}
      {isPopUpEdit && <PopUpComponentEdit onClose={toggleEdit} category={selectedCategory} />}
    </div>
  );
};

const PopUpComponent = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const iconInputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  async function handleSubmit(event) {
    event.preventDefault();

    const categoryName = event.target.categoryName.value;
    const imageFile = fileInputRef.current.files[0];
    const iconFile = iconInputRef.current.files[0];

    if (!categoryName || !imageFile || !iconFile) {
      console.error('Category name, image, and icon are required.');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('image', imageFile);
    formData.append('icon', iconFile);

    try {
      const res = await fetch(`${BASE_URL}/category/createCategory`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: formData
      });

      if (res.ok) {
        console.log('Data successfully sent to backend:', await res.json());
        onClose();
        window.location.reload();
      } else {
        console.error('Error posting data to backend:', res.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  function cancelImageUpload() {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    console.log("Image upload cancelled");
  }

  function cancelIconUpload() {
    if (iconInputRef.current) {
      iconInputRef.current.value = null;
    }
    console.log("Icon upload cancelled");
  }

  return (
    <div className="admin-category-popup-container">
      <div className="admin-category-popup-main">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryName" className="admin-category-popup-form-label">
              Category Name
            </label>
            <input
              type="text"
              className="admin-category-popup-form-input"
              id="categoryName"
              name="categoryName"
            />
          </div>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryImage" className="admin-category-popup-form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="admin-category-popup-form-input-upload"
              id="categoryImage"
              name="categoryImage"
              ref={fileInputRef}
            />
            <button
              type="button"
              className="admin-category-cancel-button"
              onClick={cancelImageUpload}
            >
              Cancel Upload
            </button>
          </div>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryIcon" className="admin-category-popup-form-label">
              Upload Icon
            </label>
            <input
              type="file"
              className="admin-category-popup-form-input-upload"
              id="categoryIcon"
              name="categoryIcon"
              ref={iconInputRef}
            />
            <button
              type="button"
              className="admin-category-cancel-button"
              onClick={cancelIconUpload}
            >
              Cancel Upload
            </button>
          </div>
          <div className="admin-category-popup-button">
            <button type="submit" className="admin-category-create-button">Create</button>
            <button className="admin-category-cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const PopUpComponentEdit = ({ onClose, category }) => {
  const fileInputRefImage = useRef(null);
  const fileInputRefIcon = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    categoryName: category ? category.categoryName : "",
    image: null,
    icon: null
  });

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName,
        image: null,
        icon: null
      });
    }
  }, [category]);

  function cancelImageUpload() {
    if (fileInputRefImage.current) {
      fileInputRefImage.current.value = null;
    }
    console.log("Image upload cancelled");
  }

  function cancelIconUpload() {
    if (fileInputRefIcon.current) {
      fileInputRefIcon.current.value = null;
    }
    console.log("Icon upload cancelled");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedCategory = new FormData();
    updatedCategory.append("categoryId", category._id);
    updatedCategory.append("categoryName", formData.categoryName);
    updatedCategory.append("image", formData.image);
    updatedCategory.append("icon", formData.icon);

    try {
      const res = await fetch(`${BASE_URL}/category/editCategory/:categoryId`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        },
        body: updatedCategory
      });

      if (res.ok) {
        console.log('Data successfully updated in the backend');
        onClose();
        window.location.reload();
      } else {
        console.error("Error updating data in the backend:", res.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0]
    });
  };

  const handleIconChange = (event) => {
    setFormData({
      ...formData,
      icon: event.target.files[0]
    });
  };

  return (
    <div className="admin-category-popup-container">
      <div className="admin-category-popup-main">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryName" className="admin-category-popup-form-label">
              Category Name
            </label>
            <input
              type="text"
              className="admin-category-popup-form-input"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
            />
          </div>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryImage" className="admin-category-popup-form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="admin-category-popup-form-input-upload"
              id="categoryImage"
              name="categoryImage"
              ref={fileInputRefImage}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="admin-category-cancel-button"
              onClick={cancelImageUpload}
            >
              Cancel Upload
            </button>
          </div>
          <div className="admin-category-popup-form-group">
            <label htmlFor="categoryIcon" className="admin-category-popup-form-label">
              Upload Icon
            </label>
            <input
              type="file"
              className="admin-category-popup-form-input-upload"
              id="categoryIcon"
              name="categoryIcon"
              ref={fileInputRefIcon}
              onChange={handleIconChange}
            />
            <button
              type="button"
              className="admin-category-cancel-button"
              onClick={cancelIconUpload}
            >
              Cancel Upload
            </button>
          </div>
          <div className="admin-category-popup-button">
            <button type="submit" className="admin-category-create-button">Update</button>
            <button className="admin-category-cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PopUpComponentDelete = ({ onClose, category }) => {
  console.log(category);
  const { currentUser } = useSelector((state) => state.user);

  const handleRemoveCategory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/category/deleteCategory/${category._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }
  
      console.log('Category deleted successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };
  

  return (
    <div className="admin-category-popup-container">
      <div className="admin-category-popup-main">
        <h2>Remove Category</h2>
        <div className="admin-category-popup-content">
          <div><p>Are you sure you want to delete this category?</p></div>
          <div className="admin-category-popup-button">
            <button className="admin-category-create-button" onClick={handleRemoveCategory}>Remove</button>
            <button className="admin-category-cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminCategory;
