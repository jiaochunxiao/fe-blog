import React from 'react';
import styles from './index.module.scss';

const Input = props => {
  const {getFieldProps, getFieldError} = props.form;
  const {rules, name, validateTrigger} = props;
  const errors = getFieldError(name);
  return (
    <div className={styles.formItem}>
      <input
        {...getFieldProps(name, {
          rules,
          validateTrigger,
        })}
        className={`${styles.normalStyle} ${errors ? styles.errorStyle : ''}`}
      />
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
}

export default Input;
