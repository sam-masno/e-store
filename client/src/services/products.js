import axios from 'axios';

export const addProduct = async (formData, file,  callback) => {
    //check if photo was included
    let photo = file ? new Blob([ file ], {type: file.type }) : null;
    console.log(file)
    try {
        // //send request to get auth url
        if(photo !== null) {
            var {data: { url } } = await axios.post('/api/product/upload', { product: formData.name, type: file.type }) ;
        }
    
        // // if there is a photo, split url or add no-photo 
        const photoUrl = photo ? url.split('?')[0] : '';
        // upload to db
        const res = await axios.post(`/api/product/create`, { ...formData, photo: photoUrl } )
        //after product saved upload to s3
        // USE FETCH TO AVOID CONFLICTS WITH SIGNATURE MATCH DUE TO AXIOS DEFAULT HEADERS
        if(photo) {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": `${photo.type}`
                },
                body: photo
            })
        }
        return callback(null, `${res.data.name} has been added`)
    } catch (error) {
        return callback(true, error.response.data.message)
    }
}

export const updateProduct = async (formData, id, file, callback) => {
    //check if photo was included
    let photo = file ? new Blob([ file ], {type: file.type }) : null;
    try {
        // //send request to get auth url
        if(photo !== null) {
            var {data: { url } } = await axios.post('/api/product/upload', { product: formData.name, type: file.type }) ;
        }
    
        // // if there is a photo, split url or add no-photo 
        const photoUrl = photo ? url.split('?')[0] : formData.photo;

        const res = await axios.put(`/api/product/update/${id}`, { ...formData, photo: photoUrl } )

        if(photo) {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": `${photo.type}`
                },  
                body: photo
            })
        }

        return callback(null, `${res.data.data.name} has been updated`)

    } catch (error) {
        return callback(true, `Error: ${error.response.data.message}`)
    }
}

export const getProducts = async (query, next) => {
    try {
        const res = await axios.get(`/api/product/search?sortBy=${query[0]}&order=${query[1]}&limit=3`)
        return next(null, res.data.data)
    } catch (error) {
        return next(true, 'There was an error getting products')
    }
}

export const getProduct = async (id, next) => {
    try {
        const res = await axios.get(`/api/product/read/${id}`)
        return next(null, res.data.data)
    } catch (error) {
        return next(true, 'There was an error, please try again')
    }
}

// export const getImage = async (id, url, next) => {
//     // converts buffer array to base64
//     function arrayBufferToBase64(buffer) {
//         var binary = '';
//         var bytes = [].slice.call(new Uint8Array(buffer));
//         bytes.forEach((b) => binary += String.fromCharCode(b));
//         return window.btoa(binary);
//     }
//     try {
//         const res = await axios.get(`/api/${url}/photo/${id}`)
//         const img = `data:${res.data.photo.contentType};base64, ${arrayBufferToBase64(res.data.photo.data.data)}`
//         return next(null, img)
//     } catch (error) {
//         return next(true, error.response.data.message)
//     }
// }

export const getSimilarProducts = async (id, next) => {
    try {
        const res = await axios.get(`/api/product/similar/${id}`);
        return next(null, res.data.data)
    } catch (error) {
        return next(true, error.response.data.message)
    }
}

export const deleteProduct = async (id, next) => {
    try {
        const res = await axios.delete(`/api/product/delete/${id}`);
        return next(null, 'Product removed')
    } catch (error) {
        return next(true, error.response.data.message)
    }
}

  


