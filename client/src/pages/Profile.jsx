/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../features/auth/UserSlice";
import { useState, useRef, useEffect } from "react";
import app from "../Firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  signOut,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  showLoading,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  resetMessages,
  showError,
} from "../features/auth/UserSlice";
import { BASE_URL } from "../app/api/axios";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";

let uploadingToastId = null;

const Profile = () => {
  const currentUser = useSelector(userDetails);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);

  const loading = useSelector(showLoading);
  const error = useSelector(showError);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    profilePicture: currentUser?.profilePicture,
  });

  useEffect(() => {
    let errorTimeout, successTimeout;

    if (error) {
      errorTimeout = setTimeout(() => {
        dispatch(resetMessages());
      }, 5000);
    }

    if (updateSuccess) {
      successTimeout = setTimeout(() => {
        setUpdateSuccess(false);
      }, 5000);
    }

    // Clear the timeouts when the component is unmounted
    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, updateSuccess]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
        setShowUploadSuccess(true);
        setTimeout(() => {
          setShowUploadSuccess(false);
        }, [10000]);
      }
    );
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`${BASE_URL}/user/${currentUser?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // withCredentials: true,
        });
        const data = await res.json();
        toast.success("user account deleted successfully");

        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        dispatch(deleteUserFailure(error));
      }
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${BASE_URL}/user/${currentUser?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // withCredentials: true,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data));
        //  toast.error(data.message);
        // throw new Error("Network response was not ok");
      }
      dispatch(updateUserSuccess(data));
      toast.success("User info is updated successfully!");
      setUpdateSuccess(true);
    } catch (error) {
      toast.error(error.message);
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
      });
      await response.json();

      toast.success("signout successful");
      dispatch(signOut());
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageError) {
      toast.error("Error uploading image");
    } else if (imagePercent > 0 && imagePercent < 100) {
      toast.dismiss(uploadingToastId);
      uploadingToastId = toast.info(`Uploading: ${imagePercent} %`);
    } else if (showUploadSuccess) {
      toast.dismiss(uploadingToastId);
      toast.success("Image uploaded successfully");
    }
  }, [imageError, imagePercent, showUploadSuccess]);

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <form className="flex flex-col space-y-6" onSubmit={handleUpdate}>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(event) => setImage(event.target.files[0])}
          />

          {currentUser ? (
            <img
              src={
                formData.profilePicture
                  ? formData.profilePicture
                  : currentUser?.profilePicture
              }
              alt="profile-picture"
              className="rounded-full self-center object-cover h-20 w-20"
            />
          ) : (
            <FaUserAlt className="bg-gray-500 rounded-full self-center object-cover h-20 w-20 p-2 text-white" />
          )}

          {/* <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : showUploadSuccess ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p> */}
          <div
            className="text-red-800 self-center cursor-pointer hover:underline"
            onClick={() => fileRef.current.click()}
          >
            update profile picture
          </div>
          <input
            type="text"
            id="username"
            className="bg-slate-200  rounded-full py-2 px-4 outline-blue-200 hover:outline-blue-500"
            placeholder="username"
            defaultValue={currentUser?.username}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            defaultValue={currentUser?.email}
            className=" bg-slate-200  rounded-full py-2 px-4 outline-primary hover:outline-primary/50"
            placeholder="email"
            onChange={handleChange}
            disabled
          />
          <input
            type="password"
            id="password"
            className="bg-slate-200  rounded-full py-2 px-3 outline-blue-200 hover:outline-blue-500"
            placeholder="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-primary p-2 uppercase text-white rounded-full font-semibold disabled:opacity-70 hover:opacity-90  "
          >
            {loading ? "UPDATE..." : "UPDATE"}
          </button>
        </form>
        <div className="flex justify-between text-red-600 my-6 font-semibold">
          <span
            onClick={handleDeleteAccount}
            className="bg-primary text-white cursor-pointer py-2 px-3 rounded-full hover:opacity-90  "
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="bg-primary text-white  py-2 px-3 rounded-full cursor-pointer hover:opacity-90  "
          >
            Sign Out
          </span>
        </div>
        <div>
          {error && <p className="text-red-700 mt-5">Something went wrong!</p>}
          {updateSuccess && (
            <p className="text-green-700 mt-5">User is updated successfully!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
