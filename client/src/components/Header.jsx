import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-300">
      <nav className="flex justify-between max-w-4xl mx-auto p-3">
        <h1 className="text-xl font-bold">Code x Auth</h1>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-red-400" : "text-black"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "text-red-400" : "text-black"}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "text-red-400" : "text-black"}`
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
