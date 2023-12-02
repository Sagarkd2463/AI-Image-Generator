import React, { useRef, useState } from 'react';
import '../ImageGenerator/ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => { //a function to get details from openAl api and getting required image according to the user prompt 

    const [image_url, setImage_url] = useState("/"); //a state hook to let user know image is fetched or not 
    let inputRef = useRef(null); // a reference hook which shows current value from the input given by user 
    const [loading, setLoading] = useState(false); //a state hook to set loading according to image being fetched 

    const imageGenerator = async () => { //async function to get details from api 
        if (inputRef.current.value === "") {
            return 0;
        }

        setLoading(true); 
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",  //post request to get user prompt information from api provided over here 
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            }
        );

        let data = await response.json(); //passing api data in json format and setting required details into array form 
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false); 
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI Image <span>Generator</span></div>
            <div className='img-loading'>
                <div className='image'><img src={image_url === "/" ? default_image : image_url} alt='' /></div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} placeholder='Describe, what you would like to see?' className='search-input' />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>Generate</div>
            </div>
        </div>
    )
};

export default ImageGenerator; 
