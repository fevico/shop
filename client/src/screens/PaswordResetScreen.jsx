import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Container, FormControl, Heading, Stack, Text, VStack, useBreakpointValue, useToast} from '@chakra-ui/react'
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import { resetPassword, resetState } from '../redux/actions/userActions';

export const PaswordResetScreen = () => {
    const {token} = useParams()
    const dispatch = useDispatch()
    const toast = useToast()

    const {loading, error, serverStatus, serverMsg} = useSelector((state) => state.user)
    const headingBR = useBreakpointValue({base: 'xs', md: 'sm'});
    const boxBR = useBreakpointValue({base: 'transparent', md: 'bg-surface'})

    useEffect(()=>{
        if(serverStatus && serverMsg){
            toast({
                description: `${serverMsg}`,
                status: 'success',
                isClosable: true,
            })
            dispatch(resetState())
        }
    }, [error, toast, serverMsg, serverStatus, dispatch])

  return (
    <div>PaswordResetScreen</div>
  )
}
