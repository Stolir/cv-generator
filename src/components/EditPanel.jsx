import { Fragment } from 'react';
import '../styles/EditPanel.css'
import EditPanelCard from './EditPanelCard';

function EditPanel({ addedExperience, shown = false, toggleDisplay}) {

  const displayStatus = !shown ? 'hidden' : '' 

  return (
    <div className={displayStatus}>
      <div onClick={toggleDisplay} className="background-blur"></div>
      <div className={`panel`}>
        {addedExperience.length <= 0 ? "No experience Added"
        : addedExperience.map((item) => (
          <EditPanelCard key={item.id} data={item}/>
        )) }
      </div>
    </div>
  )
}

export default EditPanel;