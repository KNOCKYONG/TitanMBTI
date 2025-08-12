import i18n from '../i18n/config';

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

export const shareOnKakao = (shareData) => {
  if (!window.Kakao) {
    alert(i18n.t('shareButtons.kakaoNotAvailable', '카카오톡 공유 기능을 사용할 수 없습니다.'));
    return;
  }

  if (!window.Kakao.isInitialized()) {
    alert(i18n.t('shareButtons.kakaoNotInitialized', '카카오 SDK가 초기화되지 않았습니다.'));
    console.error('Kakao SDK not initialized. Check VITE_KAKAO_APP_KEY environment variable.');
    return;
  }

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareData.title,
        description: shareData.description,
        imageUrl: shareData.imageUrl,
        link: shareData.link,
      },
      buttons: shareData.buttons,
    });
    console.log('Kakao share completed');
  } catch (error) {
    console.error('Kakao share failed:', error);
    alert(i18n.t('shareButtons.kakaoError', '카카오톡 공유 중 오류가 발생했습니다.'));
  }
};

export const shareKakao = (mbtiType, character) => {
  if (!window.Kakao) {
    alert(i18n.t('shareButtons.kakaoNotAvailable', '카카오톡 공유 기능을 사용할 수 없습니다.'));
    return;
  }

  if (!window.Kakao.isInitialized()) {
    alert(i18n.t('shareButtons.kakaoNotInitialized', '카카오 SDK가 초기화되지 않았습니다.'));
    console.error('Kakao SDK not initialized. Check VITE_KAKAO_APP_KEY environment variable.');
    return;
  }

  const shareUrl = `${window.location.origin}?result=${mbtiType}`;
  const imageUrl = `${window.location.origin}${character.image}`;
  
  const shareTitle = i18n.t('share.kakaoTitle', { characterName: character.name }, `나의 진격의 거인 캐릭터는 ${character.name}!`);
  
  console.log('Kakao share info:', {
    url: shareUrl,
    image: imageUrl,
    title: shareTitle
  });
  
  try {
    window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: `MBTI ${mbtiType} - ${i18n.t(`characters.${mbtiType}.description`, character.description)}`,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: i18n.t('share.testButton', '나도 테스트하기'),
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
    ],
    });
    console.log('Kakao share completed');
  } catch (error) {
    console.error('Kakao share failed:', error);
    alert(i18n.t('shareButtons.kakaoError', '카카오톡 공유 중 오류가 발생했습니다.'));
  }
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
      title: i18n.t('share.nativeTitle', '진격의 거인 MBTI 테스트'),
      text: i18n.t('share.nativeText', { characterName: character.name, mbtiType }, `나의 진격의 거인 캐릭터는 ${character.name} (${mbtiType})!`),
      url: `${window.location.origin}?result=${mbtiType}`
    });
    return true;
  } catch (err) {
    return false;
  }
};