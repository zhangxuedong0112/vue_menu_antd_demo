import axios from 'axios';
// import moment from 'moment';
import {notification} from 'ant-design-vue'
// import NProgress from 'nprogress';

const development = process.env.NODE_ENV == "development";

export interface ReqProps{
    [key: string]: any;
    url: string,
    method: string, /* get post delete ... */
    body?: any,
    header?: any
}

export interface UploadProps {
    [key: string]: any;
    action: string, /* 接口地址 */
    file: any, /* 流文件 */
    data?: any /* 其他参数 */
}

class ReqAxios {
    cacheReq: any = {};
    CacheRequest: any = {};

    constructor() {
        // 默认超时设置
        axios.defaults.timeout = 1000 * 60;

        // 相对路径设置
        axios.defaults.baseURL = '/qgrd/suggest/api';

        //http response 拦截器
        axios.interceptors.response.use(
            (res: any) => {
                // NProgress.done();
                if (res) {
                    return res;
                }
            },
            err => {
                // NProgress.done();
                return Promise.reject(err);
            },
        );

        //http request 拦截器
        axios.interceptors.request.use(
            config => {
                // NProgress.start();
                // 获取token
                const token = localStorage.getItem('token') || "";
                // 设置参数格式
                if (!config.headers['Content-Type']) {
                    config.headers = {
                        'Content-Type': 'application/json',
                    };
                }
                // 添加token到headers
                const defaultToken =
                development
                        ? ''
                        : '';
                config.headers.token = token || defaultToken;

                // 鉴权参数设置
                if (config.method === 'get') {
                    //get请求下 参数在params中，其他请求在data中
                    // console.log("@@@@222222", config)
                    // if(config.params){
                    //     console.log("@@@@222222", config.params)
                    // }
                    // config.params = config.params || {};
                    // let json = JSON.parse(JSON.stringify(config.params));
                    //一些参数处理
                } else {
                    config.data = config.data || {};
                    //一些参数处理
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            },
        );
    }

    initGetProps(props:any) {
        let str = '';

        if (props.url.indexOf('?') == -1) {
            str = '?';
        } else {
            str = '&';
        }

        for (let key in props.body) {
            str += `${key}=${props.body[key]}&`;
        }

        str = str.substr(0, str.length - 1);

        props.url += str;

        return props;
    }

    initUrl(url:any) {
        // let baseFrom = "/base/";
        // let programFrom = "/program/";
        // let calculationFrom = "/calculation/";
        // let baseTo = "/base/";
        // let programTo = "/program/";
        // let calculationTo = "/calculation/";
        // let isReplace = false;

        // //手动代理，uat 环境前缀不一样,添加新环境需要配置
        // switch (process.env.REACT_APP_BASE_ENV) {
        //     case "uat":
        //         baseTo = "/baseuat/";
        //         programTo = "/programuat/";
        //         calculationTo = "/calculationuat/";
        //         isReplace = true
        //         break;
        // }

        // if (url && isReplace) {
        //     if (url.indexOf(baseFrom) == 0) {
        //         url = baseTo + url.substr(baseFrom.length)
        //     } else if (url.indexOf(programFrom) == 0) {
        //         url = programTo + url.substr(programFrom.length)
        //     } else if (url.indexOf(calculationFrom) == 0) {
        //         url = calculationTo + url.substr(calculationFrom.length)
        //     }
        // }

        return url;
    }

    cache(props:ReqProps) {
        return new Promise(async (res, rej) => {
            let url = `${props.url}?${JSON.stringify(props.body)}`;

            if (this.cacheReq[url] != undefined) {
                console.info(
                    `request from cache \n req: "${url}" ;  \n \n res: "${JSON.stringify(
                        this.cacheReq[url],
                    )}" \n \n ---------------`,
                );
                return res(this.cacheReq[url]);
            }

            /** 缓存request，同时发起同一请求时，仅请求一次 */
            let ajaxObservable = null;
            // 读缓存
            if (this.CacheRequest[url]) {
                ajaxObservable = this.CacheRequest[url];
            } else {
                // 设缓存
                ajaxObservable = this.ajax(props);
                this.CacheRequest[url] = ajaxObservable;
            }
            try {
                const d = await ajaxObservable;
                this.cacheReq[url] = d;
                return res(d);
            } catch (error) {
                return rej(error);
            }
        });
    }

    ajax(props:ReqProps) {
        props.url = this.initUrl(props.url);
        if (props.method == 'get') {
            if (!!window['ActiveXObject'] || 'ActiveXObject' in window) {
                //ie get 添加 ts防止走缓存
                props.body = props.body || {};

                props.body = {
                    ...props.body,
                    ts: new Date().getTime(),
                };

                props = this.initGetProps(props);
            } else if (props.body) {
                props = this.initGetProps(props);
            }
        }

        return new Promise((res, rej) => {
            axios[props.method](props.url, props.body, props.header)
                .then(data => {
                    data = data.data;

                    if (data.code == 200) {
                        return res(data.data);
                    } else if (data.code == 501) {
                        notification.warning({ message: data.message, description:"" });
                    } else if(data.code == 401 || data.code == 405){
                        if(development){
                            return
                        }
                        window.location.href = data.data.url;
                    } else {
                        notification.error({ message: data.message , description:""});
                    }
                    console.log('ajax code not 200', data);
                    return rej(data);
                })
                .catch((e: any) => {
                    let response = e.response;
                    console.log('ajax catch', response);
                    //System error,please raise ticket to contact IT engineer.
                    if (response) {
                        if (response.data.messageCode == 501) {
                            notification.warning({
                                message: response.data.message, description:""
                            });
                        } else if (response && response.data.message) {
                            notification.error({
                                description: development
                                    ? response.data.path
                                    : 'error',
                                message: development
                                    ? response.data.message
                                    : 'System error,please raise ticket to contact IT engineer.',
                            });
                        } else {
                            notification.error({
                                message: `${response.status} ${response.statusText}`
                                , description:""
                            });
                        }
                    } else {
                        notification.error({ message: 'Time Out', description:"" });
                    }
                    rej(e);
                });
        });
    }

    fileDownload(method, url, body, header = {}) {
        // console.log("@@@@@@下载", axios.defaults.baseURL+url)
        let origin=location.origin.replace('https://','http://');
        window.open(origin+axios.defaults.baseURL+url)
        return
        //post get
        url = this.initUrl(url);
        return new Promise(async (promiseRes, rej) => {
            axios[method](url, null,{responseType: 'blob'})
                .then(async res => {
                    const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                //     var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型

                    const href = window.URL.createObjectURL(blob);
                    let contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    let result = patt.exec(contentDisposition);
                    let filename = decodeURI(result[1]);

                    // ie
                    if (
                        window.navigator &&
                        window.navigator.msSaveOrOpenBlob
                    ) {
                        window.navigator.msSaveOrOpenBlob(blob, filename);
                    } else {
                        const downloadElement = document.createElement('a');
                        downloadElement.style.display = 'none';
                        downloadElement.href = href;
                        downloadElement.download = filename ; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                    }

                    window.URL.revokeObjectURL(href); //释放掉blob对象

                    return promiseRes();
                })
                .catch(async err => {
                    try {
                        
                        const res: any =
                        err && err.response && err.response.data
                            ? await this.getUint8Value(err.response.data)
                            : '';
                        console.log('file download res: ', JSON.parse(res).message);

                        notification.error({
                            message: (res
                                ? JSON.parse(res)
                                : { message: 'Download error' }
                            ).message, description:""
                        });
                        // window["hideLoadingTitle"]();
                        
                    } catch (error) {
                        
                    }finally{
                        return rej(err);
                    }
                });
        });
    }

    getUint8Value(e) {
        return new Promise((res, rej) => {
            for (
                var a = e, i = new DataView(a), n = '', s = 0;
                s < i.byteLength;
                s++
            ) {
                n += String.fromCharCode(i.getUint8(s));
            }
            res(n);
        });
    }

    fileUpload(option:UploadProps) {
        option.url = this.initUrl(option.action);
        return new Promise(async (promiseRes, rej) => {
            // window["showLoadingTitle"]("Uploading...");
            let formData = new FormData();
            formData.append('file', option.file);

            for (var key in option.data) {
                formData.append(key, option.data[key]);
            }

            axios['post'](option.url, formData, {  })
                .then(async res => {
                    let data = res.data;

                    if (data.code == 200) {
                        return promiseRes(data.data);
                    } else if (data.messageCode == 501 || data.code == 501) {
                        notification.error({
                            message: data.message, description:""
                        });
                    } else {
                        notification.error({
                            message: data.message, description:""
                        });
                    }
                    console.log('ajax code not 200', data);
                    return rej(data);
                })
                .catch(async res => {
                    let strData: any;
                    try {
                        res = res.response;
                        strData = await this.getUint8Value(res.data);
                        strData = JSON.parse(strData);
                    } catch (error) {
                        strData = {
                            message: '',
                        };
                    }
                    notification.error({
                        message: `${option.file.name} Upload Error ! \n ${strData.message}`, description:""
                    });
                    rej();
                });
        });
    }

}

export default new ReqAxios();
