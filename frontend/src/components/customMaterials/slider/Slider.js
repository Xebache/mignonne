import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./slider.css"

const Slider = ({ min, max, setRange }) => {
  return (
    <Nouislider
      tooltips={[ {to:(val) => parseInt(val) + " €"}, {to:(val) => parseInt(val) + " €"}]}
      id="priceSlider"
      range={{ min: min-50, max:max+50 }}
      start={[min-50, max+50]}
      padding={[5, 25]}
      step={5}
      onChange={setRange}
      connect
    />
  );
};

export default Slider;
