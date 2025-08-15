import '../styles/Resume.css'
import mailBlack from '../assets/mail-black.svg'
import mapPinBlack from '../assets/map-pin-black.svg'
import phoneBlack from '../assets/phone-black.svg'
import MainSection from './MainSection';
import SideSection from './SideSection';

function Resume({ data }) {
  const address = data.contact.address;

  return (
    <div className="resume preview">
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
        <MainSection heading={"EXPERIENCE"}/>
      </div>
    </div>
  )
}

export default Resume;