import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

Enzyme.configure({
    adapter: new Adapter(),
});

it('Header渲染正常', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

test('Header包含一个 input 框', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="input"]');
    expect(inputElem.length).toBe(1);
});

test('Header 组件input 框 值为空', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="input"]');
    expect(inputElem.prop('value')).toEqual('');
});

test('Header 组件input 框内容，用户输入时，会跟随变化', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find('[data-test="input"]');
    const userInput = '今天要学习jest';
    inputElem.simulate('change', {
        target: { value: userInput }
    });
    expect(wrapper.state('value')).toEqual(userInput);

    // const newInput = wrapper.find('[data-test="input"]');
    // expect(newInput.prop('value')).toBe(userInput);
});


test('Header 组件 input 框输入回车时，如果input 无内容，无操作', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="input"]');
    wrapper.setState({value: ''});
    inputElem.simulate('keyup', {
        keyCode: 13,
    });
    expect(fn).not.toHaveBeenCalled();
});


test('Header 组件 input 框输入回车时，如果input 有内容，函数应被调用', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="input"]');
    const userInput = '学习React';
    wrapper.setState({value: userInput});
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
    expect(inputElem.prop('value')).toBe('');
});


test('Header 组件 input 框输入回车时，如果input有值，最后被清除掉', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = wrapper.find('[data-test="input"]');
    const userInput = '学习React';
    wrapper.setState({value: userInput});
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    const newInputElem = wrapper.find('[data-test="input"]');
    expect(newInputElem.prop('value')).toBe('');
});

