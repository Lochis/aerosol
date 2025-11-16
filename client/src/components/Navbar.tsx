import Avatar from "boring-avatars";

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="mx-auto flex w-full">
                <div className="flex-none">
                    {/* Hamburger icon*/}
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl" href="/">Aerosol</a>
                </div>
                    <div className="dropdown dropdown-bottom dropdown-end relative">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" >
                            <div className="w-10 rounded-full" >
                                <Avatar
                                    size={40}
                                    name="name"
                                    variant="beam"
                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="right-0 menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-36 p-2 shadow-sm">
                            <li>
                                <a className="justify-between" href="/profile">
                                    Profile
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
            </div>
        </div>
    )
}