"use client";

import Link from "next/link";
import { useId } from "react";
import AdminCard from "@/components/admin/AdminCard";
import {
  ButtonColorsField,
  ColorField,
  ColorGrid,
  ContrastWarning,
  OverlayField,
  PaletteContext,
} from "@/components/admin/cms/colors";
import {
  FieldGroup,
  INPUT_CLASS,
  NumberField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/cms/fields";
import ImageField from "@/components/admin/cms/ImageField";
import SvgField from "@/components/admin/cms/SvgField";
import { FONTS, HEX_PATTERN, PALETTE_KEYS, PALETTE_LABELS, STATUS_OPTIONS } from "@/lib/projects/constants";
import { emptyImage } from "@/lib/projects/defaults";
import type { BackingIcon, Color, ContactCopy, Project, SectionColors } from "@/lib/projects/types";
import { LIMITS, MAX } from "@/lib/projects/validate";
import { GrowthList, LotsEditor, PhotoList, StepList, TextList, ValueList } from "./lists";

export const PROJECT_SECTIONS = [
  { id: "general", label: "General" },
  { id: "branding", label: "Branding" },
  { id: "espacios", label: "Precios y espacios" },
  { id: "menu", label: "Menú" },
  { id: "portada", label: "Portada" },
  { id: "proyecto", label: "El proyecto" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "beneficios", label: "Beneficios" },
  { id: "rentabilidad", label: "Rentabilidad" },
  { id: "plano", label: "Plano" },
  { id: "compra", label: "Compra" },
  { id: "respaldo", label: "Respaldo" },
  { id: "contacto", label: "Contacto" },
  { id: "footer", label: "Footer y WhatsApp" },
];

type Styled = {
  [K in keyof Project]: Project[K] extends { style: object } ? K : never;
}[keyof Project];

const BACKING_ICONS: { value: BackingIcon; label: string }[] = [
  { value: "mark", label: "El icono del proyecto" },
  { value: "custom", label: "Otro icono (SVG)" },
  { value: "none", label: "Sin icono" },
];

export default function ProjectForm({
  value,
  onChange,
}: {
  value: Project;
  onChange: (value: Project) => void;
}) {
  const set = <K extends keyof Project>(key: K, next: Project[K]) => onChange({ ...value, [key]: next });
  const edit =
    <K extends Styled>(key: K) =>
    (patch: Partial<Project[K]>) =>
      set(key, { ...value[key], ...patch });
  const style =
    <K extends Styled>(key: K) =>
    (patch: Partial<Project[K]["style"]>) =>
      set(key, { ...value[key], style: { ...value[key].style, ...patch } });

  const { palette, header, hero, intro, location, benefits, growth, lotPlan, purchase, backing, contact } = value;
  const editHeader = edit("header");
  const headerStyle = style("header");
  const editHero = edit("hero");
  const heroStyle = style("hero");
  const editIntro = edit("intro");
  const introStyle = style("intro");
  const editLocation = edit("location");
  const locationStyle = style("location");
  const editBenefits = edit("benefits");
  const benefitsStyle = style("benefits");
  const editGrowth = edit("growth");
  const growthStyle = style("growth");
  const editLotPlan = edit("lotPlan");
  const lotPlanStyle = style("lotPlan");
  const editPurchase = edit("purchase");
  const purchaseStyle = style("purchase");
  const editBacking = edit("backing");
  const backingStyle = style("backing");
  const editContact = edit("contact");
  const contactStyle = style("contact");

  return (
    <PaletteContext.Provider value={palette}>
      <div className="space-y-6">
        <AdminCard
          id="general"
          title="General"
          description="Datos del proyecto que se usan en su página, en el home, en el formulario y en el footer."
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Nombre" value={value.name} max={LIMITS.label} onChange={(name) => set("name", name)} />
              <SelectField
                label="Estado"
                value={value.status}
                options={STATUS_OPTIONS}
                hint="Al venderse el 80 % de los espacios, la web muestra «Últimos espacios»."
                onChange={(status) => set("status", status)}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Ubicación" value={value.place} max={LIMITS.short} onChange={(place) => set("place", place)} />
              <TextField
                label="Frase"
                value={value.tagline}
                max={LIMITS.short}
                hint="Debajo del logo en la portada y en la tarjeta del home."
                onChange={(tagline) => set("tagline", tagline)}
              />
            </div>
            <TextArea
              label="Resumen"
              value={value.summary}
              max={LIMITS.text}
              hint="Tarjeta del home y descripción para Google y redes sociales."
              onChange={(summary) => set("summary", summary)}
            />
            <Field label="Dato destacado en el home">
              <ValueList
                items={value.highlights}
                onChange={(highlights) => set("highlights", highlights)}
                noun="Dato"
                max={MAX.highlights}
              />
            </Field>
            <ImageField
              label="Imagen para redes sociales (opcional)"
              value={value.ogImage ?? emptyImage()}
              og
              hint="Se recorta a 1200 × 630. Si no subes una, se usa la foto de portada."
              onChange={(ogImage) => set("ogImage", ogImage)}
              onRemove={() => set("ogImage", null)}
            />
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="branding"
          title="Branding"
          description="Logo, icono, tipografía y paleta. Los colores de cada sección pueden tomar los de la paleta: si la cambias, cambian con ella."
        >
          <FieldGroup>
            <SvgField
              label="Logo"
              value={value.logo}
              light={palette.background}
              dark={palette.ink}
              hint="Portada, menú, plano y fotos del proyecto."
              onChange={(logo) => set("logo", logo)}
            />
            <SvgField
              label="Icono"
              value={value.mark}
              light={palette.background}
              dark={palette.ink}
              hint="Junto a los antetítulos, en el footer y, si quieres, en el respaldo del holding."
              onChange={(mark) => set("mark", mark)}
            />
            <SelectField label="Tipografía" value={value.font} options={FONTS} onChange={(font) => set("font", font)} />
            <Field label="Paleta">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PALETTE_KEYS.map((key) => (
                  <PaletteColor
                    key={key}
                    label={PALETTE_LABELS[key]}
                    value={palette[key]}
                    onChange={(color) => set("palette", { ...palette, [key]: color })}
                  />
                ))}
              </div>
            </Field>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="espacios"
          title="Precios y espacios"
          description="El financiamiento de la portada, la disponibilidad y el plano se calculan con estos datos."
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <NumberField
                label="Área mínima (m²)"
                value={value.pricing.areaFrom}
                hint="Base del ejemplo de financiamiento."
                onChange={(areaFrom) => set("pricing", { ...value.pricing, areaFrom })}
              />
              <NumberField
                label="Precio por m² (US$)"
                value={value.pricing.pricePerM2}
                decimals
                onChange={(pricePerM2) => set("pricing", { ...value.pricing, pricePerM2 })}
              />
              <NumberField
                label="Inicial (%)"
                value={value.pricing.downPaymentPercent}
                decimals
                onChange={(downPaymentPercent) => set("pricing", { ...value.pricing, downPaymentPercent })}
              />
              <NumberField
                label="Cuotas sin intereses"
                value={value.pricing.installments}
                onChange={(installments) => set("pricing", { ...value.pricing, installments })}
              />
            </div>
            <Field label="Espacios">
              <LotsEditor lots={value.lots} onChange={(lots) => set("lots", lots)} defaultArea={value.pricing.areaFrom} />
            </Field>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="menu"
          title="Menú"
          description="Barra superior. Sus enlaces salen de las secciones visibles; cada una define su texto en el menú."
        >
          <FieldGroup>
            <TextField
              label="Botón"
              value={header.ctaLabel}
              max={LIMITS.label}
              onChange={(ctaLabel) => editHeader({ ctaLabel })}
            />
            <Colors>
              <ColorGrid>
                <ColorField label="Fondo al bajar" value={header.style.solidBg} onChange={(solidBg) => headerStyle({ solidBg })} />
                <ColorField label="Texto al bajar" value={header.style.solidFg} onChange={(solidFg) => headerStyle({ solidFg })} />
                <ColorField label="Texto sobre la portada" value={header.style.clearFg} onChange={(clearFg) => headerStyle({ clearFg })} />
                <div />
                <ColorField label="Fondo del menú en celular" value={header.style.menuBg} onChange={(menuBg) => headerStyle({ menuBg })} />
                <ColorField label="Texto del menú en celular" value={header.style.menuFg} onChange={(menuFg) => headerStyle({ menuFg })} />
              </ColorGrid>
              <ContrastWarning bg={header.style.solidBg} fg={header.style.solidFg} />
              <ContrastWarning bg={header.style.menuBg} fg={header.style.menuFg} label="El texto del menú en celular" />
              <ButtonColorsField label="Botón al bajar" value={header.style.ctaSolid} onChange={(ctaSolid) => headerStyle({ ctaSolid })} />
              <ButtonColorsField
                label="Botón sobre la portada y en el menú de celular"
                value={header.style.ctaClear}
                onChange={(ctaClear) => headerStyle({ ctaClear })}
              />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard id="portada" title="Portada" description="Foto a pantalla completa con el logo, el estado y el financiamiento.">
          <FieldGroup>
            <ImageField label="Foto" value={hero.image} aspect="aspect-video" onChange={(image) => editHero({ image })} />
            <TextField
              label="Texto sobre el logo de Vercorp"
              value={hero.byline}
              max={LIMITS.label}
              onChange={(byline) => editHero({ byline })}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Botón principal (a Agendar visita)"
                value={hero.primaryLabel}
                max={LIMITS.label}
                onChange={(primaryLabel) => editHero({ primaryLabel })}
              />
              <TextField
                label="Botón secundario (a Comprar)"
                value={hero.secondaryLabel}
                max={LIMITS.label}
                onChange={(secondaryLabel) => editHero({ secondaryLabel })}
              />
            </div>
            <Colors>
              <SectionColorFields
                value={hero.style}
                onChange={heroStyle}
                labels={{ bg: "Fondo mientras carga la foto", fg: "Texto y logo", accent: "Punto del estado" }}
              />
              <OverlayField label="Capa sobre la foto" value={hero.style.overlay} onChange={(overlay) => heroStyle({ overlay })} />
              <ButtonColorsField label="Botón principal" value={hero.style.primary} onChange={(primary) => heroStyle({ primary })} />
              <ButtonColorsField
                label="Botón secundario"
                bgLabel="Borde"
                value={hero.style.secondary}
                onChange={(secondary) => heroStyle({ secondary })}
              />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="proyecto"
          title="El proyecto"
          description="Presentación, datos clave y foto."
          muted={!intro.visible}
          actions={<VisibleSwitch checked={intro.visible} onChange={(visible) => editIntro({ visible })} />}
        >
          <FieldGroup>
            <SectionHeading
              navLabel={intro.navLabel}
              eyebrow={intro.eyebrow}
              title={intro.title}
              onChange={editIntro}
            />
            <Field label="Párrafos">
              <TextList items={intro.paragraphs} onChange={(paragraphs) => editIntro({ paragraphs })} noun="Párrafo" min={1} max={MAX.paragraphs} />
            </Field>
            <TextField label="Frase final (opcional)" value={intro.note} max={LIMITS.title} onChange={(note) => editIntro({ note })} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Texto del área"
                value={intro.areaLabel}
                max={LIMITS.short}
                hint="Acompaña al área mínima por espacio."
                onChange={(areaLabel) => editIntro({ areaLabel })}
              />
              <TextField
                label="Texto de disponibles"
                value={intro.availableLabel}
                max={LIMITS.short}
                hint="Acompaña a la cantidad de espacios disponibles."
                onChange={(availableLabel) => editIntro({ availableLabel })}
              />
            </div>
            <Field label="Otros datos">
              <ValueList items={intro.facts} onChange={(facts) => editIntro({ facts })} noun="Dato" max={MAX.facts} />
            </Field>
            <TextArea
              label="Aclaración (opcional)"
              value={intro.disclaimer}
              max={LIMITS.text}
              onChange={(disclaimer) => editIntro({ disclaimer })}
            />
            <ImageField label="Foto" value={intro.image} hint="Lleva el logo del proyecto encima." onChange={(image) => editIntro({ image })} />
            <Colors>
              <SectionColorFields value={intro.style} onChange={introStyle} />
              <ColorField label="Logo sobre la foto" value={intro.style.photoLogo} onChange={(photoLogo) => introStyle({ photoLogo })} />
              <OverlayField label="Sombra de la foto" bottomOnly value={intro.style.overlay} onChange={(overlay) => introStyle({ overlay })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="ubicacion"
          title="Ubicación"
          description="Dónde está el proyecto y a qué distancia de todo."
          muted={!location.visible}
          actions={<VisibleSwitch checked={location.visible} onChange={(visible) => editLocation({ visible })} />}
        >
          <FieldGroup>
            <SectionHeading
              navLabel={location.navLabel}
              eyebrow={location.eyebrow}
              title={location.title}
              onChange={editLocation}
            />
            <TextField label="Lugar" value={location.place} max={LIMITS.label} onChange={(place) => editLocation({ place })} />
            <TextArea
              label="Descripción"
              value={location.description}
              max={LIMITS.long}
              rows={4}
              onChange={(description) => editLocation({ description })}
            />
            <Field label="Distancias">
              <ValueList
                items={location.distances}
                onChange={(distances) => editLocation({ distances })}
                noun="Distancia"
                max={MAX.distances}
                valueHint="Por ejemplo, 30 min."
              />
            </Field>
            <TextField label="Lema (opcional)" value={location.motto} max={LIMITS.title} onChange={(motto) => editLocation({ motto })} />
            <ImageField label="Foto" value={location.image} hint="Lleva el logo del proyecto encima." onChange={(image) => editLocation({ image })} />
            <Colors>
              <SectionColorFields value={location.style} onChange={locationStyle} />
              <ColorField label="Logo sobre la foto" value={location.style.photoLogo} onChange={(photoLogo) => locationStyle({ photoLogo })} />
              <OverlayField label="Sombra de la foto" bottomOnly value={location.style.overlay} onChange={(overlay) => locationStyle({ overlay })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="beneficios"
          title="Beneficios"
          description="Fotos de lo que ofrece el proyecto y de las actividades cercanas."
          muted={!benefits.visible}
          actions={<VisibleSwitch checked={benefits.visible} onChange={(visible) => editBenefits({ visible })} />}
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Antetítulo" value={benefits.eyebrow} max={LIMITS.label} onChange={(eyebrow) => editBenefits({ eyebrow })} />
              <TextField label="Título" value={benefits.title} max={LIMITS.title} onChange={(title) => editBenefits({ title })} />
            </div>
            <Field label="Beneficios">
              <PhotoList items={benefits.items} onChange={(items) => editBenefits({ items })} noun="Beneficio" />
            </Field>
            <div className="rounded-xl p-4 ring-1 ring-black/10">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium">Actividades</p>
                <VisibleSwitch
                  checked={benefits.activities.visible}
                  onChange={(visible) => editBenefits({ activities: { ...benefits.activities, visible } })}
                />
              </div>
              <FieldGroup>
                <TextField
                  label="Título"
                  value={benefits.activities.title}
                  max={LIMITS.title}
                  onChange={(title) => editBenefits({ activities: { ...benefits.activities, title } })}
                />
                <PhotoList
                  items={benefits.activities.items}
                  onChange={(items) => editBenefits({ activities: { ...benefits.activities, items } })}
                  noun="Actividad"
                />
              </FieldGroup>
            </div>
            <Colors>
              <SectionColorFields value={benefits.style} onChange={benefitsStyle} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="rentabilidad"
          title="Rentabilidad"
          description="Tarjetas con foto sobre por qué el proyecto es una buena inversión."
          muted={!growth.visible}
          actions={<VisibleSwitch checked={growth.visible} onChange={(visible) => editGrowth({ visible })} />}
        >
          <FieldGroup>
            <SectionHeading navLabel={growth.navLabel} eyebrow={growth.eyebrow} title={growth.title} onChange={editGrowth} />
            <TextArea
              label="Descripción (opcional)"
              value={growth.description}
              max={LIMITS.text}
              onChange={(description) => editGrowth({ description })}
            />
            <Field label="Tarjetas">
              <GrowthList items={growth.items} onChange={(items) => editGrowth({ items })} />
            </Field>
            <Colors>
              <SectionColorFields value={growth.style} onChange={growthStyle} />
              <ColorField label="Texto de las tarjetas" value={growth.style.cardFg} onChange={(cardFg) => growthStyle({ cardFg })} />
              <OverlayField label="Capa sobre las fotos" value={growth.style.overlay} onChange={(overlay) => growthStyle({ overlay })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="plano"
          title="Plano"
          description="Imagen del plano de lotización, con sus características."
          muted={!lotPlan.visible}
          actions={<VisibleSwitch checked={lotPlan.visible} onChange={(visible) => editLotPlan({ visible })} />}
        >
          <FieldGroup>
            <SectionHeading
              navLabel={lotPlan.navLabel}
              eyebrow={lotPlan.eyebrow}
              title={lotPlan.title}
              titleHint="Escribe {total} donde quieras mostrar la cantidad de espacios."
              onChange={editLotPlan}
            />
            <TextArea label="Descripción" value={lotPlan.description} max={LIMITS.text} onChange={(description) => editLotPlan({ description })} />
            <TextField
              label="Título de la lista (opcional)"
              value={lotPlan.featuresTitle}
              max={LIMITS.short}
              onChange={(featuresTitle) => editLotPlan({ featuresTitle })}
            />
            <Field label="Características">
              <TextList
                items={lotPlan.features}
                onChange={(features) => editLotPlan({ features })}
                noun="Característica"
                max={MAX.features}
                limit={LIMITS.short}
              />
            </Field>
            <ImageField
              label="Plano"
              value={lotPlan.image}
              sharp
              hint="Se guarda con más calidad para que se lean los números."
              onChange={(image) => editLotPlan({ image })}
            />
            <TextField label="Botón" value={lotPlan.buttonLabel} max={LIMITS.label} onChange={(buttonLabel) => editLotPlan({ buttonLabel })} />
            <Colors>
              <SectionColorFields value={lotPlan.style} onChange={lotPlanStyle} />
              <ColorGrid>
                <ColorField label="Fondo del plano" value={lotPlan.style.planBg} onChange={(planBg) => lotPlanStyle({ planBg })} />
                <ColorField label="Logo sobre el plano" value={lotPlan.style.planLogo} onChange={(planLogo) => lotPlanStyle({ planLogo })} />
                <ColorField label="Punto de disponibles" value={lotPlan.style.dot} onChange={(dot) => lotPlanStyle({ dot })} />
              </ColorGrid>
              <ButtonColorsField label="Botones" value={lotPlan.style.button} onChange={(button) => lotPlanStyle({ button })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="compra"
          title="Proceso de compra"
          description="Pasos numerados para comprar un espacio."
          muted={!purchase.visible}
          actions={<VisibleSwitch checked={purchase.visible} onChange={(visible) => editPurchase({ visible })} />}
        >
          <FieldGroup>
            <SectionHeading navLabel={purchase.navLabel} eyebrow={purchase.eyebrow} title={purchase.title} onChange={editPurchase} />
            <Field label="Pasos">
              <StepList items={purchase.steps} onChange={(steps) => editPurchase({ steps })} noun="Paso" min={1} max={MAX.steps} />
            </Field>
            <TextField label="Botón" value={purchase.buttonLabel} max={LIMITS.label} onChange={(buttonLabel) => editPurchase({ buttonLabel })} />
            <Colors>
              <SectionColorFields value={purchase.style} onChange={purchaseStyle} labels={{ accent: "Números de los pasos" }} />
              <ColorField label="Fondo del recuadro final" value={purchase.style.cardBg} onChange={(cardBg) => purchaseStyle({ cardBg })} />
              <ButtonColorsField label="Botón" value={purchase.style.button} onChange={(button) => purchaseStyle({ button })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="respaldo"
          title="Respaldo del holding"
          description="Sus textos son los mismos en todos los proyectos. Aquí eliges si se muestra, su icono y sus colores."
          muted={!backing.visible}
          actions={<VisibleSwitch checked={backing.visible} onChange={(visible) => editBacking({ visible })} />}
        >
          <FieldGroup>
            <p className="rounded-lg bg-black/[0.03] px-3.5 py-2.5 text-sm text-foreground/65">
              Los textos se editan en{" "}
              <Link href="/admin/respaldo" className="font-medium text-earth underline underline-offset-2">
                Respaldo del holding
              </Link>
              .
            </p>
            <SelectField
              label="Icono junto al antetítulo"
              value={backing.icon}
              options={BACKING_ICONS}
              hint={backing.icon === "mark" ? "Se actualiza solo si cambias el icono en Branding." : undefined}
              onChange={(icon) => editBacking({ icon })}
            />
            {backing.icon === "custom" ? (
              <SvgField
                label="Icono propio"
                value={backing.customIcon}
                light={palette.background}
                dark={palette.ink}
                onChange={(customIcon) => editBacking({ customIcon })}
              />
            ) : null}
            <Colors>
              <SectionColorFields value={backing.style} onChange={backingStyle} labels={{ accent: "Icono" }} />
              <ButtonColorsField label="Botón" bgLabel="Borde" value={backing.style.button} onChange={(button) => backingStyle({ button })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard
          id="contacto"
          title="Contacto"
          description="Foto con los datos de contacto y el formulario con dos pestañas: agendar visita y comprar."
          muted={!contact.visible}
          actions={<VisibleSwitch checked={contact.visible} onChange={(visible) => editContact({ visible })} />}
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Título" value={contact.heading} max={LIMITS.label} onChange={(heading) => editContact({ heading })} />
              <TextField label="Texto" value={contact.blurb} max={LIMITS.title} onChange={(blurb) => editContact({ blurb })} />
            </div>
            <ImageField label="Foto" value={contact.image} aspect="aspect-[4/5]" onChange={(image) => editContact({ image })} />
            <ContactCopyFields label="Pestaña «Agendar visita»" value={contact.visit} onChange={(visit) => editContact({ visit })} />
            <ContactCopyFields label="Pestaña «Comprar»" value={contact.buy} onChange={(buy) => editContact({ buy })} />
            <Colors>
              <ColorGrid>
                <ColorField label="Fondo" value={contact.style.bg} onChange={(bg) => contactStyle({ bg })} />
                <ColorField label="Texto" value={contact.style.fg} onChange={(fg) => contactStyle({ fg })} />
                <ColorField label="Texto sobre la foto" value={contact.style.photoFg} onChange={(photoFg) => contactStyle({ photoFg })} />
                <ColorField label="Fondo de las pestañas" value={contact.style.tabsBg} onChange={(tabsBg) => contactStyle({ tabsBg })} />
              </ColorGrid>
              <ContrastWarning bg={contact.style.bg} fg={contact.style.fg} />
              <OverlayField label="Capa sobre la foto" value={contact.style.overlay} onChange={(overlay) => contactStyle({ overlay })} />
              <ButtonColorsField label="Pestaña activa" value={contact.style.tabActive} onChange={(tabActive) => contactStyle({ tabActive })} />
              <ButtonColorsField label="Botón de enviar" value={contact.style.button} onChange={(button) => contactStyle({ button })} />
            </Colors>
          </FieldGroup>
        </AdminCard>

        <AdminCard id="footer" title="Footer y WhatsApp" description="Pie de página y botón flotante de WhatsApp.">
          <FieldGroup>
            <TextArea
              label="Mensaje de WhatsApp"
              value={value.whatsapp.message}
              max={LIMITS.text}
              hint="Texto que aparece escrito al abrir el chat."
              onChange={(message) => set("whatsapp", { ...value.whatsapp, message })}
            />
            <Colors>
              <ColorGrid>
                <ColorField
                  label="Fondo del footer"
                  value={value.footer.style.bg}
                  onChange={(bg) => set("footer", { style: { ...value.footer.style, bg } })}
                />
                <ColorField
                  label="Texto del footer"
                  value={value.footer.style.fg}
                  onChange={(fg) => set("footer", { style: { ...value.footer.style, fg } })}
                />
              </ColorGrid>
              <ContrastWarning bg={value.footer.style.bg} fg={value.footer.style.fg} />
              <ButtonColorsField
                label="Botón de WhatsApp"
                value={value.whatsapp.style}
                onChange={(next) => set("whatsapp", { ...value.whatsapp, style: next })}
              />
            </Colors>
          </FieldGroup>
        </AdminCard>
      </div>
    </PaletteContext.Provider>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      {children}
    </div>
  );
}

function VisibleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <span className={checked ? "text-foreground" : "text-foreground/50"}>{checked ? "Visible" : "Oculta"}</span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`relative h-6 w-10 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent ${
          checked ? "bg-emerald-600" : "bg-black/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
    </label>
  );
}

function Colors({ children }: { children: React.ReactNode }) {
  return (
    <details className="group rounded-xl bg-black/[0.02] ring-1 ring-black/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 text-earth" aria-hidden>
            <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.4-9-7.4Z" />
            <circle cx="7.5" cy="11.5" r="1" />
            <circle cx="10.5" cy="7.5" r="1" />
            <circle cx="15" cy="7.5" r="1" />
          </svg>
          Colores de la sección
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-foreground/40 transition-transform group-open:rotate-180"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="space-y-5 border-t border-black/5 bg-white px-4 py-5">{children}</div>
    </details>
  );
}

function SectionColorFields<T extends SectionColors>({
  value,
  onChange,
  labels = {},
}: {
  value: T;
  onChange: (patch: Partial<SectionColors>) => void;
  labels?: Partial<Record<keyof SectionColors, string>>;
}) {
  return (
    <>
      <ColorGrid>
        <ColorField label={labels.bg ?? "Fondo"} value={value.bg} onChange={(bg) => onChange({ bg })} />
        <ColorField label={labels.fg ?? "Texto"} value={value.fg} onChange={(fg) => onChange({ fg })} />
        <ColorField label={labels.accent ?? "Iconos"} value={value.accent} onChange={(accent) => onChange({ accent })} />
      </ColorGrid>
      <ContrastWarning bg={value.bg} fg={value.fg} />
    </>
  );
}

function SectionHeading({
  navLabel,
  eyebrow,
  title,
  titleHint,
  onChange,
}: {
  navLabel: string;
  eyebrow: string;
  title: string;
  titleHint?: string;
  onChange: (patch: { navLabel?: string; eyebrow?: string; title?: string }) => void;
}) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Texto en el menú"
          value={navLabel}
          max={LIMITS.label}
          onChange={(next) => onChange({ navLabel: next })}
        />
        <TextField label="Antetítulo" value={eyebrow} max={LIMITS.label} onChange={(next) => onChange({ eyebrow: next })} />
      </div>
      <TextField label="Título" value={title} max={LIMITS.title} hint={titleHint} onChange={(next) => onChange({ title: next })} />
    </>
  );
}

function ContactCopyFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ContactCopy;
  onChange: (value: ContactCopy) => void;
}) {
  const set = (patch: Partial<ContactCopy>) => onChange({ ...value, ...patch });
  return (
    <fieldset className="rounded-xl p-4 ring-1 ring-black/10">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Pestaña" value={value.tab} max={LIMITS.label} onChange={(tab) => set({ tab })} />
          <TextField label="Botón de enviar" value={value.submit} max={LIMITS.label} onChange={(submit) => set({ submit })} />
        </div>
        <TextField label="Título" value={value.title} max={LIMITS.short} onChange={(title) => set({ title })} />
        <TextArea label="Descripción" value={value.description} max={LIMITS.text} onChange={(description) => set({ description })} />
        <TextField label="Mensaje al enviar" value={value.success} max={LIMITS.short} onChange={(success) => set({ success })} />
      </FieldGroup>
    </fieldset>
  );
}

function PaletteColor({ label, value, onChange }: { label: string; value: Color; onChange: (value: Color) => void }) {
  const id = useId();
  const valid = HEX_PATTERN.test(value);
  return (
    <div className="flex items-center gap-2.5 rounded-xl p-2.5 ring-1 ring-black/10">
      <input
        type="color"
        aria-label={label}
        value={valid ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-9 shrink-0 cursor-pointer rounded-lg bg-transparent"
      />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block truncate text-xs font-medium text-foreground/70">
          {label}
        </label>
        <input
          id={id}
          value={value}
          maxLength={7}
          onChange={(e) => {
            const next = e.target.value.trim();
            onChange(next.startsWith("#") ? next : `#${next}`);
          }}
          className={`${INPUT_CLASS} mt-0.5 h-7 px-2 font-mono text-xs ${valid ? "" : "border-red-400"}`}
        />
      </div>
    </div>
  );
}
