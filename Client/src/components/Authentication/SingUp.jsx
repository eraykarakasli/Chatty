import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { setStartChat } from "../../redux/features/recentUserSlice";
import { useDispatch } from 'react-redux'
const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Lütfen boş bırakılan alanları doldurunuz!",
                status: "warning",
                duration: "4000",
                isClosable: true,
                position: "top-right",
            })
            setLoading(false)
            return
        }

        if (password !== confirmpassword) {
            toast({
                title: "Şifreler eşleşmiyor!",
                status: "warning",
                duration: "4000",
                isClosable: true,
                position: "top-right",
            })
            return
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://2.59.117.152:5000/api/user",
                { name, email, password },
                config
            );
            toast({
                title: "Kayıt işlemi başarılı.",
                status: "success",
                duration: "3000",
                isClosable: true,
                position: "top-right",
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            setTimeout(() => {
                history('/chats')
            }, 500);
            dispatch(setStartChat(false))
        } catch (error) {
            toast({
                title: "Kayıt olurken bir hata gerçekleşti!",
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "top-right",
            })
            setLoading(false)
        }
    }

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;