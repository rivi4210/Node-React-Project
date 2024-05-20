import React from 'react';
import { useSearchParams } from "react-router-dom"
import { MdSearch } from 'react-icons/md';

const Search = ({ placeholder, onSearch }) => {

const [searchParams, setSearchParams] = useSearchParams()

  const handleInputChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };


  return (
    <div style={styles.container}>
      <MdSearch style={styles.icon} />
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        //onChange={handleInputChange}
        onChange={(e) => setSearchParams({ q: e.target.value })} 
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px 8px',
    maxWidth: '400px',
    width: '100%',
  },
  icon: {
    marginRight: '8px',
    color: '#888',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
  },
};

export default Search;
