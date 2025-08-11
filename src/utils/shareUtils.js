export const initKakao = (appKey) => {
  console.log('initKakao 호출됨', {
    hasKakao: !!window.Kakao,
    isInitialized: window.Kakao?.isInitialized?.(),
    appKeyProvided: !!appKey,
    appKeyLength: appKey?.length
  });

  if (!window.Kakao) {
    console.error('Kakao SDK가 로드되지 않았습니다. index.html의 스크립트 태그를 확인하세요.');
    return;
  }

  if (!appKey) {
    console.error('카카오 앱 키가 제공되지 않았습니다.');
    return;
  }

  try {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
      console.log('Kakao SDK 초기화 완료', {
        isInitialized: window.Kakao.isInitialized(),
        version: window.Kakao.VERSION
      });
    } else {
      console.log('Kakao SDK가 이미 초기화되어 있습니다.');
    }
  } catch (error) {
    console.error('Kakao SDK 초기화 실패:', error);
  }
};

export const shareKakao = (mbtiType, character) => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    alert('카카오 SDK가 초기화되지 않았습니다. 환경 변수를 확인하세요.');
    console.error('Kakao SDK not initialized. Check VITE_KAKAO_APP_KEY environment variable.');
    return;
  }

  const shareUrl = `${window.location.origin}?result=${mbtiType}`;
  const imageUrl = `${window.location.origin}${character.image}`;
  
  console.log('카카오톡 공유 정보:', {
    url: shareUrl,
    image: imageUrl,
    title: `나의 진격의 거인 캐릭터는 ${character.name}!`
  });
  
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `나의 진격의 거인 캐릭터는 ${character.name}!`,
      description: `MBTI ${mbtiType} - ${character.description}`,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
    ],
  });
};

export const copyLink = async (mbtiType) => {
  const url = `${window.location.origin}?result=${mbtiType}`;
  
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const shareNative = async (mbtiType, character) => {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: '진격의 거인 MBTI 테스트',
      text: `나의 진격의 거인 캐릭터는 ${character.name} (${mbtiType})!`,
      url: `${window.location.origin}?result=${mbtiType}`
    });
    return true;
  } catch (err) {
    return false;
  }
};