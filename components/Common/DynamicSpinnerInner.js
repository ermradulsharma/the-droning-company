import React from 'react';
import {
    ThreeDots,
    Triangle,
    TailSpin,
    Oval,
    Rings,
    Watch,
    Puff,
    Bars,
    BallTriangle,
    Circles,
    Grid,
    Hearts,
    Audio,
    LineWave,
    MutatingDots,
    RotatingLines,
    RotatingSquare
} from 'react-loader-spinner';

const spinnerMap = {
    ThreeDots,
    Triangle,
    TailSpin,
    Oval,
    Rings,
    Watch,
    Puff,
    Bars,
    BallTriangle,
    Circles,
    Grid,
    Hearts,
    Audio,
    LineWave,
    MutatingDots,
    RotatingLines,
    RotatingSquare
};

const DynamicSpinnerInner = ({ type, visible, ...props }) => {
    if (visible === false) return null;

    const SpinnerComponent = spinnerMap[type] || ThreeDots;

    if (!spinnerMap[type] && type) {
        console.warn(`[Loader] Unknown spinner type requested: "${type}". Falling back to ThreeDots.`);
    }

    return <SpinnerComponent {...props} />;
};

export default DynamicSpinnerInner;
