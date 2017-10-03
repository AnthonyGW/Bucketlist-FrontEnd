import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import { InputGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Navbar, Nav, NavItem, Pagination, Glyphicon, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Item from '../components/item';
import ItemStore from '../stores/ItemStore';
import * as itemactions from '../actions/itemactions';
import * as authactions from '../actions/authactions';

export default class BucketlistItems extends React.Component{
    constructor(){
        super();
        this.state = {
            bucketlist_name: "",
            bucketlist_id: "",
            bucketlist_items: [],
            name: "",
            description: "",
            show_modal: false,
            editid: null,
            status: false,
            records_length: 0,
            active_page: 1,
            items: 0,
            limit: 10
        };
    }
    componentWillMount(){
        this.setState({
            bucketlist_id: localStorage.getItem('list_id'),
            bucketlist_name: localStorage.getItem('list_name')
        });
        const parseQueryString = require('query-string');
        var queryParams = null;
        if(this.props.location.search){
            let queryString = this.props.location.search;
            queryParams = parseQueryString.parse(queryString);
        }
        ItemStore.retrieveItems(this.state.bucketlist_id, this.state.bucketlist_name, queryParams);
        ItemStore.on('change', () => {
            this.setState({
                bucketlist_id: ItemStore.getId(),
                bucketlist_items: ItemStore.getAll(),
                records_length: ItemStore.records_length                
            });

            if(this.state.bucketlist_items.length === 0){
                this.setState({
                    status: true
                })
            } else {
                this.setState({
                    status: false
                })
            }
            if(this.state.records_length !== 0){
                let items = Math.floor(this.state.records_length / this.state.limit);
                if(this.state.records_length > 10){
                    items = items + 1;
                } else {
                    items = 0;
                }
                this.setState({
                    items: items
                })
            }
        });
    }
    handleChange(event){
        //Validate the date
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const payload = {
            "name" : this.state.name,
            "description": this.state.description
        }
        if(this.state.editid){
            itemactions.editItem(this.state.editid, payload);
            this.close();
        }else{
            //throw in the token and call for a create-item action
            itemactions.createItem(payload);
            this.setState({
                active_page: 1
            })
        }
    }
    handleDelete(id){
        itemactions.deleteItem(String(id), {page: this.state.active_page-1});
    }
    handleSearch(event){
        itemactions.searchItem({'q': event.target.value});
        this.setState({
            active_page: 1
        })
    }
    selectPage(pageNumber) {
        this.setState({
            active_page: pageNumber
        });
        ItemStore.retrieveItems(this.state.bucketlist_id, this.state.bucketlist_name, {'page':pageNumber-1});
    }
    handleLogout(){
        authactions.logout();
        this.setState({
            redirect: "logout",
            url: "/"
        })
    }
    handleEdit(id, name, description, cond){
        //open modal with the edit-bucketlist form
        this.setState({
            show_modal: cond,
            editid: id,
            name: name,
            description: description
        });
    }
    close(){
        this.setState({
            show_modal: false,
            editid: null,
            name: "",
            description: ""
        });
        document.getElementById("create-item-form").reset();        
    }
    render(){
        let bucketlistItems = this.state.bucketlist_items;
        console.log("captured items: ", bucketlistItems);
        const ItemArray = bucketlistItems.map(item => {
            return(
                <div key={item.id}>
                    <Item key={item.id} itemdata={item} />
                    <button onClick={()=>{this.handleEdit(item.id, item.name, item.description, true)}}>Edit</button> | <button onClick={()=>{this.handleDelete(item.id)}}>Delete</button>
                    <br />
                    ----------------------------------
                </div>
            );
        });
        const ItemTableData = bucketlistItems.map(item => {
            return(
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><a href="#" onClick={()=>{this.handleEdit(item.id, item.name, item.description, true)}}>Edit</a></td>
                    <td><a href="#" onClick={()=>{this.handleDelete(item.id)}}>Delete</a></td>
                </tr>
            );
        });
        let buttons_padding = { paddingTop: "5px" };
        let panelHeader = (
            <div>
                <Grid>
                    <Row>
                        <h1>{this.state.bucketlist_name} Items</h1>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <br />
                            <form>
                                <InputGroup>
                                    <InputGroup.Addon>
                                    <Glyphicon glyph="search"></Glyphicon>
                                    </InputGroup.Addon>
                                    <FormControl type="text" placeholder="" onChange={this.handleSearch.bind(this)} />
                                </InputGroup>
                            </form>
                        </Col>
                        <Col md={6}>
                            <Pagination
                                style={buttons_padding}
                                bsSize="small"
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.items}
                                maxButtons={5}
                                activePage={this.state.active_page}
                                onSelect={this.selectPage.bind(this)} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
        let redirect = this.state.redirect;
        if(redirect === 'logout'){
            return <Redirect to={this.state.url} />
        }
        else if(redirect === 'items'){
            return <Redirect to={this.state.url} />
        }
        else if(redirect === 'home'){
            return <Redirect to={this.state.url} />
        }
        else{
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Image responsive width={70} height={90} alt="img" src={require("../assets/newlogo_lg.png")} onClick={()=>{this.setState({redirect: "home", url: "/"});}} circle />
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem onClick={()=>{window.location = "/bucketlists/"}}>Bucketlists</NavItem>
                        <NavItem onClick={()=>{this.setState({redirect: "settings", url: "/auth/reset-password"})}}>Settings</NavItem>
                        <NavItem onClick={()=>{this.handleLogout()}}>Log Out</NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={4}>
                            <Panel>
                                <form id="create-item-form" onSubmit={this.handleSubmit.bind(this)}>
                                    <FormControl type="text" onChange={this.handleChange.bind(this)} id="name" placeholder="New Activity" />
                                    <br />
                                    <ControlLabel>Description:</ControlLabel><br />
                                    <FormControl componentClass="textArea" type="text" onChange={this.handleChange.bind(this)} id="description" />
                                    <br />
                                    <Button type="submit">Submit New Activity</Button>
                                </form>
                            </Panel>
                        </Col>
                        <Col md={8}>
                            <Panel header={panelHeader} bsSize="large">
                                {this.state.status ? (<h4>No activities to show!</h4>) : (
                                    <Table>
                                        <tbody>
                                            {ItemTableData}
                                        </tbody>
                                    </Table>
                                    )}
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
                <br />
                <Modal show={this.state.show_modal} onHide={this.close.bind(this)}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl type="text" onChange={this.handleChange.bind(this)} id="name" placeholder={"Current Name: "+this.state.name} />
                        <br />
                        <ControlLabel>Change Quote:</ControlLabel><br />
                        <FormControl componentClass="textArea" type="text" onChange={this.handleChange.bind(this)} id="description" placeholder={this.state.description} />
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Submit</Button> | <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </form>
                </Modal>
            </div>
        );}
    }
}