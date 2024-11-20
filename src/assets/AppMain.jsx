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
    const [posts, setPosts] = useState([]); // Stato per i post
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const [error, setError] = useState(null); // Stato per errori

    useEffect(() => {
        // Recupero dei dati
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3003/posts/"); // Usa fetch se preferisci
                setPosts(response.data.lista); // Imposta i post dalla proprietà lista
            } catch (err) {
                console.error("Errore durante il caricamento dei dati:", err);
                setError("Errore durante il caricamento dei dati.");
            } finally {
                setLoading(false); // Fine caricamento
            }
        };

        fetchPosts();
    }, []); // [] indica che verrà eseguito solo una volta all'inizio

    // Controlli durante il caricamento o in caso di errore
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    // Filtra solo i post pubblicati
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
