import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider} from 'antd'
import OtpInput from 'react-otp-input'
import "./Otp.css";
export class Otp extends Component {
    state={
        otp:'',
        newOtp:12345,
        seconds: 30
    }
    componentDidMount=async()=>{
        if(this.props.fromcompany){
            this.myInterval = setInterval(() => {
                const { seconds,  } = this.state
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                clearInterval(this.myInterval)  
                } 
            }, 1000)
        }
        
    }
    back=()=>{
        console.log('back')
        this.props.clickTwo()
    }
    handleChange=async(otp)=>{
        console.log('otp',otp)
        await this.setState({otp})
    }

    submitnext=async()=>{
        let {otp,newOtp} = this.state
          if(otp != ''){
            if(otp == newOtp){
                let personal=JSON.parse(localStorage.getItem('personal'))
                let company=JSON.parse(localStorage.getItem('company'))
                if(personal !=null && personal != undefined && company !=null && company != undefined){
                    message.success('verified successfully')
                    localStorage.setItem('otpdone',true)
                    window.location.href='/SuccessPage'
                    // this.myInterval = setInterval(() => {
                    //     const { seconds,  } = this.state
                  
                    //     if (seconds > 0) {
                    //         this.setState(({ seconds }) => ({
                    //             seconds: seconds - 1
                    //         }))
                    //     }
                    //     if (seconds === 0) {
                    //       clearInterval(this.myInterval)  
                    //     } 
                    // }, 1000)
                }else{
                    message.error('verification failed! Please fill personal and company details')
                }
                
            }else{
                message.error('verification failed')
            }
          }else{
            message.error('Please enter all the fields')
          }
    }
    resndotp=async()=>{
        await this.setState({otp:''})
        this.myInterval = setInterval(() => {
            const { seconds,  } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
              clearInterval(this.myInterval)  
            } 
        }, 1000)
    }
    check=()=>{
        if(this.state.otp === ''){
            return true
        }else{
            let arr=this.state.otp.split('') 
            // console.log('arra',arr.length)
            if(arr.length === 5){
                return false
            }else{
                return true
            }
            
        }
    }

    render() {
        const {  seconds } = this.state

        return (
            <div>
                <div>
                                <Row>
                                        <div className='detailtitle'>
                                        Enter Your OTP
                                        </div>
                                        <div className='paralign' >
                                            <div className='otppara'>
                                                For your security, we need to verify your identity. We sent a 5-digit code to name@domain.com. Please enter it below.
                                            </div> 
                                        </div>                                       
                                </Row>
                                <Row className='personaldata'>
                                    <Card id='cardstyle'>
                                        <Row>
                                            <div className='otpcode'>
                                                <div className='otpleft'>Enter your code</div>
                                                { seconds === 0?
                                                <div className='otpright'>
                                                   <text onClick={this.resndotp} >Resend OTP</text> 
                                                </div>
                                                    :
                                                <div className='otpright'>
                                                  {seconds + ' '+ 'sec'}
                                                </div>
                                                }
                                            </div>
                                        </Row>
                                        <div>
                                            <OtpInput
                                                onChange={otp => this.handleChange(otp)}
                                                numInputs={5}
                                                separator={<span className='box'></span>}
                                                inputStyle={otpinline}
                                                focusStyle={otpinline1}
                                                value={this.state.otp}
                                            />
                                            
                                        {/* <input id="partitioned" type="text" maxlength="4" /> */}
                                        </div>
                                       
                                        <div className='topadddingotp'>
                                           <Row>
                                               <Col span={4} >
                                                    <Button id='backbutton'
                                                            onClick={this.back}>Back</Button>
                                               </Col>
                                               <Col span={20}>
                                                    <Button disabled={this.check()} id='companybutton'
                                                            onClick={this.submitnext}>verify</Button>
                                               </Col>
                                           </Row>
                                        </div>
                                        <div >
                                            <hr className='line'/>
                                        </div>
                                        <div className='textbottom'>
                                           Didn't receive the email? Check your spam filter for an email from
                                            &nbsp;
                                            <text className='textinside'>name@domain.com</text>
                                        </div>
                                    </Card>
                                </Row>
                            </div>
            </div>
        )
    }
}

const otpinline={
    width:'60px',height:'60px',border:'1px solid #CECECE',borderRadius:'3px',color:'#0A0909',fontSize:'600'
}
const otpinline1={
    width:'60px',height:'60px',border:'1px solid #ED5901',borderRadius:'3px',color:'#0A0909',fontSize:'600'
}
export default Otp
