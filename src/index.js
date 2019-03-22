import config from './config';
import utils from './util';

class SendAnalysisData {
    constructor() {
        this.defaulOptions = {};
    }

    // 初始化
    init(options) {
        this.setdefaulOptions(options);
    }

    // 设置默认参数
    setdefaulOptions(options) {
        let curGDSID = `${utils.prefix()}GDSID`;
        this.defaulOptions.ct = utils.getBrowserType();
        this.defaulOptions.gdsid = utils.getCookie(curGDSID)
            ? utils.getCookie(curGDSID)
            : '';
        this.defaulOptions.gdssid = utils.getCookie('GDSSID')
            ? utils.getCookie('GDSSID')
            : '';
        this.defaulOptions = Object.assign({}, this.defaulOptions, options);
    }

    // 设置埋点时的参数
    setParams({eventType, uid, user_name, logout, params} = { eventType: 'onclick', uid: '', user_name: '', logout: '', params: {} }) {
        let eventId;
        this.defaulOptions.t = +new Date();
        this.defaulOptions.page_name = document.title || '';
        this.defaulOptions.page = utils.getCurPage();

        eventType !== undefined && (eventId = config.eventKeys[eventType]);

        this.defaulOptions.eid = eventId
            ? eventId
            : config.eventKeys['onclick'];

        // 登录时需要写入uid和user_name
        if (uid) {
            localStorage.setItem('GD_TJ_UID', uid);
            localStorage.setItem('GD_TJ_USER_NAME', user_name);
        }

        // 登出时需要传入logout为 '1'
        if (logout === '1') {
            this.defaulOptions.body = {};
            localStorage.clear();
        }

        this.defaulOptions.uid = localStorage.getItem('GD_TJ_UID')
            ? localStorage.getItem('GD_TJ_UID')
            : '';
        this.defaulOptions.user_name = localStorage.getItem('GD_TJ_USER_NAME')
            ? localStorage.getItem('GD_TJ_USER_NAME')
            : '';

        // 功能参数
        params && (this.defaulOptions.body = params);

        this.defaulOptions =  Object.assign({}, this.defaulOptions, { uid, user_name })
    }

    sendData(options) {
        let env;

        this.setParams(options);
        env = utils.prefix() == 'dev-' ? 't-' : utils.prefix();
        utils.ajax({
            method: 'post',
            url: '//' + env + config.url,
            data: this.defaulOptions,
        });
    }
}

export default SendAnalysisData;
