import QRCode from "qrcode";
import { env } from "./env";

export function ticketUrl(token: string) {
  return `${env.siteUrl()}/convention/ticket/${token}`;
}

const options = { errorCorrectionLevel: "M" as const, margin: 2, color: { dark: "#001319", light: "#ffffff" } };

export function ticketQrSvg(token: string) {
  return QRCode.toString(ticketUrl(token), { ...options, type: "svg" });
}

export function ticketQrPng(token: string) {
  return QRCode.toBuffer(ticketUrl(token), { ...options, type: "png", width: 600 });
}
