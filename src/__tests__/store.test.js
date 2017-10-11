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

it('handles actions', ()=>{
    let wrapper = BucketlistStore.handleActions('CREATE_BUCKETLIST');
    expect(wrapper).toEqual(undefined);
});

it('creates lists', ()=>{
    let wrapper = BucketlistStore.createBucketlist({none: null});
    expect(wrapper).toEqual(undefined);
});

it('deletes lists', ()=>{
    let wrapper = BucketlistStore.deleteBucketlist(0,{none: null});
    expect(wrapper).toEqual(undefined);
});

it('edits lists', ()=>{
    let wrapper = BucketlistStore.editBucketlist(0,{none: null});
    expect(wrapper).toEqual(undefined);
});

it('flushes the store', ()=>{
    let wrapper = BucketlistStore.flushStore();
    expect(wrapper).toEqual(undefined);
});

it('retrieves lists', ()=>{
    let wrapper = BucketlistStore.retrieveBucketlists();
    expect(wrapper).toEqual(undefined);
});

it('sets a token', ()=>{
    let wrapper = BucketlistStore.setToken('0');
    expect(wrapper).toEqual(undefined);
});

it('logs out user', ()=>{
    let wrapper = BucketlistStore.logout();
    expect(wrapper).toEqual(undefined);
});
