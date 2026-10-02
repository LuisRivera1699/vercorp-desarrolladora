export const SITE = {
  name: "Vercorp Desarrolladora",
  url: "https://proyectos.vercorp.com",
  parentUrl: "https://vercorp.com",
  wegrowUrl: "https://wegrow.pe",
  email: "contacto@vercorpperu.com",
  phone: "+51957329602",
  phoneLabel: "+51 957 329 602",
  whatsapp: "51957329602",
  instagram: "https://www.instagram.com/vercorp__/",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
