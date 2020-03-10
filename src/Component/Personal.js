import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider} from 'antd'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
export class Personal extends Component {
    state={
        name:'',
        country:'',
        state:'',
        phone:'',
        type:'',
        othertype:false,
        genderM:false,
        genderF:false,
        other:'',
        done:false
    }
    componentWillMount=async()=>{
        console.log('componentWillMount in personal')
        let personal=JSON.parse(localStorage.getItem('personal'))
        console.log('personal',personal)
        if(personal !=null && personal != undefined){
            console.log('personal',personal)
            if(personal.type != 'male' && personal.type != 'female'){
                await this.setState({othertype:true,other:personal.type})
            }else if(personal.type == 'male') {
                await this.setState({type:personal.type,genderM:true})
            }else if(personal.type == 'female') {
                await this.setState({type:personal.type,genderF:true})
            }
            await this.setState({name:personal.name,phone:personal.phone,country:personal.country,state:personal.state,done:true})
        }
        
    }
    clickGender=async(value)=>{
        if(value == 'male'){
            await this.setState({type:value,genderM:true,genderF:false,othertype:false})
        }else if(value == 'female'){
            await this.setState({type:value,genderM:false,genderF:true,othertype:false})
        }else if(value == 'other'){
            await this.setState({othertype:true,genderM:false,genderF:false})
        }
    }
    submitnext=async()=>{
        let {name,phone,othertype,other,country,state} = this.state
        let type
          if(othertype == true){
              type=other
          }else{
              type=this.state.type
          }
          console.log('submitnext',name,phone,type,country,state)
          if(this.state.name != '' && this.state.country != '' && this.state.state !='' && this.state.phone !='' && type !=''){
            console.log('inside if')
            let detail={
                name,
                phone,
                country,
                state,
                type
            }
            console.log('detail',detail)
            localStorage.setItem('personal',JSON.stringify(detail))
            message.success('personal details added successfully')
            await this.setState({done:true})
            let value=true
            this.props.clickTwo(value)
          }else{
            message.error('Please enter all the fields')
          }
    }
    selectCountry=async(val)=> {
        console.log('country',val)
        await this.setState({ country: val });
      }
     
      selectRegion=async(val)=> {
        console.log('state',val)
        await this.setState({ state: val });
      }
      check=()=>{
          let check
          console.log('check')
          let {name,phone,othertype,other,country,state} = this.state
          let type
          if(othertype == true){
              type=other
          }else{
              type=this.state.type
          }
          if(this.state.done == true){
            check=true
          }else{
            if(this.state.name == '' || this.state.country =='' || this.state.state =='' || this.state.phone =='' || type == ''){
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
    render() {
        return (
            <div>
                <div>
                                <Row>
                                        <div style={{fontSize:'24px',color:'black',fontWeight:'600',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',paddingTop:'10px'}}>
                                        Add your personal details
                                        </div>
                                        <div style={{fontSize:'14px',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',paddingTop:'10px'}}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                        </div>
                                </Row>
                                <Row style={{paddingTop:'15px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Card style={{width:'50%'}}>
                                        <div>
                                            <label><span>Full Name</span></label>
                                            <input type='text' value={this.state.name} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                   onChange={e=>this.setState({name:e.target.value})}/>
                                        </div>
                                        <div style={{paddingTop:'15px'}}>
                                            <label><span>Gender</span></label>
                                            <div style={{marginTop:'5px'}}>
                                                <button style={{height:'30px',border:'1px solid #DCDCDC',marginRight:'10px',borderRadius:'3px',width:'80px',backgroundColor:this.state.genderM?'#FF6600':'white',color:this.state.genderM?'white':'black'}}
                                                        onClick={e=>this.clickGender('male')}>Male</button>
                                                <button style={{height:'30px',border:'1px solid #DCDCDC',marginRight:'10px',borderRadius:'3px',width:'80px',backgroundColor:this.state.genderF?'#FF6600':'white',color:this.state.genderF?'white':'black'}}
                                                        onClick={e=>this.clickGender('female')}>Female</button>
                                                <button style={{height:'30px',border:'1px solid #DCDCDC',borderRadius:'3px',width:'80px',backgroundColor:this.state.othertype?'#FF6600':'white',color:this.state.othertype?'white':'black'}}
                                                        onClick={e=>this.clickGender('other')}>Other</button>
                                            </div>
                                        </div>
                                        {this.state.othertype &&
                                        <div style={{paddingTop:'15px'}}>
                                            <input type='text' value={this.state.other} style={{width:'100%',border:'1px solid #DCDCDC',height:'30px',marginTop:'5px',borderRadius:'3px'}}
                                                   onChange={e=>this.setState({other:e.target.value})} />
                                        </div>
                                        }
                                        <div style={{paddingTop:'15px'}}>
                                            <label><span>Country</span></label>
                                            <CountryDropdown
                                                value={this.state.country}
                                                onChange={(val) => this.selectCountry(val)} 
                                                style={{border:'1px solid #DCDCDC',padding:'5px',marginTop:'5px', borderRadius:'3px',outline:'none',height:'40px',width:'100%'}}
                                            />
                                        </div>
                                        <div style={{paddingTop:'15px'}}>
                                            <label><span>State</span></label>
                                            <RegionDropdown
                                                country={this.state.country}
                                                value={this.state.state}
                                                onChange={(val) => this.selectRegion(val)}
                                                style={{border:'1px solid #DCDCDC',padding:'5px',marginTop:'5px', borderRadius:'3px',outline:'none',height:'40px',width:'100%'}}
                                            />
                                        </div>
                                        <div style={{paddingTop:'15px'}}>
                                            <label ><span>Phone</span></label>
                                            <PhoneInput
                                                country={this.state.country}
                                                value={this.state.phone}
                                                onChange={phone => this.setState({ phone })}
                                                // containerStyle={{width:'500px'}}
                                                inputStyle={{width:'100%'}}
                                                style={{marginTop:'5px'}}
                                            />
                                        </div>
                                        <div style={{paddingTop:'15px'}}>
                                                    <Button disabled={this.check()} style={{height:'30px',borderRadius:'5px',backgroundColor:'#FF6600',color:'white',width:'100%'}}
                                                            onClick={this.submitnext}>Next</Button>
                                        </div>
                                        <div style={{paddingTop:'20px',textAlign:'center'}}>
                                            <text>Already have an account?</text>&nbsp;<text style={{color:'#FF6600'}}>Log in</text>
                                        </div>
                                    </Card>
                                </Row>
                            </div>
            </div>
        )
    }
}

export default Personal
