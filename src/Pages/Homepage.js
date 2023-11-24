import React from 'react'
import { Container,Box,Text,Tabs,Tab,TabPanel,TabList,TabPanels } from '@chakra-ui/react';
import Login from "../components/Authentication/Login"
import Signup from '../components/Authentication/Signup';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Homepage = () => {
  const history = useHistory();
  useEffect(()=>{
     const userInfo =JSON.parse(localStorage.getItem("userInfo"));
     
     if(userInfo){
      history.push("/chats");
     }
  },[history]);


  return <Container maxW='xl' centerContent>
    <Box
    d="flex"
    justifyContent="center"
    p={3}
    bg={"white"}
    color="black"
    w="100%"
    m="40px 0 15px 0"
    borderRadius ="lg"
    borderWidth = "1px"
    >
    <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>    
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
    <Tabs variant="soft-rounded">
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    {  <Login/>}
    </TabPanel>
    <TabPanel>
      {<Signup/>}
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
  </Container>;

};

export default Homepage
