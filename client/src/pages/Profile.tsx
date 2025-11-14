export default function Profile() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <form>
                <label className="input">
                    <span className="label">@</span>
                    <input type="text" placeholder="tag" />
                </label>
            </form>
        </div>
    );
}