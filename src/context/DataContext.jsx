// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// API import
import api from "../api/posts";

// Date format dependency
import { format } from "date-fns";

// Custom hooks imports
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = React.createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [postTitle, setPostTitle] = React.useState("");
  const [postBody, setPostBody] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [editTitle, setEditTitle] = React.useState("");
  const [editBody, setEditBody] = React.useState("");

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // Custom hook API call
  React.useEffect(() => {
    setPosts(data);
  }, [data]);

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

  React.useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
