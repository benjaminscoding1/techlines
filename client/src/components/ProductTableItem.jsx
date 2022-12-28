import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const ProductTableItem = ({ product }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image.substring(8));
  const dispatch = useDispatch();

  const onSaveProduct = () => {
    dispatch(updateProduct(brand, name, category, stock, price, product._id, productIsNew, description, image));
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Input size='sm' value={image} onChange={(e) => setImage(e.target.value)} />
          <Tooltip label={product.image} fontSize='sm'>
            <Image src={product.image} boxSize='100px' fit='contain' />
          </Tooltip>
        </Td>
        <Td>
          <Textarea
            w='270px'
            h='120px'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size='sm'
          />
        </Td>
        <Td>
          <Flex direction='column' gap='2'>
            <Input size='sm' value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input size='sm' value={name} onChange={(e) => setName(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction='column' gap='2'>
            <Input size='sm' value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input size='sm' value={price} onChange={(e) => setPrice(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction='column' gap='2'>
            <Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} />
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
                Enable
                <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
                  New
                </Badge>
                badge ?
              </FormLabel>
              <Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
            </FormControl>
          </Flex>
        </Td>
        <Td>
          <VStack>
            <Button colorScheme='red' w='160px' variant='outline' onClick={openDeleteConfirmBox}>
              <DeleteIcon mr='5px' />
              Remove Product
            </Button>
            <Button colorScheme='orange' w='160px' variant='outline' onClick={onSaveProduct}>
              <MdOutlineDataSaverOn style={{ marginRight: '5px' }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
      </Tr>
      <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={product}
        deleteAction={deleteProduct}
      />
    </>
  );
};

export default ProductTableItem;
