import Button from "../buttom";
import "./style.css";

export default function Card({ image, subtitle, description, buttom }) {
    return (
        <>
            <div className="card">
                <img src={image} alt={subtitle} className="cardImage" />
                <div className="cardContent">
                    <h3 className="cardSubtitle">{subtitle}</h3>
                    <p className="carDescription">{description}</p>
                    <Button label={buttom} type="submit" />
                    </div>
            </div>

        </>
    )
}