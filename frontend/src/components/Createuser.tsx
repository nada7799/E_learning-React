import React,{useEffect,useState} from 'react'
import { Card, Flex,Typography,Form, Radio, RadioChangeEvent,Button,Input,Spin} from 'antd'
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios"
const Createuser = () => {
  const [loading,setLoading]= useState(false);
  const [firstName,setFirstname]= useState(" ");
  const [lastName,setLastname]= useState(" ");
  const [email,setEmail]= useState(" ");
  const [password,setPassword]= useState(" ");
  const [role,setRole]= useState(" ");
  const navigate = useNavigate();
  const handleSubmit = async ()=>{
        const data = {
          firstName,
          lastName,
          email,
          password,
          role
        };
        setLoading(true);
        await axios.post("http://localhost:3000/users/create",data).then((res)=>{
          setLoading(false);
          var id = res.data._id;
          console.log(res.data);
          navigate(`/Displayuser`,{state:{id:id}});
        }).catch((err)=>{
              setLoading(false);
              alert("an error happened");
              console.log(err);
        })
  }
  return (
    
    <Card className='form-container'>
        {loading? <Spin size='large'/>: " "}
        <Flex>
          <Flex vertical flex={1}>
            <Typography.Title level={3} className='title'>Create User</Typography.Title>
            <Form layout='vertical' onFinish={handleSubmit} autoComplete='off'>
              <Form.Item label="First name" name="first-name" rules={[{
                required:true,
                message:"a first name should be specified"
},]}>
                <Input placeholder='Enter first name' value={firstName} onChange={(e)=>setFirstname(e.target.value)}/>
              </Form.Item>

              <Form.Item label="Last name" name="last-name" rules={[{
                required:true,
                message:"a Last name should be specified"
},]}>
                  <Input placeholder='Enter last name' value={lastName} onChange={(e)=> setLastname(e.target.value)}/>
              </Form.Item>

              <Form.Item label="Email" name="Email" rules={[{
                required:true,
                message:"an Email should be specified"
},]}>
                <Input placeholder='Enter email' size='large' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{
                required:true,
                message:"a password should be specified"
},]}>
              <Input.Password placeholder='Enter password' size='large' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Form.Item>
              <Form.Item label="role" name="role" rules={[{
                required:true,
                message:"a role should be specified"
},]}>
                <Radio.Group value={role} onChange={(e)=>setRole((e.target.value))}>
      <Radio value={"student"}>Student</Radio>
      <Radio value={"professor"}>Professor</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' size='large' className='btn' onClick={handleSubmit}>Create Accout</Button>
              </Form.Item>

              <Form.Item>
                <Button size='large' className='btn' >Sign in</Button>
              </Form.Item>
            </Form>
          </Flex>
          </Flex>
          {/* <Flex></Flex> */}
        </Card>
    
  )
}

export default Createuser