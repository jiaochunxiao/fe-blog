// import React, { useEffect } from 'react';

// import styles from './index.module.scss';

// const EventDemo = () => {

//     useEffect(() => {
//         document.addEventListener('click', () => {
//             console.log('document click');
//         });
//     }, []);

//     const handleOutClick = event => {
//         console.log('outer');
//         event.stopPropagation();
//     };

//     const handleInnerClick = event => {
//         console.log('inner');
//         event.stopPropagation();
//     }
//     return (
//         <div className={styles.container} onClick={handleOutClick}>
//             <div className={styles.child} onClick={handleInnerClick}></div>
//         </div>
//     )
// };

// export default EventDemo;

import React, { useRef, useEffect, useState, useCallback } from "react";

// function useRefObject() {
//   const ref = useRef();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (ref.current) {
//         console.log('------ref.current----');
//         setReady(true);
//     }
//   }, [ref.current]);

//   return [ref, ready];
// }

function useRefCallback() {
  const [ready, setReady] = useState(false);
  const setRef = useCallback(node => {
      console.log('-------node-----');
      console.log(!!node);
      setReady(!!node);
      return node;
  }, []);

  return [setRef, ready];
}

function useLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return loading;
}

// function UseRefComponent() {
//   const [ref, ready] = useRefObject();
//   const [lazyRef, lazyReady] = useRefObject();
//   const loading = useLoading();

//   return (
//     <>
//       <h2>
//         With <code>useRef</code>
//       </h2>
//       <ul>
//         <li ref={ref}>
//           Initial ref ready: <strong>{ready.toString()}</strong>
//         </li>
//         {!loading && (
//           <li ref={lazyRef}>
//             Lazy ref ready: <strong>{lazyReady.toString()}</strong>
//           </li>
//         )}
//       </ul>
//     </>
//   );
// }

function UseRefCallbackComponent() {
  const [refCB, readyCB] = useRefCallback();
  const [lazyRefCB, lazyReadyCB] = useRefCallback();
  const loading = useLoading();
  console.log('----lazyRefCB-----');
  console.log(lazyRefCB.current);

  return (
    <>
      <h2>
        With <code>ref callback</code>
      </h2>
      <ul>
        <li ref={refCB}>
          Initial ref ready: <strong>{readyCB.toString()}</strong>
        </li>
        {!loading && (
          <li ref={lazyRefCB} onClick={() => console.log(lazyRefCB())}>
            Lazy ref ready: <strong>{lazyReadyCB.toString()}</strong>
          </li>
        )}
      </ul>
    </>
  );
}

function App() {
//   const [refCB, readyCB] = useRefCallback();
//   const [lazyRefCB, lazyReadyCB] = useRefCallback();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => setLoading(false), []);

  return (
    <div className="App">
      <p>
        Render the same hook that needs a ref, but the lazy hook only recieves
        that ref after the initial render.
      </p>
      {/* <UseRefComponent /> */}
      <UseRefCallbackComponent />
    </div>
  );
}


export default App;
