import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/MetaData";

import "./Search.css"
const Search = ({history}) => {
    let navigate= useNavigate()
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };
  return (
<>
<MetaData title={`SEARCH-- ECOMMERCE`} />

<form className="searchBox" onSubmit={searchSubmitHandler}>    
<input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />

<input type="submit" value="Search" />

</form>

</>
    )
}

export default Search