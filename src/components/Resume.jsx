import '../styles/Resume.css'
import mailBlack from '../assets/mail-black.svg'
import mapPinBlack from '../assets/map-pin-black.svg'
import phoneBlack from '../assets/phone-black.svg'
import defaultUser from '../assets/default-user.png'
import MainSection from './MainSection';
import SideSection from './SideSection';
import { formatDate, formatDetails, formatOneLiners } from '../utils/helper';

function Resume({ data }) {
  const address = data.contact.address;

  return (
    <div className="preview">
      <div className="resume">
        <div className='side-area'>
          <img src={defaultUser} alt="user icon" />
          <SideSection heading={"SUMMARY"}>
            {data.summary && formatOneLiners(data.summary, "summary")}
          </SideSection>
          <SideSection heading={"SKILLS"} displayStatus={data.skills ? "shown" : "hidden"}>
            {data.skills && formatOneLiners(data.skills, "skills")}
          </SideSection>
          <SideSection heading={"LANGUAGES"} displayStatus={data.languages.length > 0 ? "shown" : "hidden"}>
            <ul>
              {data.languages.map(item => (
                <li key={`language-${item.language}`}>• {item.language} {item.level && `- ${item.level}`}</li>
              ))}
            </ul>
          </SideSection>
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
          <MainSection heading={"EDUCATION"}>
            {data.education.map(item => (
              <div key={`${item.id}-container`} className='education-card'>
                <p key={`${item.id}-graduationDate`} className='date'>{formatDate(item.graduationDate)}</p>
                <p key={`${item.id}-qualification`} className='qualification'>{item.qualification}</p>
                <p key={`${item.id}-institution`} className='institution'>{item.institution} <span className='location'> | {item.location}</span></p>
                <div key={`${item.id}-details-container`}>
                  {formatDetails(item)}
                </div>
              </div>
            ))}
          </MainSection>
          <MainSection heading={"CERTIFICATIONS"} displayStatus={data.certifications ? "shown" : "hidden"}>
            <div>{data.certifications && formatOneLiners(data.certifications, "certifications")}</div>
          </MainSection>
        </div>
      </div>
    </div>
  )
}

export default Resume;