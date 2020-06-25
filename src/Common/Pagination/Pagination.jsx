import React from "react";
import s from './Pagination.module.css'


const Pagination = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={s.pagesNumbers}>
        {pages.map(p => {
            return <span onClick={() => {
                props.onPageChange(p)
            }} className={props.currentPage === p && s.activePageNumber}>{p}</span>
        })}
    </div>
};

export default Pagination;