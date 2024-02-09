import { Text, Stack, Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendResendEmail } from "../redux/actions/userActions";

const PasswordForgetForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <>
      <Box my="4">
        <Text as="b">Enter your email address</Text>
        <Text>We'll send you an email with a link to reset your password.</Text>
      </Box>
      <Stack>
        <Input
          mb="4"
          type="text"
          name="emil"
          placeholder="Your Email Address"
          label="Email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <Button colorScheme="yellow" size='lg' fontSize='md' onClick={()=>dispatch(sendResendEmail(email))}>Send Reset Email</Button>
      </Stack>
    </>
  );
};

export default PasswordForgetForm;
