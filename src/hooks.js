import { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";

function useFlip() {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
}

function useAxios(baseUrl, initialOptions = {}) {
    const [data, setData] = useState([]);

    // Function to add data only when called
    const addData = async (param = "") => {
        try {
            const response = await axios.get(`${baseUrl}${param}`, initialOptions);
            setData(prevData => [...prevData, { ...response.data, id: uuid() }]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return [data, addData];
}

export { useFlip, useAxios };