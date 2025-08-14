import { formatDate } from "../utils/helper"
import editButtonBlack from "../assets/edit-black.svg"
import trashButtonBlack from "../assets/trash-black.svg"
import "../styles/EditPanelCard.css"

function EditPanelCard({data, handleEdit, handleDelete}) {
  const date = `${formatDate(data.startDate)} - ${data.endDate === "Current" ? data.endDate : formatDate(data.endDate)}`
  return (
    <div className="card">
      <div className="information">
        <p className="title">{data.jobTitle}</p>
        <p className="company">{data.company}</p>
        <p className="date">{date}</p>
      </div>
      <div className="controls">
        <button onClick={() => {
          handleEdit(data.id)
        }}><img src={editButtonBlack} alt="edit icon" /></button>
        <button onClick={() => {
          handleDelete(data.id)
        }}><img src={trashButtonBlack} alt="trash icon" /></button>
      </div>
    </div>
  )
} 

export default EditPanelCard;