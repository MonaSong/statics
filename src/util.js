export default {
    /**
     * @description 获取浏览器类型
     */
    getBrowserType() {
        let ua, re, m, btype;
        ua = navigator.userAgent.toLowerCase();
        re = /(msie|firefox|chrome|opera|version)/;
        m = ua.match(re);
        btype = m[1].replace(/version/, "'safari'");
        return btype;
    },

    /**
     * @param {string}opt.type http连接的方式，包括POST和GET两种方式
     * @param {string}opt.url 发送请求的url
     * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}opt.data 发送的参数，格式为对象类型
     * @param {function}opt.success ajax发送并接收成功调用的回调函数
     * @description  封装ajax函数
     */
    ajax({method, url, async, data, success} = { method: 'POST', url: '', async: true, data: null, success: function () {} }) {
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in data) {
            params.push(`${key}=${data[key]}`);
        }
        var postData = params.join('&');
        if (method.toUpperCase() === 'POST') {
            xmlHttp.open(method, url, async);
            xmlHttp.setRequestHeader(
                'Content-Type',
                'application/json;charset=utf-8'
            );
            xmlHttp.send(JSON.stringify(data));
        } else if (method.toUpperCase() === 'GET') {
            xmlHttp.open(method, `${url}?${postData}`, async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                success(xmlHttp.responseText);
            }
        };
    },

    /**
     * @param  {Object} o 需要深拷贝的内容
     */
    deepCopy (o) {
        var obj = o.constructor == Array ? [] : {};
        for (var item in obj) {
            if (typeof o[item] === 'object') {
                obj[item] = this.deepCopy(o[item]);
            } else {
                obj[item] = o[item];
            }
        }
        return obj;
    },

    /**
     * @param  {String} key
     * @description 获取某一个cookie值
     */
    getCookie(key) {
        var curCookie = document.cookie,
            arr,
            curArr = {};
        arr = curCookie.split(';');
        for (var i in arr) {
            var cmArr = arr[i].split('=');
            cmArr[0] = cmArr[0].replace(/(^\s*)|(\s*$)/g, '');
            curArr[cmArr[0]] = cmArr[1];
        }
        return curArr[key];
    },

    /**
     * @description 获取当前环境
     */
    prefix() {
        var href, env, env_;
        href = document.domain;
        env = href.split('.')[0];
        env_ = href.split('-')[0];
        if (href === 'localhost') {
            return 'dev-';
        }
        switch (env_) {
            case 't':
                return 't-';
                break;
            case 'dev':
                return 'dev-';
                break;
            case 'pre':
                return 'pre-';
                break;
        }
        switch (env) {
            case 't':
                return 't-';
                break;
            case 'dev':
                return 'dev-';
                break;
            case 'pre':
                return 'pre-';
                break;
        }
        return '';
    },

    /**
     * @description 获取当前页路由
     */
    getCurPage() {
        var curHref, curHost, cur;
        curHref = location.href;
        curHost = location.host;
        cur = curHref.split(curHost)[1];

        cur.indexOf('#') > -1 && (cur = cur.split('#')[1]);

        return cur;
    }
};
