
import React, { useState, useEffect } from 'react';
import "./categories.css"
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../../../constant";
import search from "../../images/icons/01.svg";

// Import your local images
import fox from "../../images/category/04.svg";
import food from "../../images/category/05.svg";
import tree from "../../images/category/06.svg";
import furniture from "../../images/category/07.svg";
import vehicle from "../../images/category/08.svg";
import foxIcon from "../../images/category/09.svg";
import foodIcon from "../../images/category/10.svg";
import treeIcon from "../../images/category/11.svg";
import furnitureIcon from "../../images/category/12.svg";
import vehicleIcon from "../../images/category/13.svg";
import axios from "axios"

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categoryDataList, setCategoryDataList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch category data from the backend
        axios
          .get(`${BASE_URL}/category/getAllCategory`)
          .then((response) => {
            // Access the array of categories from the response data
            const categories = response.data.allCategory;
            setCategoryDataList(categories);
            console.log(categoryDataList);
          })
          .catch((error) => {
            console.error("Error fetching category data:", error);
          });
      }, []);
      const filteredCategories = categoryDataList.filter(category => {
        return category.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    
    return (
        <div className='cat-container'>
            <div className='cat-main'>
                <div className='cat-search'>
                    <span className="search-icon"><img src={search} alt="search" /></span>
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className='search-border' 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>
                <h2 className='cat-heading'>Explore Store Categories - Buy Professional 3D Models</h2>
                <div className='cat-image'>
                {filteredCategories.map((categoryData, index) => (
                        <Link to={`/assets/${categoryData._id}`} key={index}>
                            <div className='cat-icons'>
                                <div className='icon-container'>
                                   
                                <img className='cat-icon-main' src={categoryData.imageUrl} alt="Animals & Pets" />
                    <img className='cat-icon-active' src={categoryData.iconUrl} alt="Animals & Pets Icon" />
                                    <div className='icon-text'>{categoryData.categoryName}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Category;