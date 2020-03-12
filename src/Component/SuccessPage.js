import React, { Component } from 'react'
import { Table  } from 'react-bootstrap';
import {Row,Col,message,Card, Empty,Button,Avatar, Divider,Modal} from 'antd'
import {
    UserOutlined
  } from '@ant-design/icons';
export class SuccessPage extends Component {
    state={
        personal:{},
        visible:false,
        company:{}
    }
    componentWillMount=async()=>{
        let personal=JSON.parse(localStorage.getItem('personal'))
        if(personal !=null && personal != undefined){
            await this.setState({personal})
        }
        let company=JSON.parse(localStorage.getItem('company'))
        if(company !=null && company != undefined){
            await this.setState({company})
        }
    }
    logout=()=>{
        localStorage.clear();
        window.location.href='/'
    }
    showmodal=async()=>{
        await this.setState({visible:!this.state.visible})
    }
    handleCancel=async()=>{
        await this.setState({visible:!this.state.visible})
    }
    handleOk=async()=>{
        await this.setState({visible:!this.state.visible})
    }
    render() {
        return (
            <div className='initial'>
                    <Row className='success'>
                    <Col span={8}></Col>
                    <Col span={8} id='dashboard'>Dashboard</Col>
                    <Col span={8} >
                        <a className='right'>
                            <text className='box1'><UserOutlined id='user'/></text>
                            <text onClick={this.logout} className='point'>Logout</text>
                        </a>
                    </Col>
                    </Row>
                    <Row className='row1'>
                     <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Phone Number</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={1}>
                                <td>{1}</td>
                                <td>{this.state.personal.name}</td>
                                <td>{this.state.personal.type}</td>
                                <td>{this.state.personal.country}</td>
                                <td>{this.state.personal.state}</td>
                                <td>{this.state.personal.phone}</td>
                                <td><text className='modalhead' onClick={this.showmodal}>Company details</text></td>
                            </tr>
                    </tbody>
                    </Table>
                </Row>
                <Modal
                    title="Company Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className='space'>Company Name : {this.state.company.companyname}</div>
                    <div className='space'>Email : {this.state.company.email}</div>
                    <div className='space'>Job Title : {this.state.company.jobtitle}</div>
                    <div className='space'>Category : {this.state.company.category}</div>
                </Modal>
            </div>
        )
    }
}

export default SuccessPage
