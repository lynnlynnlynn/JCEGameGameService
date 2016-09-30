/**
 * Created by Lynn on 16/9/28.
 */
module.exports = helper;

var log4js = require('log4js');
var fs     = require("fs");
var path   = require("path");

function helper(isDebug){
    // 加载配置文件
    var objConfig = JSON.parse(fs.readFileSync(process.cwd()+"/config/log4js.json", "utf8"));

    // 检查配置文件所需的目录是否存在，不存在时创建
    if(objConfig.appenders){
        var baseDir    = process.cwd() + objConfig["customBaseDir"];
        var defaultAtt = objConfig["customDefaultAtt"];

        for(var i= 0, j=objConfig.appenders.length; i<j; i++){
            var item = objConfig.appenders[i];
            if(item["type"] == "console")
                continue;

            if(defaultAtt != null){
                for(var att in defaultAtt){
                    if(item[att] == null)
                        item[att] = defaultAtt[att];
                }
            }
            if(baseDir != null){
                if(item["filename"] == null)
                    item["filename"] = baseDir;
                else
                    item["filename"] = baseDir + item["filename"];
            }
            var fileName = item["filename"];
            if(fileName == null)
                continue;
            var pattern = item["pattern"];
            if(pattern != null){
                fileName += pattern;
            }
            var category = item["category"];
            if(!isAbsoluteDir(fileName))   //path.isAbsolute(fileName))
                throw new Error("配置节" + category + "的路径不是绝对路径:" + fileName);
            var dir = path.dirname(fileName);
            makeDir(dir);
        }
    }

        // 目录创建完毕，才加载配置，不然会出异常
        log4js.configure(objConfig);

        this.logInfo    = log4js.getLogger('logInfo');
        this.logWarn    = log4js.getLogger('logWarn');
        this.logErr     = log4js.getLogger('logErr');

        if (isDebug){
            this.logDebug   = log4js.getLogger("console");
        }else{
            this.logDebug   = log4js.getLogger('logDebug');
        }
}

helper.prototype.write_debug = function(msg){
    if(msg == null)
        msg = "";
    this.logDebug.debug(msg);
};

helper.prototype.write_info = function(msg){
    if(msg == null)
        msg = "";
    this.logInfo.info(msg);
};

helper.prototype.write_warn = function(msg){
    if(msg == null)
        msg = "";
    logWarn.warn(msg);
};

helper.prototype.write_err = function(msg, exp){
    if(msg == null)
        msg = "";
    if(exp != null)
        msg += "\r\n" + exp;
    this.logErr.error(msg);
};

// 配合express用的方法
exports.use = function(app) {
    //页面请求日志, level用auto时,默认级别是WARN
    app.use(log4js.connectLogger(logInfo, {level:'debug', format:':method :url'}));
}

// 判断日志目录是否存在，不存在时创建日志目录
function checkAndCreateDir(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split("/").forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
                if(dirname){
                    pathtmp = dirname;
                }else{
                    pathtmp = "/";
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }else{
        //deleteFolderFiles(dirpath);
        console.log("日志目录已存在");
    }

    return true;
}


// 指定的字符串是否绝对路径
function isAbsoluteDir(path){
    if(path == null)
        return false;
    var len = path.length;

    var isWindows = process.platform === 'win32';
    if(isWindows){
        if(len <= 1)
            return false;
        return path[1] == ":";
    }else{
        if(len <= 0)
            return false;
        return path[0] == "/";
    }
}