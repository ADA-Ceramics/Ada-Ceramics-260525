import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function SubCategoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* 左侧分类栏，和原站导航风格统一 */}
        <aside className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
          <ul className="space-y-3 text-sm">
            <li className="font-semibold text-gray-800 text-base">Wholesale Plates</li>
            <li className="pl-3 text-brand-600 font-medium">Dinner Plates</li>
            <li className="pl-3 text-gray-600 hover:text-brand-500">Dessert Plates</li>
            <li className="pl-3 text-gray-600 hover:text-brand-500">Soup Plates</li>
            <li className="font-semibold text-gray-800 text-base mt-5">Wholesale Bowls</li>
            <li className="pl-3 text-gray-600 hover:text-brand-500">Ramen Bowls</li>
            <li className="pl-3 text-gray-600 hover:text-brand-500">Soup Bowls</li>
          </ul>
        </aside>
        {/* 右侧产品区，卡片样式和一级页完全一致 */}
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-sm h-56 flex items-center justify-center text-gray-300 border border-gray-100">
              Product {item}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
