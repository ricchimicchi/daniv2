import React from "react";
import DarkToggle from "../ui/darktoggle";
import SignUpForm from "../ui/signup";

const Profile = () => {
  return (
    <div className="overflow-y-auto">
      <DarkToggle />
      <SignUpForm />
    </div>
  );
};

export default Profile;
