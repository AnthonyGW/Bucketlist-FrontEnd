import React from 'react';
import 'jest-enzyme';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import { expect as chaiexpect } from 'chai';
// import expect from 'expect';

import Adapter from 'enzyme-adapter-react-16';

import BucketlistStore from '../stores/BucketlistStore.js';

Enzyme.configure({ adapter: new Adapter() });

it('returns lists', ()=>{
    const wrapper = BucketlistStore.getAll();
    let empty_array = [];
    expect(wrapper).toEqual(empty_array);
});
