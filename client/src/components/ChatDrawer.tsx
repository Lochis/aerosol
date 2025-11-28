export default function ChatDrawer(htmlFor: string) {
  return (
    <div className="drawer">
      <input id={htmlFor} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor={htmlFor}
          className="btn btn-square btn-ghost drawer-button"
        >
          {/* Hamburger icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={htmlFor}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-lg min-h-full w-80 p-4">
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="text-2xl font-bold">Messages</h3>
            <button className="btn btn-primary btn-circle w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="divider"></div>
          {/* Sidebar content here */}
          <li>
            <a>#TypeScript</a>
          </li>
          <li>
            <a>#React</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
