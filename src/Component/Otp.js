import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Avatar, Divider} from 'antd'
import OtpInput from 'react-otp-input'
export class Otp extends Component {
    state={
        otp:'',
        newOtp:12345,
        seconds: 30
    }
    componentDidMount=async()=>{
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

    render() {
        const {  seconds } = this.state

        return (
            <div>
                <div>
                                <Row>
                                        <div style={{fontSize:'24px',color:'black',fontWeight:'600',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',paddingTop:'10px'}}>
                                        Enter Your OTP
                                        </div>
                                </Row>
                                <Row style={{paddingTop:'15px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Card style={{width:'50%'}}>
                                        <Row>
                                            <div style={{width:'100%'}}>
                                                <div style={{float:'left'}}>Enter your code</div>
                                                { seconds == 0?
                                                <div style={{float:'right'}}>
                                                    <b style={{textDecoration:'underline',cursor:'pointer',marginLeft:'5px',color:'#84c225',fontWeight:'700'}}>Resend OTP</b>
                                                </div>
                                                    :
                                                <div style={{float:'right'}}>
                                                <b onClick={this.resndotp} style={{marginLeft:'5px',color:'#84c225',fontWeight:'700'}}>  {seconds + ' '+ 'sec'} </b>
                                                </div>
                                                }
                                                {/* <div style={{float:'right'}}>23sec</div> */}
                                            </div>
                                        </Row>
                                        <div style={{paddingTop:'10px'}}>
                                        <OtpInput
                                            onChange={otp => this.handleChange(otp)}
                                            numInputs={5}
                                            separator={<span style={{padding:'0px 20px'}}></span>}
                                            inputStyle={{width:'45px',height:'45px'}}
                                            value={this.state.otp}
                                        />
                                        {/* <input id="partitioned" type="text" maxlength="4" /> */}
                                        </div>
                                       
                                        <div style={{paddingTop:'15px'}}>
                                           <Row>
                                               <Col span={4} style={{paddingRight:'5px'}}>
                                                    <Button style={{height:'30px',backgroundColor:'#eee',borderRadius:'5px'}}
                                                            onClick={this.back}>Back</Button>
                                               </Col>
                                               <Col span={20}>
                                                    <Button disabled={this.state.otp == ''} style={{height:'30px',borderRadius:'5px',backgroundColor:'#FF6600',color:'white',width:'100%'}}
                                                            onClick={this.submitnext}>verify</Button>
                                               </Col>
                                           </Row>
                                        </div>
                                        <div style={{padding:'10px 0px'}}>
                                            <hr style={{border:'1px solid #eee'}}/>
                                        </div>
                                        <div style={{textAlign:'center',width:'100%'}}>
                                           Didn't receive the email? Check your spam filter for an email from
                                            &nbsp;
                                            <text style={{color:'#FF6600'}}>name@domain.com</text>
                                        </div>
                                    </Card>
                                </Row>
                            </div>
            </div>
        )
    }
}

export default Otp
