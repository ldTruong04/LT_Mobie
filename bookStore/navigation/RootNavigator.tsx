import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { useAuth } from '../hooks/useAuth';
import { useBookstore } from '../hooks/useBookstore';
import { useCart } from '../hooks/useCart';
import TabBar from '../components/TabBar';
import { Book } from '../lib/constants';
import { CartStackParamList, HomeStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();

function HomeTabScreen() {
  const navigation = useNavigation<any>();
  const { selectedCategory, setSelectedCategory } = useBookstore();
  const { totalQuantity } = useCart();

  const handleBookPress = (book: Book) => {
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  return (
    <HomeScreen
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      onBookPress={handleBookPress}
      onCartPress={() => navigation.navigate('CartTab')}
      cartCount={totalQuantity}
    />
  );
}

function CategoriesTabScreen() {
  const navigation = useNavigation<any>();
  const { selectedCategory, setSelectedCategory } = useBookstore();

  const handleBookPress = (book: Book) => {
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  return (
    <CategoriesScreen
      selected={selectedCategory}
      onSelect={setSelectedCategory}
      onBookPress={handleBookPress}
      onCartPress={() => navigation.navigate('CartTab')}
    />
  );
}

function CartTabScreen() {
  const navigation = useNavigation<any>();
  const { cartEntries, changeQuantity, totalPrice } = useCart();

  const items = cartEntries.map((entry) => entry.book);
  const cart = cartEntries.reduce<Record<number, number>>((accumulator, entry) => {
    accumulator[entry.book.id] = entry.quantity;
    return accumulator;
  }, {});

  return (
    <CartScreen
      items={items}
      cart={cart}
      total={totalPrice}
      onChangeQuantity={changeQuantity}
      onCheckout={() => navigation.navigate('Checkout', { total: totalPrice })}
    />
  );
}

function AccountTabScreen() {
  const navigation = useNavigation<any>();
  const { isLoggedIn, user, signInMock, signOut } = useAuth();

  return (
    <AccountScreen
      onCartPress={() => navigation.navigate('CartTab')}
      isLoggedIn={isLoggedIn}
      userName={user?.name}
      userEmail={user?.email}
      onLoginPress={signInMock}
      onLogoutPress={signOut}
    />
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeTabScreen} />
      <HomeStack.Screen name="BookDetail" component={BookDetailScreen} />
    </HomeStack.Navigator>
  );
}

function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartTabScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Trang chủ' }} />
      <Tab.Screen name="CategoriesTab" component={CategoriesTabScreen} options={{ title: 'Danh mục' }} />
      <Tab.Screen name="CartTab" component={CartStackNavigator} options={{ title: 'Giỏ hàng' }} />
      <Tab.Screen name="AccountTab" component={AccountTabScreen} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}