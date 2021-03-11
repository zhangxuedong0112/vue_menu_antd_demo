export default {
    GUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    },
    getPorps(){
        let url = window.location.href;
        let props = "";

        let arr = url.split("?");

        if(arr[1]){
            props = arr[1]
        }

        return !!props ? "?"+props : "";
    },
    getCookie(name){
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(decodeURIComponent(arr[2])); return null;
    },
    $getQueryString(key){
        const href = window.location.href;
        const index = href.lastIndexOf('?');
        if(index>0){
            const search = href.substring(index,href.length);
            return this.$getQueryByString(search, key);
        }
        return '';
    },
    $getQueryByString(searchStr, key){
        let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
        let r = searchStr.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    },

};
