import React, {useState} from 'react';

import { Picker, List } from 'antd-mobile';

import styles from './index.module.scss'

const AntdSelect = props => {
  const {getFieldProps, getFieldError} = props.form;
  const {rules, name, validateTrigger, options} = props;
  const errors = getFieldError(name);
  const [value, setValue] = useState('');
  const onChange = e => {
    console.log(e);
    setValue(e[0]);
  }
  return (
    <>
      <Picker
        data={options}
        value={value}
        cols={1}
        onChange={onChange}
        {...getFieldProps(name, {
          rules,
          validateTrigger,
        })}
      >
        <List.Item arrow="down">请选择</List.Item>
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

export default AntdSelect;