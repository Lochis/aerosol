import { useState, ChangeEvent } from "react";
import { useAuth } from "../lib/auth.ts";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router";

export default function Search({
  navigateOnSelect = true,
}: {
  navigateOnSelect?: boolean;
}) {
  type ReducedUsers = {
    _id: string;
    tag: string;
    name: string;
  };

  const auth = useAuth();
  const [searchUsers, setSearchUsers] = useState<ReducedUsers[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const userTag = e.target.value;
    setSearch(userTag);
    setSelectedId("");
    getUsers(userTag);
  };

  const getUsers = async (search: string) => {
    try {
      const response = await auth.client.get(
        `${process.env.CLIENT_API_BASE}/users?search=${search}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSearchUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching searchable users", error);
    }
  };

  const handleSelect = (user: ReducedUsers) => {

    setSearch(user.tag);
    setSelectedId(user._id);
    setSearchUsers([]);

    // if consumer wants navigation (default), navigate to profile
    if (navigateOnSelect) {
      navigate(`/profile/${user.tag}`);
    }

    setSearch(user.tag);
  };

  return (
    <div
      className={`dropdown ${
        searchUsers.length > 0 ? "dropdown-open" : "dropdown-close"
      }`}
    >
      <label className="input input-secondary w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
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
        <input
          type="text"
          className="grow w-full"
          placeholder="Search"
          value={search}
          onClick={handleChange}
          onChange={handleChange}
        />

        {/* hidden input with the selected user's id — this is what the form will submit */}
        <input type="hidden" name="searchUser" value={selectedId} />
      </label>

      {searchUsers.length > 0 && (
        <ul
          tabIndex={-1}
          className="mt-4 dropdown-content menu bg-base-100 z-1 w-full shadow-md"
        >
          {searchUsers.map((user: ReducedUsers) => (
            <li key={user._id}>
              <button
                onClick={() => handleSelect(user)}
                className="block w-full text-left"
                type="button"
              >
                <div className=" flex flex-row items-center gap-2">
                  <Avatar
                    size={32}
                    name={user.name}
                    variant="beam"
                    colors={[
                      "#92A1C6",
                      "#146A7C",
                      "#F0AB3D",
                      "#C271B4",
                      "#C20D90",
                    ]}
                  />
                  <span>@{user.tag}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
