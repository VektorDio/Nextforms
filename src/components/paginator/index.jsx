import React from 'react';
import styles from './paginator.module.css'

import {
    faArrowRight,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Paginator = ({currentPage=1, setCurrentPage, maxPages}) => {

    function handleNextPage() {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const miniVersion = [...Array(maxPages)].map((e, i) => {
        return (
            <button
                className={
                    classNames(styles.button,
                        (parseInt(currentPage) === i + 1) && styles.buttonCurrent)
                }
                onClick={() => setCurrentPage(i + 1)}
                key={i}
            >
                {i + 1}
            </button>
        )
    })

    let maxVersion

    if (currentPage < 4) {
        maxVersion = (
            <>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === 1) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === 2) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(2)}
                >
                    2
                </button>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === 3) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(3)}
                >
                    3
                </button>
                <button className={styles.separator}>
                    ...
                </button>
                <button
                    className={classNames(styles.button)}
                    onClick={() => setCurrentPage(maxPages)}
                >
                    {maxPages}
                </button>
            </>
        )
    } else if (currentPage > maxPages - 3) {
        maxVersion = (
            <>
                <button
                    className={classNames(styles.button)}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
                <button className={classNames(styles.separator)}>
                    ...
                </button>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === (maxPages - 2)) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(maxPages - 2)}
                >
                    {maxPages - 2}
                </button>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === maxPages - 1) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(maxPages - 1)}
                >
                    {maxPages - 1}
                </button>
                <button
                    className={classNames(styles.button, (parseInt(currentPage) === maxPages) && styles.buttonCurrent)}
                    onClick={() => setCurrentPage(maxPages)}
                >
                    {maxPages}
                </button>
            </>
        )
    } else {
        maxVersion = (
            <>
                <button
                    className={classNames(styles.button)}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
                <button className={styles.separator}>
                    ...
                </button>
                <button
                    className={classNames(styles.button, styles.buttonCurrent)}
                    onClick={() => setCurrentPage(currentPage)}
                >
                    {currentPage}
                </button>
                <button className={styles.separator}>
                    ...
                </button>
                <button
                    className={classNames(styles.button)}
                    onClick={() => setCurrentPage(maxPages)}
                >
                    {maxPages}
                </button>
            </>
        )
    }

    if (maxPages > 1 && currentPage <= maxPages) {
        return (
            <div className={styles.container}>
                <button className={styles.button} onClick={() => handlePreviousPage()}>
                    <FontAwesomeIcon className={styles.icon} icon={faArrowLeft}/>
                </button>
                { (maxPages <= 5) ? miniVersion : maxVersion }
                <button className={styles.button} onClick={() => handleNextPage()}>
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight}/>
                </button>
            </div>
        )
    } else return null
}

export default Paginator;