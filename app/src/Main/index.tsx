
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer
} from './styles';


import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';
import { Cart } from '../components/Cart';

import { ICartItem } from '../types/CartItems';
import { IProduct } from '../types/Product';
import { ActivityIndicator } from 'react-native';



import { products as mockProducts } from '../mocks/products';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';


export function Main() {

  const [isTableModalVisible, setisTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([
  ]);
  const [isLoading] = useState(false);

  const [products] = useState<IProduct[]>(mockProducts);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: IProduct) {
    if (!selectedTable) {
      setisTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];

      const item = newCartItems[itemIndex]
      newCartItems[itemIndex] = {
        ...item,
        quantity: newCartItems[itemIndex].quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: IProduct) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {

        const newCartItems = [...prevState];
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }


      newCartItems[itemIndex] = {
        ...item,
        quantity: newCartItems[itemIndex].quantity - 1,
      };

      return newCartItems;
    });
  }
  return (
    <>
      <Container>

        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products} />
              </MenuContainer>
            )
              :
              (
                <CenteredContainer>
                  <Empty />
                  <Text color="#666" style={{ marginTop: 24 }}>
                    Nenhum produto encontrado
                  </Text>
                </CenteredContainer>
              )
            }
          </>
        )}

      </Container>



      <Footer>

        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setisTableModalVisible(true)}
              disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer >

      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setisTableModalVisible(false)}
        onSave={handleSaveTable}

      />
    </>
  );
}
