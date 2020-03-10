import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider,Upload,Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

export class Company extends Component {
    state={
        companyname:'',
        email:'',
        jobtitle:'',
        category:'',
        file:'',
        cheked:false,
        done:false
    }
    componentWillMount=async()=>{
        console.log('componentWillMount in compny')
        let company=JSON.parse(localStorage.getItem('company'))
        console.log('personal',company)
        if(company !=null && company != undefined){
            await this.setState({companyname:company.companyname,email:company.email,jobtitle:company.jobtitle,category:company.category,file:company.file,done:true})
        }
        
    }
    async onChange(e) {
        console.log('e.target.files[0]',e.target.files[0])
        await this.setState({file:e.target.files[0].name});
    }
    check=()=>{
        let check
        console.log('check')
        let {companyname,email,jobtitle,category,file,cheked} = this.state
        if(this.state.done == true){
          check=true
        }else{
          if(companyname == '' || email =='' || jobtitle =='' || category =='' || file == '' || cheked == false){
              console.log('inside if')
              check=true
          }else{
              console.log('inside else')
              check=false
          }
        }
        
        console.log('outside if',check)
        return check
    }
    back=()=>{
        console.log('back')
        this.props.clickOne()
    }
    submitnext=async()=>{
        let {companyname,email,jobtitle,category,file,cheked} = this.state
          console.log('submitnext',companyname,email,jobtitle,category,file,cheked)
          if(companyname != '' && email != '' && jobtitle !='' && category !='' && file !='' && cheked != false){
            console.log('inside if')
            let detail={
                companyname,
                jobtitle,
                category,
                file,
                cheked,
                email
            }
            console.log('detail',detail)
            localStorage.setItem('company',JSON.stringify(detail))
            message.success('Company details has been added successfully')
            await this.setState({done:true})
            let value=true
            this.props.clickThree(value)
          }else{
            message.error('Please enter all the fields')
          }
    }
    handleChange=async(value)=>{
        console.log('handleChange',value)
        await this.setState({category:value})
    }
    render() {
        return (
            <div>
                <div>
                                <Row>
                                        <div style={{fontSize:'24px',color:'black',fontWeight:'600',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',paddingTop:'10px'}}>
                                        Add your company details
                                        </div>
                                        <div style={{fontSize:'14px',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',paddingTop:'10px'}}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                        </div>
                                </Row>
                                <Row style={{padding:'15px 0px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Card style={{width:'50%'}}>
                                    {this.state.image?
                                       <Avatar size={60} src={this.state.file}  />
                                  :
                                        <div>
                                            <Avatar size={60} icon="logo"  />
                                            <input type="file" name="myImage" onChange= {(e)=>this.onChange(e)}  style={{paddingLeft:'10%'}}/>
                                        </div>
                                      }
                                      <div>
                                      
                                           
                                      </div>
                                        
                                        <div style={{paddingTop:'10px'}}>
                                            <label>Company Name</label>
                                            <input type='text' value={this.state.companyname} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                   onChange={e=>this.setState({companyname:e.target.value})}/>
                                        </div>
                                        <div style={{paddingTop:'10px'}}>
                                            <label>Email id</label>
                                            <input type='email' value={this.state.email} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                   onChange={e=>this.setState({email:e.target.value})}/>
                                        </div>
                                        <div style={{paddingTop:'10px'}}>
                                            <label>Job Title</label>
                                            <input type='text' value={this.state.jobtitle} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                   onChange={e=>this.setState({jobtitle:e.target.value})}/>
                                        </div>
                                        <div style={{paddingTop:'10px'}}>
                                            <label>Choose a category</label>
                                            <Select 
                                                        defaultValue={'categoryA'} style={{ width: '100%',height:'auto',marginTop:'5px'}} onChange={this.handleChange}>                                                            
                                                            <Option value={'categoryA'}>categoryA</Option>
                                                            <Option value={'categoryB'}>categoryB</Option>
                                                            <Option value={'categoryC'}>categoryC</Option>
                                            </Select>
                                            {/* <label>Choose a category</label>
                                            <input type='text' value={this.state.category} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                    onChange={e=>this.setState({category:e.target.value})}/> */}
                                        </div>
                                        <div style={{paddingTop:'10px'}}>
                                            <input type='checkbox' onChange={e=>this.setState({cheked:true})}/>
                                            <text style={{paddingLeft:'10px'}}>I accept the</text>&nbsp;<text style={{color:'#FF6600'}}>Terms and Conditions</text>
                                        </div>
                                        <div style={{paddingTop:'10px'}}>
                                           <Row>
                                               <Col span={4} style={{paddingRight:'5px'}}>
                                                    <Button style={{height:'30px',backgroundColor:'#eee',borderRadius:'5px'}}
                                                    onClick={this.back}>Back</Button>
                                               </Col>
                                               <Col span={20}>
                                                    <Button disabled={this.check()} style={{height:'30px',borderRadius:'5px',backgroundColor:'#FF6600',color:'white',width:'100%'}}
                                                    onClick={this.submitnext}>Send OTP</Button>
                                               </Col>
                                           </Row>
                                        </div>
                                    </Card>
                                </Row>
                            </div>
            </div>
        )
    }
}

export default Company
