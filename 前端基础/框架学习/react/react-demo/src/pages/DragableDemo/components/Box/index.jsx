import { memo } from 'react';
import { useDrag } from 'react-dnd';

import styles from './index.module.scss';

const Box = memo(function Box({ name, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(() => ({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }), [name, type]);
  return (
    <div ref={drag} role="Box" className={styles.box}>
      {console.log('box-rerender')}
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
});

export default Box;
