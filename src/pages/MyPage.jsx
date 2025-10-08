import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoChevronForward } from "react-icons/io5";
import BottomNavbar from "../components/common/BottomNavbar";
import { useAuth } from "../contexts/AuthContext";

// Style Objects
const sectionContainerStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  overflow: 'hidden',
};

const sectionTitleStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#6B7280',
  padding: '12px 16px 4px 16px',
  background: '#f9fafb',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '16px',
  background: '#fff',
  transition: 'background-color 0.2s',
};

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid #f3f4f6',
  margin: '0 16px',
};

const MyPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [smsOption, setSmsOption] = useState("direct");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editPw, setEditPw] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const API_BASE_URL = "https://buy-or-bye-backend.onrender.com";

  const validatePw = (pw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    return regex.test(pw);
  };

  // 수정된 로그인 함수
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setLoginError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login?email=${encodeURIComponent(loginEmail)}&password=${encodeURIComponent(loginPassword)}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        login(data.access_token, {email: loginEmail});
        setLoginEmail("");
        setLoginPassword("");

        // 로그인 성공 시 바로 모달 닫기
        setShowLoginModal(false);

      } else {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handlePwChange = (e) => {
    const value = e.target.value;
    setNewPw(value);
    if (!validatePw(value)) {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    } else {
      setPwError("");
    }
  };

  const handlePwSubmit = () => {
    if (validatePw(newPw)) {
      // Here you should call an API to update the password
      // setPassword(newPw); 
      setEditPw(false);
      setNewPw("");
      setPwError("");
      alert("비밀번호가 변경되었습니다.");
    } else {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    }
  };

  // 수정된 로그아웃 함수
  const handleLogout = () => {
    logout();
    setShowLoginModal(false);
    navigate('/logout-complete');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", paddingBottom: 80 }}>
      <header style={{ width: "100%", maxWidth: 768, margin: "0 auto", padding: "24px 16px", textAlign: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 700 }}>내 정보</span>
      </header>
      <main style={{ width: "100%", maxWidth: 768, margin: "0 auto", padding: '0 16px', display: "flex", flexDirection: "column", gap: 24 }}>
        
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>계정</h3>
          <div style={rowStyle} onClick={handleLogout}>
            <span>로그인 정보</span>
            <span style={{ fontWeight: 500, color: '#6B7280' }}>
              로그아웃
            </span>
          </div>
        </div>

        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>앱 설정</h3>
          <div style={rowStyle} onClick={() => setShowPopup(true)}>
            <span>문자 인식 기능 사용하기</span>
            <input type="checkbox" checked={smsOption !== "disable"} onChange={() => setSmsOption(smsOption === "disable" ? "direct" : "disable")} />
          </div>
          <hr style={dividerStyle} />
          <div style={rowStyle} onClick={() => navigate("/error-report")}>
            <span>오류 신고</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>
        
        {/* 👇 추가된 섹션: 테스트 다시 하기 */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>소비 성향 테스트</h3>
          <div style={rowStyle} onClick={() => navigate("/quiz")}>
            <span>MBTI 테스트 다시 하기</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>
        {/* 👆 추가된 섹션 */}

        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>데이터</h3>
          <div style={rowStyle} onClick={() => navigate("/confirm-action?type=reset")}>
            <span>데이터 초기화</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>

        <div style={sectionContainerStyle}>
           <div style={rowStyle}>
            <span>프로그램 버전</span>
            <span style={{ fontWeight: 500, color: '#6B7280' }}>v1.6.0</span>
          </div>
        </div>

        <div style={{...sectionContainerStyle, background: 'transparent', boxShadow: 'none'}}>
          <div style={{ ...rowStyle, justifyContent: 'center', color: "#EF4444", fontWeight: 500, background: '#fff' }} onClick={() => navigate("/confirm-action?type=withdraw")}>
            서비스 탈퇴하기
          </div>
        </div>

      </main>
      
      {showLoginModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleCloseLoginModal}>
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", padding: "32px 28px 28px 28px", minWidth: 320, maxWidth: 400, width: "90%", textAlign: "center", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseLoginModal} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 26, color: "#888", cursor: "pointer", zIndex: 10 }} aria-label="닫기"><IoClose /></button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>{isLoggedIn ? '로그인 정보' : '로그인'}</h3>
            {isLoggedIn && user ? (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>이메일 주소</div>
                  <div style={{ fontSize: 16, fontWeight: 600, background: "#f5f5f5", borderRadius: 8, padding: "10px 12px", marginBottom: 10, textAlign: "left" }}>{user.email}</div>
                  <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>비밀번호</div>
                  <div style={{ display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
                    {!editPw ? (
                      <>
                        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 2 }}>{"*".repeat(8)}</span>
                        <button style={{ marginLeft: 12, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", fontWeight: 600 }} onClick={() => setEditPw(true)}>수정하기</button>
                      </>
                    ) : (
                      <>
                        <input type="password" value={newPw} onChange={handlePwChange} placeholder="새 비밀번호 입력" style={{ fontSize: 15, padding: "8px", borderRadius: 8, border: "1px solid #ddd", width: "60%", marginRight: 8 }} maxLength={15} />
                        <button style={{ background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", fontWeight: 600 }} onClick={handlePwSubmit}>저장</button>
                        <button style={{ marginLeft: 6, background: "#eee", color: "#888", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 14, cursor: "pointer", fontWeight: 500 }} onClick={() => { setEditPw(false); setNewPw(""); setPwError(""); }}>취소</button>
                      </>
                    )}
                  </div>
                  {pwError && (<div style={{ color: "#d32f2f", fontSize: 13, marginBottom: 8 }}>{pwError}</div>)}
                </div>
                <button style={{ width: "100%", background: "#EF4444", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", marginTop: 8 }} onClick={handleLogout}>로그아웃</button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>이메일 주소</div>
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="이메일을 입력하세요" style={{ width: "100%", fontSize: 16, padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>비밀번호</div>
                  <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="비밀번호를 입력하세요" style={{ width: "100%", fontSize: 16, padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, outline: "none", boxSizing: "border-box" }} onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }} />
                </div>
                {loginError && (<div style={{ color: "#ef4444", fontSize: 14, marginBottom: 16, textAlign: "left" }}>{loginError}</div>)}
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  <button onClick={handleCloseLoginModal} style={{ flex: 1, background: "#f5f5f5", color: "#666", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>취소</button>
                  <button onClick={handleLogin} style={{ flex: 1, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>로그인</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowPopup(false)}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #aaa", padding: 24, minWidth: 280, maxWidth: 340 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, marginBottom: 16 }}>인식된 문자 내역 등록방법</h3>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="direct" name="regtype" checked={smsOption === "direct"} onChange={() => setSmsOption("direct")} />
              <label htmlFor="direct" style={{ marginLeft: 8 }}><b>바로등록</b><br />문자 인식과 동시에 가계부에 입력됩니다.</label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="select" name="regtype" checked={smsOption === "select"} onChange={() => setSmsOption("select")} />
              <label htmlFor="select" style={{ marginLeft: 8 }}><b>확인 후 선택등록</b><br />앱이 인식한 문자 목록을 확인하고, 원하는 내역만 선택하여 등록할 수 있습니다.</label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="disable" name="regtype" checked={smsOption === "disable"} onChange={() => setSmsOption("disable")} />
              <label htmlFor="disable" style={{ marginLeft: 8 }}><b>사용하지 않기</b><br />문자 인식 기능을 사용하지 않습니다.</label>
            </div>
            <button style={{ marginTop: 16, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 15, cursor: "pointer", width: "100%" }} onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
      <BottomNavbar active="mypage" />
    </div>
  );
}

export default MyPage;