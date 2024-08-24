 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0IrQ2RqZ1EyMlZyZGlSajJFZ2crTmRITnluczJtb3c5WTI5ZGt2OVpXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHMyY0JVV3QyUFB6ektUNVBnQlh0YjVJOHRsdFBoTjBuZnpmcEtSd0pCdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrSnZTWGdla0FXTEtDRldzQVhpN0ROaXNabUxUbkRBaUsyUjNpVGtMMzJZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNS1RZUXdwR1V5WmxyWkYyZjRLdW4rQnhyQktSQXZ5eVA2N09jTDZWMW5rPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLc2dYSmYrbnM5cTcxRnBYMGlPUFNyN1JROWhOdzd6TEgxNlAvK2U1bEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjIyemcvU1I3SGY0NzBva0R0SlRReXIvYW1oOG90djlhN1dldVJpaU10eXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09DY0lyQ3FjeFRGVDMrbUtqU1RzcFJmMzlMc0xmRGJSNVo2cDhCNmhWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdicEJxc0w0K1VXQmRUSU9yRUtDSVR3NHFib2R0VGZjNzJjbFV6UExrQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im96RHlrSTBvdUx4UGoyQnFyM3p1UksxdzJlOFhzcWtKT1F4Y1dvTmlPNVFaM3d4dWhpYjdmS2RNSTRPNTd4bjdicVJXWTNzSGpFSjVTWlBhVG9WMml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6ImlJQ2ZWaGgzbnRTK2I2TDRyb1VDY0wwQmlIcmFQblZhb3RFb1JYU084bkk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NDEwMjYzNzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDhBMDFDNzg5MUE5OUY4RDE1NjNFMDZENEM4NDRDQzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDQ5MDkyM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTXlPa2sySm1Tbm02Y3BMTTQzVXprZyIsInBob25lSWQiOiJmZWIwOTAzNS0zNzU0LTRkYWUtYjg3Zi01NWJiOGU1OWMzZGMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1VBcG4ySXByeXpqaE9RZURBRW93b0tidlFjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBVK2QxVXRzeHVjaGp6aEhwVFpid3QwMVV0WT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGNkozNTI4MiIsIm1lIjp7ImlkIjoiOTQ3NDEwMjYzNzE6MzZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QrPCdkJrwnZCu8J2QpvCdkLLwnZCaIPCdkKzwnZCa8J2QnfCdkJrwnZCm8J2QmvCdkKXwnZCiIPCfjL/wn6SNIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKeWlpSUFERUp2SnByWUdHQWdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiWUsyd3lZMFBMbWkveWxmZk5CRWEzd05XdmhhSGY1WVFFOHFOMmlMMWg4PSIsImFjY291bnRTaWduYXR1cmUiOiJGaS94ZlN4bStiV21wRVo1OStuVkhhLy9IRytka3RrSmZkbkpDSVZhcWVTQU5wajNKRnZqZS9PaHZmVGhmc0FhdGZmaHJaTEh0bUpndGdqK09GbndCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZ1BLaFZPaXk0cytMcHV3Y005cDhLU1dGU21EVEQxcGZaeXd2OVptWW92SDY1TlVyZ05pSmNDVWprS3pxQUVxT0tQMGxLYTN6YnhXTEVoZXZEanNuaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc0MTAyNjM3MTozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXMkN0c01tTkR5NW92OHBYM3pRUkd0OERWcjRXaDMrV0VCUEtqZG9pOVlmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NDkwOTE4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxGcCJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
