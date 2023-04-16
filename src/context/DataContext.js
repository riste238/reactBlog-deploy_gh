import { createContext,useEffect, useState } from "react";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  const { width } = useWindowSize();

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