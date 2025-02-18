import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SettingPage = () => {
  const { updateUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    // Ensure 'data' is being passed correctly from the form
    updateUser(data.displayName, data.photoURL)
      .then(() => {
        Swal.fire({
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setValue("displayName", "");
        setValue("photoURL", "");
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error updating profile:", err);
        Swal.fire({
          title: "Error",
          text: "There was an error updating your profile.",
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="h-[61.5vh] flex items-center justify-center bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="card w-full max-w-md shadow-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="card-title">Update your profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              defaultValue={user?.displayName || ""}
              {...register("displayName", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile picture</span>
            </label>
            <input
              type="text"
              placeholder="profile picture url"
              className="input input-bordered"
              defaultValue={user?.photoURL || ""}
              {...register("photoURL", { required: true })}
            />
            {/* Optional: You can uncomment the next line to allow image upload */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-red text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
