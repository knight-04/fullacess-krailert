import React, { useState } from 'react';
import { 
    TagIcon, 
    Users, 
    LogOut, 
    X, 
    ShoppingCart, 
    Database,
    ChevronDown,
    ChevronRight,
    FileText,
    Package,
    Users2,
    Home
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onLogout, activeTab, onTabChange }) => {
    const [expandedMenus, setExpandedMenus] = useState({
        accounting: false,
        master: false
    });

    const toggleMenu = (menu) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const MenuItem = ({ text, icon: Icon, onClick, isActive, hasSubmenu, isExpanded }) => (
        <button
            onClick={onClick}
            className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 w-full ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
        >
            <div className="flex items-center space-x-3">
                <Icon size={20} />
                <span>{text}</span>
            </div>
            {hasSubmenu && (
                isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            )}
        </button>
    );

    const SubMenuItem = ({ text, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 p-2 pl-11 rounded-lg hover:bg-gray-100 w-full ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
        >
            <span className="text-sm">{text}</span>
        </button>
    );

    return (
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 w-64`}>
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Krailert Management</h2>
                <button
                    onClick={onClose}
                    className="lg:hidden"
                >
                    <X size={24} />
                </button>
            </div>

            <nav className="p-4 space-y-2">
                 {/* MASTER Section */}
                 <div className="space-y-1">
                    <MenuItem
                        text="MASTER"
                        icon={Database}
                        onClick={() => toggleMenu('master')}
                        hasSubmenu={true}
                        isExpanded={expandedMenus.master}
                    />
                    {expandedMenus.master && (
                        <div className="ml-2 space-y-1">
                            <SubMenuItem
                                text="สินค้า"
                                isActive={activeTab === 'products'}
                                onClick={() => onTabChange('products')}
                            />
                             <SubMenuItem
                                text="รายการ"
                                isActive={activeTab === 'lists'}
                                onClick={() => onTabChange('lists')}
                            />
                            <SubMenuItem
                                text="Supplier"
                                isActive={activeTab === 'suppliers'}
                                onClick={() => onTabChange('suppliers')}
                            />
                            <SubMenuItem
                                text="Vendor"
                                isActive={activeTab === 'vendors'}
                                onClick={() => onTabChange('vendors')}
                            />
                            <SubMenuItem
                                text="แปลนบ้าน"
                                isActive={activeTab === 'house-plans'}
                                onClick={() => onTabChange('house-plans')}
                            />
                        </div>
                    )}
                </div>
                
                {/* บัญชี Section */}
                <div className="space-y-1">
                    <MenuItem
                        text="บัญชี"
                        icon={FileText}
                        onClick={() => toggleMenu('accounting')}
                        hasSubmenu={true}
                        isExpanded={expandedMenus.accounting}
                    />
                    {expandedMenus.accounting && (
                        <div className="ml-2 space-y-1">
                            <SubMenuItem
                                text="จัดการใบสั่งซื้อ"
                                isActive={activeTab === 'purchase'}
                                onClick={() => onTabChange('purchase')}
                            />
                            <SubMenuItem
                                text="จัดการใบจัดจ้าง"
                                isActive={activeTab === 'hiring'}
                                onClick={() => onTabChange('hiring')}
                            />
                        </div>
                    )}
                </div>
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t">
                <button
                    onClick={onLogout}
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full p-3 rounded-lg hover:bg-gray-100"
                >
                    <LogOut size={20} />
                    <span>ออกจากระบบ</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;