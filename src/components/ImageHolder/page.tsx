"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageHolder = (props: {
    src: string;
    alt: string;
    className: string;
}) => {
    const [imgSrc, setImgSrc] = useState(props.src);

    return (
        <Image
            width={300}
            height={450}
            {...props}
            src={imgSrc || "https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg"}
            onError={() => {
                setImgSrc(
                    "https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg"
                );
            }}
        />
    );
};

export default ImageHolder;