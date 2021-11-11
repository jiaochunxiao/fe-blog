## react 合成事件


### 1

```javascript
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
    }
    return (
        <div className={styles.container} onClick={handleOutClick}>
            <div className={styles.child} onClick={handleInnerClick}></div>
        </div>
    )
};

export default EventDemo;
```

点击child，输出为：inner -> outer -> document click

```javascript
import React, { useEffect } from 'react';

import styles from './index.module.scss';

const EventDemo = () => {
    document.addEventListener('click', () => {
        console.log('document click');
    });
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
    }
    return (
        <div className={styles.container} onClick={handleOutClick}>
            <div className={styles.child} onClick={handleInnerClick}></div>
        </div>
    )
};

export default EventDemo;
```

点击child 输出为：inner