import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useCartStore } from "../stores/cartStore";
import { supabase } from "../libs/supabase";
import { useEffect } from "react";

function Header() {
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const { cartItemCount, loadCartItems, resetCart } = useCartStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    resetCart();
  };

  // 사용자 로그인 시 장바구니 데이터 로드
  useEffect(() => {
    if (user) {
      loadCartItems(user.id);
    }
  }, [user, loadCartItems]);

  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          My Community
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/posts">게시판</Link>
          </li>
          <li>
            <Link to="/products">상품</Link>
          </li>
          {user && (
            <li>
              <Link to="/cart" className="relative">
                <span className="text-xl">🛒</span>
                {cartItemCount > 0 && (
                  <span className="badge badge-primary badge-sm absolute -top-2 -right-2">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/profile">내 정보</Link>
              </li>
              <li>
                <a onClick={handleLogout}>로그아웃</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
