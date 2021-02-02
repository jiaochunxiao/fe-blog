import React, {useState} from 'react';
import {Form, Select, Button} from 'antd';
import styles from './index.module.less';

console.log(styles);
const { Option } = Select;

const Home = props => {
  const [selectedValue, setSelectedValue] = useState(['', '', '']);
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleChangeOne = e => {
    console.log(e);
    console.log('-------one');
    setSelectedValue([`${e}`, '', '']);
    props.form.setFields({
      'area': {
        value: [`${e}`, '', ''],
      },
    });
  }
  const handleChangeTwo = e => {
    console.log(e);
    console.log('-------two');
    console.log(selectedValue);
    setSelectedValue([selectedValue[0], `${e}`, '']);
    props.form.setFields({
      'area': {
        value: [selectedValue[0], `${e}`, ''],
      },
    })
  }
  const handleChangeThree = e => {
    console.log(e);
    console.log('-------three');
    console.log(selectedValue);
    setSelectedValue([selectedValue[0], selectedValue[1], `${e}`]);
    props.form.setFields({
      'area': {
        value: [selectedValue[0], selectedValue[1], `${e}`],
      },
    })
  }

  return (
    <div className={styles.home}>
      Welcome to home!
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Select[multiple]">
          {getFieldDecorator('area', {
            initialValue: selectedValue,
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <div>
              <Select placeholder="Please select favourite colors" value={selectedValue[0]} onChange={handleChangeOne}>
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
              <Select placeholder="Please select favourite colors" value={selectedValue[1]} onChange={handleChangeTwo}>
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
              <Select placeholder="Please select favourite colors" value={selectedValue[2]} onChange={handleChangeThree}>
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </div>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    </div>
  )
};

const WrappedDemo = Form.create({ name: 'validate_other' })(Home);

export default WrappedDemo;
