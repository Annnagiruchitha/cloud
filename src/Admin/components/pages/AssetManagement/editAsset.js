import React, { useState } from "react";
import "./editAsset.css";
import back from "../../images/back.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../common/sideBar";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../constant";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
 
const EditAsset = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("assetmanagement");
  const { currentUser } = useSelector((state) => state.user);
  const { assetId } = useParams();
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

  useEffect(() => {
    // Fetch asset details when component mounts
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/asset/getAssets/${assetId}`);
        // setFormData(response.data);
        const assetDetails = response.data.asset;
        setFormData({
          assetName: assetDetails.assetName,
          assetID:assetDetails.assetID,
          category: assetDetails.category,
          description: assetDetails.description,
          price: assetDetails.price,
          quads: assetDetails.quads,
          totalTriangles: assetDetails.totalTriangles,
          vertices: assetDetails.vertices,
          materials: assetDetails.materials,
          rigged: assetDetails.rigged,
          fileFormats: assetDetails.fileFormats,
          files: assetDetails.files
        });
        setSelectedOption(response.data.fileFormats.map(format => ({ value: format, label: format })));
        
      } catch (error) {
        console.error('Error fetching asset:', error);
      }
    };
    fetchAsset();
  }, [assetId]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send updated form data to the server for editing
      const response = await axios.put(`${BASE_URL}/asset/updateAssets/${assetId}`, formData);
      console.log('Asset edited successfully:', response.data);
      toast.success("Asset edited successfully")
      // setSubmissionStatus('success');
      setFormData({});
    } catch (error) {
      console.error('Error editing asset:', error);
      // setSubmissionStatus('error');
      toast.success('Error editing asset:');
    }
  };
 
  return (
    <div className="edit-asset-container">
      <SideBar setActiveItem={handleItemClick} activeItem={activeItem} />
      <div className="edit-asset-main">
        <div className="edit-asset-content">
          <div className="edit-asset-heading">
            <div className="edit-asset-heading-back">
            <img src={back} alt="Back" onClick={() => navigate(-1)} />
            <h1>Edit Asset</h1>
            </div>
            <div className="edit-asset-heading-delete">
              <button>Remove</button>
            </div>
          </div>
          <div className="edit-asset-details-main">
            <div className="edit-asset-details-main-container">
              <>
                <form onSubmit={handleSubmit}>
                  <div className="edit-asset-details">
                    <div className="edit-asset-form-field">
                      <label
                        htmlFor="assetName"
                        className="edit-asset-form-label"
                      >
                        Asset Name
                      </label>
                      <input
                        type="text"
                        name="assetName"
                        className="edit-asset-form-input"
                        id="assetName"
                        value={formData.assetName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label htmlFor="assetID" className="edit-asset-form-label">
                        Asset ID
                      </label>
                      <input
                        type="number"
                        name="assetID"
                        className="edit-asset-form-input"
                        id="assetID"
                        value={formData.assetID}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label htmlFor="price" className="edit-asset-form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        className="edit-asset-form-input"
                        id="assetPrice"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
 
                    <div className="edit-asset-form-field">
                      <label htmlFor="quads" className="edit-asset-form-label">
                        Quads
                      </label>
                      <input
                        type="number"
                        name="quads"
                        className="edit-asset-form-input"
                        id="assetQuads"
                        value={formData.quads}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label
                        htmlFor="materials"
                        className="edit-asset-form-label"
                      >
                        materials
                      </label>
                      <input
                        type="number"
                        name="materials"
                        className="edit-asset-form-input"
                        id="assetTriangles"
                        value={formData.materials}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label
                        htmlFor="totalTriangles"
                        className="edit-asset-form-label"
                      >
                        Total Triangles
                      </label>
                      <input
                        type="number"
                        name="totalTriangles"
                        className="edit-asset-form-input"
                        id="assetTriangles"
                        value={formData.totalTriangles}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label
                        htmlFor="vertices"
                        className="edit-asset-form-label"
                      >
                        Vertices
                      </label>
                      <input
                        type="number"
                        name="vertices"
                        className="edit-asset-form-input"
                        id="assetVertices"
                        value={formData.vertices}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="edit-asset-form-field">
                      <label htmlFor="rigged" className="edit-asset-form-label">
                        Rigged
                      </label>
                      <input
                        type="checkbox"
                        name="rigged"
                        className="edit-asset-form-input"
                        id="assetRig"
                        value={formData.rigged}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="assetFormats"
                        className="edit-asset-form-label"
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
                    <div className="edit-asset-form-field">
                      <label
                        htmlFor="description"
                        className="edit-asset-form-label"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        className="edit-asset-form-input-des"
                        id="assetDescription"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="edit-asset-uploadmodel">
                    <h1>Upload 3D Model</h1>
                    <div className="edit-asset-uploadmodel-form-field">
                      <label
                        htmlFor="uploadimage"
                        className="edit-asset-uploadmodel-form-label"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="files"
                        multiple
                        required
                        className="edit-asset-uploadmodel-form-input"
                        id="uploadimage"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </>
            </div>
 
            <div className="edit-asset-button">
              <button
                type="submit"
                className="edit-asset-upload-button"
                onClick={handleSubmit}
              >
                Upload
              </button>
              <button
                className="edit-asset-cancel-button"
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
 
export default EditAsset;