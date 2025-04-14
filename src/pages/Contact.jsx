import { faClock, faEnvelope, faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



function Contact() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center text-3xl font-bold p-4">Get In Contact</h1>
    

    
             
      <p className="text-center text-lg mb-8">
        Thank you for your interest in reaching out to us. We're here to help with any questions or concerns you may have about our products or services.
      </p>
      
      <div className="mx-auto w-[90%] min-w-[300px] gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faClock}/>
            Customer Support Hours
          </h2>
          <p className="mb-1 ml-4">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
          <p className="mb-1 ml-4">Saturday: 10:00 AM - 4:00 PM EST</p>
          <p className="mb-4 ml-4">Sunday: Closed</p>
          
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <FontAwesomeIcon icon={faPhone}/>
          Phone
          </h2>
          <p className="mb-4 ml-4">1-800-123-4567</p>
          
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <FontAwesomeIcon icon={faEnvelope}/>
          Email
          </h2>
          <p className="mb-4 ml-4">customer.service@yourstore.com</p>
          
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-4">
          <FontAwesomeIcon icon={faMapPin}/>Physical Address
          </h2>
          <p className="mb-1 ml-4">Vantra</p>
          <p className="mb-1 ml-4">Milky Way Street</p>
          <p className="mb-4 ml-4">Space</p>
          
        </div>
      </div>
    
      
    </div>
  )
}

export default Contact