import { themeChange } from "theme-change";
import { useEffect, useState } from "react";

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk",
  ];

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold my-4">Settings</h1>
      <h2 className="text-2xl font-semibold mb-2">Select Theme</h2>
      <div className="flex flex-wrap gap-4 p-4">
        {themes.map((theme) => (
          <button
            data-theme={theme}
            data-set-theme={theme}
            data-testid={`${theme}-theme`}
            data-act-class="ACTIVECLASS"
            className={`btn ${
              currentTheme === theme ? "btn-outline border-red-500" : ""
            }`}
            disabled={currentTheme === theme}
            onClick={() => setCurrentTheme(theme)}
            key={theme}
          >
            {theme}
          </button>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-2">Theme Preview</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-success">Save</button>
          <button className="btn btn-warning">Delete</button>
          <input type="text" placeholder="Input" className="input input-bordered w-full max-w-xs" />
          <textarea className="textarea textarea-bordered" placeholder="Post"></textarea>
        </div>
    </div>
  );
}
