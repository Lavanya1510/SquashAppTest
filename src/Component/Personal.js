import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider} from 'antd'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
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
        if(personal !== null && personal !== undefined){
            console.log('personal',personal)
            if(personal.type !== 'male' && personal.type !== 'female'){
                await this.setState({othertype:true,other:personal.type,name:personal.name,phone:personal.phone,country:personal.country,state:personal.state,done:true})
            }else if(personal.type === 'male') {
                await this.setState({type:personal.type,genderM:true,name:personal.name,phone:personal.phone,country:personal.country,state:personal.state,done:true})
            }else if(personal.type === 'female') {
                await this.setState({type:personal.type,genderF:true,name:personal.name,phone:personal.phone,country:personal.country,state:personal.state,done:true})
            }
        }
        
    }
    clickGender=async(value)=>{
        if(value === 'male'){
            await this.setState({type:value,genderM:true,genderF:false,othertype:false})
        }else if(value === 'female'){
            await this.setState({type:value,genderM:false,genderF:true,othertype:false})
        }else if(value === 'other'){
            await this.setState({othertype:true,genderM:false,genderF:false})
        }
    }
    submitnext=async()=>{
        console.log('submitnext',this.state.phone)
        if(this.state.phone !== ''){
            let phoneno=this.state.phone.split(' ')
            console.log('phoneno',phoneno)
            let councode=phoneno[0]
            console.log('councode',councode)
            
            let res=await axios.get(`http://apilayer.net/api/validate?access_key=a220bdf2bdf8884788bc6b041dd0af16&number=${this.state.phone}`)
            console.log('resss',res)
            if(res.data.valid){
                let {name,phone,othertype,other,country,state} = this.state
                let type
                if(othertype === true){
                    type=other
                }else{
                    type=this.state.type
                }
                console.log('submitnext',name,phone,type,country,state)
                if(this.state.name !== '' && this.state.country !== '' && this.state.state !== '' && this.state.phone !== '' && type !== ''){
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
                    this.props.clickTwo(true)
                }else{
                    message.error('Please enter all the fields')
                }
            }else{
                message.error('Please provide valid phone number')
            }
        }else{
            message.error('Please provide phone number')
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
          if(othertype === true){
              type=other
          }else{
              type=this.state.type
          }
        //   if(this.state.done === true){
        //     check=true
        //   }else{
            if(this.state.name === '' || this.state.country === '' || this.state.state === '' || this.state.phone === '' || type === ''){
                console.log('inside if')
                check=true
            }else{
                console.log('inside else')
                check=false
            }
        //   }
          
          console.log('outside if',check)
          return check
      }
    render() {
        console.log('this.state.phone',this.state.phone
        
        )
        return (
            <div>
                <div >
                                <Row>
                                        <div className='detailtitle'>
                                        Add your personal details
                                        </div>
                                        <div className='Lorem'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                        </div>
                                </Row>
                                <Row className='personaldata'>
                                    <Card id='cardstyle'>
                                        <div className='toppaddding'>
                                            {/* <input type='text' name="name" id="name" value={this.state.name} className='nameinput' 
                                                   onChange={e=>this.setState({name:e.target.value})}/>
                                            <label for="name" className="labelinput">Full Name</label> */}
                                            <input type='text' id="name" value={this.state.name} className='nameinput' 
                                                   onChange={e=>this.setState({name:e.target.value})}/>
                                            <label for="name" className="labelinput" >Full Name</label>
                                        </div>
                                        <div className='topaddding1'>
                                            <label className='labelinput1'><span>Gender</span></label>
                                            <div className='movetoTop'>
                                                {this.state.genderM?
                                                <button className='gender1'
                                                        onClick={e=>this.clickGender('male')}>Male</button>
                                                :
                                                <button className='gender2'
                                                        onClick={e=>this.clickGender('male')}>Male</button>
                                                }
                                                {this.state.genderF?
                                                <button className='gender1'
                                                        onClick={e=>this.clickGender('female')}>Female</button>
                                                :
                                                <button className='gender2'
                                                        onClick={e=>this.clickGender('female')}>Female</button>
                                                }
                                                {this.state.othertype?
                                                <button className='gender1'
                                                        onClick={e=>this.clickGender('other')}>Other</button>
                                                :
                                                <button className='gender2'
                                                        onClick={e=>this.clickGender('other')}>Other</button>
                                                }

                                            </div>
                                        </div>
                                        {this.state.othertype &&
                                        <div className='topaddding1'>
                                            <input type='text' value={this.state.other} className='nameinput'
                                                   onChange={e=>this.setState({other:e.target.value})} />
                                        </div>
                                        }
                                        <div className='topaddding1'>
                                            <label className='labelinput1'><span>Country</span></label>
                                            <CountryDropdown
                                                value={this.state.country}
                                                onChange={(val) => this.selectCountry(val)} 
                                                // style={style}
                                                id='countrydrop'
                                            />
                                        </div>
                                        <div className='topaddding1'>
                                            <label className='labelinput1'><span>State</span></label>
                                            <RegionDropdown
                                                country={this.state.country}
                                                value={this.state.state}
                                                onChange={(val) => this.selectRegion(val)}
                                                // style={style}
                                                id='regiondrop'
                                            />
                                        </div>
                                        <div className='topaddding1'>
                                            <label className='labelinput1'><span>Phone</span></label>
                                            <PhoneInput
                                                country={this.state.country}
                                                value={this.state.phone}
                                                onChange={phone => this.setState({ phone })}
                                                // containerStyle={{width:'500px'}}
                                                inputStyle={{width:'100%',color:'#0A0909',fontWeight: 600}}
                                                // style={{marginTop:'5px'}}
                                                id='phoneinput'
                                            />
                                        </div>
                                        <div className='topaddding1'>
                                                    <Button disabled={this.check()} id='personbutton'
                                                            onClick={this.submitnext}>Next</Button>
                                        </div>
                                        <div className='aligntext' >
                                            <text>Already have an account?</text>&nbsp;<text style={{color:'#FF6600'}}>Log in</text>
                                        </div>
                                    </Card>
                                </Row>
                            </div>
            </div>
        )
    }
}

const style={
    border:'1px solid #DCDCDC',
    padding:'5px',marginTop:'5px', 
    borderRadius:'3px',outline:'none',
    height:'35px',width:'100%',color:'#0A0909',
    fontWeight:'600',
}

export default Personal
