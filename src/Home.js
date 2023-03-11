import React, { useState,useRef } from 'react';
import { Layout, Menu, Image, Button, Form, Input } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import { db } from './firebase'
import { setDoc, getDoc, doc } from 'firebase/firestore'
const { Header, Content, Footer } = Layout
function Home() {
  const [data, setData] = useState({})
  const [subscribed, setSubscribed] = useState(false)
  const sectionTwoRef = useRef(null);
  const Onchange = (e) => {
    const { name } = e.target
    const { value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }
  const submit = async () => {
    const ref = doc(db, 'subscribers', 'JpzAa4KvMlscSVpPEELB');
    const y = await getDoc(ref)
    let newData = [...y.data().emails]
    const exists =newData.find(users=>users.email===data.email)
    if(!exists && data.email && data.name){
      setSubscribed(true)
      newData.push(data)
      await setDoc(ref, { emails: newData })
    }
    document.getElementById("form1").reset();

  }
  const handleScrollToSectionTwo = () => {
      sectionTwoRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <Layout theme="light">
      <Header style={{ backgroundColor: 'white' }}>
        <div className="logo">
          <Image src="https://static.wixstatic.com/media/8d5421_765bc2b1ca0c4f7ca8da2d370fd90eb0~mv2.jpeg/v1/fill/w_96,h_96,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/8d5421_765bc2b1ca0c4f7ca8da2d370fd90eb0~mv2.jpeg" alt="Logo" />
        </div>
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="1">Home</Menu.Item>
          {/* <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item> */}
        </Menu>
      </Header>
      <Content>
        <div className="section-one" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/8d5421_b43a935516284a6ea23e30ebc601aa5c~mv2.jpeg/v1/fill/w_1080,h_577,al_c,q_85,enc_auto/8d5421_b43a935516284a6ea23e30ebc601aa5c~mv2.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '600px', display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingLeft: '50px' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Enjoy free printables on subscribing and get<br></br> updates on my up coming children's picture book</p>
            <Button type="primary" style={{ backgroundColor: 'black' }}onClick={handleScrollToSectionTwo}>Subscribe</Button>
          </div>
        </div>
        <div className="section-two" ref={sectionTwoRef} style={{ padding: '50px' }}>
          <h1>Subscribe</h1>
          <Form id="form1">
            <Form.Item label="Name" name="name">
              <Input name='name' onChange={Onchange} />
            </Form.Item>
            <Form.Item label="Surname" name="surname">
              <Input name='surname' onChange={Onchange} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input name='email' onChange={Onchange} />
            </Form.Item>
            {subscribed ? ( // new message when user is subscribed
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Thank you for subscribing!</p>
            ) :( <Button style={{ backgroundColor: 'black' }} type="primary" htmlType="submit" onClick={submit}>Submit</Button>)}
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <a href="/path/to/privacy-policy">Privacy Policy</a> | <a href="/path/to/terms-and-conditions">Terms and Conditions</a>
        </div>
        <div>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FacebookOutlined style={{ fontSize: '24px', marginRight: '10px' }} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><TwitterOutlined style={{ fontSize: '24px', marginRight: '10px' }} /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><InstagramOutlined style={{ fontSize: '24px' }} /></a>
        </div>
        <div style={{ marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Iqra Writer
        </div>
      </Footer>
      <style>{`
        /* Styles for mobile screens */
        @media (max-width: 768px) {
          .section-one {
            background-size: cover !important;
            background-attachment: scroll !important;
          }
        }
      `}</style>
    </Layout>
  );
}

export default Home;