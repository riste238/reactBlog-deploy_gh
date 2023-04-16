import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import { format } from 'date-fns'
import api from './api/post.js'
const EditPost = () => {

    const { posts, setPosts } = useContext(DataContext)
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const navigate = useNavigate()

    console.log('ALL posts', posts);
    const { id } = useParams();
    const item = posts.find(stavka => (stavka.id).toString() === id);

    useEffect(() => {
        if (item) {
            setEditTitle(item.title)
            setEditBody(item.body)
        }
    }, [item, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };

        try {
            const response = await api.put(`/posts/${id}`, updatePost);
            console.log(response.data);

            setPosts(posts.map((post) => post.id === id ? { ...response.data } : post))
            setEditTitle('')
            setEditBody('')
            navigate('/')
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit item</h2>

                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Edit Title</label>
                        <input type="text"
                            name="editTitle"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody" >Edit Body</label>
                        <textarea name="editBody" id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        ></textarea>
                        <button type="submit" onClick={() => handleEdit(item.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>item Not Found</h2>
                    <p>Well this' dissapointing.</p>
                    <Link to="/">Visit our page</Link>
                </>
            }
        </main >
    )
}
export default EditPost;

