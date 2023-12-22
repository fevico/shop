import { ChakraProvider } from '@chakra-ui/react'
import ProductsScreen from './screens/ProductsScreen';

function App() {
  return (
    <div>
  <ChakraProvider>
    <ProductsScreen/>
    </ChakraProvider>   
     </div>
  );
}

export default App;
