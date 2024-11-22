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
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        tags: [],
        content: "",
        image: "",
        published: true,
    });

    useEffect(() => {
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox" && name === "tags") {
            // Aggiungi o rimuovi i tag selezionati
            setFormData((prev) => ({
                ...prev,
                tags: checked
                    ? [...prev.tags, value]
                    : prev.tags.filter((tag) => tag !== value),
            }));
        } else if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Funzione per gestire l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:3003/posts/", formData);
            setShowForm(false); // Nascondi il form dopo l'invio
            setFormData({
                title: "",
                tags: [],
                content: "",
                image: "",
                published: true,
            });
            const response = await axios.get("http://127.0.0.1:3003/posts/");
            setPosts(response.data.lista); // Aggiorna i post
        } catch (err) {
            console.error("Errore durante l'invio dei dati:", err);
        }
    };

    return (
        <main>
            <button className="addBtn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Chiudi" : "+"}
            </button>
            {showForm && (
                <form className="addPostForm" onSubmit={handleSubmit}>
                    <label>
                        Titolo:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <fieldset>
                        <legend>Seleziona linguaggi:</legend>
                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="html"
                                onChange={handleInputChange}
                            />
                            HTML
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="css"
                                onChange={handleInputChange}
                            />
                            CSS
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="js"
                                onChange={handleInputChange}
                            />
                            JavaScript
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="tags"
                                value="php"
                                onChange={handleInputChange}
                            />
                            PHP
                        </label>
                    </fieldset>
                    <label>
                        Descrizione:
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </label>
                    <label>
                        Immagine URL:
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Pubblicato:
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Invia</button>
                </form>
            )}
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
