export const initKakao = (appKey) => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(appKey);
  }
};

export const shareKakao = (mbtiType, character) => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  const shareUrl = `${window.location.origin}?result=${mbtiType}`;
  
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `나의 진격의 거인 캐릭터는 ${character.name}!`,
      description: `MBTI ${mbtiType} - ${character.description}`,
      imageUrl: `${window.location.origin}${character.image}`,
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