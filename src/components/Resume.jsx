import '../styles/Resume.css'
import mailBlack from '../assets/mail-black.svg'
import mapPinBlack from '../assets/map-pin-black.svg'
import phoneBlack from '../assets/phone-black.svg'
import MainSection from './MainSection';
import SideSection from './SideSection';
import { formatDate, formatDetails } from '../utils/helper';

function Resume({ data, currentExperience }) {
  const address = data.contact.address;

  return (
    <div className="preview">
      <div className="resume">
        <div className='side-area'>
          <SideSection heading={"SUMMARY"}></SideSection>
        </div>
        <div className="main-area">
          <div className='name-container'>
            <h1 className='first-name'>{data.contact.firstName || "First name"}</h1>
            <h1 className='last-name'>{data.contact.lastName || "Second name"}</h1>
          </div>
          <div className={`contact-container`}>
            <div className={data.contact.email ? "shown" : "hidden"}>
              <img src={mailBlack} alt="mail icon" />
              <p>{data.contact.email}</p>
            </div>
            <div className={data.contact.phoneNumber ? "shown" : "hidden"}>
              <img src={phoneBlack} alt="phone icon" />
              <p>{data.contact.phoneNumber}</p>
            </div>
            <div className={address.city || address.country ? "shown" : "hidden"}>
              <img src={mapPinBlack} alt="map-pin icon" />
              <p>{address.city}{address.country && `, ${address.country}`} {address.postCode}</p>
            </div>
          </div>
          <MainSection heading={"EXPERIENCE"}>
            {data.experience.map(item => (
              <div key={`${item.id}-container`} className='experience-card'>
                <p key={`${item.id}-startEndDate`} className='date'>{formatDate(item.startDate)} - {item.endDate === 'Current' ? 'Current' : formatDate(item.endDate)}</p>
                <p key={`${item.id}-jobTitle`} className='job-title'>{item.jobTitle}</p>
                <p key={`${item.id}-employer`} className='employer'>{item.employer} <span className='location'> | {item.location}</span></p>
                <div key={`${item.id}-details-container`}>
                  {formatDetails(item)}
                </div>
              </div>
            ))}
          </MainSection>
        </div>
      </div>
    </div>
  )
}

export default Resume;