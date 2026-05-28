export default function SubCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex gap-8">
        <aside className="w-64 flex-shrink-0 bg-white p-5 rounded-lg shadow-sm">
          <ul className="space-y-3 text-sm">
            <li className="font-semibold text-gray-800 text-base">Wholesale Plates</li>
            <li className="pl-3 text-amber-700 font-medium">Dinner Plates</li>
            <li className="pl-3 text-gray-600">Dessert Plates</li>
            <li className="pl-3 text-gray-600">Soup Plates</li>
            <li className="font-semibold text-gray-800 text-base mt-5">Wholesale Bowls</li>
            <li className="pl-3 text-gray-600">Ramen Bowls</li>
            <li className="pl-3 text-gray-600">Soup Bowls</li>
          </ul>
        </aside>
        <div className="flex-grow grid grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-sm h-56 flex items-center justify-center text-gray-300 border border-gray-100">
              Product {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}