import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/layout/panel';
import PurchaseList from '../component/purchase/purchase_list';
import ProductList from '../component/master/product/product_list';
import SupplierList from '../component/master/supplier/supplier_list';
import HousePlanList from '../component/master/houseplan/plan_list';
import Vender from '../component/master/vender/vender_list';
import List from '../component/master/listitem/item_list';
import { removeAuthCookie } from '../authen/cookie';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('adminActiveTab');
        return savedTab || 'purchase';
    });

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    const handleTabChange = (tab) => {
        console.log('Changing to tab:', tab);
        setActiveTab(tab);
    };

    const handleLogout = () => {
        removeAuthCookie();
        localStorage.removeItem('adminActiveTab');
        navigate('/login', { replace: true });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'purchase':
                return <PurchaseList />;
            case 'hiring':
                return <div>Coming Soon ...</div>;
            case 'products':
                return <ProductList />;
            case 'lists':
                return <List />;
            case 'suppliers':
                return <SupplierList />;
            case 'vendors':
                return <Vender />;
            case 'house-plans':
                return <HousePlanList />;
            default:
                return <div>เลือกเมนูที่ต้องการ</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onLogout={handleLogout}
            />

            <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
                <header className="bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`lg:hidden ${isSidebarOpen ? 'hidden' : ''}`}
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center space-x-4 ml-auto">
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    A
                                </div>
                                <span className="font-medium">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;