import { Flex, Select, useColorModeValue as mode, Image, Box, Text, Spacer, Divider } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';

const CheckoutItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();
  return (
    <>
      <Flex>
        <Image
          rounded='lg'
          width='120px'
          height='120px'
          fit='cover'
          src={image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        <Flex direction='column' align='stretch' flex='1' mx='2' spacing='4'>
          <Text noOfLines='2' maxW='150px'>
            {name}
          </Text>
          <Spacer />
          <Select
            maxW='64px'
            focusBorderColor={mode('orange.500', 'orange.200')}
            value={qty}
            onChange={(e) => {
              dispatch(addCartItem(id, e.target.value));
            }}>
            {[...Array(stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <Box>
          <Text fontWeight='bold'>${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode('gray.400', 'gray.800')} />
    </>
  );
};

export default CheckoutItem;
