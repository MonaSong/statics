export default {
    eventKeys: {
        onclick: 10010,
        ondblclick: 10011,
        onmouseover: 10012,
        onmouseout: 10013,
        onfocus: 10014,
        onblur: 10015,
        onload: 10016,
        onunload: 10017,
        onbeforeunload: 10018,
        onmousedown: 10019,
        onmouseup: 10020
    },
    defaultParam: {
        body: {},            // json,
        eid: '',             // String 事件名称
        t: 0,                // int 时间戳
        gdssid: '',          // 唯一外网标志gdssid
        gdsid: '',           // String 唯一内网标志gdsid
        ct: '',              // String 客户端类型 ios, android
        uid: 0,              // int 用户中心id
        page: '',            // String 当前页
        page_name: '',       // String 当前页名称
        item: 130555,        // int 项目id
        function_key: '',    // String 功能key， 在权限系统中的功能key
        function_name: '',   // String 功能名称
        user_name: ''        // 用户名称
    },
    url: 'ga.gaodunwangxiao.com/tj.gif'
};
