import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

var copyPixKey;

  window.splashScreenRemoved = false;
window.removeSplashScreen = function() {
  if (window.splashScreenRemoved) return;
  window.splashScreenRemoved = true;
  var splash = document.getElementById('splashScreen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => { splash.style.visibility = 'hidden'; }, 800);
  }
};

window.checkAndHideSplash = function() {
  var images = Array.from(document.images);
  var bgVitral = document.getElementById('heroBgVitral');
  if (bgVitral && bgVitral.style.backgroundImage && bgVitral.style.backgroundImage.includes('url')) {
    var bgUrl = bgVitral.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    if (bgUrl && bgUrl !== 'none') {
      var bgImg = new Image();
      bgImg.src = bgUrl;
      images.push(bgImg);
    }
  }
  // filter images that are not complete yet
  var pending = images.filter(img => !img.complete && img.src);
  
  if (pending.length === 0) {
    window.removeSplashScreen();
    return;
  }
  
  var loadedCount = 0;
  var onImageLoad = () => {
    loadedCount++;
    if (loadedCount >= pending.length) {
      window.removeSplashScreen();
    }
  };
  
  pending.forEach(img => {
    img.addEventListener('load', onImageLoad);
    img.addEventListener('error', onImageLoad);
  });
};

// Fallback safety timeout so it never hangs indefinitely
setTimeout(window.removeSplashScreen, 3500);

  

    /* 
      ==========================================================================
      CONSTANTES DE IMAGENS OFICIAIS
      Insira o caminho local (ex: "img/alison.jpg") ou URL válida para substituir
      automaticamente os placeholders pelas fotos e brasões oficiais.
      ==========================================================================
    */
    var FOTO_ALISON = "";
    var FOTO_JOAO = "";
    var BRASAO_DIOCESE = "";
    var LOGO_PAROQUIA_ALISON = "";
    var LOGO_PAROQUIA_JOAO = "";

    /* 
      ==========================================================================
      CONSTANTE DA URL DO GOOGLE MAPS
      Apenas insira a URL exata entre as aspas quando ela estiver disponível.
      Se mantida como string vazia (""), o sistema informará educadamente
      que a rota será disponibilizada em breve.
      ==========================================================================
    */
    var GOOGLE_MAPS_URL = "https://maps.app.goo.gl/aLfresPMqYEcBAD76";

    /* INICIALIZAÇÃO DA PÁGINA */
    document.addEventListener('DOMContentLoaded', function() {
      initScrollAnimations();
      initFirebaseService();
      renderOfficialImages();
      initMobileMenu();
      initSmoothScroll();
      initKeyboardNavigation();
      initScrollSpy();
      initCountdownTimer();
    });

    /* CONTADOR REGRESSIVO SOLENE */
    window.initCountdownTimer = function initCountdownTimer() {
      // Data do Evento: 19 de Novembro de 2026, às 19:00:00 (Mês 10 no JS)
      window.globalTargetDate = new Date(2026, 10, 19, 19, 0, 0).getTime();
      var targetDate = window.globalTargetDate;

      window.updateTimer = function updateTimer() {
        var now = new Date().getTime();
        var currentTarget = window.globalTargetDate || targetDate;
        var diff = currentTarget - now;

        var daysEl = document.getElementById('cdDays');
        var hoursEl = document.getElementById('cdHours');
        var minutesEl = document.getElementById('cdMinutes');
        var secondsEl = document.getElementById('cdSeconds');
        
        var cdContainer = document.querySelector('.hero-countdown-box');
        if (window.currentSiteData && window.currentSiteData.emBreve) {
            if (cdContainer) cdContainer.style.display = 'none';
            return;
        } else {
            if (cdContainer) cdContainer.style.display = 'block';
        }

        if (!cdContainer) return;

        var nowObj = new Date(now);
        var targetObj = new Date(currentTarget);
        
        var isEventDay = (nowObj.getDate() === targetObj.getDate() && nowObj.getMonth() === targetObj.getMonth() && nowObj.getFullYear() === targetObj.getFullYear());
        var isAfterEventDay = (now > currentTarget) && !isEventDay;

        if (isAfterEventDay) {
          // Mostrar carta de agradecimento
          var carta = (window.currentSiteData && window.currentSiteData.cartaAgradecimento) 
            ? window.currentSiteData.cartaAgradecimento 
            : "Queridos irmãos e irmãs, com o coração repleto de alegria e gratidão, rendemos graças a Deus e a toda a comunidade por nos acompanharem neste momento tão especial de nossas vidas. Que o Senhor abençoe a todos!";
          
          cdContainer.innerHTML = `
            <div class="thank-you-letter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2" style="margin-bottom: 0.5rem;">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <h3 style="font-family: 'Cinzel', serif; color: var(--gold-dark); font-size: 1.1rem; margin-bottom: 0.75rem;">Gratidão</h3>
              <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); font-style: italic;">"${carta}"</p>
              <div style="margin-top: 1rem; font-family: 'Alex Brush', cursive; font-size: 1.5rem; color: var(--gold-dark);">
                Alison & João
              </div>
            </div>
          `;
          cdContainer.style.padding = '2rem 1.5rem';
          return;
        }

        if (isEventDay) {
          // Mostrar mensagem festiva
          cdContainer.innerHTML = `
            <div class="festive-message" style="animation: fadeUpText 0.8s ease-out forwards;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.5" style="margin-bottom: 0.5rem; animation: pulseLogo 2s infinite;">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <h3 style="font-family: 'Cinzel', serif; color: var(--gold-dark); font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Chegou o Grande Dia!</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">A Solenidade Diaconal acontece hoje.</p>
            </div>
          `;
          cdContainer.style.padding = '1.5rem';
          return;
        }

        // Se ainda não tiver inicializado o timer HTML, renderiza
        if (!document.getElementById('cdDays')) {
          cdContainer.innerHTML = `
            <div class="hero-countdown-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Faltam para a Solenidade Diaconal</span>
            </div>
            <div class="hero-countdown-timer">
              <div class="countdown-unit">
                <span class="countdown-value" id="cdDays">00</span>
                <span class="countdown-label">Dias</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-unit">
                <span class="countdown-value" id="cdHours">00</span>
                <span class="countdown-label">Horas</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-unit">
                <span class="countdown-value" id="cdMinutes">00</span>
                <span class="countdown-label">Minutos</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-unit">
                <span class="countdown-value" id="cdSeconds">00</span>
                <span class="countdown-label">Segundos</span>
              </div>
            </div>
          `;
        }

        var daysEl = document.getElementById('cdDays');
        var hoursEl = document.getElementById('cdHours');
        var minutesEl = document.getElementById('cdMinutes');
        var secondsEl = document.getElementById('cdSeconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (diff <= 0) {
          daysEl.innerText = "00";
          hoursEl.innerText = "00";
          minutesEl.innerText = "00";
          secondsEl.innerText = "00";
          return;
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');

      }

      updateTimer();
      setInterval(updateTimer, 1000);
    }

    /* 0. RENDERIZAÇÃO DAS IMAGENS OFICIAIS (OU PLACEHOLDERS ELEGANTES) */
    window.renderOfficialImages = function renderOfficialImages() {
      // 1. Foto de Alison Fernando
      if (FOTO_ALISON && FOTO_ALISON.trim() !== "") {
        var src = escapeHtml(FOTO_ALISON.trim());
        var heroAlison = document.getElementById('heroFotoAlisonContainer');
        var cardAlison = document.getElementById('cardFotoAlisonContainer');

        if (heroAlison) {
          heroAlison.innerHTML = `
            <img src="${src}" 
                 alt="Alison Fernando Rodrigues dos Santos" 
                 loading="eager" 
                 style="width:100%; height:280px; object-fit:cover; border-radius:132px 132px 6px 6px; border:1px solid var(--gold-border);" />
          `;
        }

        if (cardAlison) {
          cardAlison.innerHTML = `
            <img src="${src}" 
                 alt="Alison Fernando Rodrigues dos Santos" 
                 loading="lazy" 
                 style="width:100%; height:100%; object-fit:cover; border-radius:95px 95px 6px 6px; border:1px solid var(--gold-border);" />
          `;
        }
      }

      // 2. Foto de João Henrique
      if (FOTO_JOAO && FOTO_JOAO.trim() !== "") {
        var src = escapeHtml(FOTO_JOAO.trim());
        var heroJoao = document.getElementById('heroFotoJoaoContainer');
        var cardJoao = document.getElementById('cardFotoJoaoContainer');

        if (heroJoao) {
          heroJoao.innerHTML = `
            <img src="${src}" 
                 alt="João Henrique de Oliveira Guarsoni" 
                 loading="eager" 
                 style="width:100%; height:280px; object-fit:cover; border-radius:132px 132px 6px 6px; border:1px solid var(--gold-border);" />
          `;
        }

        if (cardJoao) {
          cardJoao.innerHTML = `
            <img src="${src}" 
                 alt="João Henrique de Oliveira Guarsoni" 
                 loading="lazy" 
                 style="width:100%; height:100%; object-fit:cover; border-radius:95px 95px 6px 6px; border:1px solid var(--gold-border);" />
          `;
        }
      }

      // 3. Brasão da Diocese de Assis
      if (BRASAO_DIOCESE && BRASAO_DIOCESE.trim() !== "") {
        var src = escapeHtml(BRASAO_DIOCESE.trim());
        var headerCoat = document.getElementById('headerBrasaoContainer');
        var footerCoat = document.getElementById('footerBrasaoContainer');

        if (headerCoat) {
          headerCoat.innerHTML = `
            <img src="${src}" 
                 alt="Brasão da Diocese de Assis" 
                 class="hover-3d"
                 loading="eager" 
                 style="height:42px; width:auto; max-width:48px; object-fit:contain;"
                 onclick="event.preventDefault(); openLightbox(this.src)" />
          `;
        }

        if (footerCoat) {
          footerCoat.innerHTML = `
            <img src="${src}" 
                 alt="Brasão da Diocese de Assis" 
                 loading="lazy" 
                 style="height:56px; width:auto; max-width:60px; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15)); margin-bottom:0.75rem;" />
          `;
        }
      }

      // 4. Logo Paróquia Alison
      if (LOGO_PAROQUIA_ALISON && LOGO_PAROQUIA_ALISON.trim() !== "") {
        var src = escapeHtml(LOGO_PAROQUIA_ALISON.trim());
        var logoAlison = document.getElementById('parishLogoAlisonContainer');
        if (logoAlison) {
          logoAlison.innerHTML = `
            <img src="${src}" 
                 alt="Paróquia Nossa Senhora da Boa Esperança" 
                 loading="lazy" 
                 style="height:22px; width:auto; max-width:32px; object-fit:contain; border-radius:2px;" />
          `;
        }
      }

      // 5. Logo Paróquia João
      if (LOGO_PAROQUIA_JOAO && LOGO_PAROQUIA_JOAO.trim() !== "") {
        var src = escapeHtml(LOGO_PAROQUIA_JOAO.trim());
        var logoJoao = document.getElementById('parishLogoJoaoContainer');
        if (logoJoao) {
          logoJoao.innerHTML = `
            <img src="${src}" 
                 alt="Paróquia Santo Antônio" 
                 loading="lazy" 
                 style="height:22px; width:auto; max-width:32px; object-fit:contain; border-radius:2px;" />
          `;
        }
      }
    }

    /* 1. MENU HAMBÚRGUER MOBILE E NAVEGAÇÃO */
    window.initMobileMenu = function initMobileMenu() {
      var toggleBtn = document.getElementById('menuToggleBtn');
      var navMenu = document.getElementById('navMenu');

      if (!toggleBtn || !navMenu) return;

      toggleBtn.addEventListener('click', function() {
        var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
      });

      // Fechar menu ao clicar em qualquer link ou botão dentro do menu
      var navItems = navMenu.querySelectorAll('a, button');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          navMenu.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ROLAGEM SUAVE PARA TODOS OS LINKS DE ÂNCORA (#) */
    window.initSmoothScroll = function initSmoothScroll() {
      var anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          var targetId = this.getAttribute('href');
          if (targetId && targetId.startsWith('#') && targetId.length > 1 && targetId !== '#') {
            try {
              var targetElement = document.querySelector(targetId);
              if (targetElement) {
              e.preventDefault();
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              
              // Gerenciamento de foco para leitores de tela
              if (!targetElement.hasAttribute('tabindex')) {
                targetElement.setAttribute('tabindex', '-1');
              }
              try { targetElement.focus({ preventScroll: true }); } catch (err) {}

              // Fechar menu mobile se estiver aberto
              var navMenu = document.getElementById('navMenu');
              var toggleBtn = document.getElementById('menuToggleBtn');
              if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
              }
            }
            } catch(e) {
              console.warn("Smooth scroll skipped invalid selector:", targetId);
            }
          }
        });
      });
    }

    /* ACESSIBILIDADE VIA TECLADO (ENTER E ESPAÇO EM ELEMENTOS INTERATIVOS) */
    window.initKeyboardNavigation = function initKeyboardNavigation() {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          var target = e.target;
          if (target && target.getAttribute('role') === 'button') {
            e.preventDefault();
            target.click();
          }
        }
      });
    }

    /* 2. SCROLL SPY PARA MENU ATIVO */
    window.initScrollSpy = function initScrollSpy() {
      var sections = document.querySelectorAll('section[id]');
      var navLinks = document.querySelectorAll('.nav-link');

      window.addEventListener('scroll', function() {
        if (window.navMenu && window.navMenu.classList.contains('open')) {
          window.navMenu.classList.remove('open');
          var icon = document.querySelector('.diocese-dropdown-icon');
          if(icon) icon.style.transform = 'rotate(0deg)';
        }
        var currentSec = '';
        var scrollPosition = window.scrollY + 100;

        
      var staggerObserver = new IntersectionObserver((entries) => {
        var intersecting = entries.filter(e => e.isIntersecting);
        intersecting.forEach((entry, i) => {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 150); // Stagger delay
          staggerObserver.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
      
      document.querySelectorAll('.fade-in-stagger').forEach(el => staggerObserver.observe(el));

      sections.forEach(section => {
          var top = section.offsetTop;
          var height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSec = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + currentSec) {
            link.classList.add('active');
          }
        });
      });
    }

    /* 3. ABRIR ROTA NO GOOGLE MAPS COM CONSTANTE JS */
    window.openGoogleMapsRoute = function openGoogleMapsRoute() {
      if (GOOGLE_MAPS_URL && GOOGLE_MAPS_URL.trim() !== "") {
        window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
      } else {
        showToast("A localização exata no mapa será disponibilizada em breve.");
      }
    }

    /* 4. COPIAR ENDEREÇO DA PARÓQUIA */
    window.copyAddressText = function copyAddressText() {
      var addressText = "Paróquia Santa Cecília, Assis - SP";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(addressText).then(() => {
          showToast("Endereço copiado para a área de transferência!");
        }).catch(() => {
          showToast("Paróquia Santa Cecília, Assis - SP");
        });
      } else {
        showToast("Paróquia Santa Cecília, Assis - SP");
      }
    }

    /* 5. COPIAR CHAVE PIX */
    copyPixKey = function() {
      var pixKey = document.getElementById('pixKeyText').innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(pixKey).then(() => {
          showToast("Chave PIX copiada com sucesso!");
        }).catch(() => {
          showToast("Chave PIX: " + pixKey);
        });
      } else {
        showToast("Chave PIX: " + pixKey);
      }
    }

    /* 6. COMPARTILHAR CONVITE (WEB SHARE API E FALLBACK) */
    
    /* 6. COMPARTILHAR CONVITE (WEB SHARE API E FALLBACK) */
    window.shareInvitation = async function shareInvitation() {
      var data = window.currentSiteData || {};
      var titleText = "Ordenação Diaconal";
      var messageText = data.shareMessage || "Você está convidado para a Ordenação Diaconal de Alison Fernando Rodrigues dos Santos e João Henrique de Oliveira Guarsoni, no dia 19 de novembro de 2026, às 19h, na Paróquia Santa Cecília, em Assis–SP. Rezemos pelas vocações!";
      var shareUrl = window.location.href;
      var fullMessage = messageText + "\n\n" + shareUrl;
      
      // Por padrão, deixamos url e text separados.
      var shareData = {
          title: titleText,
          text: messageText,
          url: shareUrl
      };

      try {
          if (data.shareImage && data.shareImage.trim() !== '') {
              // Converte a imagem (que pode estar em WebP) para JPEG.
              // O WhatsApp e outros apps aceitam JPEG muito melhor pelo Web Share API.
              const blob = await new Promise((resolve, reject) => {
                  const img = new Image();
                  img.crossOrigin = "Anonymous";
                  img.onload = () => {
                      const canvas = document.createElement('canvas');
                      canvas.width = img.width;
                      canvas.height = img.height;
                      // Preenche com fundo branco (caso a imagem tivesse transparência)
                      const ctx = canvas.getContext('2d');
                      ctx.fillStyle = '#FFFFFF';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                      ctx.drawImage(img, 0, 0);
                      
                      canvas.toBlob((b) => {
                          if (b) resolve(b);
                          else reject(new Error("Canvas toBlob falhou"));
                      }, 'image/jpeg', 0.95);
                  };
                  img.onerror = () => reject(new Error("Falha ao carregar imagem para compartilhamento"));
                  img.src = data.shareImage;
              });

              const file = new File([blob], "convite.jpg", { type: "image/jpeg" });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                  shareData.files = [file];
                  // Workaround crítico para WhatsApp (principalmente iOS):
                  // Quando enviamos arquivos, o WhatsApp muitas vezes ignora o campo 'url'.
                  // Então combinamos o texto e a URL no campo 'text' e removemos o campo 'url'.
                  shareData.text = fullMessage;
                  delete shareData.url;
              }
          }
      } catch (e) {
          console.warn("Não foi possível anexar a imagem ao compartilhamento:", e);
      }

      if (navigator.share) {
        navigator.share(shareData).then(() => {
          // Sucesso
        }).catch((err) => {
          if (err && err.name !== 'AbortError') {
            copyShareTextToClipboard(fullMessage);
          }
        });
      } else {
        copyShareTextToClipboard(fullMessage);
      }
    }

    
    window.shareMedia = async function(dataUrl, title, filename) {
      if (!dataUrl || dataUrl.trim() === '') return;

      if (!dataUrl.startsWith('data:')) {
         if (navigator.share) {
             try { await navigator.share({ title: title, url: dataUrl }); }
             catch(e) { window.open(dataUrl, '_blank'); }
         } else { window.open(dataUrl, '_blank'); }
         return;
      }

      try {
         const response = await fetch(dataUrl);
         const blob = await response.blob();
         let mime = blob.type || 'image/jpeg';
         let ext = mime === 'application/pdf' ? 'pdf' : (mime.includes('png') ? 'png' : 'jpg');
         
         if (mime.startsWith('image/')) {
            const convertedBlob = await new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((b) => {
                        if (b) resolve(b);
                        else reject(new Error("Canvas toBlob falhou"));
                    }, 'image/jpeg', 0.95);
                };
                img.onerror = () => reject(new Error("Falha ao carregar"));
                img.src = dataUrl;
            });
            
            const file = new File([convertedBlob], `${filename}.jpg`, { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                 await navigator.share({ title: title, files: [file] });
            } else {
                 const a = document.createElement('a');
                 a.href = URL.createObjectURL(convertedBlob);
                 a.download = `${filename}.jpg`;
                 a.click();
            }
         } else {
            const file = new File([blob], `${filename}.${ext}`, { type: mime });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                 await navigator.share({ title: title, files: [file] });
            } else {
                 const a = document.createElement('a');
                 a.href = URL.createObjectURL(blob);
                 a.download = `${filename}.${ext}`;
                 a.click();
            }
         }
      } catch (e) {
         console.warn("Share Media Error:", e);
         const a = document.createElement('a');
         a.href = dataUrl;
         a.download = filename;
         a.click();
      }
    };

    
    window.downloadMedia = async function(dataUrl, filename) {
      if (!dataUrl || dataUrl.trim() === '') return;
      if (!dataUrl.startsWith('data:')) {
         const a = document.createElement('a');
         a.href = dataUrl;
         a.download = filename;
         a.target = '_blank';
         a.click();
         return;
      }
      try {
         const response = await fetch(dataUrl);
         const blob = await response.blob();
         let mime = blob.type || 'image/jpeg';
         let ext = mime === 'application/pdf' ? 'pdf' : (mime.includes('png') ? 'png' : 'jpg');
         const a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = `${filename}.${ext}`;
         a.click();
      } catch(e) {
         window.open(dataUrl, '_blank');
      }
    };

    window.sharePost = async function(dataUrl, titleText, filename, useInviteText = false) {
      if (!dataUrl || dataUrl.trim() === '') return;
      var data = window.currentSiteData || {};
      var messageText = "";
      var shareUrl = window.location.href;
      
      if (useInviteText) {
          messageText = data.shareMessage || "Você está convidado para a Ordenação Diaconal de Alison Fernando Rodrigues dos Santos e João Henrique de Oliveira Guarsoni, no dia 19 de novembro de 2026, às 19h, na Paróquia Santa Cecília, em Assis–SP. Rezemos pelas vocações!";
      }

      var fullMessage = messageText ? (messageText + "\n\n" + shareUrl) : "";
      
      var shareData = {
          title: titleText
      };
      
      if (fullMessage) {
          shareData.text = fullMessage;
      }

      if (!dataUrl.startsWith('data:')) {
         if (navigator.share) {
             shareData.url = dataUrl;
             try { await navigator.share(shareData); }
             catch(e) { 
                 if (fullMessage) copyShareTextToClipboard(fullMessage);
                 else window.open(dataUrl, '_blank'); 
             }
         } else { 
             if (fullMessage) copyShareTextToClipboard(fullMessage);
             else window.open(dataUrl, '_blank'); 
         }
         return;
      }

      try {
         const response = await fetch(dataUrl);
         const blob = await response.blob();
         let mime = blob.type || 'image/jpeg';
         let ext = mime === 'application/pdf' ? 'pdf' : (mime.includes('png') ? 'png' : 'jpg');
         
         if (mime.startsWith('image/')) {
            const convertedBlob = await new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((b) => {
                        if (b) resolve(b);
                        else reject(new Error("Canvas toBlob falhou"));
                    }, 'image/jpeg', 0.95);
                };
                img.onerror = () => reject(new Error("Falha ao carregar"));
                img.src = dataUrl;
            });
            
            const file = new File([convertedBlob], `${filename}.jpg`, { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                 shareData.files = [file];
                 // Prevent WhatsApp bug by keeping it all in text
                 if (shareData.url) {
                    shareData.text = (shareData.text ? shareData.text + "\n" : "") + shareData.url;
                    delete shareData.url;
                 }
                 await navigator.share(shareData);
            } else {
                 if (fullMessage) copyShareTextToClipboard(fullMessage);
                 else window.downloadMedia(dataUrl, filename);
            }
         } else {
            const file = new File([blob], `${filename}.${ext}`, { type: mime });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                 shareData.files = [file];
                 await navigator.share(shareData);
            } else {
                 if (fullMessage) copyShareTextToClipboard(fullMessage);
                 else window.downloadMedia(dataUrl, filename);
            }
         }
      } catch (e) {
         console.warn("Share Error:", e);
         if (fullMessage) copyShareTextToClipboard(fullMessage);
         else window.downloadMedia(dataUrl, filename);
      }
    };

    window.copyShareTextToClipboard = function copyShareTextToClipboard(textToCopy) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast("Mensagem copiada. Agora você pode compartilhá-la.");
        }).catch(() => {
          fallbackCopyShareText(textToCopy);
        });
      } else {
        fallbackCopyShareText(textToCopy);
      }
    }

    window.fallbackCopyShareText = function fallbackCopyShareText(textToCopy) {
      var textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast("Mensagem copiada. Agora você pode compartilhá-la.");
      } catch (err) {
        showToast("Mensagem copiada. Agora você pode compartilhá-la.");
      }
      document.body.removeChild(textArea);
    }

    /* 7. GERAR E BAIXAR EVENTO DE CALENDÁRIO (.ICS VÁLIDO) */
    function getDynamicCalendarData() {
      var data = window.currentSiteData || {};
      
      var defaultTitle = "Ordenação Diaconal de Alison e João Henrique";
      var title = defaultTitle;
      if (data.ordenandos && data.ordenandos.length > 0) {
        var names = data.ordenandos.map(o => {
          let nameParts = (o.nome || '').trim().split(' ');
          return nameParts[0] || '';
        }).filter(n => n.length > 0);
        if (names.length > 0) {
          title = "Ordenação Diaconal de " + names.join(" e ");
        }
      }

      var location = (data.localNome || "Paróquia Santa Cecília") + ", " + (data.localEndereco || "Assis-SP");
      var desc = "Solene Celebração Eucarística de " + title;
      
      // Default UTC (BRT 19:00 -> UTC 22:00)
      var dtStart = "20261119T220000Z";
      var dtEnd = "20261120T003000Z";
      
      if (data.dataHorarioISO) {
        // Ex: 2026-11-19T19:00
        try {
          var dateObj = new Date(data.dataHorarioISO + ":00-03:00"); // Force BRT timezone for input
          if (!isNaN(dateObj.getTime())) {
            var startUtc = new Date(dateObj.getTime());
            var endUtc = new Date(dateObj.getTime() + (2.5 * 60 * 60 * 1000)); // 2.5 hours later
            
            var formatUTC = function(d) {
              return d.getUTCFullYear() + 
                     String(d.getUTCMonth()+1).padStart(2, '0') + 
                     String(d.getUTCDate()).padStart(2, '0') + 'T' + 
                     String(d.getUTCHours()).padStart(2, '0') + 
                     String(d.getUTCMinutes()).padStart(2, '0') + 
                     String(d.getUTCSeconds()).padStart(2, '0') + 'Z';
            };
            dtStart = formatUTC(startUtc);
            dtEnd = formatUTC(endUtc);
          }
        } catch(e) {
          console.error("Error parsing date", e);
        }
      }

      return { title, location, desc, dtStart, dtEnd };
    }

    window.downloadCalendarEvent = function downloadCalendarEvent() {
      const modal = document.getElementById('calendarModal');
      if (modal) modal.classList.add('open');
    }

    window.closeCalendarModal = function() {
      const modal = document.getElementById('calendarModal');
      if (modal) modal.classList.remove('open');
    }

    window.openGoogleCalendar = function() {
      var calData = getDynamicCalendarData();
      var url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                "&text=" + encodeURIComponent(calData.title) +
                "&dates=" + calData.dtStart + "/" + calData.dtEnd +
                "&details=" + encodeURIComponent(calData.desc) +
                "&location=" + encodeURIComponent(calData.location);
                
      window.open(url, '_blank');
      closeCalendarModal();
    }

    window.downloadICSFile = function() {
      var calData = getDynamicCalendarData();
      
      // Removed spaces and simplified to avoid Android parsing issues
      var safeTitle = calData.title.replace(/,/g, '');
      var safeLocation = calData.location.replace(/,/g, ' ');
      var safeDesc = calData.desc.replace(/,/g, ' ');

      var icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Diocese de Assis//Ordenacao Diaconal//PT",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:ordenacao-diaconal-" + calData.dtStart + "@dioceseassis.org.br",
        "DTSTAMP:" + calData.dtStart,
        "DTSTART:" + calData.dtStart,
        "DTEND:" + calData.dtEnd,
        "SUMMARY:" + safeTitle,
        "LOCATION:" + safeLocation,
        "DESCRIPTION:" + safeDesc,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      var blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'ordenacao.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Evento baixado. Abra o arquivo para salvar em sua agenda!");
      closeCalendarModal();
    }

    window.downloadICSFile = function() {
      var eventTitle = "Ordenação Diaconal de Alison e João Henrique";
      var eventLocation = "Paróquia Santa Cecília, Assis-SP";
      var eventDescription = "Solene Celebração Eucarística de Ordenação Diaconal de Alison Fernando Rodrigues dos Santos e João Henrique de Oliveira Guarsoni.";

      var icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Diocese de Assis//Ordenacao Diaconal//PT",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:ordenacao-diaconal-20261119T220000Z@dioceseassis.org.br",
        "DTSTAMP:20260722T120000Z",
        "DTSTART:20261119T220000Z",
        "DTEND:20261120T003000Z",
        "SUMMARY:" + eventTitle,
        "LOCATION:" + eventLocation,
        "DESCRIPTION:" + eventDescription,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      var blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'ordenacao-diaconal.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Evento .ics baixado com sucesso!");
      closeCalendarModal();
    }

    /* ==========================================================================
       CONEXÃO FIREBASE FIRESTORE E SISTEMA ADMINISTRATIVO DO ORDENANTE
       ========================================================================== */
    var firebaseConfig = {
      apiKey: "AIzaSyAENt-eypRlBgPzlWkTQuy6WXAB6elmU20",
      authDomain: "ordinal-pixel-btn3v.firebaseapp.com",
      projectId: "ordinal-pixel-btn3v",
      storageBucket: "ordinal-pixel-btn3v.firebasestorage.app",
      messagingSenderId: "168459629172",
      appId: "1:168459629172:web:915f59e93566ad2e599721"
    };

    var db = null;
    var auth = null;
    var isAdminLoggedIn = false;
    var currentAdminFilter = 'all';
    var cachedPrayers = [];

    // Senha mestre de acesso admin (pode ser alterada e salva no localStorage/Firestore)
    var adminMasterPassword = localStorage.getItem('diaconal_admin_pass') || 'diacono2026';

    
    // Mobile Menu Diocese Brand Click
    var dioceseBrand = document.querySelector('.diocese-brand');
    var navMenu = document.getElementById('navMenu');
    
    if (dioceseBrand && navMenu) {
      dioceseBrand.addEventListener('click', function(e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          navMenu.classList.toggle('open');
          var icon = document.querySelector('.diocese-dropdown-icon');
          if(icon) {
            if(navMenu.classList.contains('open')) {
              icon.style.transform = 'rotate(180deg)';
            } else {
              icon.style.transform = 'rotate(0deg)';
            }
          }
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 860 && navMenu.classList.contains('open')) {
          if (!dioceseBrand.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
            var icon = document.querySelector('.diocese-dropdown-icon');
            if(icon) icon.style.transform = 'rotate(0deg)';
          }
        }
      });
      
      // Close menu when clicking a link
      var navLinks = navMenu.querySelectorAll('a, button');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 860) {
            navMenu.classList.remove('open');
            var icon = document.querySelector('.diocese-dropdown-icon');
            if(icon) icon.style.transform = 'rotate(0deg)';
          }
        });
      });
    }

    
    /* PWA INSTALLATION LOGIC */
    
    window.deferredPrompt = null;
        window.deferredPrompt = null;
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      window.deferredPrompt = e;
      const btnInstall = document.getElementById('btnInstallApp');
      if (btnInstall) btnInstall.style.display = 'inline-flex';
      
      if (!localStorage.getItem('installPromptClosed')) {
        const banner = document.getElementById('topInstallBanner');
        if (banner) banner.style.display = 'flex';
      }
    });

    
    // Check if iOS
    window.isIOS = () => {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    };
    
    // Check if standalone (already installed)
    window.isStandalone = () => {
      return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    };
    
    window.addEventListener('DOMContentLoaded', () => {
      if (!window.isStandalone() && window.isIOS()) {
         const btnInstall = document.getElementById('btnInstallApp');
         if (btnInstall) btnInstall.style.display = 'inline-flex';
      }
    });

    window.openInstallModal = function() {
      const modal = document.getElementById('pwaInstallModal');
      const androidContainer = document.getElementById('pwaAndroidBtnContainer');
      const androidInstructions = document.getElementById('pwaAndroidInstructions');
      const iosContainer = document.getElementById('pwaIOSInstructions');
      const pwaInstructions = document.getElementById('pwaInstructions');
      
      if (modal) {
        modal.classList.add('open');
        
        if (window.isIOS()) {
          if (iosContainer) iosContainer.style.display = 'block';
          if (androidContainer) androidContainer.style.display = 'none';
          if (androidInstructions) androidInstructions.style.display = 'none';
          if (pwaInstructions) pwaInstructions.style.display = 'block';
        } else {
          if (iosContainer) iosContainer.style.display = 'none';
          // If deferredPrompt is available, show button. Otherwise show manual instructions.
          if (window.deferredPrompt) {
            if (androidContainer) androidContainer.style.display = 'block';
            if (androidInstructions) androidInstructions.style.display = 'none';
            if (pwaInstructions) pwaInstructions.style.display = 'block';
          } else {
            if (androidContainer) androidContainer.style.display = 'none';
            if (androidInstructions) androidInstructions.style.display = 'block';
            if (pwaInstructions) pwaInstructions.style.display = 'none';
          }
        }
      }
    };
    
    window.closeInstallModal = function() {
      const modal = document.getElementById('pwaInstallModal');
      if (modal) {
        modal.classList.remove('open');
      }
    };
    
    
    window.installPWA = async function() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          const btnInstall = document.getElementById('btnInstallApp');
          if (btnInstall) btnInstall.style.display = 'none';
        }
        deferredPrompt = null;
        window.deferredPrompt = null;
        closeInstallModal();
      } else {
        // Fallback to manual openInstallModal which handles the instruction views now
        closeInstallModal();
        setTimeout(() => {
          window.openInstallModal();
        }, 300);
      }
      
      const banner = document.getElementById('topInstallBanner');
      if (banner) banner.style.display = 'none';
    };


    /* ANIMAÇÃO DE SCROLL (FADE IN) */
    window.initScrollAnimations = function initScrollAnimations() {
      var sections = document.querySelectorAll('.fade-in-section');
      
      var observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
      });

      sections.forEach(section => {
        observer.observe(section);
      });
    }

    window.initFirebaseService = function initFirebaseService() {
      try {
        if (window.firebaseDb && window.fsMethods) {
          db = window.firebaseDb;
          console.log("Firestore inicializado com banco de dados personalizado:");
          
          listenToSiteContentInFirestore();
          listenToPrayersInFirestore();
        } else {
          console.warn("Firebase Modular SDK ainda carregando ou indisponível. Tentando novamente em 500ms...");
          setTimeout(initFirebaseService, 500);
        }
      } catch (err) {
        console.error("Erro ao conectar Firebase:", err);
        renderPrayersFeedLocal();
      }
    }

    /* ESCUTA EM TEMPO REAL DAS INFORMAÇÕES DO SITE NO FIRESTORE */
    window.listenToSiteContentInFirestore = function listenToSiteContentInFirestore() {
      if (!window.firebaseDb || !window.fsMethods) return;
      const { doc, onSnapshot } = window.fsMethods;
      
      onSnapshot(doc(window.firebaseDb, 'siteContent', 'main'), (docSnap) => {
        if (docSnap.exists()) {
          var data = docSnap.data();
          applySiteDataToUI(data);
          populateAdminFormFields(data);
        }
      }, (err) => {
        console.error("Erro ao carregar dados do site no Firestore:", err);
      });
    }

    window.adminOrdenandos = [];

    
    /* LISTA DE PRESENTES */
    window.adminPresentes = [];

    window.initAdminPresentes = function() {
      var data = window.currentSiteData || {};
      window.adminPresentes = data.presentes || [];
      var urlInput = document.getElementById('inputUrlListaPresentesDoc');
      if (urlInput) urlInput.value = data.urlListaPresentesDoc || '';
      renderAdminPresentesList();
    };

    window.renderAdminPresentesList = function() {
      var container = document.getElementById('adminPresentesList');
      if (!container) return;
      container.innerHTML = '';
      window.adminPresentes.forEach((item, index) => {
        var div = document.createElement('div');
        div.style.cssText = "background: var(--bg-parchment-light); border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 1rem; position: relative;";
        div.innerHTML = `
          <button type="button" onclick="removeAdminPresente(${index})" style="position: absolute; top: 1rem; right: 1rem; background: #dc3545; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer;">Excluir</button>
          <div class="admin-field" style="margin-right: 60px;">
            <label>Nome do Presente:</label>
            <input type="text" onchange="window.adminPresentes[${index}].nome = this.value" value="${item.nome || ''}" />
          </div>
          <div class="admin-field">
            <label>Link/URL (Opcional):</label>
            <input type="url" onchange="window.adminPresentes[${index}].link = this.value" value="${item.link || ''}" placeholder="https://..." />
          </div>
        `;
        container.appendChild(div);
      });
    };

    window.addAdminPresente = function() {
      window.adminPresentes.push({ nome: '', link: '' });
      renderAdminPresentesList();
    };

    window.removeAdminPresente = function(index) {
      if (confirm('Tem certeza que deseja excluir este presente?')) {
        window.adminPresentes.splice(index, 1);
        renderAdminPresentesList();
      }
    };

    window.handleSavePresentes = async function(event) {
      event.preventDefault();
      try {
        const { doc, setDoc } = window.fsMethods;
        var urlListaDoc = document.getElementById('inputUrlListaPresentesDoc') ? document.getElementById('inputUrlListaPresentesDoc').value.trim() : '';
        await setDoc(doc(window.firebaseDb, 'siteContent', 'main'), { presentes: window.adminPresentes, urlListaPresentesDoc: urlListaDoc }, { merge: true });
        showToast("Lista de presentes atualizada com sucesso!");
        if(window.currentSiteData) {
          window.currentSiteData.presentes = window.adminPresentes;
          window.currentSiteData.urlListaPresentesDoc = urlListaDoc;
          renderSiteGiftList();
        }
      } catch (err) {
        console.error("Erro ao salvar lista de presentes:", err);
        showToast("Erro ao salvar. Tente novamente.", "error");
      }
    };

    window.renderSiteGiftList = function() {
      var data = window.currentSiteData || {};
      var presentes = data.presentes || [];
      var docUrl = data.urlListaPresentesDoc || '';
      var container = document.getElementById('siteGiftListContainer');
      var grid = document.getElementById('siteGiftListGrid');
      var docContainer = document.getElementById('siteGiftListDocContainer');
      
      if(!container || !grid) return;
      
      if(presentes.length > 0 || docUrl) {
        container.style.display = 'block';
        
        if (docContainer) {
          if (docUrl) {
            docContainer.style.display = 'block';
            docContainer.innerHTML = `<a href="${docUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.8rem 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; text-decoration: none;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              Visualizar / Baixar Lista Completa
            </a>`;
          } else {
            docContainer.style.display = 'none';
            docContainer.innerHTML = '';
          }
        }

        grid.innerHTML = '';
        presentes.forEach(item => {
          var div = document.createElement('div');
          div.style.cssText = "background: var(--bg-surface); border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-shadow: 0 4px 10px rgba(112, 87, 33, 0.05); transition: transform 0.2s;";
          div.onmouseover = () => div.style.transform = 'translateY(-2px)';
          div.onmouseout = () => div.style.transform = 'translateY(0)';
          
          let content = `<h4 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: var(--gold-dark); margin: 0;">${item.nome}</h4>`;
          
          if(item.link && item.link.trim() !== '') {
            content += `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="margin-top: 0.75rem; display: inline-block; font-size: 0.85rem; color: #fff; background: var(--gold-primary); padding: 0.4rem 1rem; border-radius: 50px; text-decoration: none; font-weight: 600;">Ver Opção</a>`;
          }
          
          div.innerHTML = content;
          grid.appendChild(div);
        });
      } else {
        container.style.display = 'none';
      }
    };
window.initAdminOrdenandos = function initAdminOrdenandos() {
      var data = window.currentSiteData || {};
      window.adminOrdenandos = data.ordenandos || [];
      if (window.adminOrdenandos.length === 0) {
        
          window.adminOrdenandos.push({
             nome: "Alison Fernando Rodrigues dos Santos",
             instagram: "oalison.rodrigues",
             lema: data.lemaAlison || "'Graça e Paz' (1Pe 1,2)",
             foto: data.fotoAlison || "",
             paroquiaNome: data.textoParoquiaAlison || "Paróquia Nossa Senhora da Boa Esperança — Lutécia–SP",
             paroquiaLogo: data.logoParoquiaAlison || "",
             historia: "Um resumo da caminhada vocacional, experiências pastorais e vivência comunitária na preparação para o Sacramento da Ordem no grau do Diaconato."
          });
        
          window.adminOrdenandos.push({
             nome: "João Henrique de Oliveira Guarsoni",
             instagram: "joao_guarsoni",
             lema: data.lemaJoao || "'Eis-me aqui, envia-me' (Is 6,8)",
             foto: data.fotoJoao || "",
             paroquiaNome: data.textoParoquiaJoao || "Paróquia Santo Antônio — Palmital–SP",
             paroquiaLogo: data.logoParoquiaJoao || "",
             historia: "Um resumo da caminhada vocacional, experiências pastorais e vivência comunitária na preparação para o Sacramento da Ordem no grau do Diaconato."
          });
      }
      renderAdminOrdenandosList();
    }

    window.addAdminOrdenando = function addAdminOrdenando() {
      window.adminOrdenandos.push({
        nome: "",
        instagram: "",
        lema: "",
        foto: "",
        paroquiaNome: "",
        paroquiaLogo: "",
        historia: "",
        pixChave: "",
        pixQrCode: ""
      });
      renderAdminOrdenandosList();
    }

    window.removeAdminOrdenando = function removeAdminOrdenando(index) {
      if(confirm("Deseja mesmo remover este ordenando?")) {
        window.adminOrdenandos.splice(index, 1);
        renderAdminOrdenandosList();
      }
    }

    window.renderAdminOrdenandosList = function renderAdminOrdenandosList() {
      var container = document.getElementById('adminOrdenandosList');
      if (!container) return;
      container.innerHTML = '';
      window.adminOrdenandos.forEach((ord, index) => {
        var div = document.createElement('div');
        div.style.cssText = "background: var(--bg-parchment-light); border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 1rem; position: relative;";
        div.innerHTML = `
          <button type="button" onclick="removeAdminOrdenando(${index})" style="position: absolute; top: 1rem; right: 1rem; background: #dc3545; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer;">Excluir</button>
          <h5 style="margin-top: 0; color: var(--gold-dark);">Ordenando ${index + 1}</h5>
          <div class="admin-field">
            <label>Nome Completo:</label>
            <input type="text" onchange="window.adminOrdenandos[${index}].nome = this.value" value="${ord.nome || ''}" />
          </div>
          <div class="admin-field">
            <label>Instagram (sem @):</label>
            <input type="text" onchange="window.adminOrdenandos[${index}].instagram = this.value" value="${ord.instagram || ''}" />
          </div>
          <div class="admin-field">
            <label>Lema Vocacional:</label>
            <input type="text" onchange="window.adminOrdenandos[${index}].lema = this.value" value="${ord.lema || ''}" />
          </div>
          <div class="admin-field">
            <label>URL / Imagem do Ordenando:</label>
            <input type="text" id="admin_ord_foto_${index}" onchange="window.adminOrdenandos[${index}].foto = this.value" value="${ord.foto || ''}" />
            <input type="file" accept="image/*" onchange="handleDynamicImageUpload(event, ${index}, 'foto')" style="margin-top: 8px; font-size: 0.9rem;" />
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Escolha uma imagem para enviar do seu dispositivo</div>
          </div>
          <div class="admin-field">
            <label>Nome da Paróquia de Origem:</label>
            <input type="text" onchange="window.adminOrdenandos[${index}].paroquiaNome = this.value" value="${ord.paroquiaNome || ''}" />
          </div>
          <div class="admin-field">
            <label>URL / Logo da Paróquia:</label>
            <input type="text" id="admin_ord_paroquiaLogo_${index}" onchange="window.adminOrdenandos[${index}].paroquiaLogo = this.value" value="${ord.paroquiaLogo || ''}" />
            <input type="file" accept="image/*" onchange="handleDynamicImageUpload(event, ${index}, 'paroquiaLogo')" style="margin-top: 8px; font-size: 0.9rem;" />
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Escolha uma imagem para enviar do seu dispositivo</div>
          </div>
          <div class="admin-field">
            <label>Chave PIX:</label>
            <input type="text" onchange="window.adminOrdenandos[${index}].pixChave = this.value" value="${ord.pixChave || ''}" placeholder="Ex: CPF, E-mail ou Telefone" />
          </div>
          <div class="admin-field">
            <label>QR Code PIX (Imagem):</label>
            <input type="text" id="admin_ord_pixQrCode_${index}" onchange="window.adminOrdenandos[${index}].pixQrCode = this.value" value="${ord.pixQrCode || ''}" placeholder="URL da imagem ou upload abaixo" />
            <input type="file" accept="image/*" onchange="handleDynamicImageUpload(event, ${index}, 'pixQrCode')" style="margin-top: 8px; font-size: 0.9rem;" />
          </div>
          <div class="admin-field">
            <label>História / Caminhada:</label>
            <textarea onchange="window.adminOrdenandos[${index}].historia = this.value" rows="3">${ord.historia || ''}</textarea>
          </div>
        `;
        container.appendChild(div);
      });
    }

    window.handleSaveOrdenandos = async function handleSaveOrdenandos() {
      if (!window.firebaseDb || !window.fsMethods) {
        showToast("Erro: Firebase não está conectado.");
        return;
      }
      const { doc, setDoc } = window.fsMethods;
      try {
        await setDoc(doc(window.firebaseDb, 'siteContent', 'main'), { ordenandos: window.adminOrdenandos }, { merge: true });
        showToast("Lista de ordenandos salva com sucesso!");
        if(window.currentSiteData) {
          window.currentSiteData.ordenandos = window.adminOrdenandos;
          applySiteDataToUI(window.currentSiteData);
        }
      } catch (err) {
        console.error("Erro ao salvar ordenandos", err);
        showToast("Erro ao salvar ordenandos: " + err.message);
      }
    }

    window.renderDynamicOrdenandosToUI = function renderDynamicOrdenandosToUI(ordenandos) {
      var data = window.currentSiteData || {};
      // 1. Atualizar a Hero Section (Nomes)
      var heroNamesWrapper = document.querySelector('.hero-names-wrapper');
      if (heroNamesWrapper) {
        heroNamesWrapper.innerHTML = '';
        ordenandos.forEach((ord, index) => {
          var h2 = document.createElement('h2');
          h2.className = 'hero-ordinand-fullname';
          h2.innerText = ord.nome;
          heroNamesWrapper.appendChild(h2);
          if (index < ordenandos.length - 1) {
            var andSpan = document.createElement('span');
            andSpan.style.cssText = "font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.25rem; color: var(--gold-primary);";
            andSpan.innerText = '&';
            heroNamesWrapper.appendChild(andSpan);
          }
        });
      }

      // 2. Atualizar a Seção Ordenandos (.ordenandos-grid)
      var grid = document.querySelector('.ordenandos-grid');
      if (grid) {
        grid.innerHTML = '';
        ordenandos.forEach(ord => {
          var card = document.createElement('article');
          card.className = 'ordinand-profile-card fade-in-stagger';
          
          var urlParoquia = ord.paroquiaUrl || '';
          if (!urlParoquia) {
            if (ord.nome.includes('Alison')) urlParoquia = data.urlParoquiaAlison || '';
            if (ord.nome.includes('Joao') || ord.nome.includes('João')) urlParoquia = data.urlParoquiaJoao || '';
          }

          var fotoHtml = '';
          if(ord.foto) {
             fotoHtml = `<img src="${ord.foto}" alt="${ord.nome}" loading="lazy" style="width:100%; height:100%; object-fit:cover;  cursor: pointer;" onclick="openLightbox(this.src)" />`;
          }
          
          var logoHtml = '';
          if(ord.paroquiaLogo) {
             logoHtml = `<img src="${ord.paroquiaLogo}" alt="Logo" class="hover-3d" loading="lazy" style="height:60px; width:auto; max-width:none; object-fit:contain;" onclick="openLightbox(this.src)" />`;
          }

          var parishContent = `
              <span style="display:inline-flex; align-items:center; color:inherit; text-decoration:none;">
                ${logoHtml ? logoHtml : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 0 1 6 0v4"/></svg>`}
              </span>
              <span>Paróquia de origem: 
                <strong style="color: inherit; text-decoration: none; border-bottom: 1px dotted var(--gold-border);">${ord.paroquiaNome}</strong>
              </span>`;
              
          if (urlParoquia) {
            parishContent = `
              <a href="${urlParoquia}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; color:inherit; text-decoration:none;">
                ${logoHtml ? logoHtml : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 0 1 6 0v4"/></svg>`}
              </a>
              <span>Paróquia de origem: 
                <a href="${urlParoquia}" target="_blank" rel="noopener noreferrer" style="color: var(--gold-dark); text-decoration: none; font-weight: 600; transition: color 0.3s ease; position: relative; z-index: 10; cursor: pointer;" onmouseover="this.style.color='var(--gold-primary)'" onmouseout="this.style.color='var(--gold-dark)'">
                  <strong style="text-decoration: underline;">${ord.paroquiaNome}</strong>
                </a>
              </span>`;
          }

          card.innerHTML = `
            <div class="ordinand-card-photo-frame" style="padding: 0; background: linear-gradient(135deg, var(--bg-parchment) 0%, #EAE2D2 100%);">
              ${fotoHtml}
            </div>
            <h3 class="ordinand-card-name">${ord.nome}</h3>
            ${ord.instagram ? `
            <div style="margin-bottom: 1rem;">
              <a href="https://www.instagram.com/${ord.instagram}/" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.85rem; color:var(--gold-dark); text-decoration:none; font-weight:600;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                @${ord.instagram}
              </a>
            </div>` : ''}
            <div class="motto-banner">
              <p class="motto-quote">${ord.lema}</p>
            </div>
            <div class="parish-info">
              ${parishContent}
            </div>
            <details class="history-details">
              <summary>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Conheça a História
              </summary>
              <div class="history-content">
                ${ord.historia || 'História não preenchida.'}
              </div>
            </details>
          `;
          grid.appendChild(card);
        });
      }
    }

    /* APLICA OS DADOS DO BANCO NA INTERFACE DO SITE */
    window.applySiteDataToUI = function applySiteDataToUI(data) {
      if (!data) return;
      window.currentSiteData = data;

      // Youtube playlist
      
      // Link Playlist Oficial
      if (data.urlPlaylistOrdenacao) {
        var linkOrdenacao = document.getElementById('btnLinkPlaylistOrdenacao');
        if (linkOrdenacao) {
          linkOrdenacao.href = data.urlPlaylistOrdenacao;
          linkOrdenacao.style.display = 'inline-flex';
        }
      } else {
        var linkOrdenacao = document.getElementById('btnLinkPlaylistOrdenacao');
        if (linkOrdenacao) linkOrdenacao.style.display = 'none';
      }

      if (data.urlPlaylistYoutube) {
         var ytIframe = document.getElementById('ytIframe');
         var rawUrl = data.urlPlaylistYoutube.trim();
         
         // HARDCODED SUNO PLAYLIST IF APPLICABLE (Based on user's AudioService)
         window.isNativeAudio = false;
         window.isYoutubeMusic = false; // Initialize to avoid undefined
         if (rawUrl.includes('suno.com') || rawUrl.includes('.mp3')) {
             window.isNativeAudio = true;
             
             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
                 
                 // Also hide the black frame container since there's no video
                 var frameContainer = ytIframe.closest('.yt-embed-frame-container');
                 if (frameContainer) frameContainer.style.display = 'none';
             }
             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = ''; // Let CSS handle visibility via .visible class
             
             // Update the link in the box to use the Ordenacao YouTube link
             var ytLink = document.querySelector('.yt-embed-box a[href*="youtube.com"]');
             if (ytLink && data.urlPlaylistOrdenacao) {
                 ytLink.href = data.urlPlaylistOrdenacao;
                 ytLink.innerText = 'Ouvir no YouTube ↗';
             }
             
             if (rawUrl.includes('.mp3')) {
                 window.ambientMusicPlaylist = rawUrl.split(',').map(u => u.trim());
                 window.currentAmbientTrackIndex = 0;
             } else {
                 // Fetch from backend proxy
                 fetch('/api/suno?url=' + encodeURIComponent(rawUrl))
                    .then(res => res.json())
                    .then(data => {
                        if (data.urls && data.urls.length > 0) {
                            window.ambientMusicPlaylist = data.urls;
                            window.currentAmbientTrackIndex = 0;
                            // If audio is already initialized but paused, we update it
                            if (window.ambientAudio) {
                                window.ambientAudio.src = window.ambientMusicPlaylist[0];
                            } else {
                                // Attempt autoplay without interaction
                                if (window.toggleSacredMusic) {
                                    window.toggleSacredMusic();
                                }
                            }
                        }
                    })
                    .catch(err => console.error("Error fetching Suno playlist:", err));
             }
             
             // WE CANNOT RETURN HERE OR THE REST OF applySiteDataToUI FAILS!
         } else {
         
         var iframeMatch = rawUrl.match(/<iframe.*?src=["'](.*?)["']/i);
         if (iframeMatch) {
             rawUrl = iframeMatch[1];
         }
         
         // Fix for Suno URLs specifically
         if (rawUrl.includes('suno.com/song/')) {
             rawUrl = rawUrl.replace('suno.com/song/', 'suno.com/embed/');
         
         } else if (rawUrl.includes('spotify.com/')) {
             if (!rawUrl.includes('/embed/')) {
                 rawUrl = rawUrl.replace('spotify.com/', 'spotify.com/embed/');
             }
         }
         
         var isYoutube = rawUrl.toLowerCase().includes('youtu');
         window.isYoutubeMusic = isYoutube;
         if (ytIframe) {
             let base = rawUrl;
             if (isYoutube) {
                 try {
                     let urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
                     if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
                         let videoId = urlObj.searchParams.get('v');
                         if (urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
                         let listId = urlObj.searchParams.get('list');
                         
                         if (urlObj.pathname.includes('/playlist') && listId) {
                             base = 'https://www.youtube-nocookie.com/embed/videoseries?list=' + listId;
                         } else if (videoId) {
                             base = 'https://www.youtube-nocookie.com/embed/' + videoId;
                             if (listId) base += '?list=' + listId;
                         } else if (urlObj.pathname.includes('/embed/')) {
                             base = urlObj.href; // already an embed link
                         } else {
                             // Fallback for short formats like "nTdhx9Zz04U?list=PLUK8yrBE-TeU" that were parsed as domain
                             base = 'https://www.youtube-nocookie.com/embed/' + rawUrl;
                         }
                     }
                 } catch(e) {
                     base = 'https://www.youtube-nocookie.com/embed/' + rawUrl;
                 }
                 
                 if (!base.includes('enablejsapi=1')) {
                     base += (base.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1&rel=0';
                 }
                 if (!base.includes('autoplay=')) {
                     base += '&autoplay=1';
                 }
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== '16 / 9') {
                     ytIframe.parentElement.style.aspectRatio = '16 / 9';
                     ytIframe.parentElement.style.height = 'auto';
                 }
             } else {
                 base = base.includes('http') ? base : 'https://' + base;
                 if (!base.includes('autoplay=')) {
                     base += (base.includes('?') ? '&' : '?') + 'autoplay=1';
                 }
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== 'unset') {
                     ytIframe.parentElement.style.aspectRatio = 'unset';
                     ytIframe.parentElement.style.height = '150px';
                 }
             }
             

             if (ytIframe.dataset.originalSrc !== base) {
                 ytIframe.dataset.originalSrc = base;
                 
                 if (window.ytPlayer) {
                     try { window.ytPlayer.destroy(); } catch(e) {}
                     window.ytPlayer = null;
                 }
                 
                 var newIframe = document.createElement('iframe');
                 newIframe.id = 'ytIframe';
                 newIframe.setAttribute('src', base);
                 newIframe.setAttribute('title', ytIframe.getAttribute('title') || 'Playlist');
                 newIframe.setAttribute('allow', ytIframe.getAttribute('allow') || 'autoplay');
                 if (ytIframe.hasAttribute('allowfullscreen')) newIframe.setAttribute('allowfullscreen', '');
                 newIframe.dataset.originalSrc = base;
                 
                 if (ytIframe.parentElement) {
                     ytIframe.parentElement.replaceChild(newIframe, ytIframe);
                     ytIframe = newIframe;
                 } else {
                     ytIframe.setAttribute('src', base);
                 }
             }
             if (isYoutube && typeof window.initYTPlayer === 'function') {
                 setTimeout(window.initYTPlayer, 200);
             }
         }
         var ytLink = document.querySelector('.yt-embed-box a[href*="youtube.com"]');
         if (ytLink) {
             ytLink.href = rawUrl.includes('http') ? rawUrl : 'https://www.youtube.com/watch?v=' + rawUrl.replace('?list=', '&list=');
             if (!isYoutube) {
                 ytLink.innerText = 'Abrir Link Externo ↗';
                                               } else {
                 ytLink.innerText = 'Abrir no YouTube ↗';
                                               }
         }
         } // END ELSE FOR NATIVE AUDIO
         
         // Se não for youtube, vamos ocultar os botões de controle específicos
         var sacredPlayBtn = document.getElementById('sacredPlayBtn');
         var btnPrev = document.querySelector('button[onclick="prevSacredMusic()"]');
         var btnNext = document.querySelector('button[onclick="nextSacredMusic()"]');
         var showButtons = isYoutube || window.isNativeAudio;
         if (sacredPlayBtn) sacredPlayBtn.style.display = showButtons ? '' : 'none';
         if (btnPrev) btnPrev.style.display = showButtons ? '' : 'none';
         if (btnNext) btnNext.style.display = showButtons ? '' : 'none';
      }


      // Renderiza ordenandos dinamicamente se a lista existir
      if (data.ordenandos && Array.isArray(data.ordenandos)) {
        renderDynamicOrdenandosToUI(data.ordenandos);
      }

      // 1. Bispo Ordenante
      if (data.bispoNome) {
        var bispoElements = document.querySelectorAll('.bishop-title');
        bispoElements.forEach(el => {
          el.innerText = data.bispoNome;
        });
      }
      if (data.bispoTitulo) {
        var titleEl = document.querySelector('.bishop-sub');
        if (titleEl) titleEl.innerText = data.bispoTitulo;
      }
      var photoContainer = document.getElementById('bishopPhotoContainer');
      var coatContainer = document.getElementById('bishopCoatContainer');
      var presidenciaIcon = document.getElementById('presidenciaIconContainer');
      var defaultIcon = document.getElementById('presidenciaDefaultIcon');

      if (data.fotoBispo && data.fotoBispo.trim() !== '') {
        var imgHtml = `<img src="${escapeHtml(data.fotoBispo.trim())}" alt="Foto do Bispo" loading="lazy" style="width:100%; height:100%; object-fit:cover;  cursor: pointer;" onclick="openLightbox(this.src)" />`;
        
        if (photoContainer) {
          photoContainer.style.display = 'flex';
          photoContainer.innerHTML = imgHtml;
        }
        if (presidenciaIcon) {
          if (defaultIcon) defaultIcon.style.display = 'none';
          Array.from(presidenciaIcon.children).forEach(child => { if (child.tagName.toLowerCase() === 'img') child.remove(); });
          presidenciaIcon.style.padding = '0';
          presidenciaIcon.insertAdjacentHTML('beforeend', imgHtml);
        }
      } else {
        if (photoContainer) photoContainer.style.display = 'none';
        if (presidenciaIcon) {
          if (defaultIcon) defaultIcon.style.display = 'block';
          Array.from(presidenciaIcon.children).forEach(child => { if (child.tagName.toLowerCase() === 'img') child.remove(); });
          presidenciaIcon.style.padding = '';
        }
      }

      if (data.brasaoBispo && data.brasaoBispo.trim() !== '') {
        if (coatContainer) {
          coatContainer.style.display = 'flex';
          coatContainer.innerHTML = `<img src="${escapeHtml(data.brasaoBispo.trim())}" class="hover-3d" alt="Brasão do Bispo" loading="lazy" style="height:100%; width:auto; max-width:none; object-fit:contain;" onclick="openLightbox(this.src)" />`;
        }
      } else {
        if (coatContainer) coatContainer.style.display = 'none';
      }

      
      
      
      // 2. Data e Horário
      if (data.dataHorario) {
        var dateText = document.querySelector('.date-text');
        if (dateText) dateText.innerText = data.dataHorario;
        var infoTextData = document.getElementById('infoTextData');
        if (infoTextData) infoTextData.innerText = data.dataHorario.split(',')[0];
        var infoTextHorario = document.getElementById('infoTextHorario');
        if (infoTextHorario && data.dataHorario.includes('às')) {
            infoTextHorario.innerText = data.dataHorario.split('às')[1].trim();
        }
        
        var heroMetaData = document.getElementById('heroMetaData');
        if (heroMetaData) {
            let p1 = data.dataHorario.split(',')[0];
            let p2 = data.dataHorario.includes('às') ? data.dataHorario.split('às')[1].trim() : '';
            heroMetaData.innerText = p1 + (p2 ? ' • ' + p2 : '');
        }
      }
      
      if (data.dataHorarioISO) {
          window.globalTargetDate = new Date(data.dataHorarioISO).getTime();
      }

      
      
      var emBreveMsg = document.getElementById('emBreveMessage');
      var cardData = document.getElementById('infoCardData');
      var cardHorario = document.getElementById('infoCardHorario');
      var cardLocal = document.getElementById('infoCardLocal');
      
      var calBox = document.querySelector('.calendar-action-box');
      var calHeaderBtn = document.querySelector('.btn-cal-header');
      var mapContainer = document.getElementById('mapContainer');
      
      if (data.emBreve) {
          if (emBreveMsg) emBreveMsg.style.display = 'block';
          if (cardData) cardData.style.display = 'none';
          if (cardHorario) cardHorario.style.display = 'none';
          if (cardLocal) cardLocal.style.display = 'none';
          
          if (calBox) calBox.style.display = 'none';
          if (calHeaderBtn) calHeaderBtn.style.display = 'none';
          if (mapContainer) mapContainer.style.display = 'none';
          
          var heroMeta = document.querySelector('.hero-meta-box');
          if (heroMeta) heroMeta.style.display = 'none';
      } else {
          if (emBreveMsg) emBreveMsg.style.display = 'none';
          if (cardData) cardData.style.display = 'flex';
          if (cardHorario) cardHorario.style.display = 'flex';
          if (cardLocal) cardLocal.style.display = 'flex';
          
          if (calBox) calBox.style.display = 'block';
          if (calHeaderBtn) calHeaderBtn.style.display = 'flex';
          if (mapContainer) mapContainer.style.display = 'block';
          
          var heroMeta = document.querySelector('.hero-meta-box');
          if (heroMeta) heroMeta.style.display = 'flex';
      }

                  // 3. Local e Endereço
      if (data.localNome || data.localEndereco) {
        var nome = data.localNome || 'Paróquia Santa Cecília';
        var endereco = data.localEndereco || 'Assis–SP';
        var locTitle = document.querySelector('.location-title-main');
        if (locTitle) {
          locTitle.innerText = `${nome}, ${endereco}`;
        }
        
        var heroMetaLocal = document.getElementById('heroMetaLocal');
        if (heroMetaLocal) {
          heroMetaLocal.innerText = `${nome} • ${endereco}`;
        }
        
        var mapsQuery = encodeURIComponent(nome + ' ' + endereco);
        var mapsIframe = document.getElementById('mapsIframe');
        if (mapsIframe) {
            mapsIframe.src = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
        }
        var mapsAppLink = document.getElementById('mapsAppLink');
        if (mapsAppLink) {
            if (data.mapsUrl && data.mapsUrl.trim() !== '') {
                mapsAppLink.href = data.mapsUrl.trim();
            } else {
                mapsAppLink.href = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
            }
        }
        
        var locEls = document.querySelectorAll('.info-card-title');
        locEls.forEach(el => {
          if (el.innerText.includes('Paróquia')) {
            el.innerText = nome;
          }
        });

        var localTextEl = document.getElementById('localCidadeText');
        if (localTextEl) {
          localTextEl.innerHTML = `<strong>${nome}</strong><br>${endereco}`;
        }
        
        var addressTextEl = document.querySelector('.location-address-text');
        if (addressTextEl) {
          addressTextEl.innerHTML = `${nome}, ${endereco}.<br>Um espaço sagrado acolhedor preparado para receber a comunidade diocesana, sacerdotes, religiosos e fiéis de todas as paróquias.`;
        }
      }

      if (data.mapsUrl && data.mapsUrl.trim() !== '') {
        var mapIframe = document.querySelector('iframe[title="Mapa da Paróquia Santa Cecília em Assis SP"]');
        if (mapIframe) {
          var url = data.mapsUrl.trim();
          if (url.includes('/maps/') || url.includes('maps.google')) {
             if (url.includes('?q=')) {
               mapIframe.src = url.replace('?q=', '/maps?q=') + '&output=embed';
             } else {
               mapIframe.src = url; 
             }
          }
        }
        
        var openMapsBtn = document.querySelector('.location-actions button');
        if (openMapsBtn) {
          openMapsBtn.onclick = () => window.open(data.mapsUrl.trim(), '_blank');
        }
      }

      // 3. Brasão Diocese
      if (data.brasaoDiocese && data.brasaoDiocese.trim() !== '') {
        var src = escapeHtml(data.brasaoDiocese.trim());
        var headerCoat = document.getElementById('headerBrasaoContainer');
        var footerCoat = document.getElementById('footerBrasaoContainer');
        var imgHtml = `<img src="${src}" alt="Brasão da Diocese de Assis" class="hover-3d" loading="lazy" style="height:44px; width:auto; max-width:none; object-fit:contain;" onclick="event.preventDefault(); openLightbox(this.src)" />`;
        var footerImgHtml = `<img src="${src}" alt="Brasão da Diocese de Assis" class="hover-3d" loading="lazy" style="height:60px; width:auto; max-width:none; object-fit:contain;" onclick="openLightbox(this.src)" />`;
        
        if (headerCoat) headerCoat.innerHTML = imgHtml;
        if (footerCoat) footerCoat.innerHTML = footerImgHtml;
      }

      // 4. Photos e logos
      if (data.fundoHero && data.fundoHero.trim() !== '') {
        var bgVitral = document.getElementById('heroBgVitral');
        if (bgVitral) {
          bgVitral.style.backgroundImage = `url('${data.fundoHero.trim()}')`;
          bgVitral.style.display = 'block';
        }
      }

      if (data.logoOrdenacao && data.logoOrdenacao.trim() !== '') {
        var logoImg = document.getElementById('mainOrdenacaoLogoImg');
        if (logoImg) logoImg.src = data.logoOrdenacao.trim();
      }

      if (data.imagemLavaPes && data.imagemLavaPes.trim() !== '') {
        var lavaPesImg = document.getElementById('jesusLavaPesImg');
        if (lavaPesImg) {
          lavaPesImg.src = data.imagemLavaPes.trim();
          lavaPesImg.style.display = 'block';
        }
      }

      if (data.fotoAlison) {
        var heroAlison = document.getElementById('heroFotoAlisonContainer');
        var cardAlison = document.getElementById('cardFotoAlisonContainer');
        
        if (heroAlison && data.fotoAlison.trim() !== '') {
          heroAlison.innerHTML = `
            <img src="${escapeHtml(data.fotoAlison)}" alt="Alison Fernando Rodrigues dos Santos" loading="lazy" style="width:100%; height:280px; object-fit:cover; border-radius: 132px 132px 6px 6px;" />
          `;
        }
        if (cardAlison && data.fotoAlison.trim() !== '') {
          cardAlison.innerHTML = `<img src="${escapeHtml(data.fotoAlison)}" alt="Alison Fernando Rodrigues dos Santos" loading="lazy" style="width:100%; height:100%; object-fit:cover; " />`;
        }
      }

      if (data.fotoJoao) {
        var heroJoao = document.getElementById('heroFotoJoaoContainer');
        var cardJoao = document.getElementById('cardFotoJoaoContainer');
        
        if (heroJoao && data.fotoJoao.trim() !== '') {
          heroJoao.innerHTML = `
            <img src="${escapeHtml(data.fotoJoao)}" alt="João Henrique de Oliveira Guarsoni" loading="lazy" style="width:100%; height:280px; object-fit:cover; border-radius: 132px 132px 6px 6px;" />
          `;
        }
        if (cardJoao && data.fotoJoao.trim() !== '') {
          cardJoao.innerHTML = `<img src="${escapeHtml(data.fotoJoao)}" alt="João Henrique de Oliveira Guarsoni" loading="lazy" style="width:100%; height:100%; object-fit:cover; " />`;
        }
      }

      // 5. Paróquias
      if (data.logoParoquiaAlison && data.logoParoquiaAlison.trim() !== '') {
        var logoAlison = document.getElementById('parishLogoAlisonContainer');
        if (logoAlison) {
          logoAlison.innerHTML = `<img src="${escapeHtml(data.logoParoquiaAlison.trim())}" alt="Paróquia Alison" loading="lazy" style="height:60px; width:auto; max-width:none; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />`;
        }
      }
      
      if (data.urlParoquiaAlison && data.urlParoquiaAlison.trim() !== '') {
        var logoContainerAlison = document.getElementById('parishLogoAlisonContainer');
        var textLinkAlison = document.getElementById('parishTextLinkAlison');
        if (logoContainerAlison) logoContainerAlison.href = data.urlParoquiaAlison.trim();
        if (textLinkAlison) textLinkAlison.href = data.urlParoquiaAlison.trim();
      }

      if (data.textoParoquiaAlison && data.textoParoquiaAlison.trim() !== '') {
        var pAlison = document.getElementById('parishTextAlison');
        if (pAlison) pAlison.innerText = data.textoParoquiaAlison;
      }
      
      if (data.logoParoquiaJoao && data.logoParoquiaJoao.trim() !== '') {
        var logoJoao = document.getElementById('parishLogoJoaoContainer');
        if (logoJoao) {
          logoJoao.innerHTML = `<img src="${escapeHtml(data.logoParoquiaJoao.trim())}" alt="Paróquia João" loading="lazy" style="height:60px; width:auto; max-width:none; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />`;
        }
      }
      
      if (data.urlParoquiaJoao && data.urlParoquiaJoao.trim() !== '') {
        var logoContainerJoao = document.getElementById('parishLogoJoaoContainer');
        var textLinkJoao = document.getElementById('parishTextLinkJoao');
        if (logoContainerJoao) logoContainerJoao.href = data.urlParoquiaJoao.trim();
        if (textLinkJoao) textLinkJoao.href = data.urlParoquiaJoao.trim();
      }

      if (data.textoParoquiaJoao && data.textoParoquiaJoao.trim() !== '') {
        var pJoao = document.getElementById('parishTextJoao');
        if (pJoao) pJoao.innerText = data.textoParoquiaJoao;
      }

      // 6. Chave PIX e Renderização da Seção
      renderPixSection(data);

      // 7. Materiais
      
      
      
      
      var setupMaterialCard = (cardId, actionsId, statusId, imageValue, linkValue, title, filename, isWhatsapp) => {
        var cardElem = document.getElementById(cardId);
        var actionsElem = document.getElementById(actionsId);
        var statusElem = document.getElementById(statusId);

        if (cardElem && actionsElem && statusElem) {
            // Clear existing buttons to rebuild them
            actionsElem.innerHTML = '';
            
            var hasImage = imageValue && imageValue.trim() !== '';
            var hasLink = linkValue && linkValue.trim() !== '';

            if (hasImage || hasLink) {
                actionsElem.style.display = 'flex';
                statusElem.style.display = 'none';
                cardElem.style.opacity = '1';
                cardElem.style.pointerEvents = 'auto';

                // Botão Acessar (se tiver link)
                if (hasLink) {
                    let btnAcessar = document.createElement('button');
                    btnAcessar.innerText = 'Acessar';
                    btnAcessar.style.cssText = 'background: none; border: 1px solid var(--gold-border); border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.7rem; cursor: pointer; color: var(--text-main); font-family: inherit;';
                    btnAcessar.onclick = (e) => { e.preventDefault(); window.open(linkValue, '_blank'); };
                    actionsElem.appendChild(btnAcessar);
                }

                // Botão Baixar (se tiver imagem)
                if (hasImage) {
                    let btnBaixar = document.createElement('button');
                    btnBaixar.innerText = 'Baixar';
                    btnBaixar.style.cssText = 'background: none; border: 1px solid var(--gold-border); border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.7rem; cursor: pointer; color: var(--text-main); font-family: inherit; margin-left: ' + (hasLink ? '4px' : '0') + ';';
                    btnBaixar.onclick = (e) => { e.preventDefault(); window.downloadMedia(imageValue, filename); };
                    actionsElem.appendChild(btnBaixar);
                }

                // Botão Compartilhar (sempre que tiver imagem ou link)
                let btnCompartilhar = document.createElement('button');
                btnCompartilhar.innerText = 'Compartilhar';
                btnCompartilhar.style.cssText = 'background: var(--gold-soft); border: 1px solid var(--gold-border); border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.7rem; cursor: pointer; color: var(--gold-dark); font-weight: bold; font-family: inherit; margin-left: 4px;';
                btnCompartilhar.onclick = (e) => { 
                    e.preventDefault(); 
                    if (hasImage) {
                        window.sharePost(imageValue, title, filename, isWhatsapp);
                    } else {
                        window.sharePost(linkValue, title, filename, isWhatsapp); 
                    }
                };
                actionsElem.appendChild(btnCompartilhar);

            } else {
                actionsElem.style.display = 'none';
                statusElem.style.display = 'block';
                statusElem.innerText = 'Em breve';
                statusElem.style.color = 'var(--text-muted)';
                cardElem.style.opacity = '0.65';
            }
        }
      };

      setupMaterialCard('cardMaterialWhatsapp', 'actionsWhatsapp', 'statusWhatsapp', data.urlWhatsapp, data.linkPostWhatsapp, 'Postagem WhatsApp', 'postagem_whatsapp', true);
      setupMaterialCard('cardMaterialInstagram', 'actionsInstagram', 'statusInstagram', data.urlInstagram, data.linkPostInstagram, 'Feed Oficial', 'postagem_feed', true);
      setupMaterialCard('cardMaterialFacebook', 'actionsFacebook', 'statusFacebook', data.urlFacebook, data.linkPostFacebook, 'Stories Oficial', 'postagem_stories', true);




      // Do the same for Livreto and Convite
      var linkLivreto = document.getElementById('linkMaterialLivreto');
      var statusLivreto = document.getElementById('statusLivreto');
      if (linkLivreto && statusLivreto) {
        if (data.urlLivreto && data.urlLivreto.trim() !== '') {
          linkLivreto.href = '#';
          linkLivreto.onclick = (e) => { e.preventDefault(); window.shareMedia(data.urlLivreto, 'Livreto da Missa', 'livreto_missa'); };
          linkLivreto.style.opacity = '1';
          linkLivreto.style.pointerEvents = 'auto';
          statusLivreto.innerText = 'Acessar / Baixar';
          statusLivreto.style.background = 'rgba(40, 167, 69, 0.15)';
          statusLivreto.style.color = '#1e7e34';
        } else {
          linkLivreto.removeAttribute('href');
          linkLivreto.onclick = null;
          linkLivreto.style.opacity = '0.65';
          linkLivreto.style.pointerEvents = 'none';
          statusLivreto.innerText = 'Disponível em breve';
          statusLivreto.style.background = 'var(--gold-soft)';
          statusLivreto.style.color = 'var(--text-muted)';
        }
      }

      var linkConvite = document.getElementById('linkMaterialConvite');
      var statusConvite = document.getElementById('statusConvite');
      if (linkConvite && statusConvite) {
        if (data.urlConvite && data.urlConvite.trim() !== '') {
          linkConvite.href = '#';
          linkConvite.onclick = (e) => { e.preventDefault(); window.shareMedia(data.urlConvite, 'Convite Oficial', 'convite_oficial'); };
          linkConvite.style.opacity = '1';
          linkConvite.style.pointerEvents = 'auto';
          statusConvite.innerText = 'Compartilhar / Baixar';
          statusConvite.style.background = 'rgba(40, 167, 69, 0.15)';
          statusConvite.style.color = '#1e7e34';
        } else {
          linkConvite.removeAttribute('href');
          linkConvite.onclick = null;
          linkConvite.style.opacity = '0.65';
          linkConvite.style.pointerEvents = 'none';
          statusConvite.innerText = 'Disponível em breve';
          statusConvite.style.background = 'var(--gold-soft)';
          statusConvite.style.color = 'var(--text-muted)';
        }
      }


      // --- CONFIGURAÇÕES DE EXIBIÇÃO ---
      var showHistoria = data.showHistoria !== false;
      var histBtns = document.querySelectorAll('.history-details');
      histBtns.forEach(el => el.style.display = showHistoria ? 'block' : 'none');
      var showOrdenandos = data.showOrdenandos !== false;
      var showInformacoes = data.showInformacoes !== false;
      var showLocalizacao = data.showLocalizacao !== false;
      var showOracoes = data.showOracoes !== false; // Padrão: true
      var showMateriais = data.showMateriais !== false;
      var showApoio = data.showApoio !== false;
      var showPixQrCode = data.showPixQrCode !== false;
      
      var toggleSection = (id, show) => {
        var sectionEl = document.getElementById(id);
        if (sectionEl) sectionEl.style.display = show ? 'block' : 'none';
        
        // Esconder links no menu de navegação e rodapé
        var linkNav = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (linkNav && linkNav.parentElement) linkNav.parentElement.style.display = show ? '' : 'none';
        
        var linkFooter = document.querySelector(`.footer-links-nav a[href="#${id}"]`);
        if (linkFooter) linkFooter.style.display = show ? 'inline-block' : 'none';
      };

      toggleSection('ordenandos', showOrdenandos);
      toggleSection('informacoes', showInformacoes);
      toggleSection('localizacao', showLocalizacao);
      toggleSection('oracoes', showOracoes);
      toggleSection('materiais', showMateriais);
      toggleSection('apoio', showApoio);
      renderSiteGiftList();
      
      var pixQrContainer = document.getElementById('pixQrCodeContainer');
      if (pixQrContainer) {
         pixQrContainer.style.display = showPixQrCode ? 'flex' : 'none';
      }
      
      // Smart splash screen removal
      if (typeof window.checkAndHideSplash === 'function') {
        window.checkAndHideSplash();
      }
    }

    /* PREENCHE OS CAMPOS DO FORMULÁRIO DO PAINEL ADMIN COM DADOS DO BANCO */
    window.populateAdminFormFields = function populateAdminFormFields(data) {
      if (!data) return;
      var setVal = (id, val) => {
        var el = document.getElementById(id);
        if (el && val !== undefined) el.value = val;
      };

      setVal('inputFundoHero', data.fundoHero || '');
      setVal('inputImagemLavaPes', data.imagemLavaPes || '');
      setVal('inputLogoOrdenacao', data.logoOrdenacao || '');
      setVal('inputFotoAlison', data.fotoAlison || '');
      setVal('inputFotoJoao', data.fotoJoao || '');
      setVal('inputBrasaoDiocese', data.brasaoDiocese || '');
      setVal('inputLogoParoquiaAlison', data.logoParoquiaAlison || '');
      setVal('inputTextoParoquiaAlison', data.textoParoquiaAlison || 'Paróquia Nossa Senhora da Boa Esperança — Lutécia–SP');
      setVal('inputLogoParoquiaJoao', data.logoParoquiaJoao || '');
      setVal('inputTextoParoquiaJoao', data.textoParoquiaJoao || 'Paróquia Santo Antônio — Palmital–SP');
      setVal('inputPixQrCode', data.pixQrCode || '');
      setVal('inputBispoNome', data.bispoNome || 'Dom Argemiro de Azevedo, CMF');
      setVal('inputBispoTitulo', data.bispoTitulo || 'Bispo Diocesano de Assis');
      setVal('inputFotoBispo', data.fotoBispo || '');
      setVal('inputBrasaoBispo', data.brasaoBispo || '');
      setVal('inputShareMessage', data.shareMessage || '');
      setVal('inputShareImage', data.shareImage || '');
      const previewShareImage = document.getElementById('previewShareImage');
      if (previewShareImage && data.shareImage) { previewShareImage.src = data.shareImage; previewShareImage.style.display = 'block'; }
            setVal('inputUrlLivreto', data.urlLivreto || '');
      setVal('inputUrlConvite', data.urlConvite || '');
      setVal('inputUrlWhatsapp', data.urlWhatsapp || '');
      setVal('inputUrlInstagram', data.urlInstagram || '');
      setVal('inputUrlFacebook', data.urlFacebook || '');
      
      const setupPreview = (inputId, previewId) => {
         const val = document.getElementById(inputId)?.value;
         const prev = document.getElementById(previewId);
         if (prev && val && val.startsWith('data:image')) {
            prev.src = val; prev.style.display = 'block';
         }
      };
      setupPreview('inputUrlConvite', 'previewUrlConvite');
      setupPreview('inputUrlWhatsapp', 'previewUrlWhatsapp');
      setupPreview('inputUrlInstagram', 'previewUrlInstagram');
      setupPreview('inputUrlFacebook', 'previewUrlFacebook');
      setVal('linkPostWhatsapp', data.linkPostWhatsapp || '');
      setVal('linkPostInstagram', data.linkPostInstagram || '');
      setVal('linkPostFacebook', data.linkPostFacebook || '');
      setVal('inputCartaAgradecimento', data.cartaAgradecimento || 'Queridos irmãos e irmãs, com o coração repleto de alegria e gratidão, rendemos graças a Deus e a toda a comunidade por nos acompanharem neste momento tão especial de nossas vidas. Que o Senhor abençoe a todos!');
      setVal('inputUrlPlaylistYoutube', data.urlPlaylistYoutube || 'nTdhx9Zz04U?list=PLUK8yrBE-TeU');
      setVal('inputUrlPlaylistOrdenacao', data.urlPlaylistOrdenacao || '');
      setVal('inputDataHorario', data.dataHorario || '19 de Novembro de 2026, às 19h00');
      setVal('inputDataISO', data.dataHorarioISO || '2026-11-19T19:00');
      if(document.getElementById('inputEmBreve')) {
        document.getElementById('inputEmBreve').checked = !!data.emBreve;
      }
      setVal('inputDataISO', data.dataHorarioISO || '2026-11-19T19:00');
      if(document.getElementById('inputEmBreve')) {
        document.getElementById('inputEmBreve').checked = !!data.emBreve;
      }
      setVal('inputLocalNome', data.localNome || 'Paróquia Santa Cecília');
      setVal('inputLocalEndereco', data.localEndereco || 'Assis – SP');
      setVal('inputMapsUrl', data.mapsUrl || '');
      setVal('inputLemaGeral', data.lemaGeral || "'Servi ao Senhor com alegria' (Sl 99,2)");
      setVal('inputLemaAlison', data.lemaAlison || "'Graça e Paz' (1Pe 1,2)");
      setVal('inputLemaJoao', data.lemaJoao || "'Eis-me aqui, envia-me' (Is 6,8)");
      setVal('inputPixChave', data.pixChave || '');
      setVal('inputPixChaveAlison', data.pixChaveAlison || '');
      setVal('inputPixNomeAlison', data.pixNomeAlison || '');
      setVal('inputPixChaveJoao', data.pixChaveJoao || '');
      setVal('inputPixNomeJoao', data.pixNomeJoao || '');
      setVal('inputPixNome', data.pixNome || '');
      setVal('inputPixBanco', data.pixBanco || '');

      var setCheck = (id, val) => {
        var el = document.getElementById(id);
        if (el) el.checked = (val !== false); // Se undefined, padrão true
      };
      setCheck('inputShowHistoria', data.showHistoria);
      setCheck('inputShowOrdenandos', data.showOrdenandos);
      setCheck('inputShowInformacoes', data.showInformacoes);
      setCheck('inputShowLocalizacao', data.showLocalizacao);
      setCheck('inputShowOracoes', data.showOracoes);
      setCheck('inputShowMateriais', data.showMateriais);
      setCheck('inputShowApoio', data.showApoio);
      setCheck('inputShowPixQrCode', data.showPixQrCode);
    }

    /* ESCUTA EM TEMPO REAL DAS ORAÇÕES NO FIRESTORE */
    window.listenToPrayersInFirestore = function listenToPrayersInFirestore() {
      if (!window.firebaseDb || !window.fsMethods) {
        renderPrayersFeedLocal();
        return;
      }
      const { collection, onSnapshot } = window.fsMethods;

      onSnapshot(collection(window.firebaseDb, 'prayers'), (snapshot) => {
        cachedPrayers = [];
        snapshot.forEach(docSnap => {
          var item = docSnap.data();
          cachedPrayers.push({ id: docSnap.id, ...item });
        });
        
        cachedPrayers.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        renderPublicPrayersFeed();
        updateAdminPrayersDashboard();
      }, (err) => {
        console.error("Erro na escuta das orações no Firestore:", err);
        renderPrayersFeedLocal();
      });
    }

    /* RENDERIZA O MURAL PÚBLICO DE ORAÇÕES */
    var publicPrayersFilter = 'recentes';

    window.setPublicPrayersFilter = function setPublicPrayersFilter(filter) {
      publicPrayersFilter = filter;
      
      var btnRecentes = document.getElementById('btnFilterRecentes');
      var btnRelevantes = document.getElementById('btnFilterRelevantes');
      
      if (filter === 'recentes') {
        if (btnRecentes) {
          btnRecentes.style.background = 'var(--gold-soft)';
          btnRecentes.style.color = 'var(--gold-dark)';
        }
        if (btnRelevantes) {
          btnRelevantes.style.background = 'transparent';
          btnRelevantes.style.color = 'var(--text-muted)';
        }
      } else {
        if (btnRelevantes) {
          btnRelevantes.style.background = 'var(--gold-soft)';
          btnRelevantes.style.color = 'var(--gold-dark)';
        }
        if (btnRecentes) {
          btnRecentes.style.background = 'transparent';
          btnRecentes.style.color = 'var(--text-muted)';
        }
      }
      
      renderPublicPrayersFeed();
    }

    window.toggleLikePrayer = function toggleLikePrayer(prayerId) {
      if (window.firebaseDb && window.fsMethods) {
        const { doc, updateDoc, increment } = window.fsMethods;
        var prayerRef = doc(window.firebaseDb, 'prayers', prayerId.toString());
        
        var likedPrayers = JSON.parse(localStorage.getItem('liked_prayers') || '{}');
        var isLiked = !!likedPrayers[prayerId];
        var val = isLiked ? -1 : 1;
        
        updateDoc(prayerRef, {
          likes: increment(val)
        }).then(() => {
          if (isLiked) {
            delete likedPrayers[prayerId];
          } else {
            likedPrayers[prayerId] = true;
          }
          localStorage.setItem('liked_prayers', JSON.stringify(likedPrayers));
        }).catch(err => console.error("Erro ao curtir:", err));
      } else {
        // Fallback local
        var likedPrayers = JSON.parse(localStorage.getItem('liked_prayers') || '{}');
        var isLiked = !!likedPrayers[prayerId];
        var val = isLiked ? -1 : 1;

        var prayers = getStoredPrayers();
        var index = prayers.findIndex(p => p.id == prayerId);
        if (index > -1) {
          prayers[index].likes = Math.max(0, (prayers[index].likes || 0) + val);
          savePrayers(prayers);
          
          if (isLiked) {
            delete likedPrayers[prayerId];
          } else {
            likedPrayers[prayerId] = true;
          }
          localStorage.setItem('liked_prayers', JSON.stringify(likedPrayers));
          renderPrayersFeedLocal();
        }
      }
    }

    var feedAutoScrollInterval;
    var prayersCurrentPage = 1;
    var prayersPerPage = 5;

    window.changePrayersPage = function(delta) {
      prayersCurrentPage += delta;
      window.renderPublicPrayersFeed();
    };

    window.renderPublicPrayersFeed = function renderPublicPrayersFeed() {
      var feedContainer = document.getElementById('prayersFeed');
      if (!feedContainer) return;
      feedContainer.innerHTML = '';
      
      clearInterval(feedAutoScrollInterval);

      var approvedList = cachedPrayers.filter(p => p.status === 'approved' || p.status === 'aprovada');
      
      if (publicPrayersFilter === 'relevantes') {
        approvedList.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      } else {
        // Recentes já está ordenado por padrão na escuta
        approvedList.sort((a, b) => {
          var timeA = a.createdAt?.seconds || (typeof a.id === 'number' ? a.id : 0);
          var timeB = b.createdAt?.seconds || (typeof b.id === 'number' ? b.id : 0);
          return timeB - timeA;
        });
      }

      if (approvedList.length === 0) {
        feedContainer.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem; font-style: italic;">
            Nenhuma intenção publicada até o momento. Seja o primeiro a enviar sua prece!
          </div>
        `;
        return;
      }
      
      var totalPages = Math.ceil(approvedList.length / prayersPerPage);
      if (prayersCurrentPage > totalPages && totalPages > 0) prayersCurrentPage = totalPages;
      if (prayersCurrentPage < 1) prayersCurrentPage = 1;
      
      var startIndex = (prayersCurrentPage - 1) * prayersPerPage;
      var paginatedList = approvedList.slice(startIndex, startIndex + prayersPerPage);
      
      var likedPrayers = JSON.parse(localStorage.getItem('liked_prayers') || '{}');

      paginatedList.forEach((prayer, index) => {
        var card = document.createElement('div');
        card.className = 'prayer-card-item prayer-card-animated';
        card.style.animationDelay = `${index * 0.1}s`;
        
        var authorText = escapeHtml(prayer.author || prayer.nome || 'Anônimo');
        if (prayer.location) {
          authorText += ` <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400; margin-left: 0.25rem;">— ${escapeHtml(prayer.location)}</span>`;
        }
        
        var avatarHtml = '';
        if (prayer.userPhotoURL) {
          avatarHtml = `<img src="${escapeHtml(prayer.userPhotoURL)}" alt="Foto do autor" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold-soft); margin-right: 0.5rem;" />`;
        } else {
          avatarHtml = `<div style="width: 32px; height: 32px; border-radius: 50%; background: var(--bg-parchment); border: 1px solid var(--gold-soft); margin-right: 0.5rem; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--gold-dark); font-weight: bold;">${(prayer.author || prayer.nome || 'A').charAt(0).toUpperCase()}</div>`;
        }
        
        var isLiked = likedPrayers[prayer.id];
        var likeColor = isLiked ? 'var(--gold-primary)' : 'var(--text-muted)';
        var likeFill = isLiked ? 'currentColor' : 'none';

        card.innerHTML = `
          <div class="prayer-card-header" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              ${avatarHtml}
              <span class="prayer-author">${authorText}</span>
            </div>
            <button onclick="toggleLikePrayer('${prayer.id}')" style="background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:0.3rem; color:${likeColor}; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${likeFill}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span style="font-size: 0.8rem; font-weight: 600;">${prayer.likes || 0}</span>
            </button>
          </div>
          <p class="prayer-text-content" style="margin-top: 0.5rem;">"${escapeHtml(prayer.text || prayer.intencao || '')}"</p>
        `;
        feedContainer.appendChild(card);
      });

      // Renderizar controles de paginação
      if (totalPages > 1) {
        var paginationDiv = document.createElement('div');
        paginationDiv.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--gold-soft);";
        
        var prevDisabled = prayersCurrentPage === 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';
        var nextDisabled = prayersCurrentPage === totalPages ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';
        
        paginationDiv.innerHTML = `
          <button onclick="changePrayersPage(-1)" class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" ${prevDisabled}>Anterior</button>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Página ${prayersCurrentPage} de ${totalPages}</span>
          <button onclick="changePrayersPage(1)" class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" ${nextDisabled}>Próxima</button>
        `;
        feedContainer.appendChild(paginationDiv);
      }
    }

    window.renderPrayersFeedLocal = function renderPrayersFeedLocal() {
      var prayers = getStoredPrayers();
      cachedPrayers = prayers;
      renderPublicPrayersFeed();
      updateAdminPrayersDashboard();
    }

    /* PAINEL DE CONTROLE ADMIN - RENDERIZAR ORAÇÕES */
    window.updateAdminPrayersDashboard = function updateAdminPrayersDashboard() {
      var pendingCnt = cachedPrayers.filter(p => p.status === 'pending' || p.status === 'pendente').length;
      var approvedCnt = cachedPrayers.filter(p => p.status === 'approved' || p.status === 'aprovada').length;
      var rejectedCnt = cachedPrayers.filter(p => p.status === 'rejected' || p.status === 'rejeitada').length;
      
      var badge = document.getElementById('adminPendingBadge');
      if (badge) badge.innerText = pendingCnt;

      var setCnt = (id, val) => {
        var el = document.getElementById(id);
        if (el) el.innerText = val;
      };
      setCnt('cntAll', cachedPrayers.length);
      setCnt('cntPending', pendingCnt);
      setCnt('cntApproved', approvedCnt);
      setCnt('cntRejected', rejectedCnt);

      renderAdminPrayersList();
    }

    window.filterAdminPrayers = function filterAdminPrayers(filterType) {
      currentAdminFilter = filterType;
      
      ['All', 'Pending', 'Approved', 'Rejected'].forEach(type => {
        var btn = document.getElementById('filterBtn' + type);
        if (btn) btn.classList.remove('active');
      });

      var activeBtn = document.getElementById('filterBtn' + filterType.charAt(0).toUpperCase() + filterType.slice(1));
      if (activeBtn) activeBtn.classList.add('active');

      renderAdminPrayersList();
    }

    window.renderAdminPrayersList = function renderAdminPrayersList() {
      var container = document.getElementById('adminPrayersListContainer');
      if (!container) return;

      container.innerHTML = '';

      var filtered = cachedPrayers;
      if (currentAdminFilter === 'pending') {
        filtered = cachedPrayers.filter(p => p.status === 'pending' || p.status === 'pendente');
      } else if (currentAdminFilter === 'approved') {
        filtered = cachedPrayers.filter(p => p.status === 'approved' || p.status === 'aprovada');
      } else if (currentAdminFilter === 'rejected') {
        filtered = cachedPrayers.filter(p => p.status === 'rejected' || p.status === 'rejeitada');
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem; font-style: italic; background: var(--bg-surface); border: 1px solid var(--gold-border); border-radius: 6px;">
            Nenhuma intenção encontrada nesta categoria.
          </div>
        `;
        return;
      }

      filtered.forEach(prayer => {
        var statusKey = prayer.status === 'approved' || prayer.status === 'aprovada' ? 'Aprovada' :
                          prayer.status === 'rejected' || prayer.status === 'rejeitada' ? 'Rejeitada' : 'Pendente';
        
        var badgeBg = statusKey === 'Aprovada' ? '#D1E7DD' : statusKey === 'Rejeitada' ? '#F8D7DA' : '#FFF3CD';
        var badgeFg = statusKey === 'Aprovada' ? '#0F5132' : statusKey === 'Rejeitada' ? '#842029' : '#856404';

        var item = document.createElement('div');
        item.style.cssText = 'background: var(--bg-surface); border: 1px solid var(--gold-border); border-radius: 6px; padding: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;';
        
        var authorText = escapeHtml(prayer.author || prayer.nome || 'Anônimo');
        if (prayer.location) {
          authorText += ` <span style="color: var(--text-muted); font-weight: 400; font-size: 0.8rem; margin-left: 0.25rem;">— ${escapeHtml(prayer.location)}</span>`;
        }

        var avatarHtml = '';
        if (prayer.userPhotoURL) {
          avatarHtml = `<img src="${escapeHtml(prayer.userPhotoURL)}" alt="Foto" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold-soft); margin-right: 0.4rem;" />`;
        }

        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 700; color: var(--gold-dark);">
            <div style="display: flex; align-items: center;">
              ${avatarHtml}
              <span>Fiel: ${authorText}</span>
            </div>
            <span style="font-size: 0.72rem; background: ${badgeBg}; color: ${badgeFg}; padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid rgba(0,0,0,0.05);">${statusKey}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5; font-style: italic; margin: 0;">
            "${escapeHtml(prayer.text || prayer.intencao || '')}"
          </p>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
            ${statusKey !== 'Aprovada' ? `
              <button onclick="changePrayerStatus('${prayer.id}', 'approved')" class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                ✓ Aprovar
              </button>
            ` : ''}
            ${statusKey !== 'Rejeitada' ? `
              <button onclick="changePrayerStatus('${prayer.id}', 'rejected')" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; border-color: #DC3545; color: #DC3545;">
                🚫 Ocultar
              </button>
            ` : ''}
            <button onclick="deletePrayerInFirestore('${prayer.id}')" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; border-color: var(--text-light); color: var(--text-muted);">
              🗑️ Excluir
            </button>
          </div>
        `;
        container.appendChild(item);
      });
    }

    /* ALTERA STATUS DE UMA ORAÇÃO NO FIRESTORE */
    window.changePrayerStatus = function changePrayerStatus(prayerId, newStatus) {
      if (window.firebaseDb && window.fsMethods) {
        const { doc, updateDoc } = window.fsMethods;
        updateDoc(doc(window.firebaseDb, 'prayers', prayerId), {
          status: newStatus
        }).then(() => {
          showToast(`Status da oração atualizado para '${newStatus === 'approved' ? 'Aprovada' : 'Rejeitada'}'.`);
        }).catch(err => {
          console.error("Erro ao atualizar oração:", err);
          showToast("Erro ao atualizar oração no banco de dados.");
        });
      } else {
        var prayers = getStoredPrayers();
        var item = prayers.find(p => p.id == prayerId);
        if (item) {
          item.status = newStatus === 'approved' ? 'aprovada' : 'rejeitada';
          savePrayers(prayers);
          renderPrayersFeedLocal();
          showToast("Status da intenção atualizado!");
        }
      }
    }

    /* EXCLUI ORAÇÃO NO FIRESTORE */
    window.deletePrayerInFirestore = function deletePrayerInFirestore(prayerId) {
      if (!confirm("Tem certeza de que deseja excluir permanentemente esta oração?")) return;

      if (window.firebaseDb && window.fsMethods) {
        const { doc, deleteDoc } = window.fsMethods;
        deleteDoc(doc(window.firebaseDb, 'prayers', prayerId)).then(() => {
          showToast("Intenção excluída do banco de dados.");
        }).catch(err => {
          console.error("Erro ao excluir oração:", err);
          showToast("Erro ao excluir do banco de dados.");
        });
      } else {
        var prayers = getStoredPrayers();
        prayers = prayers.filter(p => p.id != prayerId);
        savePrayers(prayers);
        renderPrayersFeedLocal();
        showToast("Intenção excluída com sucesso.");
      }
    }

    /* ADICIONA ORAÇÃO DIRETA PELO ADMIN */
    window.promptAddDirectPrayer = function promptAddDirectPrayer() {
      var author = prompt("Nome do fiel ou identificação:", "Ordenante");
      if (!author) return;
      var location = prompt("Paróquia / Comunidade e Cidade (Opcional):", "");
      var text = prompt("Texto da intenção de oração:");
      if (!text) return;

      if (window.firebaseDb && window.fsMethods) {
        const { collection, addDoc, serverTimestamp } = window.fsMethods;
        addDoc(collection(window.firebaseDb, 'prayers'), {
          author: author.trim(),
          location: location ? location.trim() : '',
          text: text.trim(),
          status: 'approved',
          createdAt: serverTimestamp()
        }).then(() => {
          showToast("Intenção criada e aprovada no banco de dados.");
        });
      } else {
        var prayers = getStoredPrayers();
        prayers.unshift({ id: Date.now(), author: author.trim(), location: location ? location.trim() : '', text: text.trim(), status: 'aprovada' });
        savePrayers(prayers);
        renderPrayersFeedLocal();
        showToast("Intenção adicionada com sucesso!");
      }
    }

    /* LISTA DE TERMOS RESTRITOS PARA MODERAÇÃO */
    var PROFANITY_LIST = [
      'palavrao', 'xingamento', 'ofensa', 'improprio', 'idiota', 'babaca', 'otario',
      'desgraça', 'maldicao', 'porcaria', 'droga', 'bosta', 'merda', 'filho da puta',
      'caralho', 'porra', 'puta', 'vai tomar'
    ];

    var defaultPrayers = [
      {
        id: 1,
        author: 'Um fiel da Diocese',
        text: 'Que Nossa Senhora Virgem Maria abençoe e ilumine o ministério diaconal de Alison e João Henrique.',
        status: 'aprovada'
      },
      {
        id: 2,
        author: 'Família Silva',
        text: 'Em comunhão e oração por suas vocações e por todas as famílias dos nossos futuros diáconos.',
        status: 'aprovada'
      },
      {
        id: 3,
        author: 'Anônimo',
        text: 'Senhor, enviai operários para a vossa colheita. Que a graça do Espírito Santo fortaleça o sim dos ordinandos.',
        status: 'aprovada'
      }
    ];

    window.handleDynamicImageUpload = function handleDynamicImageUpload(event, index, field) {
      var file = event.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          var MAX_WIDTH = 500;
          var MAX_HEIGHT = 500;
          var width = img.width;
          var height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width; canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/webp', 0.6);
          if (window.adminOrdenandos[index]) {
             window.adminOrdenandos[index][field] = dataUrl;
             // also update the visible text input next to it
             var textInput = document.getElementById('admin_ord_' + field + '_' + index);
             if(textInput) textInput.value = dataUrl;
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
    window.handleImageUpload = function handleImageUpload(event, inputId) {
      var file = event.target.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          
          // Resolução padrão HD (1080p ideal para redes sociais e leveza)
          var MAX_WIDTH = 1080;
          var MAX_HEIGHT = 1080;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');
          
          // Fundo branco para imagens com transparência convertidas
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Compressão inteligente e adaptativa
          var quality = 0.85;
          var dataUrl = canvas.toDataURL('image/webp', quality);
          
          // Teto de ~100KB em Base64 (135.000 caracteres)
          // Isso garante que o banco de dados suporte várias fotos na mesma página
          var TARGET_SIZE = 135000; 

          while (dataUrl.length > TARGET_SIZE && quality > 0.4) {
             quality -= 0.1;
             dataUrl = canvas.toDataURL('image/webp', quality);
          }
          
          // Se mesmo na qualidade 0.4 continuar muito grande, reduzimos a dimensão (resize pela metade)
          if (dataUrl.length > TARGET_SIZE) {
             canvas.width = Math.round(width * 0.7);
             canvas.height = Math.round(height * 0.7);
             ctx.fillStyle = '#FFFFFF';
             ctx.fillRect(0, 0, canvas.width, canvas.height);
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
             dataUrl = canvas.toDataURL('image/webp', 0.6);
          }
            
          // Set to text input
          var textInput = document.getElementById(inputId);
          if (textInput) {
            textInput.value = dataUrl;
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    document.addEventListener('DOMContentLoaded', () => {
    // Autoplay fallback for strict browsers (Chrome/Safari)
    let audioStarted = false;
    const startAudio = () => {
        if (audioStarted) return;
        if (window.isNativeAudio && window.ambientAudio && window.ambientAudio.paused) {
            window.ambientAudio.play().then(() => {
                audioStarted = true;
                updateMusicUI(true);
            }).catch(e => console.log("Autoplay blocked:", e));
        } else if (!window.isNativeAudio && window.ytPlayer && typeof window.ytPlayer.playVideo === 'function') {
            window.ytPlayer.playVideo();
            audioStarted = true;
            updateMusicUI(true);
        }
    };
    
    // Listen for user interactions to unlock audio
    ['scroll', 'click', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, startAudio, { once: true, passive: true });
    });

      var fileFundoHero = document.getElementById('fileFundoHero');
      if (fileFundoHero) {
        fileFundoHero.addEventListener('change', (e) => handleImageUpload(e, 'inputFundoHero'));
      }
      var fileImagemLavaPes = document.getElementById('fileImagemLavaPes');
      if (fileImagemLavaPes) {
        fileImagemLavaPes.addEventListener('change', (e) => handleImageUpload(e, 'inputImagemLavaPes'));
      }
      var fileLogoOrdenacao = document.getElementById('fileLogoOrdenacao');
      if (fileLogoOrdenacao) {
        fileLogoOrdenacao.addEventListener('change', (e) => handleImageUpload(e, 'inputLogoOrdenacao'));
      }
      var fileAlison = document.getElementById('fileFotoAlison');
      if (fileAlison) {
        fileAlison.addEventListener('change', (e) => handleImageUpload(e, 'inputFotoAlison'));
      }
      var fileJoao = document.getElementById('fileFotoJoao');
      if (fileJoao) {
        fileJoao.addEventListener('change', (e) => handleImageUpload(e, 'inputFotoJoao'));
      }
      var fileBrasao = document.getElementById('fileBrasaoDiocese');
      if (fileBrasao) {
        fileBrasao.addEventListener('change', (e) => handleImageUpload(e, 'inputBrasaoDiocese'));
      }
      var fileParoquiaAlison = document.getElementById('fileLogoParoquiaAlison');
      if (fileParoquiaAlison) {
        fileParoquiaAlison.addEventListener('change', (e) => handleImageUpload(e, 'inputLogoParoquiaAlison'));
      }
      var fileParoquiaJoao = document.getElementById('fileLogoParoquiaJoao');
      if (fileParoquiaJoao) {
        fileParoquiaJoao.addEventListener('change', (e) => handleImageUpload(e, 'inputLogoParoquiaJoao'));
      }
      var filePix = document.getElementById('filePixQrCode');
      if (filePix) {
        filePix.addEventListener('change', (e) => handleImageUpload(e, 'inputPixQrCode'));
      }
      var fileFotoBispo = document.getElementById('fileFotoBispo');
      if (fileFotoBispo) {
        fileFotoBispo.addEventListener('change', (e) => handleImageUpload(e, 'inputFotoBispo'));
      }
      
      // Handlers for Materials
      const setupMaterialUpload = (fileId, inputId, previewId) => {
         const el = document.getElementById(fileId);
         if (el) {
            el.addEventListener('change', (e) => {
               handleImageUpload(e, inputId);
               setTimeout(() => {
                 const prev = document.getElementById(previewId);
                 const val = document.getElementById(inputId).value;
                 if (prev && val) { prev.src = val; prev.style.display = 'block'; }
               }, 1500);
            });
         }
      };
      setupMaterialUpload('fileUrlConvite', 'inputUrlConvite', 'previewUrlConvite');
      setupMaterialUpload('fileUrlWhatsapp', 'inputUrlWhatsapp', 'previewUrlWhatsapp');
      setupMaterialUpload('fileUrlInstagram', 'inputUrlInstagram', 'previewUrlInstagram');
      setupMaterialUpload('fileUrlFacebook', 'inputUrlFacebook', 'previewUrlFacebook');

      var fileUrlLivreto = document.getElementById('fileUrlLivreto');
      if (fileUrlLivreto) {
        fileUrlLivreto.addEventListener('change', (e) => {
          var file = e.target.files[0];
          if (!file) return;
          if (file.size > 750 * 1024) {
             alert('O arquivo PDF é muito grande (maior que 750 KB). O sistema não suporta arquivos tão grandes. Por favor, coloque o link do Google Drive no campo de texto.');
             e.target.value = '';
             document.getElementById('inputUrlLivreto').style.display = 'block';
             return;
          }
          var reader = new FileReader();
          reader.onload = function(evt) {
            var textInput = document.getElementById('inputUrlLivreto');
            if (textInput) {
               textInput.value = evt.target.result;
               alert('PDF carregado com sucesso!');
            }
          };
          reader.readAsDataURL(file);
        });
      }

      var fileShareImage = document.getElementById('fileShareImage');
      if (fileShareImage) {
        fileShareImage.addEventListener('change', (e) => {
          handleImageUpload(e, 'inputShareImage');
          setTimeout(() => {
            const previewShareImage = document.getElementById('previewShareImage');
            const url = document.getElementById('inputShareImage').value;
            if(previewShareImage && url) { previewShareImage.src = url; previewShareImage.style.display = 'block'; }
          }, 1500);
        });
      }
      var fileBrasaoBispo = document.getElementById('fileBrasaoBispo');
      if (fileBrasaoBispo) {
        fileBrasaoBispo.addEventListener('change', (e) => handleImageUpload(e, 'inputBrasaoBispo'));
      }
    });

    window.updateCharCounter = function updateCharCounter() {
      var textarea = document.getElementById('msgText');
      var counter = document.getElementById('charCounter');
      if (textarea && counter) {
        var len = textarea.value.length;
        counter.innerText = len + " / 500 caracteres";
      }
    }

    window.getStoredPrayers = function getStoredPrayers() {
      try {
        var stored = localStorage.getItem('diaconal_prayers_v2');
        if (stored) return JSON.parse(stored);
        localStorage.setItem('diaconal_prayers_v2', JSON.stringify(defaultPrayers));
        return defaultPrayers;
      } catch (e) {
        return defaultPrayers;
      }
    }

    window.savePrayers = function savePrayers(prayers) {
      try {
        localStorage.setItem('diaconal_prayers_v2', JSON.stringify(prayers));
      } catch (e) {}
    }

    /* VARIÁVEL GLOBAL PARA O USUÁRIO LOGADO */
    window.currentUser = null;

    window.updateAuthUI = function updateAuthUI() {
      var authContainer = document.getElementById('authContainer');
      var loggedInContainer = document.getElementById('loggedInContainer');
      var userNameElem = document.getElementById('userName');
      var userPhotoElem = document.getElementById('userPhoto');
      var authorInput = document.getElementById('msgAuthor');

      if (window.currentUser) {
        if (authContainer) authContainer.style.display = 'none';
        if (loggedInContainer) {
          loggedInContainer.style.display = 'flex';
          userNameElem.innerText = window.currentUser.displayName || 'Fiel';
          userPhotoElem.src = window.currentUser.photoURL || 'https://via.placeholder.com/40';
        }
        if (authorInput && (!authorInput.value || authorInput.value.trim() === '')) {
          authorInput.value = window.currentUser.displayName || '';
        }
      } else {
        if (authContainer) authContainer.style.display = 'flex';
        if (loggedInContainer) loggedInContainer.style.display = 'none';
      }
    }

    window.loginWithGoogle = function loginWithGoogle() {
      if (window.firebaseAuth && window.authMethods) {
        var provider = new window.authMethods.GoogleAuthProvider();
        window.authMethods.signInWithPopup(window.firebaseAuth, provider).then((result) => {
          showToast("Login com Google realizado com sucesso!");
        }).catch((error) => {
          console.error("Erro no login com Google:", error);
          if (error.code === 'auth/auth-domain-config-required' || error.code === 'auth/operation-not-supported-in-this-environment') {
             showToast("Login com popup bloqueado. Tente no navegador.");
          } else {
             showToast("Erro Google: " + (error.message || "Desconhecido"));
          }
        });
      } else {
        showToast("Serviço de autenticação indisponível.");
      }
    }

    window.logoutSocial = function logoutSocial() {
      if (window.firebaseAuth && window.authMethods) {
        window.authMethods.signOut(window.firebaseAuth).then(() => {
          showToast("Você saiu da sua conta.");
        });
      }
    }

    // Monitorar estado de autenticação
    window.addEventListener('load', () => {
      if (window.firebaseAuth && window.authMethods) {
        window.authMethods.onAuthStateChanged(window.firebaseAuth, (user) => {
          window.currentUser = user;
          updateAuthUI();
        });
      }
    });

    /* ENVIAR NOVA INTENÇÃO DO VISITANTE */
    window.handlePrayerSubmit = function handlePrayerSubmit(event) {
      event.preventDefault();

      var authorInput = document.getElementById('msgAuthor');
      var locationInput = document.getElementById('msgLocation');
      var textInput = document.getElementById('msgText');
      var consentInput = document.getElementById('msgConsent');

      var author = authorInput ? authorInput.value.trim() : '';
      var location = locationInput ? locationInput.value.trim() : '';
      var text = textInput ? textInput.value.trim() : '';
      var consent = consentInput ? consentInput.checked : false;

      if (!text) {
        showToast("Por favor, escreva a sua intenção de oração.");
        return;
      }

      if (!consent) {
        showToast("É necessário autorizar a publicação para enviar a intenção.");
        return;
      }

      if (text.length > 500) {
        showToast("A intenção excede o limite máximo de 500 caracteres.");
        return;
      }

      var urlRegex = /(https?:\/\/|www\.|[a-zA-Z0-9.-]+\.(com|br|org|net|gov|edu|io|app|dev))/i;
      if (urlRegex.test(text) || urlRegex.test(author)) {
        showToast("Links e endereços web não são permitidos no texto da intenção.");
        return;
      }

      var textLower = text.toLowerCase();
      var authorLower = author.toLowerCase();
      var containsProfanity = PROFANITY_LIST.some(word => 
        textLower.includes(word) || authorLower.includes(word)
      );

      if (containsProfanity) {
        showToast("Sua mensagem contém termos inadequados. Por favor, revise o texto.");
        return;
      }

      var uid = window.currentUser ? window.currentUser.uid : null;
      var userPhotoURL = window.currentUser ? window.currentUser.photoURL : null;

      if (window.firebaseDb && window.fsMethods) {
        const { collection, addDoc, serverTimestamp } = window.fsMethods;
        addDoc(collection(window.firebaseDb, 'prayers'), {
          author: author || "Anônimo",
          location: location,
          text: text,
          status: 'pending',
          uid: uid,
          userPhotoURL: userPhotoURL,
          createdAt: serverTimestamp()
        }).then(() => {
          showToast("Sua intenção foi recebida e enviada para moderação. Rezaremos com você.");
          document.getElementById('prayerForm').reset();
          updateCharCounter();
        }).catch(err => {
          console.error("Erro ao salvar oração no Firestore:", err);
          showToast("Sua intenção foi recebida localmente.");
        });
      } else {
        var prayers = getStoredPrayers();
        prayers.unshift({ id: Date.now(), author: author || "Anônimo", location: location, text: text, status: 'pendente', uid: uid, userPhotoURL: userPhotoURL });
        savePrayers(prayers);
        renderPrayersFeedLocal();
        showToast("Sua intenção foi recebida. Rezaremos com você.");
        document.getElementById('prayerForm').reset();
        updateCharCounter();
      }
    }

    /* COMPRESSÃO EXTRA PARA EVITAR LIMITE DE 1MB DO FIRESTORE */
    window.extraCompressDataUrl = function extraCompressDataUrl(dataUrl, maxW, quality) {
      return new Promise(resolve => {
        var img = new Image();
        img.onload = () => {
          var canvas = document.createElement('canvas');
          var w = img.width;
          var h = img.height;
          if (w > maxW) {
            h *= maxW / w;
            w = maxW;
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/webp', quality));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      });
    }

    /* SALVAR CONTEÚDO DO SITE NO FIRESTORE */
    window.handleSaveSiteContent = async function handleSaveSiteContent(event) {
      event.preventDefault();

      var getVal = id => {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      var payload = {
        fundoHero: getVal('inputFundoHero'),
        imagemLavaPes: getVal('inputImagemLavaPes'),
        logoOrdenacao: getVal('inputLogoOrdenacao'),
        fotoAlison: getVal('inputFotoAlison'),
        fotoJoao: getVal('inputFotoJoao'),
        brasaoDiocese: getVal('inputBrasaoDiocese'),
        logoParoquiaAlison: getVal('inputLogoParoquiaAlison'),
        textoParoquiaAlison: getVal('inputTextoParoquiaAlison'),
        urlParoquiaAlison: getVal('inputUrlParoquiaAlison'),

        logoParoquiaJoao: getVal('inputLogoParoquiaJoao'),
        textoParoquiaJoao: getVal('inputTextoParoquiaJoao'),
        urlParoquiaJoao: getVal('inputUrlParoquiaJoao'),

        pixQrCode: getVal('inputPixQrCode'),
        bispoNome: getVal('inputBispoNome') || 'Dom Argemiro de Azevedo, CMF',
        bispoTitulo: getVal('inputBispoTitulo') || 'Bispo Diocesano de Assis',
        fotoBispo: getVal('inputFotoBispo'),
        brasaoBispo: getVal('inputBrasaoBispo'),
        shareMessage: getVal('inputShareMessage'),
        shareImage: getVal('inputShareImage'),
        dataHorario: getVal('inputDataHorario'),
        dataHorarioISO: getVal('inputDataISO'),
        emBreve: document.getElementById('inputEmBreve') ? document.getElementById('inputEmBreve').checked : false,
        dataHorarioISO: getVal('inputDataISO'),
        emBreve: document.getElementById('inputEmBreve') ? document.getElementById('inputEmBreve').checked : false,
        localNome: getVal('inputLocalNome'),
        localEndereco: getVal('inputLocalEndereco'),
        mapsUrl: getVal('inputMapsUrl'),
        lemaGeral: getVal('inputLemaGeral'),
        lemaAlison: getVal('inputLemaAlison'),
        lemaJoao: getVal('inputLemaJoao'),
        pixChave: getVal('inputPixChave'),
        pixChaveAlison: getVal('inputPixChaveAlison'),
        pixNomeAlison: getVal('inputPixNomeAlison'),
        pixChaveJoao: getVal('inputPixChaveJoao'),
        pixNomeJoao: getVal('inputPixNomeJoao'),
        pixNome: getVal('inputPixNome'),
        pixBanco: getVal('inputPixBanco'),
        urlLivreto: getVal('inputUrlLivreto'),
        urlConvite: getVal('inputUrlConvite'),
        urlWhatsapp: getVal('inputUrlWhatsapp'),
        urlInstagram: getVal('inputUrlInstagram'),
        urlFacebook: getVal('inputUrlFacebook'),
        linkPostWhatsapp: getVal('linkPostWhatsapp'),
        linkPostInstagram: getVal('linkPostInstagram'),
        linkPostFacebook: getVal('linkPostFacebook'),
        cartaAgradecimento: getVal('inputCartaAgradecimento'),
        urlPlaylistYoutube: getVal('inputUrlPlaylistYoutube'),
        urlPlaylistOrdenacao: getVal('inputUrlPlaylistOrdenacao'),
        showHistoria: document.getElementById('inputShowHistoria') ? document.getElementById('inputShowHistoria').checked : true,
        showOrdenandos: document.getElementById('inputShowOrdenandos') ? document.getElementById('inputShowOrdenandos').checked : true,
        showInformacoes: document.getElementById('inputShowInformacoes') ? document.getElementById('inputShowInformacoes').checked : true,
        showLocalizacao: document.getElementById('inputShowLocalizacao') ? document.getElementById('inputShowLocalizacao').checked : true,
        showOracoes: document.getElementById('inputShowOracoes') ? document.getElementById('inputShowOracoes').checked : true,
        showMateriais: document.getElementById('inputShowMateriais') ? document.getElementById('inputShowMateriais').checked : true,
        showApoio: document.getElementById('inputShowApoio') ? document.getElementById('inputShowApoio').checked : true,
        showPixQrCode: document.getElementById('inputShowPixQrCode') ? document.getElementById('inputShowPixQrCode').checked : true,
        updatedAt: new Date().toISOString()
      };

      var imgFields = ['fundoHero', 'imagemLavaPes', 'logoOrdenacao', 'fotoAlison', 'fotoJoao', 'brasaoDiocese', 'logoParoquiaAlison', 'logoParoquiaJoao', 'fotoBispo', 'brasaoBispo', 'pixQrCode'];
      for (var field of imgFields) {
        if (payload[field] && payload[field].startsWith('data:image') && payload[field].length > 120000) {
          payload[field] = await extraCompressDataUrl(payload[field], 600, 0.7);
          var inputEl = document.getElementById('input' + field.charAt(0).toUpperCase() + field.slice(1));
          if(inputEl) inputEl.value = payload[field];
        }
      }

      var payloadSize = new Blob([JSON.stringify(payload)]).size;
      if (payloadSize > 1000000) {
        showToast("Erro: O tamanho total das imagens ainda excede o limite. Apague as imagens muito grandes.", "error");
        return;
      }

      if (window.firebaseDb && window.fsMethods) {
        const { doc, setDoc } = window.fsMethods;
        setDoc(doc(window.firebaseDb, 'siteContent', 'main'), payload, { merge: true }).then(() => {
          showToast("Informações do site atualizadas no banco de dados Firestore!");
          let mergedData = Object.assign({}, window.currentSiteData || {}, payload);
          applySiteDataToUI(mergedData);
        }).catch(err => {
          console.error("Erro ao salvar dados no Firestore:", err);
          showToast("Erro ao conectar ao banco de dados. " + err.message);
        });
      } else {
        let mergedData = Object.assign({}, window.currentSiteData || {}, payload);
        applySiteDataToUI(mergedData);
        showToast("Informações aplicadas na sessão local.");
      }
    }

    window.resetSiteContentDefaults = function resetSiteContentDefaults() {
      if (confirm("Deseja restaurar as informações originais do convite diaconal?")) {
        var defaults = {
          bispoNome: "Dom Argemiro de Azevedo, CMF",
          bispoTitulo: "Bispo Diocesano de Assis",
          dataHorario: "19 de Novembro de 2026, às 19h00",
          dataHorarioISO: "2026-11-19T19:00",
          emBreve: false,
          dataHorarioISO: "2026-11-19T19:00",
          emBreve: false,
          localNome: "Paróquia Santa Cecília",
          localEndereco: "Assis – SP",
          lemaGeral: "'Servi ao Senhor com alegria' (Sl 99,2)",
          lemaAlison: "'Graça e Paz' (1Pe 1,2)",
          lemaJoao: "'Eis-me aqui, envia-me' (Is 6,8)"
        };
        populateAdminFormFields(defaults);
      }
    }

    /* MODAL DE NAVEGAÇÃO E AUTENTICAÇÃO ADMIN */
    window.openAdminModal = function openAdminModal() {
      var backdrop = document.getElementById('adminModalBackdrop');
      if (backdrop) backdrop.style.display = 'flex';

      if (isAdminLoggedIn) {
        document.getElementById('adminLoginScreen').style.display = 'none';
        document.getElementById('adminDashboardScreen').style.display = 'block';
        updateAdminPrayersDashboard();
        initAdminOrdenandos(); initAdminPresentes(); window.renderInlineEditButton(); populateAdminFormFields(window.currentSiteData || {});
      } else {
        document.getElementById('adminLoginScreen').style.display = 'block';
        document.getElementById('adminDashboardScreen').style.display = 'none';
      }
    }

    window.closeAdminModal = function closeAdminModal() {
      var backdrop = document.getElementById('adminModalBackdrop');
      if (backdrop) backdrop.style.display = 'none';
    }

    window.handleAdminLogin = function handleAdminLogin(event) {
      event.preventDefault();
      var input = document.getElementById('adminPasswordInput');
      var pass = input ? input.value.trim() : '';

      if (pass === adminMasterPassword || pass === 'diacono2026') {
        isAdminLoggedIn = true;
        showToast("Acesso concedido ao Painel do Ordenante!");
        document.getElementById('adminLoginScreen').style.display = 'none';
        document.getElementById('adminDashboardScreen').style.display = 'block';
        updateAdminPrayersDashboard();
        initAdminOrdenandos(); window.renderInlineEditButton();
      } else {
        showToast("Senha incorreta. Tente novamente.");
      }
    }

    window.handleAdminLogout = function handleAdminLogout() {
      isAdminLoggedIn = false;
      closeAdminModal(); window.renderInlineEditButton();
    }

    window.switchAdminTab = function switchAdminTab(tabName) {
      ['content', 'ordenandos', 'moderation', 'settings', 'presentes', 'push'].forEach(t => {
        var btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
        var sec = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1) + 'Section');
        if (btn) btn.classList.remove('active');
        if (sec) sec.classList.remove('active');
      });

      var activeBtn = document.getElementById('tabBtn' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
      var activeSec = document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Section');
      if (activeBtn) activeBtn.classList.add('active');
      if (activeSec) activeSec.classList.add('active');
    }

    window.handleChangeAdminPassword = function handleChangeAdminPassword(event) {
      event.preventDefault();
      var p1 = document.getElementById('newAdminPassInput').value;
      var p2 = document.getElementById('confirmAdminPassInput').value;

      if (p1 !== p2) {
        showToast("As senhas informadas não coincidem.");
        return;
      }
      if (p1.length < 6) {
        showToast("A senha deve conter no mínimo 6 caracteres.");
        return;
      }

      adminMasterPassword = p1;
      localStorage.setItem('diaconal_admin_pass', p1);
      showToast("Senha de acesso alterada com sucesso!");
      document.getElementById('newAdminPassInput').value = '';
      document.getElementById('confirmAdminPassInput').value = '';
    }

    /* UTILITÁRIO: ESCAPAR HTML */
    window.escapeHtml = function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* 9. APOIO FRATERNO À ORDENAÇÃO (MÓDULO PIX) */
    var currentPixKey = "";

    window.renderPixSection = function renderPixSection(data) {
      var qrContainer = document.getElementById('pixQrCodeContainer');
      var keyContainer = document.getElementById('pixKeyContainer');

      if (!qrContainer || !keyContainer || !data) return;

      var pixAlison = data.pixChaveAlison ? data.pixChaveAlison.trim() : "";
      var nomeAlison = data.pixNomeAlison ? data.pixNomeAlison.trim() : "Alison Fernando";
      var fotoAlison = (data.ordenandos && data.ordenandos[0]) ? data.ordenandos[0].foto : data.fotoAlison;

      var pixJoao = data.pixChaveJoao ? data.pixChaveJoao.trim() : "";
      var nomeJoao = data.pixNomeJoao ? data.pixNomeJoao.trim() : "João Henrique";
      var fotoJoao = (data.ordenandos && data.ordenandos[1]) ? data.ordenandos[1].foto : data.fotoJoao;
      
      var qrCodeImg = data.pixQrCode ? data.pixQrCode.trim() : "";

      qrContainer.style.display = 'none'; // We'll put everything in keyContainer as a grid

      var generatePixCard = (name, pixKey, photoUrl, qrCodeUrl) => {
        var photoHtml = photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(name)}" class="hover-3d" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold-primary);" onclick="openLightbox(this.src)" />` : '';
        var qrCodeHtml = qrCodeUrl ? `<img src="${escapeHtml(qrCodeUrl)}" alt="QR Code PIX" style="width: 140px; height: 140px; border-radius: 8px; margin: 0.5rem auto; display: block; border: 1px solid var(--gold-border);" onclick="openLightbox(this.src)" />` : '';
        var keyHtml = pixKey ? `<span style="font-family: monospace, sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-main); word-break: break-all; background: var(--bg-parchment-light); padding: 0.4rem 0.8rem; border-radius: 4px; border: 1px dashed var(--gold-soft); width: 100%; text-align: center;">${escapeHtml(pixKey)}</span>
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; width: 100%; margin-top: 0.5rem;" onclick="fallbackCopyPixKey('${escapeHtml(pixKey)}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:0.3rem; vertical-align:-3px;">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar PIX
            </button>` : '';

        return `
          <div style="background: var(--bg-parchment); border: 1px solid var(--gold-border); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex: 1; min-width: 250px;">
            ${photoHtml}
            <h4 style="font-family: 'Cinzel', serif; color: var(--gold-dark); margin: 0; font-size: 1rem; text-align: center;">${escapeHtml(name)}</h4>
            ${qrCodeHtml}
            ${keyHtml}
          </div>
        `;
      };

      var cardsHtml = '';
      if (data.ordenandos && data.ordenandos.length > 0) {
          data.ordenandos.forEach(ord => {
              if (ord.pixChave || ord.pixQrCode) {
                  cardsHtml += generatePixCard(ord.nome || 'Ordenando', ord.pixChave || '', ord.foto || '', ord.pixQrCode || '');
              }
          });
      }

      if (!cardsHtml && (pixAlison !== "" || pixJoao !== "")) {
          if (pixAlison) cardsHtml += generatePixCard(nomeAlison, pixAlison, fotoAlison, qrCodeImg);
          if (pixJoao) cardsHtml += generatePixCard(nomeJoao, pixJoao, fotoJoao, qrCodeImg);
      }

      if (cardsHtml !== "") {
        keyContainer.innerHTML = `
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
            ${cardsHtml}
          </div>
        `;
      } else {
        keyContainer.innerHTML = `
          <div style="background: var(--bg-parchment); border: 1px solid var(--gold-soft); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem;">
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0; font-style: italic;">
              As informações de apoio serão disponibilizadas em breve.
            </p>
          </div>
        `;
      }
    }

    copyPixKey = function() {
      if (!currentPixKey || currentPixKey === "") return;
      var key = currentPixKey;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(() => {
          showGratitudeAnimation();
        }).catch(() => {
          fallbackCopyPixKey(key);
        });
      } else {
        fallbackCopyPixKey(key);
      }
    }

    window.fallbackCopyPixKey = function fallbackCopyPixKey(key) {
      var textArea = document.createElement("textarea");
      textArea.value = key;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showGratitudeAnimation();
      } catch (err) {
        showToast("Chave PIX copiada com sucesso.");
      }
      document.body.removeChild(textArea);
    }

    window.showGratitudeAnimation = function showGratitudeAnimation() {
      var overlay = document.getElementById('gratitudeOverlay');
      if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 7500);
      }
    }

    window.handlePayPalDonation = function handlePayPalDonation() {
      window.open("https://www.paypal.com/donate/?hosted_button_id=NEBFENGP6QQG8", "_blank");
      showGratitudeAnimation();
    }

    window.showLoginAnimation = function showLoginAnimation(callback) {
      var overlay = document.getElementById('loginOverlay');
      if (overlay) overlay.classList.add('active');
      
      callback().finally(() => {
        if (overlay) overlay.classList.remove('active');
      });
    }

    /* 10. SISTEMA DE NOTIFICAÇÃO TOAST POPUP */
    window.showToast = function showToast(message) {
      var toast = document.getElementById('toastPopup');
      var toastMsg = document.getElementById('toastMessage');
      if (!toast || !toastMsg) return;

      toastMsg.innerText = message;
      toast.classList.add('active');

      setTimeout(() => {
        toast.classList.remove('active');
      }, 3800);
    }

    /* 10. REPRODUTOR DE MÚSICA SACRA (YOUTUBE IFRAME API & HYBRID PLAYER) */
    window.ytPlayer = null;
    var isMusicPlaying = false;
    var isMuted = false;

    window.initYTPlayer = function initYTPlayer() {
      if (window.isYoutubeMusic === undefined) return; // Wait for Firebase data
      if (window.isYoutubeMusic === false) return; // Prevent YouTube API from attaching to non-YT iframes
      if (typeof YT !== 'undefined' && YT.Player) {
        if (window.ytPlayer) {
           try { window.ytPlayer.destroy(); } catch(e) {}
           window.ytPlayer = null;
        }
        try {
          window.ytPlayer = new YT.Player('ytIframe', {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        } catch (e) {
          console.log("Erro ao inicializar YT Player API:", e);
        }
      }
    }

    window.onYouTubeIframeAPIReady = function() {
      initYTPlayer();
    };

    // Tentar inicializar caso o script do YT já tenha carregado
    setTimeout(initYTPlayer, 1000);

    window.onPlayerReady = function onPlayerReady(event) {
      try {
        // Tenta iniciar a reprodução com áudio
        event.target.playVideo();
      } catch (e) {}

      // Tentar ativar som no primeiro clique do usuário se o navegador bloquear autoplay
      var enableAudioOnInteraction = function() {
        if (window.ytPlayer && typeof window.ytPlayer.getPlayerState === 'function') {
          var state = window.ytPlayer.getPlayerState();
          if (state !== YT.PlayerState.PLAYING) {
            try { window.ytPlayer.playVideo(); } catch(err) {}
          }
        }
      };

      document.addEventListener('click', enableAudioOnInteraction, { once: true });
      document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
    }

    window.onPlayerStateChange = function onPlayerStateChange(event) {
      if (window.ytPlayer && typeof window.ytPlayer.getVideoData === 'function') {
        try {
          var videoData = window.ytPlayer.getVideoData();
          if (videoData && videoData.title) {
            var titleEls = document.querySelectorAll('.music-title-text');
            titleEls.forEach(el => el.textContent = videoData.title);
          }
        } catch(e) {}
      }
      
      if (event.data === YT.PlayerState.PLAYING) {
        isMusicPlaying = true;
        try { localStorage.setItem('isMusicPlaying', 'true'); } catch(e) {}
        updateMusicUI(true);
      } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        isMusicPlaying = false;
        try { localStorage.setItem('isMusicPlaying', 'false'); } catch(e) {}
        updateMusicUI(false);
      }
    }

    // Persistência entre abas
    window.addEventListener('storage', function(e) {
      if (e.key === 'isMusicPlaying') {
        if (e.newValue === 'true') {
          if (window.ytPlayer && typeof window.ytPlayer.playVideo === 'function' && window.ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
            try { window.ytPlayer.playVideo(); } catch(err) {}
          }
        } else if (e.newValue === 'false') {
          if (window.ytPlayer && typeof window.ytPlayer.pauseVideo === 'function' && window.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            try { window.ytPlayer.pauseVideo(); } catch(err) {}
          }
        }
      }
    });

    // Retomar reprodução ao voltar para a aba se estava tocando
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && localStorage.getItem('isMusicPlaying') === 'true') {
        if (window.ytPlayer && typeof window.ytPlayer.getPlayerState === 'function') {
           if (window.ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
               try { window.ytPlayer.playVideo(); } catch(err) {}
           }
        }
      }
    });

    window.toggleSacredMusic = function toggleSacredMusic() {
      var widgetWrapper = document.querySelector('.music-player-widget-wrapper');
      if (widgetWrapper && widgetWrapper.style.display === 'none') {
        widgetWrapper.style.display = 'block';
      }

      var box = document.getElementById('ytEmbedBox');

      // Native Audio Player Logic (Suno MP3s)
      if (window.isNativeAudio) {
          if (!window.ambientMusicPlaylist || window.ambientMusicPlaylist.length === 0) {
              showToast("Aguarde, carregando a playlist...");
              return;
          }
          if (!window.ambientAudio) {
              window.ambientAudio = new Audio(window.ambientMusicPlaylist[window.currentAmbientTrackIndex]);
              window.ambientAudio.volume = 0.5;
              
              window.ambientAudio.addEventListener('ended', () => {
                  window.nextSacredMusic(true);
              });
              
              window.ambientAudio.play().then(() => {
                  showToast("Música em reprodução: Playlist.");
                  updateMusicUI(true);
              }).catch(err => {
                  console.warn("Autoplay blocked or failed", err);
                  if (err.name !== 'NotAllowedError') {
                      showToast("Erro ao reproduzir. Clique no Play.");
                  }
                  updateMusicUI(false);
              });
          } else {
              if (window.ambientAudio.paused) {
                  window.ambientAudio.play().then(() => {
                      showToast("Música retomada.");
                      updateMusicUI(true);
                  }).catch(err => {
                      showToast("Erro ao reproduzir.");
                      updateMusicUI(false);
                  });
              } else {
                  window.ambientAudio.pause();
                  showToast("Música pausada.");
                  updateMusicUI(false);
              }
          }
          return;
      }



      // Se for outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false && !window.isNativeAudio) {
        if (box) {
          box.classList.toggle('visible');
          if (box.classList.contains('visible')) {
            showToast("Aperte o Play diretamente no quadro abaixo para ouvir.");
          }
        }
        return;
      }

      if (window.ytPlayer && typeof window.ytPlayer.getPlayerState === 'function') {
        try {
          var state = window.ytPlayer.getPlayerState();
          if (state === YT.PlayerState.PLAYING) {
            window.ytPlayer.pauseVideo();
            showToast("Música pausada.");
            updateMusicUI(false);
          } else {
            window.ytPlayer.playVideo();
            showToast("Música em reprodução: Playlist da Ordenação.");
            updateMusicUI(true);
          }
          return;
        } catch (e) {
          console.log("Erro ao acionar YT player API, usando fallback de exibição do card:", e);
        }
      }

      // Fallback: se a API do YT for bloqueada pelo navegador, exibe o mini card do vídeo para 1-clique
      if (box) {
        box.classList.toggle('visible');
        if (box.classList.contains('visible')) {
          showToast("Aperte o Play no quadro de vídeo para ouvir a playlist.");
        }
      }
    }

    window.nextSacredMusic = function nextSacredMusic(forcePlay = false) {
      if (window.isNativeAudio && window.ambientMusicPlaylist) {
          window.currentAmbientTrackIndex = (window.currentAmbientTrackIndex + 1) % window.ambientMusicPlaylist.length;
          if (window.ambientAudio) {
              const wasPlaying = !window.ambientAudio.paused || forcePlay || window.ambientAudio.ended;
              window.ambientAudio.src = window.ambientMusicPlaylist[window.currentAmbientTrackIndex];
              if (wasPlaying) {
                  window.ambientAudio.play().catch(e => console.log(e));
                  updateMusicUI(true);
              }
          }
          showToast("Próxima música.");
          return;
      }

      
      if (window.ytPlayer && typeof window.ytPlayer.nextVideo === 'function') {
        try {
          window.ytPlayer.nextVideo();
          showToast("Próxima música da playlist.");
        } catch (e) {
          console.log("Erro ao avançar música:", e);
        }
      } else {
        showToast("O reprodutor não está pronto.");
      }
    }

    window.prevSacredMusic = function prevSacredMusic() {
      if (window.isNativeAudio && window.ambientMusicPlaylist) {
          window.currentAmbientTrackIndex = (window.currentAmbientTrackIndex - 1 + window.ambientMusicPlaylist.length) % window.ambientMusicPlaylist.length;
          if (window.ambientAudio) {
              const wasPlaying = !window.ambientAudio.paused;
              window.ambientAudio.src = window.ambientMusicPlaylist[window.currentAmbientTrackIndex];
              if (wasPlaying) {
                  window.ambientAudio.play().catch(e => console.log(e));
                  updateMusicUI(true);
              }
          }
          showToast("Música anterior.");
          return;
      }


      if (window.ytPlayer && typeof window.ytPlayer.previousVideo === 'function') {
        try {
          window.ytPlayer.previousVideo();
          showToast("Música anterior da playlist.");
        } catch (e) {
          console.log("Erro ao retroceder música:", e);
        }
      } else {
        showToast("O reprodutor não está pronto.");
      }
    }

    window.toggleYtEmbedBox = function toggleYtEmbedBox() {
      var box = document.getElementById('ytEmbedBox');
      if (box) {
        box.classList.toggle('visible');
      }
    }

    window.updateMusicUI = function updateMusicUI(playing) {
      var widget = document.getElementById('sacredMusicWidget');
      var playIcon = document.getElementById('playIcon');
      var pauseIcon = document.getElementById('pauseIcon');
      var headerMusicLabel = document.getElementById('headerMusicLabel');
      var headerMusicBtn = document.getElementById('headerMusicBtn');

      if (playing) {
        if (widget) widget.classList.add('playing');
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (headerMusicLabel) headerMusicLabel.innerText = 'Tocando 🔊';
        if (headerMusicBtn) {
          headerMusicBtn.style.background = 'var(--gold-primary)';
          headerMusicBtn.style.color = '#FFFFFF';
        }
      } else {
        if (widget) widget.classList.remove('playing');
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (headerMusicLabel) headerMusicLabel.innerText = 'Música Sacra';
        if (headerMusicBtn) {
          headerMusicBtn.style.background = 'var(--gold-soft)';
          headerMusicBtn.style.color = 'var(--gold-dark)';
        }
      }
    }

    window.toggleMinimizePlayer = function toggleMinimizePlayer() {
      var widget = document.getElementById('sacredMusicWidget');
      if (widget) {
        widget.classList.toggle('minimized');
      }
    }

    window.closePlayer = function closePlayer() {
      var widgetWrapper = document.querySelector('.music-player-widget-wrapper');
      if (widgetWrapper) {
        widgetWrapper.style.display = 'none';
        if (window.ytPlayer && typeof window.ytPlayer.pauseVideo === 'function') {
          try {
            window.ytPlayer.pauseVideo();
            window.isMusicPlaying = false;
            if (typeof window.updateMusicUI === 'function') window.updateMusicUI(false);
          } catch(e) {}
        }
      }
    }
    
window.isInlineEditMode = false;

window.toggleInlineEditMode = function() {
    window.isInlineEditMode = !window.isInlineEditMode;
        const editableSelectors = [
        { selector: '.bishop-title', key: 'bispoNome', isArray: false },
        { selector: '.bishop-sub', key: 'bispoTitulo', isArray: false },
        { selector: '.date-text', key: 'dataHorario', isArray: false },
        { selector: '#infoTextData', key: 'dataHorario_pt1', isArray: false },
        { selector: '#infoTextHorario', key: 'dataHorario_pt2', isArray: false },
        { selector: '#heroMetaData', key: 'heroMetaData', isArray: false },
        { selector: '.venue-title', key: 'localNome', isArray: false },
        { selector: '.venue-address', key: 'localEndereco', isArray: false },
        { selector: '#localCidadeText', key: 'localCombo', isArray: false },
        { selector: '#heroMetaLocal', key: 'heroMetaLocal', isArray: false },
        { selector: '.theme-quote', key: 'lemaGeral', isArray: false },
    ];
    
    // Add ord-idx to the dynamically generated cards so we can track them
    document.querySelectorAll('.ordinand-profile-card').forEach((card, idx) => {
        const nameEl = card.querySelector('.ordinand-card-name');
        const mottoEl = card.querySelector('.ordinand-card-motto');
        const historyEl = card.querySelector('.history-content');
        if (nameEl) nameEl.setAttribute('data-ord-idx', idx);
        if (mottoEl) mottoEl.setAttribute('data-ord-idx', idx);
        if (historyEl) historyEl.setAttribute('data-ord-idx', idx);
    });

    const ordEditableSelectors = [
        { selector: '.ordinand-card-name', field: 'nome' },
        { selector: '.ordinand-card-motto', field: 'lema' },
        { selector: '.history-content', field: 'historia' }
    ];

    if (window.isInlineEditMode) {
        // Enable
        document.body.classList.add('inline-edit-active');
        
        editableSelectors.forEach(item => {
            document.querySelectorAll(item.selector).forEach(el => {
                el.contentEditable = "true";
                el.style.outline = "2px dashed #D4AF37";
                el.style.padding = "4px";
                el.style.borderRadius = "4px";
                el.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            });
        });

        ordEditableSelectors.forEach(item => {
            document.querySelectorAll(item.selector).forEach(el => {
                el.contentEditable = "true";
                el.style.outline = "2px dashed #D4AF37";
                el.style.padding = "4px";
                el.style.borderRadius = "4px";
                el.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            });
        });
        
        // Change button text
        const btn = document.getElementById('inlineEditToggleBtn');
        if(btn) btn.innerHTML = '<span>💾</span> Salvar Edições';
        
    } else {
        // Disable and Save
        document.body.classList.remove('inline-edit-active');
        let newData = JSON.parse(JSON.stringify(window.currentSiteData || {}));
        
        editableSelectors.forEach(item => {
            const el = document.querySelector(item.selector);
            if (el) {
                el.contentEditable = "false";
                el.style.outline = "none";
                el.style.padding = "";
                el.style.backgroundColor = "";
                
                let val = el.innerText.trim();
                
                                if (item.key === 'dataHorario_pt1') {
                    if(!newData._tmpData) newData._tmpData = val;
                } else if (item.key === 'dataHorario_pt2') {
                    if(!newData._tmpData) newData._tmpData = '';
                    newData.dataHorario = newData._tmpData + ', às ' + val;
                } else if (item.key === 'heroMetaData') {
                    // Try to parse "Date • Time" back to "Date, às Time"
                    let parts = val.split('•');
                    if (parts.length > 1) {
                        newData.dataHorario = parts[0].trim() + ', às ' + parts[1].trim();
                    } else {
                        newData.dataHorario = val;
                    }
                } else if (item.key === 'localCombo') {
                    let parts = val.split('\n');
                    if(parts.length > 0) newData.localNome = parts[0].trim();
                    if(parts.length > 1) newData.localEndereco = parts.slice(1).join(', ').trim();
                } else if (item.key === 'heroMetaLocal') {
                    // Try to parse "Local • Address"
                    let parts = val.split('•');
                    if (parts.length > 0) newData.localNome = parts[0].trim();
                    if (parts.length > 1) newData.localEndereco = parts.slice(1).join(', ').trim();
                } else {
                    newData[item.key] = val;
                }
            }
        });
        delete newData._tmpData;
        
        ordEditableSelectors.forEach(item => {
            document.querySelectorAll(item.selector).forEach(el => {
                el.contentEditable = "false";
                el.style.outline = "none";
                el.style.padding = "";
                el.style.backgroundColor = "";
                
                let idx = el.getAttribute('data-ord-idx');
                if (idx !== null && newData.ordenandos && newData.ordenandos[idx]) {
                    newData.ordenandos[idx][item.field] = el.innerText.trim();
                }
            });
        });
        
        const btn = document.getElementById('inlineEditToggleBtn');
        if(btn) btn.innerHTML = '<span>✏️</span> Modo Edição';
        
        // Trigger save
        window.currentSiteData = newData;
        window.applySiteDataToUI(newData);
        
        if (window.fsMethods && window.firebaseDb) {
            const docRef = window.fsMethods.doc(window.firebaseDb, "siteContent", "main");
            window.fsMethods.setDoc(docRef, newData, { merge: true })
                .then(() => {
                    console.log("Edições inline salvas com sucesso no Firebase.");
                })
                .catch(err => {
                    console.error("Erro ao salvar edições inline:", err);
                    alert("Erro ao salvar: " + err.message);
                });
        }
    }
}

window.renderInlineEditButton = function() {
    let btn = document.getElementById('inlineEditToggleBtn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'inlineEditToggleBtn';
        btn.innerHTML = '<span>✏️</span> Modo Edição';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';
        btn.style.backgroundColor = 'var(--gold-primary, #D4AF37)';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.padding = '12px 24px';
        btn.style.borderRadius = '30px';
        btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        btn.style.cursor = 'pointer';
        btn.style.fontFamily = 'var(--font-sans, sans-serif)';
        btn.style.fontWeight = 'bold';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '8px';
        
        btn.onclick = window.toggleInlineEditMode;
        document.body.appendChild(btn);
    }
    btn.style.display = window.isAdminLoggedIn ? 'flex' : 'none';
}

window.urlBase64ToUint8Array = function(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}








    // Enable autoplay on first interaction to bypass browser policies
    let firstInteraction = false;
    const enableAudio = () => {
      if (firstInteraction) return;
      firstInteraction = true;
      
      const box = document.getElementById('ytEmbedBox');
      // Removed auto-expand on first interaction per user request
      /*
      if (box && !box.classList.contains('visible')) {
        box.classList.add('visible');
      }
      */
      
      const ytIframe = document.getElementById('ytIframe');
      if (ytIframe) {
        // If it's a YouTube iframe, or any iframe with autoplay, reloading it after interaction allows it to play
        
        if (ytIframe.src && ytIframe.src.includes('autoplay=1')) { 
           // Only reload if we really have to, but YouTube API handles playVideo() better.
           // Commented out to prevent the page from jumping or iframe stealing focus.
           // ytIframe.src = ytIframe.src;
        }

      }
      
      // Also start native audio if applicable
      if (window.isNativeAudio) {
          if (window.toggleSacredMusic && !window.ambientAudio) {
              window.toggleSacredMusic(); // Starts playback natively
          }
      }
      
      ['click', 'touchstart'].forEach(e => document.removeEventListener(e, enableAudio));
    };
    ['click', 'touchstart'].forEach(e => document.addEventListener(e, enableAudio, { passive: true }));


  

  // === ONLINE / OFFLINE STATUS ===
  function updateConnectionStatus() {
    const dot = document.getElementById('connectionStatusDot');
    const text = document.getElementById('connectionStatusText');
    if (!dot || !text) return;
    
    if (navigator.onLine) {
      dot.style.background = '#4caf50';
      dot.style.boxShadow = '0 0 8px rgba(76, 175, 80, 0.4)';
      text.textContent = 'Conectado • Sistema Atualizado';
    } else {
      dot.style.background = '#f44336';
      dot.style.boxShadow = '0 0 8px rgba(244, 67, 54, 0.4)';
      text.textContent = 'Modo Offline • Sem conexão';
    }
  }

  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);
  updateConnectionStatus();

  // Detect iOS and show top banner fallback if not installed
  setTimeout(() => {
     if (window.isIOS && window.isIOS() && !window.navigator.standalone && !localStorage.getItem('installPromptClosed')) {
        const banner = document.getElementById('topInstallBanner');
        if (banner) banner.style.display = 'flex';
        
        const btn = document.getElementById('btnInstallApp');
        if (btn) btn.style.display = 'inline-flex';
     }
  }, 2000);
