import React from "react";
import "../styles/Cell.css";

const Cell = ({ value, onClick }) => {
    const getClassName = () => {
        if (value === "H") return "cell hit";
        if (value === "M") return "cell miss";
        if (value === "R") return "cell revealed";
        if (value === "S") return "cell ship";
        return "cell untouched";
    };

    return <div className={getClassName()} onClick={onClick}></div>;
};

export default Cell;