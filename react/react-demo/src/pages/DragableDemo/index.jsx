import React, {useState, useCallback} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import ItemTypes from './ItemTypes';

import Box from './components/Box/index';
import Container from './components/Container/index';

import styles from './index.module.scss';

const ACCECPTS = Object.keys(ItemTypes).map(key => ItemTypes[key]);
console.log(ACCECPTS);

const DragableDemo = () => {
  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  const [droppedBoxes, setDroppedBoxes] = useState([]);

  function isDropped(boxName) {
      return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(item => {
    const { name } = item;
    if (!name) {
      return;
    }
    if (name && droppedBoxNames.indexOf(name) < 0) {
      setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
      setDroppedBoxes(droppedBoxes.concat(item));
    }
  }, [droppedBoxNames, droppedBoxes]);

  const changeOriginData = (currentIndex, hoverIndex) => {
    if (currentIndex === undefined) {
      return;
    }
    const dragCard = droppedBoxes[currentIndex];
    setDroppedBoxes(update(droppedBoxes, {
      $splice: [
          [currentIndex, 1],
          [hoverIndex, 0, dragCard],
      ],
    }));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          {
            boxes.map(({name,type}, index) => (<Box name={name} type={type} isDropped={isDropped(name)} key={index}/>))}
        </div>
        <div className={styles.drag_container}>
          <Container
            accept={ACCECPTS}
            onDrop={(item) => handleDrop(item)}
            droppedBoxes={droppedBoxes}
            changeOriginData={changeOriginData}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default DragableDemo;
