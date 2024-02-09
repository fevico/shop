import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import {Field, useField} from 'formik';
import { matchPath } from "react-router-dom";

const TextField = ({label, type, name, placeholder}) => {
    const [field, meta] = useField({type, name, placeholder})
  return (
    <FormControl isInvalid={meta.error && matchPath.touched} mb='6'>
        <FormLabel noOfLines={1}>{label}</FormLabel>
        <Field as={Input} {...field} type={type} name={name} placeholder={placeholder}/>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextField