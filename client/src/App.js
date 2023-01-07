import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/addPost" element={<AddPostForm/>}/>
          <Route path="/" element={<PostsList/>}/>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
