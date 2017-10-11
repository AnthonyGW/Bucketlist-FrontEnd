import React from 'react';
import 'jest-enzyme';
import { shallow } from 'enzyme';
// import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import { expect } from 'chai';
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
        expect(wrapper.find('Table')).to.have.length(1);
        });
});

describe('<BucketlistItems />', ()=>{
        const wrapper = setUpItems();

        it('renders the table for bucketlist items.', ()=>{
                expect(wrapper.find('Table')).to.have.length(1);
        });
});

it('renders panels', ()=>{
        const wrapper = setUpLists();
        it('renders panels', ()=>{
                expect(wrapper.find('Panel')).to.have.length(2);
        });
});


// describe('<UserBucketlists />', ()=>{
//     it('calls componentWillMount', ()=>{
        // const wrapper = mount(<UserBucketlists />);
        // const wrapper = setUpLists();
        // console.log(wrapper.instance());
        // console.log(wrapper.html());
        // console.log(wrapper.text());
        // console.log(wrapper.get(0));
        // wrapper.setProps({location: {search: ''}})
//         expect(UserBucketlists.prototype.componentWillMount.calledOnce).to.equal(true);
//     });
// });


// it('renders navbar', ()=>{
//     const wrapper = setUpItems();    
//     const navitem = <NavItem>Log Out</NavItem>;
//     expect(wrapper).toContainReact(<NavItem>Log Out</NavItem>);
// });

// it('renders panels', ()=>{
//     const wrapper = setUpLists();
//     const formlabel = <ControlLabel>Done By:</ControlLabel>;
//     expect(wrapper).toContainReact(formlabel);
// });

// it('returns items', ()=>{
//     const wrapper = setUpLists();
//     const button = <Button type="submit">Submit New Activity</Button>
//     expect(wrapper).toContainReact(button);
    
// });
