import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../../index';

Enzyme.configure({
    adapter: new Adapter(),
});

test('Header包含一个 input 框', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state('undoList')).toEqual([]);
});

it('TodoList应该给Header传递一个 undolist内容的方法', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header');
    expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
});

it('Header调用回车时，UndoList 应该新增内容', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header');
    const addFunc = Header.prop('addUndoItem');
    addFunc('学习React');
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toBe('学习React');
});
