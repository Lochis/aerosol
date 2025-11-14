import Post from "../components/Post"

export default function Home() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="py-2">
            {items.map((id) => (
                <Post key={id} picture={id % 2 === 0} />
            ))}
        </div>
    )
}