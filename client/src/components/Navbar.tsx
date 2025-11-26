import Avatar from "boring-avatars";
import { useAuth } from "../lib/auth";
import { useNavigate, Link } from "react-router";
import { useState } from "react";

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.clearAuth();
    navigate("/auth");
  }

  type ReducedUsers = {
    _id: string;
    tag: string,
    name: string,
  };

  const [searchUsers, setSearchUsers] = useState<ReducedUsers[]>([]);
  const [search, setSearch] = useState("");

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    getUsers(e.target.value);
  }

  const getUsers = async (search: string) => {
    try {
      const response = await auth.client.get(`${process.env.CLIENT_API_BASE}/users?search=${search}`, {
        headers: { "Content-Type": "application/json" },
      });

      setSearchUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching searchable users", error);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">

      <div className="grid grid-cols-3 w-full justify-items-center">
        <div>
          {/* Hamburger icon*/}
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
          </button>

          <Link className="btn btn-ghost text-xl" to="/">Aerosol</Link>
        </div>

        <div className="dropdown">
          <div className={`dropdown ${searchUsers.length > 0 ? 'dropdown-open' : 'dropdown-close'}`}>

            <label className="input input-secondary">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="text" className="grow" placeholder="Search" onClick={(e) => handleChange(e)} onChange={(e) => handleChange(e)} />
            </label>


            {searchUsers.length > 0 && (
              <ul tabIndex={-1}
                className="mt-4 dropdown-content menu  bg-base-100 z-1 w-full shadow-md">
                {searchUsers.map((user: ReducedUsers) => (
                  <li key={user._id}>

                    <Link to={`/profile/${user.tag}`} className="block w-full">

                      <div className=" flex flex-row items-center gap-2">
                        <Avatar
                          size={32}
                          name={user.name}
                          variant="beam"
                          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                        <span>@{user.tag}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}


          </div>
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
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div >
  )
}
