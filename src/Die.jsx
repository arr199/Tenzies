export default function Die({ isHeld , value , holdDice}) {
   
    return (
        <div 
            className={isHeld ? "die-face held"  :"die-face" }
            onClick={holdDice}
        >
            <h2 className="die-num">{value}</h2>
        </div>
    )
}