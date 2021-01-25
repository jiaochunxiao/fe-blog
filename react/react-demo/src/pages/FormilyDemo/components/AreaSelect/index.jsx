import React, {useState} from 'react';

import {Picker, List} from 'antd-mobile';
import data from './area';

import styles from './index.module.scss'

const AreaSelect = props => {
  const {getFieldProps, getFieldError} = props.form;
  const {rules, name, validateTrigger} = props;
  const errors = getFieldError(name);
  const [value, setValue] = useState('');
  const onChange = e => {
    setValue(e);
  }
  return (
    <>
      <Picker
        data={data}
        value={value}
        cols={3}
        onChange={this.onChange}
        {...getFieldProps(name, {
          rules,
          validateTrigger,
        })}
      >
        <List.Item arrow="horizontal">请选择</List.Item>
      </Picker>
      { errors
        ? (
          <div className={styles.errorTips}>
            {errors ? errors.join(',') : null}
          </div>
        )
        : null
      }
    </>
  )
};

export default AreaSelect;