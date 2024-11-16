const appId = process.env.REACT_APP_AGORA_APP_ID;
const appCertificate = process.env.REACT_APP_AGORA_APP_CERTIFICATE;

export const config = { 
  mode: "rtc", 
  codec: "vp8",
  appId: "your-app-id-here",
  appCertificate: appCertificate
};
