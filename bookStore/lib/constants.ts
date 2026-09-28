export type Screen = 'home' | 'categories' | 'cart' | 'account' | 'detail';

export type Book = {
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

export const COLORS = {
  navy: '#172554',
  indigo: '#4F46E5',
  pale: '#EEF2FF',
  text: '#172033',
  muted: '#6B7280',
  line: '#E5E7EB',
  red: '#E85D4A',
  background: '#F8FAFC',
} as const;

export const CATEGORIES = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Tâm lý',
] as const;

export const CATEGORY_FILTERS = ['Tất cả', ...CATEGORIES];

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 89000,
    oldPrice: 112000,
    discount: '-20%',
    category: 'Kỹ năng sống',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
    description:
      'Cuốn sách kinh điển về nghệ thuật giao tiếp và cách tạo dựng những mối quan hệ tích cực. Những nguyên tắc gần gũi, dễ áp dụng giúp bạn hiểu người khác và trở nên tự tin hơn trong cuộc sống.',
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 79000,
    discount: 'Mới',
    category: 'Văn học',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
    description:
      'Hành trình đầy cảm hứng của Santiago đi tìm kho báu, cũng là hành trình lắng nghe tiếng gọi của trái tim và theo đuổi ước mơ của chính mình.',
  },
  {
    id: 3,
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 68000,
    category: 'Kỹ năng sống',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80',
    description:
      'Một người bạn đồng hành cho những năm tháng tuổi trẻ, gợi mở về học tập, trải nghiệm và cách tìm ra con đường phù hợp với bản thân.',
  },
  {
    id: 4,
    title: 'Tư Duy Nhanh Và Chậm',
    author: 'Daniel Kahneman',
    price: 159000,
    oldPrice: 189000,
    discount: '-16%',
    category: 'Tâm lý',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=500&q=80',
    description:
      'Khám phá hai hệ thống tư duy chi phối những phán đoán và quyết định thường ngày của con người, từ trực giác đến suy luận có chủ đích.',
  },
  {
    id: 5,
    title: 'Cây Cam Ngọt Của Tôi',
    author: 'J. M. de Vasconcelos',
    price: 72000,
    category: 'Văn học',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80',
    description:
      'Câu chuyện trong trẻo và xúc động về tuổi thơ, tình yêu thương và khả năng tìm thấy ánh sáng trong những điều giản dị.',
  },
  {
    id: 6,
    title: 'Dạy Con Làm Giàu',
    author: 'Robert T. Kiyosaki',
    price: 105000,
    discount: 'Bán chạy',
    category: 'Kinh tế',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80',
    description:
      'Những bài học nền tảng về tư duy tài chính cá nhân, tài sản và cách nhìn khác về việc làm giàu bền vững.',
  },
];

export const money = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

export function filterBooks(category: string): Book[] {
  return category === 'Tất cả' ? BOOKS : BOOKS.filter((book) => book.category === category);
}
