import React from 'react'
import { Box, Flex, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { countries } from '@constants/countries'

const InformationSettings = () => {
  const genders = ['Male', 'Female', 'Others']
  return (
    <Box>
      <Flex>
        <FormControl mb={5}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Your Email
          </FormLabel>
          <Input
            type="email"
            borderColor="#DFEAF2"
            borderRadius={8}
            bg="#F1F4F9"
            _placeholder={{ color: '#718EBF' }}
            placeholder="Enter Email"
            fontSize={{ base: 'sm', '1xl': 'md' }}
          />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Display Name
          </FormLabel>
          <Input
            type="email"
            borderColor="#DFEAF2"
            borderRadius={8}
            bg="#F1F4F9"
            _placeholder={{ color: '#718EBF' }}
            placeholder="Enter Email"
            fontSize={{ base: 'sm', '1xl': 'md' }}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mb={5}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Country
          </FormLabel>
          <Select
            borderColor="#DFEAF2"
            borderRadius={8}
            bg="#F1F4F9"
            _placeholder={{ color: '#718EBF' }}
            placeholder="Select Country"
            variant="custom"
            fontSize={{ base: 'sm', '1xl': 'md' }}
          >
            {countries?.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Gender
          </FormLabel>
          <Select
            borderColor="#DFEAF2"
            borderRadius={8}
            bg="#F1F4F9"
            _placeholder={{ color: '#718EBF' }}
            placeholder="Select Gender"
            variant="custom"
            fontSize={{ base: 'sm', '1xl': 'md' }}
          >
            {genders?.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
      <FormControl mb={5}>
        <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
          Your bio (Optional)
        </FormLabel>
        <Textarea
          borderColor="#DFEAF2"
          borderRadius={8}
          bg="#F1F4F9"
          _placeholder={{ color: '#718EBF' }}
          placeholder="Your Bio"
          fontSize={{ base: 'sm', '1xl': 'md' }}
        />
      </FormControl>
    </Box>
  )
}

export default InformationSettings
