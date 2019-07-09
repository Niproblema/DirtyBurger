import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() })

describe('<NavItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })
    it('should render two <NavItems /> elements if not logged in', () => {
        expect(wrapper.find(NavLink)).toHaveLength(2);
    });
    it('should render three <NavItems /> elements if  logged in', () => {
        //wrapper = shallow(<NavItems isAuth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
    it('should render <NavItems /> element for logout', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavLink to="/logout" exact>Logout</NavLink>)).toEqual(true);
    });
});