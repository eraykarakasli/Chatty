import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'loginSuccess') {
        localStorage.setItem('userInfo', JSON.stringify(event.data.userInfo));
      }
    };
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: "Lütfen boş bırakılan yerleri doldurunuz!",
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "top-right",
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Giriş işlemi başarılı.",
        status: "success",
        duration: "2000",
        isClosable: true,
        position: "top-right",
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      setTimeout(() => {
        history('/chats')
      }, 1000);

    } catch (error) {
      toast({
        title: "Şifre yanlış veya uyuşmuyor!",
        status: "error",
        duration: "4000",
        isClosable: true,
        position: "top-right",
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;