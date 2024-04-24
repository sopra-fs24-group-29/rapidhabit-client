import React, { useState, useEffect } from "react";
import { Button } from "./Button";

interface FeedBoxPulseCheckProps {
  group: string;
  color: string;
  p1: string;
  p2: string;
  isDisabled: boolean;
  initialSliderValue: number;
}

const FeedBoxPulseCheck: React.FC<FeedBoxPulseCheckProps> = ({
  group,
  color,
  p1,
  p2,
  isDisabled,
  initialSliderValue,
}) => {
  const [sliderValue, setSliderValue] = useState(initialSliderValue);

  useEffect(() => {
    setSliderValue(initialSliderValue);
  }, [initialSliderValue]);

  return (
    <div
      className={`w-full ${color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-4 flex flex-col justify-between`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">{group}</h3>
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
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isDisabled}
        />
      </div>
      <Button
        onClick={() => alert(`Wert gesendet: ${sliderValue}`)}
        variant="primary"
        tint="default"
        className={`mt-2 ${isDisabled ? "button-disabled" : ""}`}
        disabled={isDisabled}
      >
        Submit
      </Button>
    </div>
  );
};

export default FeedBoxPulseCheck;
