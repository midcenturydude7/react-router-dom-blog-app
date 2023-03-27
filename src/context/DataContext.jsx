import React from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = React.createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // Custom hook API call
  React.useEffect(() => {
    setPosts(data);
  }, [data]);

  React.useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

// Inline API Call
// React.useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       const response = await api.get("/posts");
//       setPosts(response.data);
//     } catch (err) {
//       if (err.response) {
//         // Not in the 200 response range
//         console.log(err.response.data);
//         console.log(err.response.status);
//         console.log(err.response.headers);
//       } else {
//         // 404
//         console.log(`Error: ${err.message}`);
//       }
//     }
//   };

//   fetchPosts();
// }, []);
