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
        otpdone:false
    }
    componentWillMount=async()=>{
        let personal=JSON.parse(localStorage.getItem('personal'))
        if(personal !=null && personal != undefined){
            await this.setState({personaldone:true})
        }
        let company=JSON.parse(localStorage.getItem('company'))
        if(company !=null && company != undefined){
            await this.setState({companydone:true})
        }
        let otp=localStorage.getItem('otpdone')
        if(otp !=null && otp != undefined){
            await this.setState({otpdone:true})
        }

        
    }
    clickOne=async()=>{
        console.log('clickOne')
        await this.setState({personal:true,showcompany:false,showverify:false})
    }
    clickTwo=async(value)=>{
        if(value){
            console.log('clickOne')
            await this.setState({personal:false,showcompany:true,showverify:false,personaldone:true}) 
        }else{
            console.log('clickOne')
            await this.setState({personal:false,showcompany:true,showverify:false})
        }
        
    }
    clickThree=async(value)=>{
        if(value){
            console.log('clickOne')
            await this.setState({personal:false,showcompany:false,showverify:true,companydone:true})
        }else{
            console.log('clickOne')
            await this.setState({personal:false,showcompany:false,showverify:true})
        }
    }
    render() {
        return (
            <div>
                <div style={{height:'100%',width:'100%'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
                        <div style={{backgroundColor:'#fff',width:'60%',boxShadow:'px 5px 5px 5px #eee',border:'1px solid #eee'}}>
                            <Row style={{height:'40px',backgroundColor:'#003152',padding:'0px 10%'}}>
                               <Col span={8} style={{height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                 <a onClick={this.clickOne} style={{textDecoration:'none'}}>
                                  <span style={{verticalAlign:'top',borderRadius:'0.8em',color:'white',display:'inline-block',backgroundColor:this.state.personal?'#FF6600':'#152238',textAlign:'center',lineHeight:'1.4em',width:'1.4em',fontSize:'16px'}}>
                                            {this.state.personaldone?<CheckOutlined />:1}
                                   </span>
                                   <text style={{color:'white',fontSize:'16px',paddingLeft:'5px'}}>Personal Details</text>
                                 </a>
                                </Col>
                                <Col span={8} style={{height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                 <a onClick={this.clickTwo} style={{textDecoration:'none'}}>
                                    <span style={{verticalAlign:'top',borderRadius:'0.8em',color:'white',display:'inline-block',backgroundColor:this.state.showcompany?'#FF6600':'#152238',textAlign:'center',lineHeight:'1.4em',width:'1.4em',fontSize:'16px'}}>
                                    {this.state.companydone?<CheckOutlined />:2}
                                    </span>
                                    <text style={{color:'white',fontSize:'16px',paddingLeft:'5px'}}>Company Details</text>
                                 </a>
                                </Col>
                                <Col span={8} style={{height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                  <a onClick={this.clickThree} style={{textDecoration:'none'}}>
                                    <span style={{verticalAlign:'top',borderRadius:'0.8em',color:'white',display:'inline-block',backgroundColor:this.state.showverify?'#FF6600':'#152238',textAlign:'center',lineHeight:'1.4em',width:'1.4em',fontSize:'16px'}}>
                                    {this.state.otpdone?<CheckOutlined />:3}
                                    </span>
                                    <text style={{color:'white',fontSize:'16px',paddingLeft:'5px'}}>Email verification</text>
                                  </a>
                                </Col>
                            </Row>
                            {this.state.personal &&
                                <Personal clickTwo={this.clickTwo}/>
                            }
                            {this.state.showcompany &&
                                <Company clickOne={this.clickOne} clickThree={this.clickThree}/>
                            }
                            {this.state.showverify &&
                                <Otp clickTwo={this.clickTwo}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mainpage
