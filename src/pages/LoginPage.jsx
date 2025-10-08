import React, { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom'; // 👈 useSearchParams 제거
import { useNavigate } from 'react-router-dom'; 
import flexaiLogo from '../assets/flexai_logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams(); // 👈 제거
  // const promptSignup = searchParams.get('prompt') === 'signup'; // 👈 제거
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직은 나중에 구현
    console.log('Login attempt:', { email, password });
    // 임시로 대시보드로 이동
    navigate('/dashboard');
  };



  return (
    <div className="min-h-screen bg-white flex">
      {/* 왼쪽 로그인 폼 섹션 */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative overflow-hidden">
        {/* 메인 배경 로고 - 상단 로고를 크게 해서 배경으로 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <div className="flex items-center transform scale-[8] rotate-12">
            <img 
              src={flexaiLogo} 
              alt="Flex AI Background Logo" 
              className="w-16 h-16 mr-4"
            />
            <span className="text-4xl font-bold text-gray-900 whitespace-nowrap">Flex AI</span>
          </div>
        </div>
        
        {/* 로그인 폼 컨테이너 */}
        <div className="w-full max-w-md relative z-10">
          
          {/* 👇 수정: 경고 문구 상시 노출 (조건부 렌더링 제거) */}
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-sm font-semibold text-yellow-800">
              테스트 및 분석 결과를 저장하고 대시보드를 이용하려면 <span className="text-blue-600">로그인 또는 회원가입</span>이 필요합니다.
            </p>
          </div>
          {/* 👆 수정: 경고 문구 상시 노출 */}
          
          {/* Flex AI 로고 섹션 - 상단 작은 로고 */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <img 
                src={flexaiLogo} 
                alt="Flex AI Logo" 
                className="w-10 h-10 mr-3"
              />
              <span className="text-xl font-semibold text-gray-900">Flex AI</span>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              계정에 로그인하세요.
            </h1>
            <p className="text-gray-500 text-sm">
              이메일 주소와 비밀번호를 입력하여 로그인하세요.
            </p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 비밀번호 찾기 */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/password-reset')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-lg"
            >
              로그인
            </button>

            {/* 로그인 없이 테스트 시작하기 버튼 */}
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              로그인 없이 테스트 시작하기
            </button>

            {/* 회원가입 링크 */}
            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 오른쪽 브랜딩 섹션 */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* 단일 배경 로고 - 심플하게 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <img 
            src={flexaiLogo} 
            alt="Flex AI Background Logo" 
            className="w-80 h-80 object-contain transform rotate-12"
          />
        </div>
        
        <div className="flex flex-col justify-center items-center text-white p-12 relative z-10 w-full h-full">
          {/* 프로페셔널 대시보드 목업 */}
          <div className="mb-8 transform hover:scale-105 transition-all duration-500">
            {/* 메인 대시보드 컨테이너 */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 h-72 relative overflow-hidden">
              {/* 상단 네비게이션 바 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <img 
                    src={flexaiLogo} 
                    alt="Flex AI" 
                    className="w-6 h-6"
                  />
                  <span className="text-gray-800 font-bold text-sm">Flex AI Dashboard</span>
                </div>
              </div>
              
              {/* 메인 콘텐츠 영역 */}
              <div className="space-y-4">
                {/* KPI 카드들 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-3 border-l-4 border-green-500">
                    <div className="text-xs text-gray-600 mb-1">총 수익</div>
                    <div className="text-lg font-bold text-gray-800">₩2.4M</div>
                    <div className="text-xs text-green-600 font-medium">+12.5%</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <div className="text-xs text-gray-600 mb-1">투자</div>
                    <div className="text-lg font-bold text-gray-800">₩1.8M</div>
                    <div className="text-xs text-blue-600 font-medium">+8.3%</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                    <div className="text-xs text-gray-600 mb-1">ROI</div>
                    <div className="text-lg font-bold text-gray-800">33.3%</div>
                    <div className="text-xs text-purple-600 font-medium">+4.2%</div>
                  </div>
                </div>
                
                {/* 프로페셔널 차트 영역 */}
                <div className="bg-gray-50 rounded-lg p-4 h-32 relative">
                  {/* 차트 배경 그리드 */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 120">
                    {/* 그리드 라인들 */}
                    <defs>
                      <pattern id="grid" width="32" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 24" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Y축 라벨들 */}
                    <text x="10" y="20" fontSize="8" fill="#6b7280">100K</text>
                    <text x="10" y="44" fontSize="8" fill="#6b7280">75K</text>
                    <text x="10" y="68" fontSize="8" fill="#6b7280">50K</text>
                    <text x="10" y="92" fontSize="8" fill="#6b7280">25K</text>
                    
                    {/* 실제 차트 라인 - 매우 현실적인 데이터 */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="30,85 60,78 90,82 120,75 150,70 180,65 210,62 240,58 270,55 300,50"
                    />
                    
                    {/* 그라데이션 채우기 */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <polygon
                      fill="url(#chartGradient)"
                      points="30,85 60,78 90,82 120,75 150,70 180,65 210,62 240,58 270,55 300,50 300,120 30,120"
                    />
                    
                    {/* 데이터 포인트들 */}
                    <circle cx="60" cy="78" r="2" fill="#ffffff" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="120" cy="75" r="2" fill="#ffffff" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="180" cy="65" r="2" fill="#ffffff" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="240" cy="58" r="2" fill="#ffffff" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="300" cy="50" r="3" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                    
                    {/* X축 라벨들 */}
                    <text x="60" y="115" fontSize="7" fill="#6b7280" textAnchor="middle">1월</text>
                    <text x="120" y="115" fontSize="7" fill="#6b7280" textAnchor="middle">3월</text>
                    <text x="180" y="115" fontSize="7" fill="#6b7280" textAnchor="middle">5월</text>
                    <text x="240" y="115" fontSize="7" fill="#6b7280" textAnchor="middle">7월</text>
                    <text x="300" y="115" fontSize="7" fill="#6b7280" textAnchor="middle">9월</text>
                  </svg>
                  
                  {/* 차트 타이틀 */}
                  <div className="absolute top-2 left-2">
                    <span className="text-xs font-semibold text-gray-700">월별 수익 추이</span>
                  </div>
                  
                  {/* 범례 */}
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">수익</span>
                    </div>
                  </div>
                </div>
                
                {/* 추가 정보 바 */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">실시간 업데이트</span>
                  </div>
                  <span className="text-gray-500">마지막 업데이트: 방금 전</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 텍스트 콘텐츠 */}
          <div className="text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              포트폴리오 관리의
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                가장 스마트한 방법
              </span>
            </h2>
            <p className="text-blue-100 text-lg mb-4">
              AI 기반 투자 분석과 실시간 포트폴리오 관리
            </p>
            <p className="text-blue-200 text-sm">
              지금 Flex AI 커뮤니티에 참여하세요!
            </p>
          </div>
        </div>
        
        {/* 심플한 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-900/10"></div>
      </div>
    </div>
  );
};

export default LoginPage;