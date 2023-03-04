import { useState, useEffect } from "react";

import "./App.css";

const App = (): JSX.Element => {
  const [value, setValue] = useState<number>(50);

  useEffect(() => {
    const range = document.getElementById("range") as HTMLInputElement;

    const handleSliderChange = (e: Event): void => {
      const value = +(e.target as HTMLInputElement).value;
      const label = (e.target as HTMLElement).nextElementSibling as HTMLElement;

      const rangeWidth = getComputedStyle(
        e.target as HTMLElement
      ).getPropertyValue("width");
      const labelWidth = getComputedStyle(label).getPropertyValue("width");

      const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
      const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);

      const max = +(e.target as HTMLInputElement).max;
      const min = +(e.target as HTMLInputElement).min;

      const left =
        value * (numWidth / max) -
        numLabelWidth / 2 +
        scale(value, min, max, 10, -10);

      label.style.left = `${left}px`;

      label.innerHTML = value.toString();
    };

    range.addEventListener("input", handleSliderChange);

    return () => {
      range.removeEventListener("input", handleSliderChange);
    };
  }, []);

  const scale = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  return (
    <div className="App">
      <h2>Custom Range Slider</h2>
      <div className="range-container">
        <input
          type="range"
          id="range"
          min={0}
          max={100}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setValue(+e.target.value)
          }
        />
        <label htmlFor="range">{value}</label>
      </div>
    </div>
  );
};

export default App;
