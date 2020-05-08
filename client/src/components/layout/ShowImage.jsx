import React, { useState, useEffect } from 'react';

import { getImage } from 'services/products';

const ShowImage = ({item, url }) => {
    const [src, setSrc] = useState('')
    useEffect(() => {
        let mnt = true;
        getImage(item, url, (err, data) => {
            if(err) {
                return setSrc("https://source.unsplash.com/random/300x200")
            }
            if(mnt === true) {
                return setSrc(data)
            }
        })

        return () => mnt = false
    },[]) 

    if(!src) return <div></div>
    return (
                <img src={src} alt={'m'} className="mb-3 card-img-top img-fluid" />

    );
}

export default ShowImage;
