import BaseContainer from "components/ui/BaseContainer";
import FormField from "../ui/FormField.tsx";
import { useState } from "react";

const ProfilePage = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div>

            <h1 className="text-left text-2xl lg:text-4xl">Profile</h1>
            <div className="flex items-center justify-center mt-2">
              <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center text-2xl font-bold">
                FL
              </div>
            </div>

            <h3 className="text-left  mt-5">Firstname</h3>
            <FormField
              type="text"
              label=""
              value={firstname}
              onChange={(un: string) => setFirstname(un)}
            />
            <h3 className="text-left  mt-3">Lastname</h3>
            <FormField
              type="text"
              label=""
              value={lastname}
              onChange={(un: string) => setLastname(un)}
            />
            <h3 className="text-left  mt-3">Email</h3>
            <FormField
              type="email"
              label=""
              value={email}
              onChange={(un: string) => setEmail(un)}
            />
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
