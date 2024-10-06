import React from 'react';

import spinner from 'assets/images/spinner.gif';

import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue-50 opacity-70">
      <img
        alt="Loading content"
        src={spinner}
        className={styles.spinner}
      />
    </div>
  )
}

export { Spinner };
