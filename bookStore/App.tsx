import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';
import CategoryChips from './components/CategoryChips';
import BookGrid from './components/BookGrid';
import Badge from './components/Badge';
import FloatingCart from './components/FloatingCart';
import CartItem from './components/CartItem';
import TabBar from './components/TabBar';

type Screen = 'home' | 'categories' | 'cart' | 'account' | 'detail';

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  category: string;
  description: string;
};

const CATEGORIES = ['Văn học', 'Kinh tế', 'Thiếu nhi', 'Kỹ năng sống', 'Truyện tranh', 'Tâm lý'];

const BOOKS: Book[] = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 89000, oldPrice: 112000, discount: '-20%', category: 'Kỹ năng sống', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80', description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và cách tạo dựng những mối quan hệ tích cực. Những nguyên tắc gần gũi, dễ áp dụng giúp bạn hiểu người khác và trở nên tự tin hơn trong cuộc sống.' },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, discount: 'Mới', category: 'Văn học', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80', description: 'Hành trình đầy cảm hứng của Santiago đi tìm kho báu, cũng là hành trình lắng nghe tiếng gọi của trái tim và theo đuổi ước mơ của chính mình.' },
  { id: 3, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: 68000, category: 'Kỹ năng sống', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80', description: 'Một người bạn đồng hành cho những năm tháng tuổi trẻ, gợi mở về học tập, trải nghiệm và cách tìm ra con đường phù hợp với bản thân.' },
  { id: 4, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: 159000, oldPrice: 189000, discount: '-16%', category: 'Tâm lý', image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=500&q=80', description: 'Khám phá hai hệ thống tư duy chi phối những phán đoán và quyết định thường ngày của con người, từ trực giác đến suy luận có chủ đích.' },
  { id: 5, title: 'Cây Cam Ngọt Của Tôi', author: 'J. M. de Vasconcelos', price: 72000, category: 'Văn học', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80', description: 'Câu chuyện trong trẻo và xúc động về tuổi thơ, tình yêu thương và khả năng tìm thấy ánh sáng trong những điều giản dị.' },
  { id: 6, title: 'Dạy Con Làm Giàu', author: 'Robert T. Kiyosaki', price: 105000, discount: 'Bán chạy', category: 'Kinh tế', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80', description: 'Những bài học nền tảng về tư duy tài chính cá nhân, tài sản và cách nhìn khác về việc làm giàu bền vững.' },
];

const money = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 2: 1 });
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartItems = useMemo(() => BOOKS.filter((book) => cart[book.id]), [cart]);
  const cartTotal = cartItems.reduce((total, book) => total + book.price * cart[book.id], 0);

  const addToCart = (book: Book) => setCart((current) => ({ ...current, [book.id]: (current[book.id] ?? 0) + 1 }));
  const changeQuantity = (id: number, delta: number) => setCart((current) => {
    const next = Math.max(0, (current[id] ?? 0) + delta);
    const updated = { ...current };
    if (next === 0) delete updated[id]; else updated[id] = next;
    return updated;
  });
  const openBook = (book: Book) => { setSelectedBook(book); setScreen('detail'); };

  const renderContent = () => {
    switch (screen) {
      case 'detail': return <DetailScreen book={selectedBook} onBack={() => setScreen('home')} onAdd={() => addToCart(selectedBook)} />;
      case 'cart': return <CartScreen items={cartItems} cart={cart} total={cartTotal} onChangeQuantity={changeQuantity} />;
      case 'categories': return <CategoriesScreen selected={selectedCategory} onSelect={setSelectedCategory} onBookPress={openBook} />;
      case 'account': return <AccountScreen />;
      default: return <HomeScreen selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} onBookPress={openBook} onCartPress={() => setScreen('cart')} cartCount={cartCount} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <View style={styles.app}>
        {renderContent()}
        {screen !== 'detail' && <TabBar active={screen} onChange={setScreen} cartCount={cartCount} />}
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ selectedCategory, onSelectCategory, onBookPress, onCartPress, cartCount }: { selectedCategory: string; onSelectCategory: (category: string) => void; onBookPress: (book: Book) => void; onCartPress: () => void; cartCount: number }) {
  const books = selectedCategory === 'Tất cả' ? BOOKS : BOOKS.filter((book) => book.category === selectedCategory);
  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Khám phá sách hay mỗi ngày</Text>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips categories={['Tất cả', ...CATEGORIES]} selected={selectedCategory} onSelect={onSelectCategory} />
        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Sách nổi bật</Text><Text style={styles.seeAll}>Xem tất cả</Text></View>
        <BookGrid books={books} onPress={onBookPress} money={money} />
      </ScrollView>
      <FloatingCart count={cartCount} onPress={onCartPress} />
    </View>
  );
}

function CategoriesScreen({ selected, onSelect, onBookPress }: { selected: string; onSelect: (category: string) => void; onBookPress: (book: Book) => void }) {
  const books = selected === 'Tất cả' ? BOOKS : BOOKS.filter((book) => book.category === selected);
  return (
    <View style={styles.screen}>
      <Header title="Danh mục" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.categoriesContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenIntro}>Chọn thể loại bạn yêu thích</Text>
        <CategoryChips categories={['Tất cả', ...CATEGORIES]} selected={selected} onSelect={onSelect} />
        <Text style={styles.sectionTitle}>{selected}</Text>
        <BookGrid books={books} onPress={onBookPress} money={money} />
      </ScrollView>
    </View>
  );
}

function DetailScreen({ book, onBack, onAdd }: { book: Book; onBack: () => void; onAdd: () => void }) {
  return (
    <View style={styles.screen}>
      <Header title="Chi tiết sách" showBack onBack={onBack} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={styles.detailImageWrap}>
          <Image source={{ uri: book.image }} style={styles.detailImage} />
          {book.discount && <Badge label={book.discount} />}
        </View>
        <Text style={styles.detailTitle}>{book.title}</Text>
        <Text style={styles.detailAuthor}>{book.author}</Text>
        <View style={styles.detailPriceRow}><Text style={styles.detailPrice}>{money(book.price)}</Text>{book.oldPrice && <Text style={styles.oldPrice}>{money(book.oldPrice)}</Text>}</View>
        <View style={styles.divider} />
        <Text style={styles.descriptionHeading}>Giới thiệu sách</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>
      <View style={styles.addBar}>
        <View>
          <Text style={styles.addLabel}>Tạm tính</Text>
          <Text style={styles.addPrice}>{money(book.price)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={onAdd}><Ionicons name="cart-outline" size={20} color="#fff" /><Text style={styles.addButtonText}>Thêm vào giỏ</Text></Pressable>
      </View>
    </View>
  );
}

function CartScreen({ items, cart, total, onChangeQuantity }: { items: Book[]; cart: Record<number, number>; total: number; onChangeQuantity: (id: number, delta: number) => void }) {
  return (
    <View style={styles.screen}>
      <Header title="Giỏ hàng" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.cartContent} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={54} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
            <Text style={styles.emptyText}>Hãy thêm vài cuốn sách bạn yêu thích nhé.</Text>
          </View>
        ) : (
          items.map((book) => <CartItem key={book.id} book={book} quantity={cart[book.id]} onChange={onChangeQuantity} money={money} />)
        )}
      </ScrollView>
      <View style={styles.checkoutBar}>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Tổng tiền</Text><Text style={styles.totalPrice}>{money(total)}</Text></View>
        <Pressable style={styles.checkoutButton}><Text style={styles.checkoutText}>Thanh toán</Text><Ionicons name="arrow-forward" size={20} color="#fff" /></Pressable>
      </View>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.screen}>
      <Header title="Tài khoản" />
      <View style={styles.accountContent}>
        <View style={styles.avatar}><Ionicons name="person" size={42} color={COLORS.indigo} /></View>
        <Text style={styles.accountName}>Bạn đọc BookStore</Text>
        <Text style={styles.accountEmail}>reader@bookstore.vn</Text>
        {['Đơn hàng của tôi', 'Sách yêu thích', 'Cài đặt tài khoản'].map((item, index) => (
          <View style={styles.accountRow} key={item}>
            <Ionicons name={index === 0 ? 'receipt-outline' : index === 1 ? 'heart-outline' : 'settings-outline'} size={22} color={COLORS.indigo} />
            <Text style={styles.accountRowText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </View>
        ))}
      </View>
    </View>
  );
}


const COLORS = {
  navy: '#172554',
  indigo: '#4F46E5',
  pale: '#EEF2FF',
  text: '#172033',
  muted: '#6B7280',
  line: '#E5E7EB',
  red: '#E85D4A',
  background: '#F8FAFC',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navy },
  app: { flex: 1, backgroundColor: COLORS.background },
  screen: { flex: 1, position: 'relative' },
  scroll: { flex: 1 },
  homeContent: { padding: 16, paddingBottom: 110 },
  categoriesContent: { padding: 16, paddingBottom: 100 },
  welcome: { fontSize: 15, color: COLORS.muted, marginBottom: 20 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 12 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  seeAll: { color: COLORS.indigo, fontWeight: '600', marginBottom: 12 },
  screenIntro: { fontSize: 15, color: COLORS.muted, marginBottom: 14 },
  detailContent: { padding: 20, paddingBottom: 30 },
  detailImageWrap: {
    position: 'relative',
    alignSelf: 'center',
    width: '62%',
    aspectRatio: 0.68,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  detailImage: { width: '100%', height: '100%' },
  detailTitle: { color: COLORS.text, fontSize: 25, fontWeight: '800', lineHeight: 32 },
  detailAuthor: { marginTop: 6, color: COLORS.muted, fontSize: 16 },
  detailPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  detailPrice: { color: COLORS.red, fontSize: 23, fontWeight: '800' },
  oldPrice: { color: COLORS.muted, fontSize: 15, textDecorationLine: 'line-through' },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 22 },
  descriptionHeading: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  description: { color: '#4B5563', fontSize: 15, lineHeight: 23, marginBottom: 13 },
  addBar: {
    padding: 14,
    borderTopWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addLabel: { fontSize: 12, color: COLORS.muted },
  addPrice: { marginTop: 2, color: COLORS.red, fontSize: 18, fontWeight: '800' },
  addButton: {
    borderRadius: 10,
    backgroundColor: COLORS.indigo,
    paddingHorizontal: 16,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  addButtonText: { color: '#fff', fontWeight: '800' },
  cartContent: { padding: 16, paddingBottom: 16, gap: 12 },
  checkoutBar: { backgroundColor: '#fff', borderTopWidth: 1, borderColor: COLORS.line, padding: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 },
  totalLabel: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  totalPrice: { color: COLORS.red, fontSize: 21, fontWeight: '800' },
  checkoutButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.indigo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkoutText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 90 },
  emptyTitle: { marginTop: 12, color: COLORS.text, fontSize: 19, fontWeight: '800' },
  emptyText: { marginTop: 6, color: COLORS.muted, fontSize: 14, textAlign: 'center' },
  accountContent: { padding: 20, alignItems: 'center' },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pale,
    marginTop: 12,
  },
  accountName: { marginTop: 12, color: COLORS.text, fontSize: 20, fontWeight: '800' },
  accountEmail: { marginTop: 4, color: COLORS.muted, fontSize: 14, marginBottom: 27 },
  accountRow: {
    width: '100%',
    height: 58,
    borderBottomWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountRowText: { flex: 1, color: COLORS.text, fontSize: 16, fontWeight: '600' },
});
