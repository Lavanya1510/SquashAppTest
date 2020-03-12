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
        done:false,
        img:'',
        name:'upload',
        url:'',
        placeholder:''
    }
    componentWillMount=async()=>{
        console.log('componentWillMount in compny')
        let company=JSON.parse(localStorage.getItem('company'))
        console.log('personal',company)
        if(company !== null && company !== undefined){
            await this.setState({companyname:company.companyname,email:company.email,jobtitle:company.jobtitle,category:company.category,url:company.url,done:true})
        }
        
    }
    async onChange(e) {
        // e.preventDefault()
        // console.log('e.target.files[0]',e.target.files[0])
        // let file=e.target.files[0]
        // let reader = new FileReader();
        // console.log('reader',reader)
        // reader.onloadend = () => {
        //     this.setState({
        //       file: file,
        //       imagePreviewUrl: reader.result
        //     });
        //   }
          
        // reader.readAsDataURL(file)
        // console.log('reader',reader)
        let url
         if (e.target.files && e.target.files[0]) {
              var reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = async(e) => {
              url = e.target.result;
              await this.setState({url})
         }
        }
    }
    check=()=>{
        let check
        let {companyname,email,jobtitle,category,url,cheked} = this.state
        console.log('check',companyname,email,jobtitle,category,url,cheked)

        // if(this.state.done == true){
        //   check=true
        // }else{
          if(companyname === '' || email === '' || jobtitle === '' || category === '' || url === '' || cheked === false){
              console.log('inside if')
              check=true
          }else{
              console.log('inside else')
              check=false
          }
        // }
        
        console.log('outside if',check)
        return check
    }
    back=()=>{
        console.log('back')
        this.props.clickOne()
    }
    submitnext=async()=>{
        let {companyname,email,jobtitle,category,url,cheked} = this.state
          console.log('submitnext',companyname,email,jobtitle,category,url,cheked)
          if(companyname !== '' && email !== '' && jobtitle !== '' && category !== '' && url !== '' && cheked !== false){
            console.log('inside if')
            let detail={
                companyname,
                jobtitle,
                category,
                url,
                cheked,
                email
            }
            console.log('detail',detail)
            localStorage.setItem('company',JSON.stringify(detail))
            message.success('Company details has been added successfully')
            await this.setState({done:true})
            this.props.clickThree(true)
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
                                        <div className='detailtitle'>
                                        Add your company details
                                        </div>
                                        <div className='Lorem'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                        </div>
                                </Row>
                                <Row className='personaldata'>
                                    <Card id='cardstyle'>
                                    {this.state.url === ''?
                                    <div className='padbottom'>
                                        <Avatar src='/empty.png' id='imagesrc'/>
                                        <input type="file" id="upload" onChange={e=>this.onChange(e)} 
                                        // style={{display:'none'}}
                                        />
                                        <label className='filelabel' for="upload">Upload your company logo</label>
                                    </div>
                                    :
                                    <div className='padbottom'>
                                        <Avatar src={this.state.url} id='imagesrc' />
                                        <input type="file" id="upload" onChange={e=>this.onChange(e)} 
                                        // style={{display:'none'}} 
                                        />
                                        <label className='filelabel' for="upload">Upload your company logo</label>
                                    </div>
                                    }
                                    
                                    {/* <label><text >jhasja</text></label> */}
                                    {/* {this.state.image?
                                       <img src={this.state.img}  />
                                    :
                                        <div>
                                            <Avatar size={60} icon="logo"  />
                                            <input type="file" name="myImage" onChange= {(e)=>this.onChange(e)}  style={{paddingLeft:'10%'}}/>
                                        </div>
                                      } */}
                                        
                                        <div className='topaddding'>
                                            <input type='text' value={this.state.companyname} id="compname"
                                                   onChange={e=>this.setState({companyname:e.target.value})}
                                                   className='nameinput' />
                                            <label for="compname" className="labelinput">Company Name</label>
                                        </div>
                                        <div className='topaddding'>
                                            <input type='email' id="email" value={this.state.email}
                                                   onChange={e=>this.setState({email:e.target.value})}
                                                   className='nameinput' />
                                            <label for="email"  className='labelinput'>Email id</label>
                                        </div>
                                        <div className='topaddding'>
                                            <input type='text' id="jobtitle" value={this.state.jobtitle}
                                                   onChange={e=>this.setState({jobtitle:e.target.value})}
                                                   className='nameinput' />
                                            <label for="jobtitle" className='labelinput'>Job Title</label>
                                        </div>
                                        <div className='toppaddding'>
                                            <label for="category" className='labelinput'>Choose a category</label>
                                            {/* <select 
                                                        value={this.state.category} className='selectinp' onChange={e=>this.handleChange(e)}>                                                            
                                                            <option value={'First'} className='optioncolor'>A</option>
                                                            <option value={'Second'} className='optioncolor'>B</option>
                                                            <option value={'Third'} className='optioncolor'>C</option>
                                            </select> */}
                                            <Select id="category"
                                                        defaultValue={this.state.category} style={style} onChange={this.handleChange}>                                                            
                                                            <Option value={'CategoryA'}  id='optioncolor'>CategoryA</Option>
                                                            <Option value={'CategoryB'}  id='optioncolor'>CategoryB</Option>
                                                            <Option value={'CategoryC'}  id='optioncolor'>CategoryC</Option>
                                            </Select>
                                        </div>
                                        <div className='toppaddding'>
                                            <input type='checkbox' onChange={e=>this.setState({cheked:!this.state.cheked})}/>
                                            <text style={{paddingLeft:'10px'}}>I accept the</text>&nbsp;<text style={{color:'#FF6600'}}>Terms and Conditions</text>
                                        </div>
                                        <div className='toppaddding'>
                                           <Row>
                                               <Col span={4}>
                                                    <Button id='backbutton'
                                                    onClick={this.back}>Back</Button>
                                               </Col>
                                               <Col span={20}>
                                                    <Button disabled={this.check()} id='companybutton'
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

const style={ width: '100%',height:'35px',marginTop:'5px',color:'#0A0909',outline:'none',fontWeight:'600'}

export default Company
