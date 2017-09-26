import React from 'react';

class Bucketlist extends React.Component{
    render(){
        return(
            <li className="Bucketlist">
                Id: {this.props.bucketlistdata.id},
                <br />
                Name: {this.props.bucketlistdata.name},
                <br />
                Date: {this.props.bucketlistdata.date},
                <br />
                Description: {this.props.bucketlistdata.description}
            </li>
        )
    }
}

export default Bucketlist;