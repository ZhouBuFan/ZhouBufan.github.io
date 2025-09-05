// 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  initMobileMenu();
  
  // 平滑滚动
  initSmoothScroll();
  
  // 代码高亮
  initCodeHighlight();
  
  // 图片懒加载
  initLazyLoad();
  
  // 返回顶部按钮
  initBackToTop();
});

// 移动端菜单功能
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
    
    // 点击菜单项后关闭菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

// 平滑滚动
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 代码高亮
function initCodeHighlight() {
  // 如果页面中有代码块，添加复制按钮
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.innerHTML = '<i class="fas fa-copy"></i>';
    button.title = '复制代码';
    
    button.addEventListener('click', function() {
      navigator.clipboard.writeText(block.textContent).then(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.title = '已复制';
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
          button.title = '复制代码';
        }, 2000);
      });
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

// 图片懒加载
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // 降级处理
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// 返回顶部按钮
function initBackToTop() {
  // 创建返回顶部按钮
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.title = '返回顶部';
  document.body.appendChild(backToTop);
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .back-to-top.show {
      opacity: 1;
      visibility: visible;
    }
    
    .back-to-top:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
    
    .copy-code-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    pre:hover .copy-code-btn {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // 点击返回顶部
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 工具函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
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
}

// 搜索功能（如果需要）
function initSearch() {
  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');
  
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      
      // 这里可以添加搜索逻辑
      // 例如使用 Fuse.js 或其他搜索库
      performSearch(query);
    }, 300));
  }
}

function performSearch(query) {
  // 搜索实现
  console.log('搜索:', query);
}

// 主题切换功能（如果需要）
function initThemeToggle() {
  const themeToggle = document.querySelector('#theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // 保存主题偏好
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
}
