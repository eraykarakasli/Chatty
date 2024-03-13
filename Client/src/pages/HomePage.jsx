import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/SingUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/providerRedux/serverSlice";

  function Homepage() {
    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(setUser(user))

      if (user) {
        history("/chats");
      }else{
        history("/")
      }
    }, [history]);

    return (
      <Container maxW="xl" h="full" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            ChatApp
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Homepage;