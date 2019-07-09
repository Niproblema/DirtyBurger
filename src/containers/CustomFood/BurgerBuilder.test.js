import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder'
import BuildController from '../../components/Food/CustomBuild/Burger/BuildController/BuildController'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} price={2} />);
    })
    it('should render <BuildController /> elements', () => {
        wrapper.setProps({
            ings: {
                salad: 0
            }
        });
        expect(wrapper.find(BuildController)).toHaveLength(1);
    });

});