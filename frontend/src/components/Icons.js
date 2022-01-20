import React from "react";
import styled from "styled-components";

const SvgIcon = styled.svg`
  width: 3rem;
  height: 3rem;
`;

const LgSvgIcon = styled.svg`
  width: 5rem;
  height: 5rem;
`;

const IconPath = styled.path`
  fill: #3f3f3f;
`;

const StrokePath = styled.path`
  fill: none;
  stroke: #3f3f3f;
  stroke-width: 0.6px;
  stroke-linejoin: round;
`;

const BagIcon = () => {
  return (
    <SvgIcon
      version="1.1"
      id="bag_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <IconPath
        d="M32.51,19.96h-3.32c-0.4-2.35-1.5-4.85-3.97-4.85c-2.45,0-3.55,2.55-3.96,4.85h-3.22l-1.62,14.93h17.18
            L32.51,19.96z M25.21,16.23c1.69,0,2.5,1.89,2.84,3.73h-5.64C22.75,18.2,23.55,16.23,25.21,16.23z M17.66,33.77l1.38-12.69h2.07
            c-0.03,0.31-0.04,0.6-0.05,0.87c-0.09,0.12-0.16,0.27-0.16,0.43c0,0.4,0.32,0.72,0.71,0.72c0.4,0,0.72-0.32,0.72-0.72
            c0-0.16-0.06-0.3-0.15-0.42c0.01-0.25,0.03-0.55,0.06-0.88h5.96c0.03,0.31,0.04,0.61,0.05,0.88c-0.09,0.12-0.15,0.26-0.15,0.42
            c0,0.4,0.32,0.72,0.71,0.72c0.4,0,0.72-0.32,0.72-0.72c0-0.16-0.07-0.31-0.16-0.43c0-0.27-0.02-0.57-0.05-0.87h2.14l0.92,12.69
            H17.66z"
      ></IconPath>
    </SvgIcon>
  );
};

const UserIcon = () => {
  return (
    <SvgIcon
      version="1.1"
      id="user_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <IconPath
        d="M25.04,25.48c2.48,0,4.49-2.02,4.49-4.49c0-2.48-2.02-4.5-4.49-4.5c-2.48,0-4.5,2.02-4.5,4.5
            C20.55,23.46,22.56,25.48,25.04,25.48z M25.04,17.61c1.86,0,3.37,1.51,3.37,3.38c0,1.86-1.51,3.37-3.37,3.37
            c-1.86,0-3.38-1.51-3.38-3.37C21.67,19.12,23.18,17.61,25.04,17.61z M25,26.19c-4.15,0-8.57,2.37-8.57,6.76
            c0,0.31,0.25,0.56,0.56,0.56c0.31,0,0.56-0.25,0.56-0.56c0-4.11,4.57-5.64,7.45-5.64c3.58,0,7.45,2.16,7.45,5.64
            c0,0.31,0.25,0.56,0.56,0.56c0.31,0,0.56-0.25,0.56-0.56C33.57,28.78,29.12,26.19,25,26.19z"
      ></IconPath>
    </SvgIcon>
  );
};

const HandIcon = () => {
  return (
    <LgSvgIcon
      version="1.1"
      id="hand_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 20"
    >
      <g transform="translate(-0.63052585,-4.3985044)">
        <g transform="matrix(-1,0,0,1,70.038339,-176.39404)">
          <g transform="rotate(-10,51.905753,185.82131)">
            <StrokePath d="m 34.006404,187.64264 10.815761,-0.99702 c 0,0 2.283849,4.18665 8.505153,3.86984 l 1.676045,2.23578 -1.507539,-0.30935 c -0.92682,-0.23229 -1.44408,0.51143 -1.01902,0.7527 0,0 0.765463,0.57409 1.403351,0.80799 1.520347,0.55747 2.164324,0.40597 3.061855,-1.10567 0.80799,-1.36083 0.51031,-1.1482 -0.893042,-3.82732" />
            <StrokePath d="m 33.89304,179.16108 c 5.018042,0.34021 10.503867,0.93556 13.693298,1.91366 3.146909,0.68042 10.008929,3.81298 11.531545,4.53846 4.397178,2.09513 9.91525,4.66201 9.476189,5.54015 0,0 -0.486929,0.53849 -1.805222,0.32586 -1.107282,-0.17713 -4.950757,-2.17847 -6.232151,-2.28204" />
            <StrokePath d="m 59.730618,187.81609 c 1.959321,3.49019 2.020005,3.72528 1.053605,4.83207 0,0 -1.085576,1.64784 -2.748267,1.3629" />
            <StrokePath d="m 58.015802,188.34881 c 0.59536,1.06314 2.291948,3.46174 1.435227,4.33546 -1.105379,1.12731 -2.487757,2.14756 -3.721003,1.57346" />
            <StrokePath d="m 54.114046,191.47229 c -1.40335,-0.0425 -1.126932,0.95683 -1.126932,0.95683" />
            <path
              style={{ fill: "#3f3f3f" }}
              d="m 66.999877,189.70643 c -0.823375,1.28239 1.564963,1.62796 1.412953,1.57262 0.330093,-0.62131 -0.347635,-0.92802 -1.412953,-1.57262 z"
            />
          </g>
        </g>
      </g>
    </LgSvgIcon>
  );
};

export { BagIcon, UserIcon, HandIcon };
