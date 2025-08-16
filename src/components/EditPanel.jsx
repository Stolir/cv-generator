import '../styles/EditPanel.css'
import EditPanelCard from './EditPanelCard';

function EditPanel({ addedData, dataLabel, shown = false, toggleDisplay, handleEdit, handleDelete}) {

  const displayStatus = !shown ? 'hidden' : '' 

  return (
    <div className={displayStatus}>
      <div onClick={toggleDisplay} className="background-blur"></div>
      <div className={`panel`}>
        {addedData.length <= 0 ? `No ${dataLabel} added`
        : addedData.map((item) => (
          <EditPanelCard key={item.id} data={item} handleEdit={handleEdit} handleDelete={handleDelete} dataLabel={dataLabel}/>
        )) }
      </div>
    </div>
  )
}

export default EditPanel;