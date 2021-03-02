import React, { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import Card from '../Card/index';

import styles from './index.module.scss';


const Container = memo(function Container({accept, onDrop, droppedBoxes, changeOriginData}) {
  const [{isOver, canDrop}, drop] = useDrop(() => ({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [accept, onDrop]);


  const isActive = isOver && canDrop;

  const moveCard = (currentIndex, hoverIndex) => {
    console.log('current drag & hover');
    console.log(currentIndex, hoverIndex);
    changeOriginData(currentIndex, hoverIndex);
  }


  return (
    <div ref={drop} role="Container" className={styles.container}>
      {/* {
        isActive
        ? 'Release to drop'
        : `This dustbin accepts: ${accept.join(', ')}`
      } */}
      {
        droppedBoxes && droppedBoxes.map((item, index) => {
          return (
            <Card
              key={index}
              index={index}
              id={`${item.type}-${index}`}
              text={item.name}
              item={item}
              moveCard={moveCard}
            />
          );
        })
      }
    </div>
  );
});

export default Container;
