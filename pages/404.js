import React from "react";
import Aux from "../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
const notFound = () => {
    return (
        <Aux>

<div className="container-fluid">
<div className="text-center paddngtb">
    <div className="error mx-auto">404</div>
    <p className="lead text-gray-800 mb-5">Page Not Found</p>
    <p className="text-gray-500 mb-0">It looks like you found a glitch...</p>
    <Link href="/">&larr; Go to Website Homepage</Link>
</div>
</div>
</Aux>
        
    );
};
export default notFound;