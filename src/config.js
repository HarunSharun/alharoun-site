export const WHATSAPP_NUMBER = '2348110594240'

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function shareLink(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}