import "./style.css";
import Button from "../button"; 

export default function Card({ image, subtitle, description, buttonLabel, onClick }) {
    return (
        <div className="card">
            <img src={image} alt={subtitle} className="cardImage" />
            <div className="cardContent">
                <h3 className="cardSubtitle">{subtitle}</h3>
                <p className="cardDescription">{description}</p>
                <Button label={buttonLabel} type="button" onClick={onClick} />
            </div>
        </div>
    );
}
