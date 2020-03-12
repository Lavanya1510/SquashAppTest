import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider,type} from 'antd'
import {
    CheckOutlined
  } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Personal from './Component/Personal';
import Company from './Component/Company';
import Otp from './Component/Otp';

export class Mainpage extends Component {
    state={
        name:'',
        country:'',
        phone:'',
        personal:true,
        showcompany:false,
        showverify:false,
        companyname:'',
        email:'',
        jobtitle:'',
        category:'',
        personaldone:false,companydone:false,
        otpdone:false,
        otpnav:false
    }
    componentWillMount=async()=>{
        let personal=JSON.parse(localStorage.getItem('personal'))
        if(personal !== null && personal !== undefined){
            await this.setState({personaldone:true})
        }
        let company=JSON.parse(localStorage.getItem('company'))
        if(company !== null && company !== undefined){
            await this.setState({companydone:true})
        }
        let otp=localStorage.getItem('otpdone')
        if(otp !== null && otp !== undefined){
            await this.setState({otpdone:true})
        }

        
    }
    clickOne=async()=>{
        // console.log('clickOne')
        await this.setState({personal:true,showcompany:false,showverify:false})
    }
    clickTwo=async(value)=>{
        // console.log('value',value)
        if(value){
            // console.log('if clickOne')
            await this.setState({personal:false,showcompany:true,showverify:false,personaldone:true}) 
        }else{
            // console.log('clickOne')
            await this.setState({personal:false,showcompany:true,showverify:false})
        }
        
    }
    clickThree=async(value)=>{
        // console.log('value',value)

        if(value){
            // console.log('if clickOne')
            await this.setState({personal:false,showcompany:false,showverify:true,companydone:true,otpnav:true})
        }else{
            // console.log('clickOne')
            await this.setState({personal:false,showcompany:false,showverify:true})
        }
    }
    render() {
        return (
            <div 
            // style={{background:'#F2F2F2',height:'100%',width:'100%'}} 
            >
            <div className='initial'>
                <div className='aligncenter'>
                    <div className='fullwidth'>
                        <Row className='head'>
                                <Col span={8} id='dividerow' >
                                    {this.state.personal?
                                            <a onClick={this.clickOne} >
                                                <span id="ifblock">
                                                    {this.state.personaldone && this.state.personal === false?<CheckOutlined />:1}
                                                </span>
                                                <text className='detailname'>Personal Details</text>
                                            </a>
                                            :
                                            <a onClick={this.clickOne} >
                                                <span id="ifnoblock">
                                                    {this.state.personaldone && this.state.personal === false?<CheckOutlined />:1}
                                                </span>
                                                <text className='detailname1'>Personal Details</text>
                                            </a>
                                    }
                                </Col>
                                <Col span={8} id='dividerow'>
                                   {this.state.showcompany?
                                            <a onClick={e=>this.clickTwo(false)}>
                                                <span id="ifblock">
                                                            {this.state.companydone && this.state.showcompany === false?<CheckOutlined />:2}
                                                </span>
                                                <text className='detailname'>Company Details</text>
                                            </a>
                                            :
                                            <a onClick={e=>this.clickTwo(false)}>
                                                <span id="ifnoblock">
                                                            {this.state.companydone && this.state.showcompany === false?<CheckOutlined />:2}
                                                </span>
                                                <text className='detailname1'>Company Details</text>
                                            </a>
                                    }
                                </Col>
                                <Col span={8} id='dividerow'>
                                    {this.state.showverify?
                                            <a onClick={e=>this.clickThree(false)}>
                                                <span id="ifblock">
                                                            {this.state.otpdone && this.state.showverify === false?<CheckOutlined />:3}
                                                </span>
                                                <text className='detailname'>Email verification</text>
                                            </a>
                                            :
                                            <a onClick={e=>this.clickThree(false)}>
                                                <span id="ifnoblock">
                                                            {this.state.otpdone && this.state.showverify === false?<CheckOutlined />:3}
                                                </span>
                                                <text className='detailname1'>Email verification</text>
                                            </a>
                                    }
                                </Col>
                        </Row>
                            {this.state.personal &&
                                <Personal clickTwo={this.clickTwo}/>
                            }
                            {this.state.showcompany &&
                                <Company clickOne={this.clickOne} clickThree={this.clickThree}/>
                            }
                            {this.state.showverify &&
                                <Otp clickTwo={this.clickTwo} fromcompany={this.state.otpnav}/>
                            }
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Mainpage
