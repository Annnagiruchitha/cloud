import React ,{useState, useEffect} from "react";
import "./landing02.css"
import img1 from "../../image/fox.svg";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../constant";
import axios from "axios"
 
const Our3DModels = () => {
  const [categoryDataList, setCategoryDataList] = useState([]);
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
  return (
    <div className="container01">
      <div className="card-container" >
        <div className="card-con-heading">
          <div className="card-con01">
            <h1>Our 3D Models</h1>
            
            <Link to={"/category"}><p>View All</p></Link>
          </div>
          <div className="card-con02">
          {categoryDataList.map((categoryData) => (
            <div className="card">
              <img src={categoryData.imageUrl} />
              <p>{categoryData.categoryName}</p>
            </div>
          ))}
            
          </div>
        </div>
      </div>
      <div className="detail-container">
        <div className="detail-con1">
          <h3>500+</h3>
          <p>3D Assets</p>
        </div>
        <div className="detail-con1">
          <h3>400+</h3>
          <p>Downloads</p>
        </div>
        <div className="detail-con1">
          <h3>15+</h3>
          <p>Categories</p>
        </div>
      </div>
    </div>
  );
};
 
export default Our3DModels;