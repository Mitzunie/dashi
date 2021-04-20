let token = process.env.TOKEN ? process.env.TOKEN : "NTkxMzUzNjAwNjI2OTE3NDE2.XZkF-w.L3UsjpHWJkjWxfaUVgHhj9bcb-0";
let port = process.env.port ? process.env.port : "3000";
let prefix = process.env.prefix ? process.env.prefix : "k!";
let client_id = process.env.client_id ? process.env.client_id : "591353600626917416";
let client_secret = process.env.client_secret ? process.env.client_secret : "yjaDnSrmhgHW_GkcXEPa0j7EDhC6ki2J";
let callbackURL = process.env.callbackURL ? process.env.callbackURL : "http://localhost:3000/";



module.exports = {
    token,
    port,
    prefix,
    client_id,
    client_secret,
    callbackURL
}