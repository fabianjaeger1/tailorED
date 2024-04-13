import React, { useEffect, useRef, useState } from 'react';

function TestComp() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/members")
            .then(res => res.json())
            .then(res => {
                setData(res);
                console.log(res);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Added [] to signify this effect runs only once after the component mounts

    return (
        <div>
            {/* You can add render logic here using `data` */}
            {data.map((item, index) => (
                <div key={index}>{JSON.stringify(item)}</div>
            ))}
        </div>
    );
}

export default TestComp;
