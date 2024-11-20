import React from 'react';

function Post({ title, image, content, tags }) {
    const placeholderImage = "https://placehold.co/600x400";

    return (
        <div className="post">
            <h2>{title}</h2>
            <img src={image || placeholderImage} alt={title} />
            <p>{content}</p>
            <div className="tags">
                {tags.map((tag, index) => (
                    <span key={index} className={`tag ${tag}`}>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default Post;