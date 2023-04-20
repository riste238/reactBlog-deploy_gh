import { createContext, useEffect, useState } from "react";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

  const [posts, setPosts] = useState([])
  // const url = JSON.parse('https://raw.githubusercontent.com/riste238/data/main/db.json');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);


  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResult(filteredResults.reverse())
  }, [posts, search])

  return (<DataContext.Provider value={{
    width, search, setSearch,
    searchResult, fetchError, isLoading,
    // postTitle, setPostTitle, postBody, setPostBody, handleSubmit,
    posts, setPosts
    //  handleEdit, editTitle, setEditTitle, editBody, setEditBody,
  }}>
    {children}
  </DataContext.Provider>)
}

export default DataContext;