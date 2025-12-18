import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import MyPostsPage from './pages/MyPostsPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
