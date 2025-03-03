
import React from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import AdminCard from "@/components/ecommerce/AdminCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, ShoppingBag, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const monthlyData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 2000 },
  { name: "Sep", sales: 2500 },
  { name: "Oct", sales: 3800 },
  { name: "Nov", sales: 4300 },
  { name: "Dec", sales: 5200 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 20 },
  { name: "Books", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button onClick={() => navigate("/admin/orders")}>
              Manage Orders
            </Button>
            <Button onClick={() => navigate("/admin/products")}>
              Manage Products
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <AdminCard title="Total Revenue" className="bg-white">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{formatCurrency(128560)}</span>
              <div className="flex items-center mt-2 text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">12% from last month</span>
              </div>
            </div>
          </AdminCard>
          
          <AdminCard title="Total Orders" className="bg-white">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">324</span>
              <div className="flex items-center mt-2 text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">8% from last month</span>
              </div>
            </div>
          </AdminCard>
          
          <AdminCard title="Average Order Value" className="bg-white">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{formatCurrency(3580)}</span>
              <div className="flex items-center mt-2 text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-sm">3% from last month</span>
              </div>
            </div>
          </AdminCard>
          
          <AdminCard title="Active Customers" className="bg-white">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">215</span>
              <div className="flex items-center mt-2 text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">18% from last month</span>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <AdminCard title="Monthly Sales" className="lg:col-span-2 bg-white">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>

          <AdminCard title="Sales by Category" className="bg-white">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>
        </div>

        {/* Recent Orders Preview */}
        <AdminCard title="Recent Orders" className="bg-white mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ORD-{2023000 + idx}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(2000 + idx * 1000)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${idx % 3 === 0 ? 'bg-green-100 text-green-800' : idx % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {idx % 3 === 0 ? 'Delivered' : idx % 3 === 1 ? 'Processing' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="text" onClick={() => navigate("/admin/orders")}>
              View All Orders
            </Button>
          </div>
        </AdminCard>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
