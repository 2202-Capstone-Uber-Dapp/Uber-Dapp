import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, updateProfile } from "firebase/auth";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { editProfile } from '../../store';

export default function EditProfile() {
  const user = useSelector((state) => state.auth);
  const usernameRef = useRef(user.username);
  const photoRef = useRef(user.profileImage);
  const dispatch = useDispatch();
  const firebaseUser =  getAuth().currentUser;
  const [role, setRole] = useState(user.role);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { userName: usernameRef.current.value, role: role , photo: photoRef.current.value};
    await updateProfile(firebaseUser, {displayName: usernameRef.current.value, photoURL: photoRef.current.value});
    dispatch(editProfile(data));
  }

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Profile Settings
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={user.profileImage}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="photoUrl" isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            placeholder="photo"
            defaultValue={user.profileImage}
            _placeholder={{ color: 'gray.500' }}
            type="text"
            ref={photoRef}
          />
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            defaultValue={user.username}
            _placeholder={{ color: 'gray.500' }}
            type="text"
            ref={usernameRef}
          />
        </FormControl>
        <FormControl id="roleSelect" isRequired>
          <FormLabel htmlFor='role'>Role</FormLabel>
          <Select id='role' defaultValue="RIDER" onChange={(e) => setRole(e.target.value)}>
            <option value="RIDER">Rider</option>
            <option value="DRIVER">Driver</option>
          </Select>
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  </Flex>
  )
}
