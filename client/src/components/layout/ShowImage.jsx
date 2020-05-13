import React, { useState, useEffect } from 'react';

// import { getImage } from 'services/products';
import noImage from 'components/main/img/no-image.jpg';

const ShowImage = ({ src }) => {
    return (
                <img src={src || noImage} alt={'m'} className="mb-3 card-img-top img-fluid" />

    );
}

export default ShowImage;
