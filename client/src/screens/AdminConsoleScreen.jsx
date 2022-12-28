import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersTab from '../components/UsersTab';
import OrdersTab from '../components/OrdersTab';
import ProductsTab from '../components/ProductsTab';

const AdminConsoleScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo && userInfo.isAdmin === 'true' ? (
    <Box p='20px' minH='100vh'>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: 'none' }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Admin Console
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              {/* <Tab>Reviews</Tab>  */}
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
              <TabPanel>
                <ProductsTab />
              </TabPanel>
              <TabPanel>
                <OrdersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default AdminConsoleScreen;
