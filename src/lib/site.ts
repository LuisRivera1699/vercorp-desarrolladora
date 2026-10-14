export const SITE = {
  name: "Vercorp Desarrolladora",
  url: "https://proyectos.vercorp.com",
  parentUrl: "https://vercorp.com",
  wegrowUrl: "https://wegrow.pe",
  email: "contacto@vercorpperu.com",
  bookingUrl:
    "https://calendar.google.com/appointments/schedules/AcZssZ2dAMV_EP_1eV1RY-yFLYonYK6Mx4xxxleKsLmItk2YDwZzpUA9_zd3pn8BWyQG0y4fteFGB888",
  phone: "+51957329602",
  phoneLabel: "+51 957 329 602",
  whatsapp: "51957329602",
  instagram: "https://www.instagram.com/vercorp__/",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
