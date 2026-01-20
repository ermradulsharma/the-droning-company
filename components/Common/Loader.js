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

/**
 * Bridge component for react-loader-spinner v6+
 * Maintains compatibility with the old <Loader type="..." /> syntax
 */
const Loader = ({ type, visible, ...props }) => {
    if (visible === false) return null;

    // Map old names to new exported names
    const SpinnerComponent = spinnerMap[type] || ThreeDots;

    if (!spinnerMap[type] && type) {
        console.warn(`[Loader] Unknown spinner type requested: "${type}". Falling back to ThreeDots.`);
    }

    return <SpinnerComponent {...props} />;
};

export default Loader;
