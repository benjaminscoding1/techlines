import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const PayPalButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  const [paypalClient, setPayPalClient] = useState(null);

  useEffect(() => {
    const paypalkey = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      setPayPalClient(clientId);
    };
    paypalkey();
  }, [paypalClient]);
  return !paypalClient ? (
    <Stack direction='row' spacing={4} alignSelf='center'>
      <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
    </Stack>
  ) : (
    <PayPalScriptProvider
      options={{
        'client-id': paypalClient,
      }}>
      <PayPalButtons
        disabled={disabled}
        forceReRender={[total(), paypalClient]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onPaymentSuccess(data);
          });
        }}
        onError={(err) => {
          onPaymentError();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
