import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="hero bg-base-200 h-[61.5vh]">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1738279494075-5183d2eadc05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="background"
            className="h-52 w-full object-cover"
          />
        </figure>
        <div className="absolute top-24 left-32">
          <img
            src={user?.photoURL}
            alt="profile"
            className="size-32 rounded-full object-cover"
          />
        </div>
        <div className="card-body mt-2">
          <h2 className="card-title">{user?.displayName}</h2>
          <p>
            <span className="font-semibold">Email : </span>
            {user?.email}
          </p>
          <div className="card-actions justify-end">
            <a href="/settings" className="btn bg-red text-white">
              Setting
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
