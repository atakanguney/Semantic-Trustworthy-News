import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ShowData = () => {

    const [givenName, setGivenName] = useState("");
    const [familyName, setFamilyName] = useState("");

    useEffect(()=> {
        axios.get(`data`).then(res => {
            const rawData = res.data;
            setGivenName(rawData['giveName']);
            setFamilyName(rawData['familyName']);
        });
    });

    return (
        <div>
            <ul>
                <li><p>{givenName}</p></li>
                <li><p>{familyName}</p></li>
            </ul>
        </div>
    )
}

export default ShowData;