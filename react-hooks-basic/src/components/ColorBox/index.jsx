import React from 'react';
import { useState } from 'react';
import './ColorBox.scss'

ColorBox.propTypes = {

};

/**
 * This function works independenly, it should be written outside
 * functional component. In the future, can move this function to
 * utility class
 */
function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    // Make sure initColor run only 1 time at the begining 
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });

    /** 
     * This function is using state "color", so, it should be written
     * inside functional component
     */
    function handleBoxClick() {
        // get random color --> set color
        const newColor = getRandomColor();
        setColor(newColor);
        // save to local storage
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;