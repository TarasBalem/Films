import React from "react";

const ImageLoader = ({src, fallbackImg, alt, ...rest}) => {
  const onError = ({target}) => (target.src = fallbackImg); 
  return <img src={src} alt={alt} onError={onError} {...rest} />;
};

export default ImageLoader;
