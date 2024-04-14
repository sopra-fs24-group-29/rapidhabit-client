import BaseContainer from "components/ui/BaseContainer";
import FormField from "../ui/FormField.tsx";
import { useState, useEffect } from "react";
import { api } from "helpers/api";
import { Button } from "../ui/Button.tsx";
import { useParams } from "react-router-dom";


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const { userId } = useParams();
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        console.log("Response:", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
    setIsDataChanged(true);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSave = () => {
    window.location.reload();
  };

  return (
    <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div>
            <h1 className="text-left text-2xl lg:text-4xl">Profile</h1>
            <div className="flex items-center justify-center mt-2">
              <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center text-2xl font-bold">
                {userData.firstname.charAt(0).toUpperCase()}
                {userData.lastname.charAt(0).toUpperCase()}
              </div>
            </div>

            <h3 className="text-left  mt-5">Firstname</h3>
            <FormField
              type="text"
              label=""
              value={userData.firstname}
              onChange={(un: string) => handleInputChange("firstname", un)}
            />
            <h3 className="text-left  mt-3">Lastname</h3>
            <FormField
              type="text"
              label=""
              value={userData.lastname}
              onChange={(un: string) => handleInputChange("lastname", un)}
            />
            <h3 className="text-left  mt-3">Email</h3>
            <FormField
              type="email"
              label=""
              value={userData.email}
              onChange={(un: string) => handleInputChange("email", un)}
            />
            {isDataChanged && (
            <div className="flex justify-between mt-5">

              <Button
                className="cursor-pointer py-0 px-4 w-20"
                onClick={handleCancel}
              >
                Cancel
              </Button>


              <Button
                className="cursor-pointer py-0 px-4 w-20"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
            )}
            <div className="border-b border-input my-8"></div>
            <h3 className="text-left  mt-3">Change Password</h3>

            <div>
              <div>
                <FormField
                  type={showPassword ? "text" : "password"}
                  label="Type old password"
                  value={oldPassword}
                  onChange={(un: string) => setOldPassword(un)}
                />
              </div>
              <div className="mt-3 relative">
                <FormField
                  type={showPassword ? "text" : "password"}
                  label="Type new password"
                  value={newPassword}
                  onChange={(un: string) => setNewPassword(un)}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex justify-end mt-1 cursor-pointer"
                >
                  <img
                    className="w-6 h-6"
                    src={showPassword ? "/hide.png" : "/show.png"}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
    </BaseContainer>
  );
};

export default ProfilePage;
