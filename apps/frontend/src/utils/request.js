class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
  }
}

async function request(url, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const newOptions = { ...defaultOptions, ...options };
  const { params, ...fetchOptions } = newOptions;

  // 处理 URL 参数
  if (params) {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    url = `${url}${url.includes('?') ? '&' : '?'}${queryString.toString()}`;
  }

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new RequestError(response.status, response.statusText);
    }

    const data = await response.json();

    if (data.code && data.code !== 200) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    if (error instanceof RequestError) {
      switch (error.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 403:
          console.error('没有权限访问');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        default:
          console.error(`请求失败: ${error.message}`);
      }
    }
    throw error;
  }
}

export const http = {
  get: (url, params) => request(url, { method: 'GET', params }),
  post: (url, data) => request(url, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (url, data) => request(url, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (url) => request(url, { method: 'DELETE' }),
};