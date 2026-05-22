const productVariants = {
  'refined-neutrals': {
    name: 'Refined Neutrals Decking Samples Kit',
    image: 'images/kit-refined-neutrals.svg',
    alt: 'Refined Neutrals Decking Sample Kit'
  },
  'contemporary-greys': {
    name: 'Contemporary Greys Decking Samples Kit',
    image: 'images/kit-contemporary-greys.svg',
    alt: 'Contemporary Greys Decking Sample Kit'
  },
  'warm-browns': {
    name: 'Warm Browns Decking Samples Kit',
    image: 'images/kit-warm-browns.svg',
    alt: 'Warm Browns Decking Sample Kit'
  },
  'natural-tones': {
    name: 'Natural Tones Decking Samples Kit',
    image: 'images/kit-natural-tones.svg',
    alt: 'Natural Tones Decking Sample Kit'
  },
  'classic-earth': {
    name: 'Classic Earth Decking Samples Kit',
    image: 'images/kit-classic-earth.svg',
    alt: 'Classic Earth Decking Sample Kit'
  },
  'coastal-light': {
    name: 'Coastal Light Decking Samples Kit',
    image: 'images/kit-coastal-light.svg',
    alt: 'Coastal Light Decking Sample Kit'
  }
};

let mainSwiper = null;
let thumbSwiper = null;
let fallbackActiveIndex = 0;

const mainVariantImage = document.getElementById('mainVariantImage');
const variantThumbImage = document.getElementById('variantThumbImage');
const selectedColorName = document.getElementById('selectedColorName');
const swatchButtons = document.querySelectorAll('.swatch-button');
const thumbSlides = document.querySelectorAll('.thumb-slide');
const thumbsWrap = document.querySelector('.gallery-thumbs-wrap');
const thumbPrevButton = document.querySelector('.thumb-nav-prev');
const thumbNextButton = document.querySelector('.thumb-nav-next');

function isMobileGallery() {
  return window.innerWidth <= 900;
}

function getMaxGalleryIndex() {
  if (mainSwiper) {
    return Math.max(0, mainSwiper.slides.length - 1);
  }

  return Math.max(0, thumbSlides.length - 1);
}

function updateThumbNavState() {
  const maxIndex = getMaxGalleryIndex();
  const activeIndex = mainSwiper ? mainSwiper.activeIndex : fallbackActiveIndex;
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < maxIndex;

  thumbPrevButton?.classList.toggle('is-disabled', !canGoPrev);
  thumbNextButton?.classList.toggle('is-disabled', !canGoNext);
  thumbsWrap?.classList.toggle('can-scroll-prev', canGoPrev);
  thumbsWrap?.classList.toggle('can-scroll-next', canGoNext);
}

function syncThumbPosition(index = null) {
  if (!thumbSwiper || !mainSwiper) return;

  const targetIndex = index === null ? mainSwiper.activeIndex : index;
  thumbSwiper.slideTo(targetIndex, 300);
  updateThumbNavState();
}

function goToGalleryIndex(index) {
  const targetIndex = Math.max(0, Math.min(getMaxGalleryIndex(), index));

  if (mainSwiper) {
    mainSwiper.slideTo(targetIndex, 300);
    syncThumbPosition(targetIndex);
    return;
  }

  setFallbackActiveIndex(targetIndex);
}

function initSwiperGallery() {
  if (typeof Swiper === 'undefined') {
    initFallbackGallery();
    return;
  }

  thumbSwiper = new Swiper('.product-thumbs-swiper', {
    direction: isMobileGallery() ? 'horizontal' : 'vertical',
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 8,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    freeMode: false,
    mousewheel: {
      forceToAxis: true
    },
    observer: true,
    observeParents: true
  });

  mainSwiper = new Swiper('.product-main-swiper', {
    spaceBetween: 10,
    keyboard: {
      enabled: true
    },
    thumbs: {
      swiper: thumbSwiper
    },
    on: {
      init() {
        syncThumbPosition(0);
        updateThumbNavState();
      },
      slideChange() {
        syncThumbPosition(this.activeIndex);
      }
    }
  });

  thumbSwiper.on('click', (swiper) => {
    if (typeof swiper.clickedIndex === 'number') {
      goToGalleryIndex(swiper.clickedIndex);
    }
  });

  thumbSwiper.on('slideChange', updateThumbNavState);
  thumbSwiper.on('resize', updateThumbNavState);

  initThumbNavButtons();
  syncThumbPosition(0);
  updateThumbNavState();

  window.addEventListener('resize', () => {
    if (!thumbSwiper || !mainSwiper) return;

    const newDirection = isMobileGallery() ? 'horizontal' : 'vertical';
    if (thumbSwiper.params.direction !== newDirection) {
      thumbSwiper.changeDirection(newDirection);
    }

    thumbSwiper.update();
    mainSwiper.update();
    syncThumbPosition(mainSwiper.activeIndex);
  });
}

function initThumbNavButtons() {
  thumbPrevButton?.addEventListener('click', () => {
    const currentIndex = mainSwiper ? mainSwiper.activeIndex : fallbackActiveIndex;
    goToGalleryIndex(currentIndex - 1);
  });

  thumbNextButton?.addEventListener('click', () => {
    const currentIndex = mainSwiper ? mainSwiper.activeIndex : fallbackActiveIndex;
    goToGalleryIndex(currentIndex + 1);
  });
}

function setFallbackActiveIndex(index) {
  const mainImages = document.querySelectorAll('.product-main-swiper .main-slide img');
  const targetIndex = Math.max(0, Math.min(mainImages.length - 1, index));
  fallbackActiveIndex = targetIndex;

  mainImages.forEach((img, imgIndex) => {
    const slide = img.closest('.main-slide');
    if (slide) {
      slide.style.display = imgIndex === targetIndex ? 'flex' : 'none';
    }
  });

  thumbSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active-fallback', slideIndex === targetIndex);
  });

  const wrapper = document.querySelector('.product-thumbs-swiper .swiper-wrapper');
  const firstThumb = thumbSlides[0];

  if (wrapper && firstThumb) {
    const size = isMobileGallery() ? firstThumb.offsetWidth : firstThumb.offsetHeight;
    const gap = 8;
    const distance = targetIndex * (size + gap);
    wrapper.style.transition = 'transform 0.3s ease';
    wrapper.style.transform = isMobileGallery()
      ? `translate3d(-${distance}px, 0, 0)`
      : `translate3d(0, -${distance}px, 0)`;
  }

  updateThumbNavState();
}

function initFallbackGallery() {
  thumbSlides.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setFallbackActiveIndex(index);
    });
  });

  initThumbNavButtons();
  setFallbackActiveIndex(0);
}

function updateVariant(variantKey) {
  const variant = productVariants[variantKey];
  if (!variant) return;

  mainVariantImage.src = variant.image;
  mainVariantImage.alt = variant.alt;
  variantThumbImage.src = variant.image;
  variantThumbImage.alt = `${variant.alt} thumbnail`;
  selectedColorName.textContent = variant.name;

  swatchButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.variant === variantKey);
  });

  if (mainSwiper) {
    mainSwiper.slideTo(0, 300);
    mainSwiper.update();
  }

  if (thumbSwiper) {
    thumbSwiper.slideTo(0, 300);
    thumbSwiper.update();
  }

  if (!mainSwiper) {
    setFallbackActiveIndex(0);
  }

  updateThumbNavState();
}

function initSwatches() {
  swatchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      updateVariant(button.dataset.variant);
    });
  });
}

function initQuantityControl() {
  const control = document.querySelector('.quantity-control');
  if (!control) return;

  const input = control.querySelector('.quantity-input');
  const decrease = control.querySelector('.decrease');
  const increase = control.querySelector('.increase');

  decrease.addEventListener('click', () => {
    const currentValue = parseInt(input.value, 10) || 1;
    input.value = Math.max(1, currentValue - 1);
  });

  increase.addEventListener('click', () => {
    const currentValue = parseInt(input.value, 10) || 1;
    input.value = currentValue + 1;
  });

  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9]/g, '');
  });

  input.addEventListener('blur', () => {
    if (!input.value || parseInt(input.value, 10) < 1) {
      input.value = 1;
    }
  });
}

function getCurrentMainImage() {
  if (mainSwiper) {
    const activeSlide = mainSwiper.slides[mainSwiper.activeIndex];
    return activeSlide ? activeSlide.querySelector('img') : mainVariantImage;
  }

  const visibleSlide = Array.from(document.querySelectorAll('.main-slide')).find((slide) => {
    return slide.style.display !== 'none';
  });

  return visibleSlide ? visibleSlide.querySelector('img') : mainVariantImage;
}

function initLightbox() {
  const zoomButton = document.querySelector('.zoom-button');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const closeButton = document.querySelector('.lightbox-close');

  if (!zoomButton || !lightbox || !lightboxImage || !closeButton) return;

  zoomButton.addEventListener('click', () => {
    const currentImage = getCurrentMainImage();
    if (!currentImage) return;

    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt || 'Zoomed product preview';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
}

function initActionButtons() {
  const addToCartButton = document.querySelector('.add-to-cart-button');
  const quoteButton = document.querySelector('.quote-button');

  addToCartButton?.addEventListener('click', () => {
    const qty = document.querySelector('.quantity-input')?.value || '1';
    const color = selectedColorName?.textContent || '';
    console.log(`Add to cart: ${color}, quantity: ${qty}`);
  });

  quoteButton?.addEventListener('click', () => {
    const qty = document.querySelector('.quantity-input')?.value || '1';
    const color = selectedColorName?.textContent || '';
    console.log(`Request quote: ${color}, quantity: ${qty}`);
  });
}

initSwiperGallery();
initSwatches();
initQuantityControl();
initLightbox();
initActionButtons();
