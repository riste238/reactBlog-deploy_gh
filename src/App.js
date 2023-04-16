import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage';
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS blog" />
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post" element={<NewPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
