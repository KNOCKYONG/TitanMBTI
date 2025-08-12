import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEOMetaTags = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // SEO 메타 태그 업데이트
    const updateMetaTag = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // 언어별 SEO 데이터
    const seoData = {
      ko: {
        title: '진격의 거인 MBTI 테스트 | 나는 어떤 캐릭터일까?',
        description: '12개의 심리학적 질문으로 당신의 진격의 거인 캐릭터를 찾아보세요. 무료 MBTI 성격 테스트!',
        keywords: '진격의 거인, MBTI, 성격테스트, 심리테스트, 무료테스트, 애니메이션, 캐릭터, 성격유형, Attack on Titan',
        ogTitle: '진격의 거인 MBTI 테스트 - 당신은 어떤 캐릭터?',
        ogDescription: '리바이? 에렌? 미카사? 12개 질문으로 당신의 진격의 거인 캐릭터를 찾아보세요!',
        twitterTitle: '진격의 거인 MBTI 테스트'
      },
      en: {
        title: 'Attack on Titan MBTI Test | Which Character Are You?',
        description: 'Discover your Attack on Titan character through 12 psychological questions. Free MBTI personality test!',
        keywords: 'Attack on Titan, MBTI, personality test, psychology test, free test, anime, character, personality type, 進撃の巨人',
        ogTitle: 'Attack on Titan MBTI Test - Which Character Are You?',
        ogDescription: 'Levi? Eren? Mikasa? Find your Attack on Titan character with 12 questions!',
        twitterTitle: 'Attack on Titan MBTI Test'
      },
      ja: {
        title: '進撃の巨人MBTIテスト | あなたはどのキャラクター？',
        description: '12の心理学的質問であなたの進撃の巨人キャラクターを発見。無料MBTI性格テスト！',
        keywords: '進撃の巨人, MBTI, 性格診断, 心理テスト, 無料テスト, アニメ, キャラクター, 性格タイプ, Attack on Titan',
        ogTitle: '進撃の巨人MBTIテスト - あなたはどのキャラクター？',
        ogDescription: 'リヴァイ？エレン？ミカサ？12の質問であなたの進撃の巨人キャラを見つけよう！',
        twitterTitle: '進撃の巨人MBTIテスト'
      },
      zh: {
        title: '进击的巨人MBTI测试 | 你是哪个角色？',
        description: '通过12个心理学问题发现你的进击的巨人角色。免费MBTI性格测试！',
        keywords: '进击的巨人, MBTI, 性格测试, 心理测试, 免费测试, 动漫, 角色, 性格类型, Attack on Titan',
        ogTitle: '进击的巨人MBTI测试 - 你是哪个角色？',
        ogDescription: '利威尔？艾伦？三笠？通过12个问题找到你的进击的巨人角色！',
        twitterTitle: '进击的巨人MBTI测试'
      },
      es: {
        title: 'Test MBTI Attack on Titan | ¿Qué personaje eres?',
        description: 'Descubre tu personaje de Attack on Titan con 12 preguntas psicológicas. ¡Test de personalidad MBTI gratis!',
        keywords: 'Attack on Titan, MBTI, test de personalidad, test psicológico, test gratis, anime, personaje, tipo de personalidad',
        ogTitle: 'Test MBTI Attack on Titan - ¿Qué personaje eres?',
        ogDescription: '¿Levi? ¿Eren? ¿Mikasa? ¡Encuentra tu personaje de Attack on Titan con 12 preguntas!',
        twitterTitle: 'Test MBTI Attack on Titan'
      },
      fr: {
        title: 'Test MBTI Attack on Titan | Quel personnage êtes-vous?',
        description: 'Découvrez votre personnage Attack on Titan avec 12 questions psychologiques. Test de personnalité MBTI gratuit!',
        keywords: 'Attack on Titan, MBTI, test de personnalité, test psychologique, test gratuit, anime, personnage, type de personnalité',
        ogTitle: 'Test MBTI Attack on Titan - Quel personnage êtes-vous?',
        ogDescription: 'Levi? Eren? Mikasa? Trouvez votre personnage Attack on Titan avec 12 questions!',
        twitterTitle: 'Test MBTI Attack on Titan'
      }
    };

    const data = seoData[lang] || seoData['en'];
    const siteUrl = window.location.origin;
    const currentUrl = window.location.href;

    // Update document title
    document.title = data.title;

    // Meta tags
    updateMetaTag('description', data.description);
    updateMetaTag('keywords', data.keywords);
    updateMetaTag('author', 'Titan MBTI Test');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Language alternates
    updateMetaTag('language', lang);
    
    // Open Graph tags
    updatePropertyTag('og:title', data.ogTitle);
    updatePropertyTag('og:description', data.ogDescription);
    updatePropertyTag('og:type', 'website');
    updatePropertyTag('og:url', currentUrl);
    updatePropertyTag('og:site_name', 'Titan MBTI Test');
    updatePropertyTag('og:locale', lang === 'ko' ? 'ko_KR' : lang === 'ja' ? 'ja_JP' : lang === 'zh' ? 'zh_CN' : 'en_US');
    updatePropertyTag('og:image', `${siteUrl}/images/og-image.jpg`);
    updatePropertyTag('og:image:width', '1200');
    updatePropertyTag('og:image:height', '630');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', data.twitterTitle);
    updateMetaTag('twitter:description', data.ogDescription);
    updateMetaTag('twitter:image', `${siteUrl}/images/twitter-card.jpg`);
    
    // Structured Data (JSON-LD)
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': data.title,
      'description': data.description,
      'url': currentUrl,
      'applicationCategory': 'Entertainment',
      'operatingSystem': 'Any',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '100000',
        'bestRating': '5',
        'worstRating': '1'
      },
      'inLanguage': lang,
      'availableLanguage': ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'ru', 'pt', 'ar', 'hi', 'vi', 'th', 'id', 'it']
    };
    
    scriptTag.textContent = JSON.stringify(structuredData);

    // Add language alternate links
    const alternateLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'ru', 'pt'];
    alternateLanguages.forEach(altLang => {
      let linkTag = document.querySelector(`link[hreflang="${altLang}"]`);
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = 'alternate';
        linkTag.hreflang = altLang;
        document.head.appendChild(linkTag);
      }
      const altUrl = new URL(siteUrl);
      altUrl.searchParams.set('lang', altLang);
      linkTag.href = altUrl.toString();
    });

    // Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = currentUrl;

  }, [i18n.language]);

  return null; // This component doesn't render anything
};

export default SEOMetaTags;