# 진격의 거인 MBTI 테스트

진격의 거인 캐릭터와 매칭되는 MBTI 성격 테스트 웹 애플리케이션입니다.

## 기능

- 12개의 MBTI 질문을 통한 성격 유형 분석
- 16가지 MBTI 유형별 진격의 거인 캐릭터 매칭
- 카카오톡 공유 기능
- 링크 복사 및 네이티브 공유 기능
- 반응형 디자인 (모바일/태블릿/데스크톱)
- URL 파라미터를 통한 결과 공유

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- Kakao SDK

## 시작하기

### 필수 요구사항

- Node.js 16+ 
- npm 또는 yarn

### 설치

1. 프로젝트 클론
```bash
git clone https://github.com/KNOCKYONG/TitanMBTI.git
cd TitanMBTI/titan-mbti
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
```

`.env` 파일을 열고 카카오 앱 키를 입력하세요:
```
VITE_KAKAO_APP_KEY=your_kakao_app_key_here
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/         # React 컴포넌트
│   ├── StartScreen.js
│   ├── QuestionCard.js
│   ├── ProgressBar.js
│   ├── ResultScreen.js
│   └── ShareButtons.js
├── data/              # 정적 데이터
│   ├── questions.js   # MBTI 질문 데이터
│   └── characters.js  # 캐릭터 매칭 데이터
├── utils/             # 유틸리티 함수
│   ├── calculateMBTI.js
│   └── shareUtils.js
└── App.jsx           # 메인 앱 컴포넌트
```

## 배포

Vercel, Netlify 등의 정적 호스팅 서비스를 사용하여 배포할 수 있습니다.

### Vercel 배포 예시

```bash
npm install -g vercel
vercel
```

## 라이센스

MIT License