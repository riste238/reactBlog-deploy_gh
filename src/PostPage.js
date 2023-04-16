import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from './context/DataContext';

const PostPage = () => {

    const { posts, setPosts } = useContext(DataContext)
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id);
    const navigate = useNavigate()

    const handleDelete = (id) => {
        const items = posts.filter(post => post.id !== id);
        setPosts(items)
        navigate('/')
    }

    return (<main className="PostPage">
        <article className="post">
        {post &&
            <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
                <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
            </>
        }
        {!post &&
            <>
                <p>Post Not Found</p>
                <p>Well that's dissapointing.</p>
                <Link to="/">Visit Our HomePage</Link>
            </>
        }
        </article>
    </main>
    )
}
export default PostPage;