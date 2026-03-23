import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import CustomerSidebar, { CustomerSidebarItem } from './Sidebar/CustomerSidebar';
import './CustomerLayout.css';

interface CustomerLayoutProps {
  children: React.ReactNode;
  /**
   * Define o modo do layout:
   * 'guest'  : cliente público.
   * 'logged' : cliente delivery.
   */
  mode?: 'guest' | 'logged';
  /**
   * Quantidade de itens no carrinho — só usado no modo 'guest'.
   */
  cartCount?: number;
}

/** Itens exibidos para o cliente público — só o essencial */
const GUEST_ITEMS: CustomerSidebarItem[] = ['home', 'orders'];

/** Itens exibidos para o cliente logado — acesso completo */
const LOGGED_ITEMS: CustomerSidebarItem[] = ['home', 'orders', 'tables', 'profile', 'menu'];

const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  children,
  mode = 'logged',
  cartCount = 0,
}) => {
  const rightIcon = mode === 'guest' ? (
    <div className="cart-icon">
      <FaShoppingCart className="cart-icon__svg" />
      {cartCount > 0 && (
        <span className="cart-icon__badge">{cartCount}</span>
      )}
    </div>
  ) : (
    <img src="/icons/customer-avatar.png" alt="Perfil do cliente" />
  );

  const leftIcon = (
    <img src="/icons/restaurante-logo.png" alt="Logo do restaurante" />
  );

  const subtitle = mode === 'guest' ? 'MenuPoint' : '(Cliente)';
  const sidebarItems = mode === 'guest' ? GUEST_ITEMS : LOGGED_ITEMS;

  return (
    <div className="customer-layout">
      <Navbar subtitle={subtitle} rightIcon={rightIcon} leftIcon={leftIcon} />

      <div className="customer-layout__body">
        <CustomerSidebar items={sidebarItems} />
        <main className="customer-layout__content">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerLayout;