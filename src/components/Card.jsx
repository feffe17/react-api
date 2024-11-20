// src/components/Card.jsx
import style from "./Card.module.css";

export default function Card({ title, description, buttonText, image, tags }) {
    return (
        <div className={style.card}>
            <div className={style.topSection}>
                <img src={image} alt={title} className={style.image} />
            </div>
            <div className={style.botSection}>
                <h5 className={style.h5}>{title}</h5>
                <p className={style.p}>{description}</p>
                <div className={style.tags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={`${style.tag} ${style[tag]}`}>{tag}</span>
                    ))}
                </div>
                <button className={style.button}>{buttonText}</button>
            </div>
        </div>
    );
}
