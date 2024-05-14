import React, { useState } from "react";
import "./addnewAsset.css";
import back from "../../images/back.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../common/sideBar";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../constant";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
 
const AddnewAsset = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("assetmanagement");
  const { currentUser } = useSelector((state) => state.user);
  const { categoryId } = useParams();
 
  const options = [
    { value: "glb/glf", label: "glb/glf" },
    { value: "usdz", label: "usdz" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    assetName: "",
    assetID: "",
    price: "",
    description: "",
    quads: 0,
    totalTriangles: 0,
    vertices: 0,
    materials: 0,
    rigged: false,
    files: [],
    fileFormats: [],
  });
 
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
 
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      fileFormats: selectedOption.map((option) => option.value),
    });
  };
 
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? Array.from(files)
        : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "files") {
        formData[key].forEach((file) => {
          formDataToSend.append("files", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    console.log(formDataToSend);
    console.log(formData);
 
    try {
      const response = await axios.post(
        `${BASE_URL}/asset/createAsset/${categoryId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
 
      toast.success("Asset Created Successfully");
      e.target.reset();
 
      // Handle success
    } catch (error) {
      console.error("Error creating asset:", error);
      // Handle error
    }
  };
 
  return (
    <div className="add-asset-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="add-asset-main">
        <div className="add-asset-content">
          <div className="add-asset-heading">
            <img src={back} alt="Back" onClick={() => navigate(-1)} />
            <h1>Add Asset</h1>
          </div>
          <div className="add-asset-details-main">
            <div className="add-asset-details-main-container">
              <>
                <form onSubmit={handleSubmit}>
                  <div className="add-asset-details">
                    <div className="add-asset-form-field">
                      <label
                        htmlFor="assetName"
                        className="add-asset-form-label"
                      >
                        Asset Name
                      </label>
                      <input
                        type="text"
                        name="assetName"
                        className="add-asset-form-input"
                        id="assetName"
                        value={formData.assetName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label htmlFor="assetID" className="add-asset-form-label">
                        Asset ID
                      </label>
                      <input
                        type="number"
                        name="assetID"
                        className="add-asset-form-input"
                        id="assetID"
                        value={formData.assetID}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label htmlFor="price" className="add-asset-form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        className="add-asset-form-input"
                        id="assetPrice"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
 
                    <div className="add-asset-form-field">
                      <label htmlFor="quads" className="add-asset-form-label">
                        Quads
                      </label>
                      <input
                        type="number"
                        name="quads"
                        className="add-asset-form-input"
                        id="assetQuads"
                        value={formData.quads}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label
                        htmlFor="materials"
                        className="add-asset-form-label"
                      >
                        materials
                      </label>
                      <input
                        type="number"
                        name="materials"
                        className="add-asset-form-input"
                        id="assetTriangles"
                        value={formData.materials}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label
                        htmlFor="totalTriangles"
                        className="add-asset-form-label"
                      >
                        Total Triangles
                      </label>
                      <input
                        type="number"
                        name="totalTriangles"
                        className="add-asset-form-input"
                        id="assetTriangles"
                        value={formData.totalTriangles}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label
                        htmlFor="vertices"
                        className="add-asset-form-label"
                      >
                        Vertices
                      </label>
                      <input
                        type="number"
                        name="vertices"
                        className="add-asset-form-input"
                        id="assetVertices"
                        value={formData.vertices}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-asset-form-field">
                      <label htmlFor="rigged" className="add-asset-form-label">
                        Rigged
                      </label>
                      <input
                        type="checkbox"
                        name="rigged"
                        className="add-asset-form-input"
                        id="assetRig"
                        value={formData.rigged}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="assetFormats"
                        className="add-asset-form-label"
                      >
                        File formats
                      </label>
                      <div>
                        <Select
                          id="fileFormats"
                          defaultValue={selectedOption}
                          onChange={handleSelectChange}
                          value={formData.selectedOption}
                          options={options}
                          name="fileFormats"
                          isMulti
                        />
                      </div>
                    </div>
                    <div className="add-asset-form-field">
                      <label
                        htmlFor="description"
                        className="add-asset-form-label"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        className="add-asset-form-input-des"
                        id="assetDescription"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="add-asset-uploadmodel">
                    <h1>Upload 3D Model</h1>
                    <div className="add-asset-uploadmodel-form-field">
                      <label
                        htmlFor="uploadimage"
                        className="add-asset-uploadmodel-form-label"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="files"
                        multiple
                        required
                        className="add-asset-uploadmodel-form-input"
                        id="uploadimage"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </>
            </div>
 
            <div className="add-asset-button">
              <button
                type="submit"
                className="add-asset-upload-button"
                onClick={handleSubmit}
              >
                Upload
              </button>
              <button
                className="add-asset-cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AddnewAsset;