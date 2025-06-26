import Header from "./components/Header";
import { useParams } from "react-router-dom"
import useFetch from "./useFetch";

const EventDetails = () => {
   const { eventId } = useParams()
   //console.log(eventId)
   
   const { data,loading,error } = useFetch("https://bi-assignment1-backend-mu.vercel.app/events")

   console.log(data)

    const eventData = data?.find(event => event._id === eventId)
    return(
         <>
         <Header/>
         {eventData ? (
            <>
                <div className="container">
                  <h2 className="fw-bold my-4">{eventData.title}</h2>
                  <p className="text-muted">Hosted by: <br/> <strong>{eventData.speakers[0].name}</strong></p>
               </div>

             <section className="container">
               <div className="row">
                  {/* left */}
                  <div className="col-md-7">
                    <img src={eventData.image} alt="img" className="img-fluid" style={{width: "500px", height: "300px"}}/>
              
                   <div className="mt-4">
                     <h4>Details:</h4>
                     <p className="ms-3">{eventData.description}</p>
                    </div>
                     <div>
                     <h5>Additional Information:</h5>
                     <p><strong>Dress Code:  </strong>{eventData.dressCode}</p>
                     <p><strong>Age Restrictions: </strong>{eventData.ageRestriction}</p>
                     <h6>Events Tag</h6>
                   </div>
               </div>
          
              {/* Right */}
               <div className="col-md-5">
               <div className="bg-white p-3 rounded shadow-sm">
                <p><strong>{new Date(eventData.date).toDateString()}</strong></p>
                 <p>{eventData.startTime} to {eventData.endTime}</p>
               <p>{eventData.location}</p>
             <p><strong>₹ {eventData.price.toLocaleString()}</strong></p>
           </div>
    
    
           <div className="mt-4">
             <h5>Speakers: ({eventData.speakers.length})</h5>
           <div className="d-flex gap-3 flex-wrap">
               {eventData.speakers.map((speaker, index) => (
            <div key={index} className="text-center border p-2    rounded shadow-sm">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <h6 className="mb-0">{speaker.name}</h6>
              <small>{speaker.role}</small>
            </div>
          ))}
        </div>
        <button className="btn btn-success mt-3">RSVP</button>
      </div>
    </div>
  </div>
              </section>
               </>
         ):(
            loading && <p>laoding....</p>
         ) }
         
         </>
    )
}

export default EventDetails;