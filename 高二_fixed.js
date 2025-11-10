// 修复后的下载函数
function downloadImage() {
  console.log('开始下载图片流程');
  
  // 显示提示
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
  notification.textContent = '请稍候，正在准备下载...';
  document.body.appendChild(notification);
  
  try {
    // 确保预览已更新
    updatePreview();
    
    // 检查html2canvas是否存在
    if (typeof html2canvas === 'undefined') {
      console.error('html2canvas库未加载');
      notification.textContent = '下载失败：缺少必要组件';
      notification.className = 'fixed top-4 right-4 bg-danger text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
      setTimeout(() => notification.remove(), 3000);
      return;
    }
    
    const previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) {
      console.error('找不到预览容器元素');
      notification.textContent = '下载失败：找不到预览元素';
      notification.className = 'fixed top-4 right-4 bg-danger text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
      setTimeout(() => notification.remove(), 3000);
      return;
    }
    
    // 简单处理，直接进入截图阶段
    setTimeout(() => {
      console.log('开始生成截图');
      notification.textContent = '正在生成截图...';
      
      // 使用简化配置
      const html2canvasOptions = {
        backgroundColor: '#ffffff',
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: true,
        timeout: 10000,
        removeContainer: false
      };
      
      html2canvas(previewContainer, html2canvasOptions).then(canvas => {
        console.log('截图生成成功');
        notification.textContent = '正在准备下载...';
        
        try {
          // 直接使用toDataURL下载
          const imgData = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          const timestamp = new Date().toLocaleString('zh-CN').replace(/[\/:*?"<>|]/g, '-');
          downloadLink.download = `课表_${timestamp}.png`;
          downloadLink.href = imgData;
          
          document.body.appendChild(downloadLink);
          downloadLink.click();
          
          setTimeout(() => {
            if (document.body.contains(downloadLink)) {
              document.body.removeChild(downloadLink);
            }
          }, 100);
          
          notification.textContent = '下载成功！';
          setTimeout(() => notification.remove(), 2000);
          console.log('下载完成');
        } catch (e) {
          console.error('下载失败:', e);
          showAlternativeDownload(canvas, notification);
        }
      }).catch(error => {
        console.error('截图生成失败:', error);
        notification.textContent = '截图生成失败';
        notification.className = 'fixed top-4 right-4 bg-danger text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
        setTimeout(() => notification.remove(), 3000);
      });
    }, 500);
    
  } catch (error) {
    console.error('下载过程出错:', error);
    notification.textContent = '下载失败';
    notification.className = 'fixed top-4 right-4 bg-danger text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
    setTimeout(() => notification.remove(), 3000);
  }
}

// 显示备选下载方式
function showAlternativeDownload(canvas, notification) {
  try {
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 9999;
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
      text-align: center;
    `;
    
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '70vh';
    img.style.border = '1px solid #ddd';
    
    const instruction = document.createElement('p');
    instruction.textContent = '自动下载失败，请右键点击图片并选择\'图片另存为\'保存图片';
    instruction.style.color = '#666';
    instruction.style.marginTop = '15px';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '关闭';
    closeBtn.style.cssText = `
      margin-top: 15px;
      padding: 8px 20px;
      background: #333;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9998;
    `;
    
    closeBtn.onclick = () => {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    };
    
    popup.appendChild(img);
    popup.appendChild(instruction);
    popup.appendChild(closeBtn);
    
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 1000);
    
  } catch (e) {
    console.error('显示备选下载方式失败:', e);
    alert('下载失败，请重试');
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }
}