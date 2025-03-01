
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", path: "/category/electronics" },
  { name: "Fashion", path: "/category/fashion" },
  { name: "Home & Furniture", path: "/category/home" },
  { name: "Appliances", path: "/category/appliances" },
  { name: "Beauty & Personal Care", path: "/category/beauty" },
  { name: "Toys & Baby", path: "/category/toys" },
  { name: "Mobiles", path: "/category/mobiles" },
  { name: "Books", path: "/category/books" },
  { name: "Sports", path: "/category/sports" },
];

export const CategoriesTab = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-wrap py-2 px-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-800 hover:text-flipkart-blue hover:bg-gray-50 rounded transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
