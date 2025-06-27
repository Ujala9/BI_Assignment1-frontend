import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import { Link } from "react-router-dom"
import useFetch from "./useFetch";
import { useLocation } from "react-router-dom";


export default function App() {
   const [filterType, setFilterType] = useState("")
   const [searchQuery, setSearchQuery] = useState("");
   const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search")?.toLowerCase() || "";
    setSearchQuery(query);
  }, [location.search]);
  
   const { data, loading, error} = useFetch("https://bi-assignment1-backend-mu.vercel.app/events")

   console.log(data)

  
  const filteredEvents = data?.filter((event) => {
    const matchesType = filterType ? event.type === filterType : true;
  
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery) ||
      event.tags?.some((tag) => tag.toLowerCase().includes(searchQuery));
  
    return matchesType && matchesSearch;
  });
  
  

  return (
    <>
    <Header/>
    
    <h1 className="text-success text-center display-1 fw-bold py-2">MeetUp Events</h1>

    <div className="d-flex justify-content-end px-5 mx-5 pb-3">
     <select className="form-select"
        onChange={(e) => setFilterType(e.target.value)} value={filterType} style={{ maxWidth: "200px" }}>
          <option value="">Select event Type</option>
          <option value="online">Online Event</option>
          <option value="offline">Offline Event</option>
       </select>
       </div>

     
       
      
      <section className="container">
        <div className="row my-4 ">
        {filteredEvents?.map((event) => (
                  <div key={event._id} className="col-md-4 mb-5">
                  <div className="position-relative card">
                    <span class="badge bg-light text-dark position-absolute  start-0 m-3 p-2 fw-bold">
                             {event.type}
                      </span>
                      <img src={event.image} alt="img1" className="img-fluid" style={{height: "300px", objectFit: "cover" }} />
                    <div className="card-body">
                       <p className="card-text"><small className="text-body-secondary">{event.date} - {event.startTime} IST</small></p>
                     <h5 className="card-title">{event.title}</h5>
                     <Link to={`/details/${event._id}`} className="btn btn-success">Details</Link>
                   </div>
                  </div>
                  </div>
        ))}
        </div>
      </section>
    </>
  );
}
