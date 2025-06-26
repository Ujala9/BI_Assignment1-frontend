import { NavLink,useNavigate, useLocation }  from "react-router-dom"
import { useState,useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentQuery = searchParams.get("search") || "";
    setQuery(currentQuery); // So that input field shows correct value
  }, [location.search]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const searchParams = new URLSearchParams(location.search);

    if (value.trim()) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    navigate({ search: searchParams.toString() });
  }
  
    return (
    <nav className="navbar bg-body-tertiary">
  <div className="container">
    <NavLink to="/" className="navbar-brand text-success fst-italic fs-1 fw-bold">meetUp</NavLink>
    <form className="d-flex mx-4" role="search" >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by title or tags"
            aria-label="Search"
            value={query}
            onChange={handleChange} 
          />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
)}

export default Header;