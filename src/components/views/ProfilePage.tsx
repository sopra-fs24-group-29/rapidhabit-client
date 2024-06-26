import BaseContainer from "components/ui/BaseContainer";
import TabBar from "components/ui/Tabbar.tsx";
import { api } from "helpers/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button.tsx";
import FormField from "../ui/FormField.tsx";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Response:", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // profile information (firstname, lastname, email)
  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
    setIsDataChanged(true);
  };

  // profile information (firstname, lastname, email)
  const handleCancel = () => {
    window.location.reload();
  };

  // profile information (firstname, lastname, email)
  const handleSave = async () => {
    try {
      console.log("Saving user...");
      await api.put("users/update", userData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("User saved successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(
        "The user could not be updated. Check if all fields are filled correctly."
      );
    }
  };

  // password change
  const handlePasswordChange = async () => {
    try {
      const response = await api.put(
        "/users/password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) console.log("Password changed successfully");
      alert("password was changed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating password:", error);
      alert("wrong password");
    }
  };

  // logout
  const doLogout = async () => {
    try {
      await api.put("users/logout", null, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("logged out successfully");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("logout failed, ", error);
    }
  };

  // delete account
  const doAccountDeletion = async () => {
    try {
      if (!currentPassword) {
        alert("Please enter your current password to delete your account.");
        return;
      }

      const requestBody = {
        currentPassword: currentPassword,
      };
      await api.delete("/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: JSON.stringify(requestBody),
      });
      localStorage.removeItem("token");
      console.log("account deletion was successful");
      alert(
        "account deletion was successful.\nyou will be redirected to the welcome page"
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting user account:", error);
      alert("wrong password, try again!");
    }
  };

  return (
    <div>
      <BaseContainer>
        <h1 className="text-center text-4xl flex lg:pd lg:p-6 items-start font-bold pb-10">
          Profile
        </h1>
        <div className="flex flex-col items-center justify-start mt-6">
          <div className="w-custom-354 px-8 pb-40">
            <div className="flex items-center justify-center mt-2">
              <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center text-2xl font-bold">
                {userData.firstname.charAt(0).toUpperCase()}
                {userData.lastname.charAt(0).toUpperCase()}
              </div>
            </div>
            <h3 className="py-2">First name</h3>
            <FormField
              value={userData.firstname}
              maxLength={20}
              onChange={(un: string) => handleInputChange("firstname", un)}
            />
            <h3 className="py-2">Last name</h3>
            <FormField
              value={userData.lastname}
              maxLength={20}
              onChange={(un: string) => handleInputChange("lastname", un)}
            />
            <h3 className="py-2">Email</h3>
            <FormField
              maxLength={50}
              value={userData.email}
              onChange={(un: string) => handleInputChange("email", un)}
            />
            {isDataChanged && (
              <div className="flex justify-between mt-5 gap-2">
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
            <h3 className="text-left mt-3">Change Password</h3>
            <div>
              <div>
                <FormField
                  type={showPassword ? "text" : "password"}
                  label="Type current password"
                  maxLength={20}
                  value={currentPassword}
                  onChange={(un: string) => setCurrentPassword(un.replace(/\s/g, ''))}
                />
              </div>
              <div className="mt-3 relative">
                <FormField
                  type={showPassword ? "text" : "password"}
                  label="Type new password"
                  maxLength={20}
                  value={newPassword}
                  onChange={(un: string) => setNewPassword(un.replace(/\s/g, ''))}
                />
                <div className="flex mt-1 justify-between">
                  {currentPassword !== "" && newPassword !== "" && (
                    <Button
                      className=" mt-2 w-auto py-0 flex-grow-0"
                      type="button"
                      disabled={!currentPassword || !newPassword}
                      onClick={handlePasswordChange}
                    >
                      Change
                    </Button>
                  )}
                  <img
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 h-6 cursor-pointer"
                    src={showPassword ? "/hide.png" : "/show.png"}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </div>
              </div>
            </div>

            {!isDataChanged && (
              <div>
                <div className="border-b border-input my-8"></div>
                <div>
                  <Button
                    className="cursor-pointer py-0 px-4 mt-5 w-full"
                    type="button"
                    onClick={doLogout}
                  >
                    Logout
                  </Button>
                </div>
                <div>
                  <Button
                    className="cursor-pointer py-0 px-4 mt-5 w-full"
                    variant="destructive"
                    type="button"
                    onClick={doAccountDeletion}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default ProfilePage;
