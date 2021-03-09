import React, { useEffect } from 'react';

import styles from './index.module.scss';

const EventDemo = () => {

    useEffect(() => {
        document.addEventListener('click', () => {
            console.log('document click');
        });
    }, []);

    const handleOutClick = () => {
        console.log('outer');
    };

    const handleInnerClick = event => {
        console.log('inner');
        event.stopPropagation();
        console.log(event);
    }
    return (
        <div className={styles.container} onClick={handleOutClick}>
            <div className={styles.child} onClick={handleInnerClick}></div>
        </div>
    )
};

export default EventDemo;
