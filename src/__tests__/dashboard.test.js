import React from 'react';
import 'jest-enzyme';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import { expect as chaiexpect } from 'chai';
// import sinon from 'sinon';

import Adapter from 'enzyme-adapter-react-16';

import { NavItem, ControlLabel, Button } from 'react-bootstrap';
import UserBucketlists from '../pages/bucketlists';
import BucketlistItems from '../pages/bucketlist_items';

Enzyme.configure({ adapter: new Adapter() });

function setUpLists(){
    const props = {
        location: {search: ""}
    }
    return shallow(<UserBucketlists {...props} />)
}

function setUpItems(){
    const props = {
        location: {search: ""}
    }
    return shallow(<BucketlistItems {...props} />)
}

describe('<UserBucketlists />', ()=>{
        const wrapper = setUpLists();
        
        it('renders a table for the bucket lists.', () => {
        chaiexpect(wrapper.find('Table')).to.have.length(1);
        });
});

describe('<BucketlistItems />', ()=>{
        const wrapper = setUpItems();

        it('renders the table for bucketlist items.', ()=>{
                chaiexpect(wrapper.find('Table')).to.have.length(1);
        });
});

it('renders panels', ()=>{
        const wrapper = setUpLists();
        chaiexpect(wrapper.find('Panel')).to.have.length(2);
});

it('renders create item button', ()=>{
    const wrapper = setUpItems();    
    const button = <Button type="submit">Submit New Activity</Button>
    ;
    expect(wrapper).toContainReact(button);
});

it('renders panels', ()=>{
    const wrapper = setUpLists();
    const formlabel = <ControlLabel>Done By:</ControlLabel>;
    expect(wrapper).toContainReact(formlabel);
});

it('returns items', ()=>{
    const wrapper = setUpLists();
    const button = <Button type="submit">Submit</Button>
    expect(wrapper).toContainReact(button);
});
