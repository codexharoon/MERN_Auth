import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const imageFileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState({});

  const handleUploadImage = async () => {
    setError(false);
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
        setError(true);
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
      <form className="flex flex-col gap-4">
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
          {error ? (
            <span className="text-red-700">
              Error uploading image (File should be an *Image and Size less than
              *5MB)
            </span>
          ) : progress > 0 && progress < 100 ? (
            <span className="text-slate-700">{`Uploading Image ${progress}%`}</span>
          ) : progress === 100 ? (
            <span className="text-green-600">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
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
