import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDoc,doc } from 'firebase/firestore';
import { Layout, Menu, Image,Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import { Table } from 'antd';
const { Header, Footer } = Layout
function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
        const ref = doc(db, 'subscribers', 'JpzAa4KvMlscSVpPEELB');
        const y = await getDoc(ref)
      setSubscribers(y.data().emails);
    };
    fetchSubscribers();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];
  const data = subscribers.map((subscriber, index) => {
    return {
      key: index,
      name: subscriber.name,
      surname: subscriber.surname,
      email: subscriber.email,
    };
  });
  const downloadEmails = () => {
    const emails = subscribers.map(subscriber => subscriber.email);
    const emailsText = emails.join(',');
    const element = document.createElement('a');
    const file = new Blob([emailsText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'emails.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
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
    
    <div >
    <Button onClick={downloadEmails}>Download Emails</Button>
    <div style={{height: '600px' }}>
    <Table columns={columns} dataSource={data} />
    </div>
  </div>
  
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
    </Layout>
  );
}

export default Subscribers;
