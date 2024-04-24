import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";

// This is a standalone function to fetch group IDs.
export async function fetchGroupIds(setGroups) {
  const navigate = useNavigate();

  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/groups/groupIds`, {
      headers: { Authorization: token },
    });
    setGroups(response.data || []);
  } catch (error) {
    if (api.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      console.error(
        `Something went wrong while fetching the group IDs: \n${error.message}`
      );
      alert(
        "Something went wrong while loading the profile! See the console for details."
      );
    }
  }
}
