import "./index.css";
import Layout from "./layouts/Layout";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./libs/supabase";
import { useUserStore } from "./stores/userStore";

function App() {
  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        useUserStore.getState().setUser(session.user);
      }
    });

    // 인증 상태 변화 감지
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        useUserStore.getState().setUser(session.user);
      } else {
        useUserStore.getState().clearUser();
      }
    });
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
