import React from 'react';
// import Form, { FormProvider } from 'rc-field-form';
import {createForm} from 'rc-form';
import Input from './components/Input';

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
];

const NewForm = props => {
  const {form} = props;

  const ComponentObject = {
    'input': items => {
      return <Input {...items} form={form} />;
    }
  }

  const RenderFormItem = item => {
    const component = item.component;
    console.log(item);
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
  return (
    <div className={styles.formily}>
      <form onSubmit={onSubmit}>
        {
          FormItems.map((item, index) => {
            return RenderFormItem(item, form);
          })
        }
        {/* <Input form={form} /> */}
        <button>submit</button>
      </form>
    </div>
  )
};

const FormilyDemo = createForm()(NewForm);

export default FormilyDemo;
