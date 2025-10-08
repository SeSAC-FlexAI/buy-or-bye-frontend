import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Navigate 추가
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import MyPage from './pages/MyPage';
import FixedExpense from './pages/FixedExpense'; 
import LedgerPage from './pages/LedgerPage';
import AnalysisPage from './pages/AnalysisPage';
import ErrorReportPage from './pages/ErrorReportPage';
import ConfirmActionPage from './pages/ConfirmActionPage';
import GoalEditPage from './pages/GoalEditPage';
import LoginPage from './pages/LoginPage';
import SessionExpiredPage from './pages/SessionExpiredPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import LogoutCompletePage from './pages/LogoutCompletePage';
import { useAuth } from './contexts/AuthContext'; // useAuth 추가

// 1. 로그인 인증이 필요한 라우트 보호 컴포넌트 추가
const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 2. 앱의 기본 경로(/)로 접속 시 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 인증 불필요 경로 */}
        <Route path="/home" element={<HomePage />} /> {/* 기존 홈 페이지는 /home으로 이동 */}
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        
        {/* 인증 및 유틸리티 경로 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/logout-complete" element={<LogoutCompletePage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />
        <Route path="/error-report" element={<ErrorReportPage />} />
        <Route path="/confirm-action" element={<ConfirmActionPage />} />
        
        {/* 3. 인증 필요 경로: RequireAuth로 보호 */}
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} /> 
        <Route path="/mypage" element={<RequireAuth><MyPage/></RequireAuth>} />
        <Route path="/ledger" element={<RequireAuth><LedgerPage /></RequireAuth>} />
        <Route path="/chatbot" element={<RequireAuth><ChatbotPage /></RequireAuth>} />
        <Route path="/fixed-expense" element={<RequireAuth><FixedExpense /></RequireAuth>} />
        <Route path="/goal-edit" element={<RequireAuth><GoalEditPage /></RequireAuth>} />

        {/* 404 페이지 */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;