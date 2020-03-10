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
            <div style={{height:'100%',width:'100%'}}>
                    <Row style={{backgroundColor:'#fff',boxShadow:'0 2px 3px rgba(0,0,0,.2)',height:'20%',padding:'10px 5%'}}>
                    <Col span={8}></Col>
                    <Col span={8} style={{fontSize:'16px',fontWeight:'600',display:'flex',alignItems:'center',justifyContent:'center'}}>Dashboard</Col>
                    <Col span={8} >
                        <a style={{float:'right'}}>
                            <text style={{paddingRight:'5px'}}><UserOutlined style={{fontSize:'24px'}}/></text>
                            <text onClick={this.logout} style={{cursor:'pointer'}}>Logout</text>
                        </a>
                        {/* <Row>
                            <Col span={1} style={{float:'right'}}>
                                  <text style={{cursor:'pointer'}} onClick={this.logout}>Logout</text>
                            </Col>
                            <Col span={1} style={{float:'right'}}>
                            <UserOutlined style={{fontSize:'24px'}}/>

                            </Col>
                        </Row> */}
                    </Col>
                    </Row>
                    <Row style={{padding:'20px 5%'}}>
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
                                <td><text style={{color:'#FF6600',cursor:'pointer'}} onClick={this.showmodal}>Company details</text></td>
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
                    <div style={{padding:'10px 0px'}}>Company Name : {this.state.company.companyname}</div>
                    <div style={{padding:'10px 0px'}}>Email : {this.state.company.email}</div>
                    <div style={{padding:'10px 0px'}}>Job Title : {this.state.company.jobtitle}</div>
                    <div style={{padding:'10px 0px'}}>Category : {this.state.company.category}</div>
                </Modal>
            </div>
        )
    }
}

export default SuccessPage
