import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const Pagination = ({ total, pageLimit, dataLimit, pageChange, cPage }) => {
    const pages = Math.round(total / dataLimit) > 1 ? Math.ceil(total / dataLimit) : Math.ceil(total / dataLimit);
    const [currentPage, setCurrentPage] = useState(Number(cPage));
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ behavior: 'smooth', top: '0px' });
        }
    }, [currentPage]);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        pageChange((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        pageChange((page) => page - 1);
    }

    function changePage(pageNum) {
        const pageNumber = Number(pageNum);
        setCurrentPage(pageNumber);
        pageChange(pageNumber);
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        if (total <= dataLimit) {
            return new Array(1).fill().map((_, idx) => start + idx + 1);
        }
        /* else if ((pages === currentPage) && (pages > pageLimit)) {
            return new Array(pages-pageLimit).fill().map((_, idx) => start + idx + 1);
        } */ else if (pages < pageLimit) {
            return new Array(pages).fill().map((_, idx) => start + idx + 1);
        }
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
    return (
        <Aux>
            <ul className="pagination justify-content-center paddngt">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`} onClick={currentPage === 1 ? null : () => changePage(1)}>
                    <span className="page-link">{'<'}</span>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`} onClick={currentPage === 1 ? null : goToPreviousPage}>
                    <span className="page-link">Previous</span>
                </li>
                {/* show page numbers */}
                {
                    getPaginationGroup().map((item, index) => (
                        <li
                            key={index}
                            className={`page-item  ${currentPage == item ? 'active' : null}`}
                            onClick={() => changePage(item)}
                        >
                            <span className="page-link">{item}</span>
                        </li>
                    ))
                }
                <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`} onClick={currentPage === pages ? null : goToNextPage}>
                    <span className="page-link">Next</span>
                </li>
                <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`} onClick={(currentPage === pages) || (total < dataLimit) ? null : () => changePage(pages)}>
                    <span className="page-link">{'>'}</span>
                </li>
            </ul>
        </Aux>
    )
}

export default Pagination;