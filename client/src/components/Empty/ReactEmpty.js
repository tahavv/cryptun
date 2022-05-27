import React, { Component ,useEffect,useState} from 'react';
import { Layout, Typography, Empty,Button } from 'antd';
import { contentStyle } from '../../styles';
const { Content } = Layout;
const { Title } = Typography;


export default function SignIn({setAuth})  {

    const [name,setName]=useState("")
    async function getName() {
        try {
            const response = await fetch ("http://localhost:5000/home/",{
                method : "GET",
                headers:{token: localStorage.token}
            });

            const parseRes = await response.json()
            setName(parseRes.user_name)


        } catch (error) {
            console.error(error.message)
        }
    }


    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem('token')
        setAuth(false)
    }

    useEffect(() => {
        getName();
    },[]);



        return (
            <Layout style={{ padding: '1rem' }}>
                <Content className="text-focus-in" style={contentStyle}>
                    <Title level={1}>Welcome {name}</Title>
                    <Title level={3}>This page still in development</Title>
                    <Empty description="This page is currently in development. Please check on it at a later time..."><Button type="danger" onClick={e => logout(e) }>Logout</Button></Empty>
                </Content>
            </Layout>        
        )
    }

