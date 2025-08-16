import { formatDate } from "../utils/helper"
import editButtonBlack from "../assets/edit-black.svg"
import trashButtonBlack from "../assets/trash-black.svg"
import "../styles/EditPanelCard.css"

function EditPanelCard({data, handleEdit, handleDelete, dataLabel}) {
  let filteredData;
  let date;

  if (dataLabel === "experience") {
    filteredData=(({ jobTitle, employer }) => ({ jobTitle, employer }))(data);
    date = `${formatDate(data.startDate)} - ${data.endDate === "Current" ? data.endDate : formatDate(data.endDate)}`
  } else if (dataLabel === "education") {
    filteredData=(({ qualification, institution }) => ({ qualification, institution }))(data)
    date = formatDate(data.graduationDate)
  } else if (dataLabel === "languages") {
    filteredData=(({ language, level }) => ({ language, level }))(data);
  }

  return (
    <div className="card">
      <div className="information">
        {Object.keys(filteredData).map(key => (
          <p key={`data.id-${key}`} className={key}>{filteredData[key]}</p>
        ))}
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