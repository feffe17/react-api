// src/assets/AppMain.jsx
import Card from "../components/Card";
import { posts } from "../components/post.js";

export default function AppMain() {
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
