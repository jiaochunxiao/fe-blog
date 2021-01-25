import React from 'react';

import styles from './index.module.scss';

const Select  = props => {
  const {getFieldProps, getFieldError} = props.form;
  const {rules, name, validateTrigger, options} = props;
  const errors = getFieldError(name);
  return (
    <div className={styles.formItem}>
      <select
        {...getFieldProps(name, {
          rules,
          validateTrigger,
        })}
        className={`${styles.normalStyle} ${errors ? styles.errorStyle : ''}`}
      >
        {
          options.map(item => <option value={item} key={item}>{item}</option>)
        }
      </select>
      { errors
        ? (
          <div className={styles.errorTips}>
            {errors ? errors.join(',') : null}
          </div>
        )
        : null
      }
    </div>
  );
};

export default Select;