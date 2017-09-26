import React from 'react';

class Item extends React.Component{
    render(){
        return(
            <li className="Item">
                Id: {this.props.itemdata.id},
                <br />
                Name: {this.props.itemdata.name},
                <br />
                Description: {this.props.itemdata.description}
            </li>
        )
    }
}

export default Item;