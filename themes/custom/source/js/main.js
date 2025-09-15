/**
 * Custom Theme - Main JavaScript
 * 基于Butterfly风格的自定义Hexo主题
 */

(function() {
  'use strict';

// 工具函数
  const utils = {
    // 防抖函数
    debounce: function(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
    },

    // 节流函数
    throttle: function(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
    },

    // 获取元素
    $: function(selector) {
      return document.querySelector(selector);
    },

    // 获取所有元素
    $$: function(selector) {
      return document.querySelectorAll(selector);
    },

    // 添加事件监听
    on: function(element, event, handler) {
      if (element) {
        element.addEventListener(event, handler);
      }
    },

    // 移除事件监听
    off: function(element, event, handler) {
      if (element) {
        element.removeEventListener(event, handler);
      }
    }
  };

  // 暗黑模式管理
  const DarkMode = {
    init: function() {
      this.toggle = utils.$('.darkmode-toggle');
      this.body = document.body;
      this.storageKey = 'darkMode';
      this.isInitialized = false;
      
      console.log('DarkMode init, toggle element:', this.toggle);
      
      if (this.toggle && !this.isInitialized) {
        this.bindEvents();
        this.loadMode();
        this.isInitialized = true;
      } else if (!this.toggle) {
        console.log('Dark mode toggle not found');
      }
    },

    bindEvents: function() {
      if (this.toggle) {
        // 移除之前的事件监听器
        this.toggle.removeEventListener('click', this.handleToggle);
        // 添加新的事件监听器
        this.toggle.addEventListener('click', this.handleToggle.bind(this));
        console.log('Dark mode events bound');
      }
    },

    handleToggle: function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Dark mode toggle clicked');
      this.body.classList.toggle('dark');
      const isDark = this.body.classList.contains('dark');
      localStorage.setItem(this.storageKey, isDark);
      this.updateIcon(isDark);
      console.log('Dark mode toggled, isDark:', isDark);
    },

    loadMode: function() {
      const savedMode = localStorage.getItem(this.storageKey);
      const isDark = savedMode === 'true';
      
      console.log('Loading dark mode, saved:', savedMode, 'isDark:', isDark);
      
      if (isDark) {
        this.body.classList.add('dark');
      }
      
      this.updateIcon(isDark);
    },

    updateIcon: function(isDark) {
      if (this.toggle) {
        const icon = this.toggle.querySelector('i');
        if (icon) {
          icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
          console.log('Icon updated, isDark:', isDark);
        }
      }
    }
  };

  // 阅读模式管理
  const ReadMode = {
    init: function() {
      this.toggle = utils.$('.readmode-toggle');
      this.body = document.body;
      this.storageKey = 'readMode';
      
      if (this.toggle) {
        this.bindEvents();
        this.loadMode();
      }
    },

    bindEvents: function() {
      utils.on(this.toggle, 'click', this.handleToggle.bind(this));
    },

    handleToggle: function() {
      this.body.classList.toggle('read-mode');
      const isReadMode = this.body.classList.contains('read-mode');
      localStorage.setItem(this.storageKey, isReadMode);
    },

    loadMode: function() {
      const savedMode = localStorage.getItem(this.storageKey);
      const isReadMode = savedMode === 'true';
      
      if (isReadMode) {
        this.body.classList.add('read-mode');
      }
    }
  };

  // 返回顶部功能
  const ScrollToTop = {
    init: function() {
      this.button = utils.$('.scroll-to-top');
      this.threshold = 300;
      
      if (this.button) {
        this.bindEvents();
        this.handleScroll();
      }
    },

    bindEvents: function() {
      utils.on(this.button, 'click', this.handleClick.bind(this));
      utils.on(window, 'scroll', utils.throttle(this.handleScroll.bind(this), 100));
    },

    handleClick: function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    handleScroll: function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > this.threshold) {
        this.button.style.display = 'flex';
      } else {
        this.button.style.display = 'none';
      }
    }
  };

  // 移动端菜单
  const MobileMenu = {
    init: function() {
      this.toggle = utils.$('.mobile-menu-toggle');
      this.nav = utils.$('.nav');
      
      if (this.toggle && this.nav) {
        this.bindEvents();
      }
    },

    bindEvents: function() {
      utils.on(this.toggle, 'click', this.handleToggle.bind(this));
      
      // 点击外部关闭菜单
      utils.on(document, 'click', this.handleOutsideClick.bind(this));
    },

    handleToggle: function() {
      this.nav.classList.toggle('mobile-active');
      this.toggle.classList.toggle('active');
    },

    handleOutsideClick: function(e) {
      if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
        this.nav.classList.remove('mobile-active');
        this.toggle.classList.remove('active');
      }
    }
  };

  // 搜索功能
  const Search = {
    init: function() {
      this.toggle = utils.$('.search-toggle');
      this.modal = utils.$('.search-modal');
      this.input = utils.$('.search-input');
      this.results = utils.$('.search-results');
      this.close = utils.$('.search-close');
      
      if (this.toggle) {
        this.bindEvents();
        this.createModal();
      }
    },

    createModal: function() {
      if (!this.modal) {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
          <div class="search-modal-content">
            <div class="search-header">
              <input type="text" class="search-input" placeholder="搜索文章...">
              <button class="search-close">&times;</button>
            </div>
            <div class="search-results"></div>
          </div>
        `;
        document.body.appendChild(modal);
        
        this.modal = modal;
        this.input = modal.querySelector('.search-input');
        this.results = modal.querySelector('.search-results');
        this.close = modal.querySelector('.search-close');
        
        this.bindModalEvents();
      }
    },

    bindEvents: function() {
      utils.on(this.toggle, 'click', this.openModal.bind(this));
    },

    bindModalEvents: function() {
      utils.on(this.close, 'click', this.closeModal.bind(this));
      utils.on(this.modal, 'click', this.handleModalClick.bind(this));
      utils.on(this.input, 'input', utils.debounce(this.handleSearch.bind(this), 300));
    },

    openModal: function() {
      this.modal.style.display = 'flex';
      this.input.focus();
    },

    closeModal: function() {
      this.modal.style.display = 'none';
      this.input.value = '';
      this.results.innerHTML = '';
    },

    handleModalClick: function(e) {
      if (e.target === this.modal) {
        this.closeModal();
      }
    },

    handleSearch: function() {
      const query = this.input.value.trim();
      
      if (query.length < 2) {
        this.results.innerHTML = '';
        return;
      }
      
      this.performSearch(query);
    },

    performSearch: function(query) {
      // 这里可以实现本地搜索或调用搜索API
      // 目前显示一个简单的提示
      this.results.innerHTML = `
        <div class="search-result-item">
          <p>搜索功能正在开发中...</p>
          <p>搜索关键词: <strong>${query}</strong></p>
        </div>
      `;
    }
  };

  // 代码复制功能
  const CodeCopy = {
    init: function() {
      this.codeBlocks = utils.$$('pre code');
      this.addCopyButtons();
    },

    addCopyButtons: function() {
      this.codeBlocks.forEach(block => {
        const pre = block.parentElement;
        if (pre && !pre.querySelector('.copy-button')) {
          const button = document.createElement('button');
          button.className = 'copy-button';
          button.innerHTML = '<i class="fas fa-copy"></i>';
          button.title = '复制代码';
          
          pre.style.position = 'relative';
          pre.appendChild(button);
          
          utils.on(button, 'click', () => this.copyCode(block, button));
        }
      });
    },

    copyCode: function(codeBlock, button) {
      const text = codeBlock.textContent;
      
      navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#4CAF50';
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('复制失败:', err);
        button.innerHTML = '<i class="fas fa-times"></i>';
        button.style.color = '#f44336';
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
          button.style.color = '';
        }, 2000);
      });
    }
  };

  // 图片懒加载
  const LazyLoad = {
    init: function() {
      this.images = utils.$$('img[data-src]');
      this.observer = null;
      
      if (this.images.length > 0) {
        this.setupIntersectionObserver();
      }
    },

    setupIntersectionObserver: function() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
            }
          });
        });
        
        this.images.forEach(img => this.observer.observe(img));
      } else {
        // 降级处理
        this.images.forEach(img => this.loadImage(img));
      }
    },

    loadImage: function(img) {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        
        if (this.observer) {
          this.observer.unobserve(img);
        }
      }
    }
  };

  // 平滑滚动
  const SmoothScroll = {
    init: function() {
      this.links = utils.$$('a[href^="#"]');
      this.bindEvents();
    },

    bindEvents: function() {
      this.links.forEach(link => {
        utils.on(link, 'click', this.handleClick.bind(this));
      });
    },

    handleClick: function(e) {
      const href = e.target.getAttribute('href');
      // 只处理页面内的锚点链接，不处理外部链接
      if (href && href.startsWith('#') && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  };

  // 页面加载动画
  const PageLoader = {
    init: function() {
      this.body = document.body;
      this.loader = utils.$('.page-loader');
      
      if (this.loader) {
        this.hideLoader();
      }
    },

    hideLoader: function() {
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (this.loader) {
            this.loader.style.opacity = '0';
            setTimeout(() => {
              this.loader.style.display = 'none';
            }, 300);
          }
        }, 500);
      });
    }
  };

  // 初始化所有功能
  const App = {
    isInitialized: false,
    
    init: function() {
      // 防止重复初始化
      if (this.isInitialized) {
        return;
      }
      
      // 等待DOM加载完成
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.start.bind(this));
      } else {
        this.start();
      }
    },

    start: function() {
      // 防止重复初始化
      if (this.isInitialized) {
        return;
      }
      
      // 初始化各个模块
      DarkMode.init();
      ReadMode.init();
      ScrollToTop.init();
      MobileMenu.init();
      Search.init();
      CodeCopy.init();
      LazyLoad.init();
      SmoothScroll.init();
      PageLoader.init();
      
      // 添加页面加载完成的类
      document.body.classList.add('loaded');
      
      this.isInitialized = true;
      console.log('Custom Theme initialized successfully!');
    }
  };

  // 启动应用
  App.init();

})();