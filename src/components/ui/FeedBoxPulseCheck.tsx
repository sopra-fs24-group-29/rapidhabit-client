import { api } from "helpers/api";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";

interface FeedBoxPulseCheckProps {
  formId: string;
  groupId: string;
  group: string;
  color: string;
  p1: string;
  p2?: string;
  isDisabled: boolean;
  initialSliderValue: number;
  dateTime: string;
}

const FeedBoxPulseCheck: React.FC<FeedBoxPulseCheckProps> = ({
  group,
  formId,
  groupId,
  color,
  p1,
  p2,
  isDisabled,
  initialSliderValue,
  dateTime,
}) => {
  const [sliderValue, setSliderValue] = useState(initialSliderValue);
  const [buttonDisabled, setButtonDisabled] = useState(isDisabled);

  useEffect(() => {
    setSliderValue(initialSliderValue);
  }, [initialSliderValue]);

  const formattedDateTime = new Date(dateTime).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const submitValue = async (sliderValue: number, groupId: string) => {
    setButtonDisabled(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      alert("Authentifizierungstoken oder Benutzer-ID fehlt");
      setButtonDisabled(false);
      return;
    }

    try {
      const response = await api.put(
        `/groups/${groupId}/feed/pulsecheck`,
        {
          value: sliderValue,
          userId: userId,
          formId: formId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Wert wurde gesendet:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Fehler beim Senden des Werts");
      setButtonDisabled(false);
    }
  };

  return (
    <div
      className={`w-full ${color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-4 flex flex-col justify-between my-5`}
    >
      <div className="flex flex-row justify-between ">
        <div className="mb-2">
          <h3 className="text-lg font-bold">{group}</h3>
        </div>
        <div className="pt-[2px] font-medium text-xs s flex-shrink-0 ">
          {formattedDateTime}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm">{p1}</p>
        <p className="text-sm">{p2}</p>
      </div>
      <div className="mb-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          className={`w-full h-2 bg-gray-200 rounded-full cursor-pointer ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={buttonDisabled}
        />
      </div>
      <Button
        onClick={() => submitValue(sliderValue, groupId)}
        variant="primary"
        tint="default"
        className={`mt-2 ${buttonDisabled ? "button-disabled" : ""}`}
        disabled={buttonDisabled}
      >
        Submit
      </Button>
    </div>
  );
};

export default FeedBoxPulseCheck;
