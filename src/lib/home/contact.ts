/** `+51 979 381 776` ? `+51979381776`. */
export function plainPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function telHref(phone: string) {
  return `tel:${plainPhone(phone)}`;
}

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
