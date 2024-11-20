// src/assets/AppMain.jsx
import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
// import { posts } from "../components/post.js";

// export default function AppMain() {
//     const publishedPosts = posts.filter(post => post.published);

//     return (
//         <main>
//             <div className="container">
//                 {publishedPosts.map(post => (
//                     <Card
//                         key={post.id}
//                         title={post.title}
//                         description={post.content}
//                         image={post.image || "https://placehold.co/600x400"}
//                         tags={post.tags}
//                         buttonText="Leggi di più"
//                     />
//                 ))}
//             </div>
//         </main>
//     );
// }

export default function AppMain() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Recupero dei dati
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3003/posts/");
                setPosts(response.data.lista);
            } catch (err) {
                console.error("Errore durante il caricamento dei dati:", err);
                setError("Errore durante il caricamento dei dati.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    const publishedPosts = posts.filter(post => post.published);

    return (
        <main>
            <div className="container">
                {publishedPosts.map(post => (
                    <Card
                        key={post.id}
                        title={post.title}
                        description={post.content}
                        image={post.image || "https://placehold.co/600x400"}
                        tags={post.tags}
                        buttonText="Leggi di più"
                    />
                ))}
            </div>
        </main>
    );
}
