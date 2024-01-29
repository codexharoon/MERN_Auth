import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const { user, loading, error, errorMsg } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const imageFileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [ImageError, setImageError] = useState(false);
  const [profileData, setProfileData] = useState({});

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(userUpdateStart());

      const response = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(userUpdateFailure(data.message));
        return;
      } else {
        dispatch(userUpdateSuccess(data.user));
        setProfileUpdateSuccess(true);

        setImageError(false);
        setProgress(0);
      }
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
    }
  };

  const handleUploadImage = async () => {
    setImageError(false);
    setProgress(0);

    const storage = getStorage(app);
    const imageFileName = Math.round(Math.random() * 1000000) + image.name;
    const storageRef = ref(storage, imageFileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileData({ ...profileData, photo: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={imageFileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={profileData.photo || user.photo}
          alt="user photo"
          onClick={() => imageFileRef.current.click()}
          className="h-24 w-24 rounded-full object-cover cursor-pointer self-center"
        />
        <p className="text-sm text-center">
          {ImageError ? (
            <span className="text-red-700">
              Error uploading image (File should be an *Image and Size less than
              *5MB)
            </span>
          ) : progress > 0 && progress < 100 ? (
            <span className="text-slate-700">{`Uploading Image ${progress}%`}</span>
          ) : progress === 100 ? (
            <span className="text-green-600">Image Uploaded Successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={user.username}
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
        <input
          type="email"
          defaultValue={user.email}
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="p-3 bg-slate-100 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <p className="text-sm text-center text-red-700 mt-2">
        {error ? errorMsg : ""}
      </p>
      <p className="text-sm text-center text-green-600 mt-2">
        {profileUpdateSuccess ? "Profile updated Successfully!" : ""}
      </p>
      <div className="flex justify-between mt-5 cursor-pointer font-semibold text-red-700">
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
