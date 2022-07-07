import "./Card.css"

const Card = ({card, handleClick, flipped}) => {
    return (
            <div className="card">
                <img
                    style={{display: flipped ? "" : "none"}}
                    className="front"
                    src={card.src}
                    alt="card front"/>
                <img
                    style={{display: flipped ? "none" : ""}}
                    onClick={()=>handleClick(card)}
                    className="back"
                    src="/img/cover.png"
                    alt="cover"/>
            </div>
    );
};

export default Card;