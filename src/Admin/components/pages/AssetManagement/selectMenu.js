import React, { useState } from 'react';
import "./selectMenu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

const SelectMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleItem = (itemName) => {
        const isSelected = selectedItems.includes(itemName);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(item => item !== itemName));
        } else {
            setSelectedItems([...selectedItems, itemName]);
        }
    };

    const handleCheckboxClick = (itemName) => {
        setSelectedItems(prevItems => {
            const updatedItems = [...prevItems];
            const index = updatedItems.indexOf(itemName);
            if (index !== -1) {
                updatedItems.splice(index, 1);
            } else {
                updatedItems.push(itemName);
            }
            return updatedItems;
        });
    };

    // Concatenate selected items into a single string
    const selectedText = selectedItems.length > 0 ? selectedItems.join(', ') : 'Select';

    return (
        <div className="container">
            <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                <span className="btn-text">{selectedText}</span>
                <span className="arrow-dwn">
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>

            <ul className={`list-items ${isOpen ? 'open' : ''}`}>
                <li className="item" onClick={() => toggleItem('.glb/glf')}>
                    <span className="checkbox">
                        <FontAwesomeIcon icon={selectedItems.includes('.glb/glf') ? faCheckSquare : faSquare} onClick={() => handleCheckboxClick('.glb/glf')} />
                    </span>
                    <span className="item-text">.glb/glf</span>
                </li>
                <li className="item" onClick={() => toggleItem('.usdz')}>
                    <span className="checkbox">
                        <FontAwesomeIcon icon={selectedItems.includes('.usdz') ? faCheckSquare : faSquare} onClick={() => handleCheckboxClick('.usdz')} />
                    </span>
                    <span className="item-text">.usdz</span>
                </li>
                {/* Repeat similar structure for other items */}
            </ul>
        </div>
    );
};

export default SelectMenu;
