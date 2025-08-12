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
        title: '진격의 거인 테스트 | MBTI, 연애스타일, 에겐남테토녀, 이상형월드컵',
        description: '진격의 거인 캐릭터로 알아보는 나의 성격! MBTI, 연애스타일, 에겐남 테토녀, 이상형 월드컵 등 4가지 인기 테스트. 100% 무료!',
        keywords: '진격의 거인, Attack on Titan, MBTI, 성격테스트, 연애스타일, 에겐남, 테토녀, 이상형월드컵, 심리테스트, 무료테스트, 애니메이션, 캐릭터, 성격유형, 에렌, 미카사, 리바이, 아르민, personality test, anime test, 進撃の巨人',
        ogTitle: '진격의 거인 캐릭터 테스트 🔥 나와 닮은 캐릭터는?',
        ogDescription: '🎯 MBTI부터 연애스타일까지! 4가지 인기 테스트로 나와 닮은 진격의 거인 캐릭터를 찾아보세요. 전세계 100만명이 선택한 테스트!',
        twitterTitle: '진격의 거인 테스트 | 나는 어떤 캐릭터?'
      },
      en: {
        title: 'Attack on Titan Tests | MBTI, Romance Style, Personality & More',
        description: 'Discover yourself through Attack on Titan! 4 viral tests: MBTI personality, Romance style, Egen/Teto type, Character tournament. 100% Free!',
        keywords: 'Attack on Titan, AOT, Shingeki no Kyojin, MBTI test, personality test, romance style test, character tournament, anime test, free test, Eren, Mikasa, Levi, Armin, personality quiz, anime quiz, 進撃の巨人',
        ogTitle: 'Attack on Titan Character Tests 🔥 Which Character Are You?',
        ogDescription: '🎯 4 viral personality tests based on Attack on Titan! MBTI, Romance Style, Trending Tests & more. Join 1M+ fans worldwide!',
        twitterTitle: 'Attack on Titan Tests | Find Your Character'
      },
      ja: {
        title: '進撃の巨人テスト | MBTI・恋愛スタイル・性格診断',
        description: '進撃の巨人キャラで分かる性格診断！MBTI、恋愛スタイル、理想のキャラ選び等4つの人気テスト。100%無料！',
        keywords: '進撃の巨人, Attack on Titan, MBTI, 性格診断, 恋愛診断, 心理テスト, 無料テスト, アニメ, キャラクター診断, エレン, ミカサ, リヴァイ, アルミン',
        ogTitle: '進撃の巨人キャラ診断 🔥 あなたはどのキャラ？',
        ogDescription: '🎯 MBTI診断から恋愛スタイルまで！4つの人気診断であなたに似た進撃キャラを発見。世界100万人が体験！',
        twitterTitle: '進撃の巨人診断 | キャラ性格テスト'
      },
      zh: {
        title: '进击的巨人测试 | MBTI·恋爱风格·性格测试',
        description: '进击的巨人角色性格测试！MBTI、恋爱风格、理想型世界杯等4个热门测试。100%免费！',
        keywords: '进击的巨人, Attack on Titan, MBTI, 性格测试, 恋爱测试, 心理测试, 免费测试, 动漫, 角色测试, 艾伦, 三笠, 利威尔, 阿尔敏',
        ogTitle: '进击的巨人角色测试 🔥 你是哪个角色？',
        ogDescription: '🎯 从MBTI到恋爱风格！4个热门测试找到你的进击的巨人角色。全球100万人的选择！',
        twitterTitle: '进击的巨人测试 | 角色性格测试'
      },
      es: {
        title: 'Test Attack on Titan | MBTI, Estilo Romántico y Más',
        description: '¡Descúbrete a través de Attack on Titan! 4 tests virales: MBTI, Estilo romántico, Torneo de personajes. ¡100% Gratis!',
        keywords: 'Attack on Titan, Shingeki no Kyojin, MBTI, test personalidad, test romántico, test anime, test gratis, Eren, Mikasa, Levi, Armin',
        ogTitle: 'Test de Personajes Attack on Titan 🔥 ¿Cuál eres tú?',
        ogDescription: '🎯 ¡4 tests de personalidad basados en Attack on Titan! MBTI, Estilo romántico y más. ¡Únete a 1M+ fans!',
        twitterTitle: 'Test Attack on Titan | Encuentra tu personaje'
      },
      fr: {
        title: 'Test Attack on Titan | MBTI, Style Romantique et Plus',
        description: 'Découvrez-vous à travers Attack on Titan! 4 tests viraux: MBTI, Style romantique, Tournoi de personnages. 100% Gratuit!',
        keywords: 'Attack on Titan, Shingeki no Kyojin, MBTI, test personnalité, test romantique, test anime, test gratuit, Eren, Mikasa, Levi, Armin',
        ogTitle: 'Test Personnages Attack on Titan 🔥 Qui êtes-vous?',
        ogDescription: '🎯 4 tests de personnalité basés sur Attack on Titan! MBTI, Style romantique et plus. Rejoignez 1M+ fans!',
        twitterTitle: 'Test Attack on Titan | Trouvez votre personnage'
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
      'applicationSubCategory': 'Personality Test',
      'operatingSystem': 'Any',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '1000000',
        'bestRating': '5',
        'worstRating': '1'
      },
      'creator': {
        '@type': 'Organization',
        'name': 'Titan MBTI',
        'url': siteUrl
      },
      'keywords': data.keywords,
      'inLanguage': lang,
      'availableLanguage': ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'ru', 'pt', 'ar', 'hi', 'vi', 'th', 'id', 'it'],
      'isAccessibleForFree': true,
      'audience': {
        '@type': 'PeopleAudience',
        'audienceType': 'All Ages'
      },
      'about': {
        '@type': 'Thing',
        'name': 'Attack on Titan',
        'alternateName': ['진격의 거인', 'Shingeki no Kyojin', '進撃の巨人']
      },
      'potentialAction': {
        '@type': 'PlayAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': currentUrl,
          'actionPlatform': [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        }
      }
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