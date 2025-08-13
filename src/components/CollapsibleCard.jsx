import { useState } from "react";
import "../styles/CollapsibleCard.css";
import downArrowB from "../assets/down-arrow-black.svg"

function CollapasibleCard({ children, header }) {

  const [showDetails, setShowDetails] = useState(false) 

  const handleCollapse = () => {
    setShowDetails(showDetails ? false : true)
  }

  return (
    <div className="collapsible-card">
      <div className="heading-wrapper" onClick={handleCollapse}>
        <h1>{header}</h1>
        <button><img className={showDetails ? 'rotated' : ''} src={downArrowB} alt="down arrow icon" /></button>
      </div>

      <div 
        className={`card-children ${showDetails ? 'shown' : ''}`}
        >
          <hr />
          {children}
        </div>
    </div>
  )
}

export default CollapasibleCard;