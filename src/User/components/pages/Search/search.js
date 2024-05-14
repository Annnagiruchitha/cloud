import React, { useState } from 'react';
import "./search.css";
import img6 from "../../image/008.svg";

function Search({ fetchSearchResults }) {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value); // Update search field value
    };

    const handleSearch = async () => {
        try {
            // Call the fetchSearchResults function from the parent component with the search query
            const searchResults = await fetchSearchResults(searchValue);
            console.log("Search Results:", searchResults);
            // Handle the search results, such as updating state in the parent component or displaying them directly in this component
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className="container-search">
            <div className='search-main'>
                <div className='search-search'>
                    <span className="search-search-icon">
                        <img src={img6} alt="Search Icon"/>
                    </span>
                    <input
                        type="text"
                        placeholder='Search'
                        className='search-search-border'
                        value={searchValue}
                        onChange={handleChange}
                    />
                </div>
                <div className='container-search-button'>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default Search;
