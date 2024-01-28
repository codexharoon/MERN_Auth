import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={user.photo}
          alt="user photo"
          className="h-24 w-24 rounded-full object-cover self-center"
        />
        <input
          type="text"
          defaultValue={user.username}
          placeholder="Username"
          id="username"
          required
          className="p-3 bg-slate-100 rounded-lg"
        />
        <input
          type="email"
          defaultValue={user.email}
          placeholder="Email"
          id="email"
          required
          className="p-3 bg-slate-100 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          className="p-3 bg-slate-100 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5 cursor-pointer font-semibold text-red-700">
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
