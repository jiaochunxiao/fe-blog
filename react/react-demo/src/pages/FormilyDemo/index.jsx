import React from 'react';
// import Form, { FormProvider } from 'rc-field-form';
import {createForm} from 'rc-form';
import Input from './components/Input';
// import Select from './components/Select';
import AntdSelect from './components/AntdSelect';
import AreaSelect from './components/AreaSelect';

import styles from './index.module.scss';

const FormItems = [
  {
    key: "student_name",
    type: "number",
    required: true,
    rules: [{
      required: true,
      message: '请输入姓名',
    },
    {
      max: 30,
      min: 3,
      message: '请输入3-30字的姓名',
    }],
    validateTrigger: ['onBlur'],
    title: "姓名",
    name: "student_name",
    component: "input"
  },
  {
    key: 'grade',
    type: 'string',
    required: true,
    rules: [{
      required: true,
      message: '请选择年级',
    }],
    validateFields: ['submit'],
    title: '年级',
    name: 'grade',
    component: 'select',
    enums: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
  },
  {
    key: 'address',
    type: 'string',
    required: true,
    rules: [{
      required: true,
      message: '请选择地址',
    }],
    validateFields: ['submit'],
    title: '地址',
    name: 'address',
    component: 'area-select',
  },
];

const NewForm = props => {
  const {form} = props;
  // componentObj
  const ComponentObject = {
    'input': items => {
      return <Input {...items} form={form} />;
    },
    'select': items => {
      items.options = items.enums.map(value => {
        return {'label': value, value}
      });
      return <AntdSelect {...items} form={form} />;
    },
    'area-select': items => {
      return <AreaSelect {...items} form={form} />;
    }
  };

  const RenderFormItem = item => {
    const component = item.component;
    return ComponentObject[component](item);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  };

  const setInitial = () => {
    props.form.setFieldsValue({
      'grade': ['五年级'],
    }, () => {
      console.log('after');
    })
  };

  return (
    <div className={styles.formily}>
      <form onSubmit={onSubmit}>
        {
          FormItems.map((item) => {
            return RenderFormItem(item, form);
          })
        }
        {/* <Input form={form} /> */}
        <button>submit</button>
      </form>
      <button onClick={setInitial}>set</button>
      </div>
  )
};

const FormilyDemo = createForm()(NewForm);

export default FormilyDemo;
