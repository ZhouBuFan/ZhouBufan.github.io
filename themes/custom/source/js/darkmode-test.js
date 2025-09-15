// 简单的暗黑模式测试
console.log('Dark mode test script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing dark mode...');
  
  const toggle = document.querySelector('.darkmode-toggle');
  const body = document.body;
  
  console.log('Toggle element:', toggle);
  console.log('Body element:', body);
  
  if (toggle) {
    console.log('Dark mode toggle found, binding events...');
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Dark mode toggle clicked!');
      
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      
      console.log('Dark mode toggled, isDark:', isDark);
      
      // 更新图标
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        console.log('Icon updated to:', icon.className);
      }
      
      // 保存到本地存储
      localStorage.setItem('darkMode', isDark);
      console.log('Saved to localStorage:', isDark);
    });
    
    // 加载保存的模式
    const savedMode = localStorage.getItem('darkMode');
    const isDark = savedMode === 'true';
    
    console.log('Loading saved mode:', savedMode, 'isDark:', isDark);
    
    if (isDark) {
      body.classList.add('dark');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-sun';
      }
    }
    
    console.log('Dark mode initialization complete');
  } else {
    console.log('Dark mode toggle not found!');
  }
});
