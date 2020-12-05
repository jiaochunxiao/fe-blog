import axios from 'axios';

const TIMEOUT = 60000;

// 默认为 json
const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
};

// 用于记录已经发出的请求，方便后续终止对应的请求
window.httpRequestMap = new Map();

const instance = axios.create({
    baseURL: '',
    timeout: TIMEOUT,
});

instance.interceptors.request.use(config => {
    // TODO 绑定页面cookie, 待补充
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    // TODO 统一处理 response， 待补充
    const {status} = response;
    if (status !== 200) {
        return Promise.reject({message: '网络错误'});
    }
    const {code, msg, data} = response.data;
    if (code === 0) {
        return data;
    }
    return Promise.reject({code, message: msg});
}, error => {
    return Promise.reject(error);
});


export const request = (
    method = 'GET',
    url,
    data = {},
    config = {},
) => {
    const headers = {
        ...DEFAULT_HEADERS,
        ...config.headers,
    };
    instance.headers = headers;
    delete config.headers;

    let defaultParams = {};
    const __method = method.toUpperCase();
    if (__method === 'GET' || __method === 'DELETE') {
        defaultParams = {
            params: data,
        };
    }
    if (__method === 'POST' || __method === 'PATCH') {
        defaultParams = {
            data,
        };
    }
    return instance({method, url, ...defaultParams, ...config});
};

export const get = (url, data, config) => {
    const cancelToken = setHttpMap(url);
    return request('GET', url, data, {...config, cancelToken});
};

export const post = (url, data, config) => {
    const cancelToken = setHttpMap(url);
    return request('POST', url, data, {...config, cancelToken});
};

// 添加 http请求到 httpRequestMap
// TODO 对于 restful设计，需将 url + method作为 key 值最好。
function setHttpMap(url) {
    const cancelToken = new axios.CancelToken(c => {
        window.httpRequestMap.has(url) && (delete window.httpRequestMap[url]);
        window.httpRequestMap.set(url, c);
    });
    return cancelToken;
}

// 取消 http请求，
export const cancelRequest = url => {
    window.httpRequestMap.has(url) && window.httpRequestMap.get(url)('cancel');
    delete window.httpRequestMap[url];
};
