import Avatar from "boring-avatars";
import { useAuth } from "../lib/auth";
import { useNavigate, Link } from "react-router";
import Search from "./Search.tsx";
import ChatDrawer from "./ChatDrawer.tsx";

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.clearAuth();
    navigate("/auth");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="grid grid-cols-3 w-full justify-items-center">
        <div className="flex flex-row">
          <ChatDrawer htmlFor="my-drawer-1" />

          <Link className="btn btn-ghost text-xl" to="/">
            Aerosol
          </Link>
        </div>

        <Search onSelect={(user) => navigate(`/profile/${user.tag}`)} />

        <div className="dropdown dropdown-bottom dropdown-end relative">
          <div
            data-testid="avatar-button"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
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
            className="right-0 menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-36 p-2 shadow-sm"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link data-testid="settings-link" to="/settings">Settings</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
