"use client";

import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard";
import {
  CheckboxField,
  FieldGroup,
  NumberField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/cms/fields";
import ImageField from "@/components/admin/cms/ImageField";
import ListEditor, { newItemId } from "@/components/admin/cms/ListEditor";
import SvgField from "@/components/admin/cms/SvgField";
import LandIcon from "@/components/LandIcon";
import StepIllustration from "@/components/StepIllustration";
import { HOME_MAX, LAND_ICONS, METRIC_SOURCES, NAV_ITEMS, NAV_LABELS, STEP_ARTS } from "@/lib/home/constants";
import type {
  ContactContent,
  CtaLink,
  DeliveredContent,
  ForSaleContent,
  FooterContent,
  GrowContent,
  HeaderContent,
  HeroContent,
  HomeContent,
  SectionId,
  StepsContent,
  WhyContent,
} from "@/lib/home/types";
import { emptyImage } from "@/lib/projects/defaults";
import { LIMITS } from "@/lib/projects/validate";

export type EditorProps<T> = { value: T; onChange: (value: T) => void };

const LINE_BREAK_HINT = "Presiona Enter para hacer un salto de línea en la web.";
const URL_HINT = "Enlace completo, que empiece con https://.";

function useSet<T>({ value, onChange }: EditorProps<T>) {
  return (patch: Partial<T>) => onChange({ ...value, ...patch });
}

/** Antetítulo, título y descripción de una sección. */
function Heading<T extends { eyebrow: string; title: string; description: string }>(props: EditorProps<T>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <AdminCard title="Encabezado" description="Antetítulo, título y texto de la sección.">
      <FieldGroup>
        <TextField
          label="Antetítulo"
          value={value.eyebrow}
          max={LIMITS.label}
          hint="Texto pequeño sobre el título."
          onChange={(eyebrow) => set({ eyebrow } as Partial<T>)}
        />
        <TextField
          label="Título"
          value={value.title}
          max={LIMITS.title}
          onChange={(title) => set({ title } as Partial<T>)}
        />
        <TextArea
          label="Descripción"
          value={value.description}
          max={LIMITS.text}
          onChange={(description) => set({ description } as Partial<T>)}
        />
      </FieldGroup>
    </AdminCard>
  );
}

function LinkFields({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: CtaLink;
  onChange: (value: CtaLink) => void;
  hint?: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label={`${label} · texto`}
        value={value.label}
        max={LIMITS.label}
        hint="Se le agrega una flecha (?) al final."
        onChange={(text) => onChange({ ...value, label: text })}
      />
      <TextField
        label={`${label} · enlace`}
        type="url"
        value={value.href}
        max={500}
        placeholder="https://"
        hint={hint ?? URL_HINT}
        onChange={(href) => onChange({ ...value, href })}
      />
    </div>
  );
}

function HeaderEditor(props: EditorProps<HeaderContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <AdminCard
        title="Logos"
        description="Sobre la portada se usa el logo claro; al hacer scroll el fondo se vuelve blanco y cambia al oscuro. Usa PNG sin fondo."
      >
        <FieldGroup>
          <ImageField
            label="Logo claro (sobre la portada)"
            logo="light"
            value={value.logoLight}
            onChange={(logoLight) => set({ logoLight })}
          />
          <ImageField
            label="Logo oscuro (menú fijo)"
            logo="dark"
            value={value.logoDark}
            onChange={(logoDark) => set({ logoDark })}
          />
        </FieldGroup>
      </AdminCard>
      <AdminCard title="Menú" description="Los textos de los enlaces. Cada uno lleva siempre a la misma sección del home.">
        <div className="grid gap-5 sm:grid-cols-2">
          {NAV_ITEMS.map((item) => (
            <TextField
              key={item.key}
              label={NAV_LABELS[item.key]}
              value={value.nav[item.key]}
              max={LIMITS.label}
              hint={`Lleva a ${item.href}`}
              onChange={(label) => set({ nav: { ...value.nav, [item.key]: label } })}
            />
          ))}
        </div>
        <div className="mt-5">
          <TextField
            label="Botón"
            value={value.ctaLabel}
            max={LIMITS.label}
            hint="Lleva al formulario de contacto del home."
            onChange={(ctaLabel) => set({ ctaLabel })}
          />
        </div>
      </AdminCard>
    </div>
  );
}

function HeroEditor(props: EditorProps<HeroContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <AdminCard title="Textos" description="Lo que se lee sobre la foto de portada.">
        <FieldGroup>
          <TextField
            label="Antetítulo"
            value={value.eyebrow}
            max={LIMITS.short}
            onChange={(eyebrow) => set({ eyebrow })}
          />
          <TextArea
            label="Título"
            value={value.title}
            max={LIMITS.short}
            rows={2}
            hint={LINE_BREAK_HINT}
            onChange={(title) => set({ title })}
          />
          <TextArea label="Texto" value={value.text} max={LIMITS.text} onChange={(text) => set({ text })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Botón principal"
              value={value.primaryLabel}
              max={LIMITS.label}
              hint="Lleva a Proyectos en venta."
              onChange={(primaryLabel) => set({ primaryLabel })}
            />
            <TextField
              label="Botón secundario"
              value={value.secondaryLabel}
              max={LIMITS.label}
              hint="Lleva a Proyectos entregados."
              onChange={(secondaryLabel) => set({ secondaryLabel })}
            />
          </div>
        </FieldGroup>
      </AdminCard>
      <AdminCard title="Foto" description="Ocupa toda la pantalla; el plano animado se dibuja encima.">
        <FieldGroup>
          <ImageField
            label="Foto de portada"
            aspect="aspect-video"
            hint="Horizontal, mínimo 1920 px de ancho."
            value={value.image}
            onChange={(image) => set({ image })}
          />
          <CheckboxField
            label="Mostrar el plano animado sobre la foto"
            checked={value.showPlan}
            onChange={(showPlan) => set({ showPlan })}
          />
        </FieldGroup>
      </AdminCard>
      <AdminCard
        title="Métricas"
        description="Las cifras bajo la portada. Cada una puede escribirse a mano o calcularse con la lista de Proyectos entregados."
      >
        <ListEditor
          items={value.metrics}
          onChange={(metrics) => set({ metrics })}
          createItem={() => ({ id: newItemId(), source: "manual" as const, value: 0, suffix: "", label: "" })}
          itemTitle={(item) => item.label}
          noun="Métrica"
          min={1}
          max={HOME_MAX.metrics}
          renderItem={(item, update) => (
            <>
              <SelectField
                label="Número"
                value={item.source}
                options={METRIC_SOURCES}
                onChange={(source) => update({ source })}
              />
              <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
                {item.source === "manual" ? (
                  <NumberField label="Valor" value={item.value} onChange={(number) => update({ value: number })} />
                ) : (
                  <p className="self-end rounded-lg bg-black/[0.03] px-3.5 py-2.5 text-sm text-foreground/60">
                    Se calcula con la lista de{" "}
                    <Link href="/admin/contenido/delivered" className="font-medium text-earth underline-offset-2 hover:underline">
                      Proyectos entregados
                    </Link>
                    .
                  </p>
                )}
                <TextField
                  label="Sufijo"
                  value={item.suffix}
                  max={4}
                  placeholder="+"
                  onChange={(suffix) => update({ suffix })}
                />
              </div>
              <TextField label="Texto" value={item.label} max={LIMITS.label} onChange={(label) => update({ label })} />
            </>
          )}
        />
      </AdminCard>
    </div>
  );
}

function StepsEditor(props: EditorProps<StepsContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <Heading {...props} />
      <AdminCard title="Pasos" description="Se numeran solos (01, 02…) en el orden de la lista.">
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({ id: newItemId(), title: "", description: "", art: "terrain" as const, customArt: null })}
          itemTitle={(item) => item.title}
          noun="Paso"
          min={1}
          max={HOME_MAX.steps}
          renderItem={(item, update) => (
            <>
              <TextField label="Título" value={item.title} max={LIMITS.short} onChange={(title) => update({ title })} />
              <TextArea
                label="Texto"
                value={item.description}
                max={LIMITS.text}
                onChange={(description) => update({ description })}
              />
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <SelectField label="Ilustración" value={item.art} options={STEP_ARTS} onChange={(art) => update({ art })} />
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-white text-accent">
                  <StepIllustration step={item} />
                </div>
              </div>
              {item.art === "custom" ? (
                <SvgField
                  label="Ilustración propia"
                  value={item.customArt}
                  light="#ffffff"
                  dark="#9b7653"
                  hint="Ícono cuadrado, de líneas simples, como los demás."
                  onChange={(customArt) => update({ customArt })}
                />
              ) : null}
            </>
          )}
        />
      </AdminCard>
    </div>
  );
}

function ForSaleEditor(props: EditorProps<ForSaleContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-black/[0.03] px-4 py-3 text-sm text-foreground/65">
        Las tarjetas son los proyectos publicados, en el orden de{" "}
        <Link href="/admin/proyectos" className="font-medium text-earth underline-offset-2 hover:underline">
          Proyectos
        </Link>
        . Aquí se editan los textos que comparten todas.
      </p>
      <AdminCard title="Encabezado" description="El título cambia según haya uno o varios proyectos publicados.">
        <FieldGroup>
          <TextField
            label="Antetítulo"
            value={value.eyebrow}
            max={LIMITS.label}
            onChange={(eyebrow) => set({ eyebrow })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Título con un proyecto"
              value={value.titleOne}
              max={LIMITS.title}
              onChange={(titleOne) => set({ titleOne })}
            />
            <TextField
              label="Título con varios proyectos"
              value={value.titleMany}
              max={LIMITS.title}
              onChange={(titleMany) => set({ titleMany })}
            />
          </div>
          <TextArea
            label="Descripción"
            value={value.description}
            max={LIMITS.text}
            onChange={(description) => set({ description })}
          />
        </FieldGroup>
      </AdminCard>
      <AdminCard
        title="Agendar visita"
        description="El mismo enlace para todas las tarjetas y para el botón Agendar llamada de los formularios."
      >
        <FieldGroup>
          <TextField
            label="Enlace"
            type="url"
            value={value.bookingUrl}
            max={500}
            placeholder="https://calendar.google.com/…"
            hint={URL_HINT}
            onChange={(bookingUrl) => set({ bookingUrl })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Botón Agendar visita"
              value={value.bookingLabel}
              max={LIMITS.label}
              onChange={(bookingLabel) => set({ bookingLabel })}
            />
            <TextField
              label="Botón Ver proyecto"
              value={value.viewLabel}
              max={LIMITS.label}
              onChange={(viewLabel) => set({ viewLabel })}
            />
          </div>
        </FieldGroup>
      </AdminCard>
      <AdminCard
        title="Datos de la tarjeta"
        description="La primera columna muestra el área mínima de cada proyecto; la segunda es un texto fijo. La tercera es el dato destacado de cada proyecto."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Área · prefijo"
            value={value.areaPrefix}
            max={12}
            hint="Antes del número, p. ej. desde."
            onChange={(areaPrefix) => set({ areaPrefix })}
          />
          <TextField label="Área · texto" value={value.areaLabel} max={LIMITS.label} onChange={(areaLabel) => set({ areaLabel })} />
          <TextField
            label="Segunda columna · valor"
            value={value.extraValue}
            max={12}
            onChange={(extraValue) => set({ extraValue })}
          />
          <TextField
            label="Segunda columna · texto"
            value={value.extraLabel}
            max={LIMITS.label}
            onChange={(extraLabel) => set({ extraLabel })}
          />
        </div>
      </AdminCard>
    </div>
  );
}

function WhyEditor(props: EditorProps<WhyContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <Heading {...props} />
      <AdminCard title="Enlace y foto" description="Bajo el encabezado. Sin enlace, no se muestra.">
        <FieldGroup>
          <LinkFields label="Enlace" value={value.link} onChange={(link) => set({ link })} />
          <ImageField label="Foto" value={value.image} onChange={(image) => set({ image })} />
        </FieldGroup>
      </AdminCard>
      <AdminCard title="Razones" description="Tarjetas con icono, título, texto y un enlace opcional.">
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newItemId(),
            icon: "trend" as const,
            title: "",
            description: "",
            link: { label: "", href: "" },
          })}
          itemTitle={(item) => item.title}
          noun="Razón"
          min={1}
          max={HOME_MAX.reasons}
          renderItem={(item, update) => (
            <>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <SelectField label="Icono" value={item.icon} options={LAND_ICONS} onChange={(icon) => update({ icon })} />
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-white text-accent">
                  <LandIcon id={item.icon} />
                </div>
              </div>
              <TextField label="Título" value={item.title} max={LIMITS.short} onChange={(title) => update({ title })} />
              <TextArea
                label="Texto"
                value={item.description}
                max={LIMITS.text}
                hint="Escribe {espacios} para mostrar el total de espacios entregados."
                onChange={(description) => update({ description })}
              />
              <LinkFields label="Enlace (opcional)" value={item.link} onChange={(link) => update({ link })} />
            </>
          )}
        />
      </AdminCard>
    </div>
  );
}

function GrowEditor(props: EditorProps<GrowContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <AdminCard title="Imágenes" description="La foto va de fondo, con una sombra para que se lea el texto.">
        <FieldGroup>
          <ImageField
            label="Foto de fondo"
            aspect="aspect-video"
            hint="Se mueve con el scroll; horizontal, mínimo 2000 px de ancho."
            value={value.image}
            onChange={(image) => set({ image })}
          />
          <ImageField
            label="Marca sobre el título"
            logo="light"
            hint="PNG blanco sin fondo."
            value={value.mark}
            onChange={(mark) => set({ mark })}
          />
        </FieldGroup>
      </AdminCard>
      <AdminCard title="Textos" description="Título, línea resaltada, texto y botón.">
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Título" value={value.title} max={LIMITS.short} onChange={(title) => set({ title })} />
            <TextField
              label="Línea resaltada"
              value={value.accent}
              max={LIMITS.short}
              hint="Va debajo del título, en color de acento."
              onChange={(accent) => set({ accent })}
            />
          </div>
          <TextArea label="Texto" value={value.text} max={LIMITS.text} onChange={(text) => set({ text })} />
          <TextField
            label="Botón"
            value={value.buttonLabel}
            max={LIMITS.label}
            hint="Lleva a Proyectos en venta."
            onChange={(buttonLabel) => set({ buttonLabel })}
          />
        </FieldGroup>
      </AdminCard>
    </div>
  );
}

function DeliveredEditor(props: EditorProps<DeliveredContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <Heading {...props} />
      <AdminCard
        title="Totales y sello"
        description="Los totales se calculan con la lista de abajo; aquí solo se editan sus textos."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Total de espacios · texto"
            value={value.lotsLabel}
            max={LIMITS.label}
            onChange={(lotsLabel) => set({ lotsLabel })}
          />
          <TextField
            label="Total de proyectos · texto"
            value={value.projectsLabel}
            max={LIMITS.label}
            onChange={(projectsLabel) => set({ projectsLabel })}
          />
          <TextField label="Sello · valor" value={value.sealValue} max={8} onChange={(sealValue) => set({ sealValue })} />
          <TextField label="Sello · texto" value={value.sealLabel} max={16} onChange={(sealLabel) => set({ sealLabel })} />
        </div>
      </AdminCard>
      <AdminCard title="Proyectos" description="También alimentan las métricas automáticas del hero.">
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({ id: newItemId(), name: "", district: "", lots: 0, area: 0, image: emptyImage() })}
          itemTitle={(item) => item.name}
          noun="Proyecto"
          min={1}
          max={HOME_MAX.delivered}
          renderItem={(item, update) => (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Nombre" value={item.name} max={LIMITS.label} onChange={(name) => update({ name })} />
                <TextField
                  label="Ubicación"
                  value={item.district}
                  max={LIMITS.short}
                  onChange={(district) => update({ district })}
                />
                <NumberField label="Espacios" value={item.lots} onChange={(lots) => update({ lots })} />
                <NumberField label="Área total (m²)" value={item.area} onChange={(area) => update({ area })} />
              </div>
              <ImageField label="Foto" aspect="aspect-[4/5]" value={item.image} onChange={(image) => update({ image })} />
            </>
          )}
        />
      </AdminCard>
    </div>
  );
}

function ContactEditor(props: EditorProps<ContactContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <div className="space-y-6">
      <AdminCard
        title="Datos de contacto"
        description="Se usan en toda la web: footer del home y de cada proyecto, formularios y botón de WhatsApp."
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Teléfono"
              type="tel"
              value={value.phone}
              max={24}
              placeholder="+51 979 381 776"
              hint="Con código de país. También es el número de WhatsApp."
              onChange={(phone) => set({ phone })}
            />
            <TextField
              label="Correo"
              type="email"
              value={value.email}
              max={LIMITS.short}
              onChange={(email) => set({ email })}
            />
          </div>
          <TextField label="Ciudad" value={value.city} max={LIMITS.label} onChange={(city) => set({ city })} />
          <TextArea
            label="Mensaje de WhatsApp"
            value={value.whatsappMessage}
            max={LIMITS.text}
            rows={2}
            hint="Texto con el que se abre el chat desde el botón flotante. Cada proyecto puede tener el suyo."
            onChange={(whatsappMessage) => set({ whatsappMessage })}
          />
        </FieldGroup>
      </AdminCard>
      <AdminCard title="Formulario del home" description="Encabezado del formulario y lo que se muestra al enviarlo.">
        <FieldGroup>
          <TextField
            label="Antetítulo"
            value={value.eyebrow}
            max={LIMITS.label}
            onChange={(eyebrow) => set({ eyebrow })}
          />
          <TextArea
            label="Título"
            value={value.title}
            max={LIMITS.title}
            rows={2}
            hint={`${LINE_BREAK_HINT} En celulares el título fluye en un solo párrafo.`}
            onChange={(title) => set({ title })}
          />
          <TextField
            label="Mensaje de éxito · título"
            value={value.successTitle}
            max={LIMITS.label}
            onChange={(successTitle) => set({ successTitle })}
          />
          <TextArea
            label="Mensaje de éxito · texto"
            value={value.successMessage}
            max={LIMITS.text}
            onChange={(successMessage) => set({ successMessage })}
          />
        </FieldGroup>
      </AdminCard>
    </div>
  );
}

function FooterEditor(props: EditorProps<FooterContent>) {
  const set = useSet(props);
  const { value } = props;
  return (
    <AdminCard title="Footer" description="El Instagram también se usa en el footer de cada proyecto.">
      <FieldGroup>
        <ImageField
          label="Logo"
          logo="light"
          hint="PNG claro sin fondo; el footer es oscuro."
          value={value.logo}
          onChange={(logo) => set({ logo })}
        />
        <TextArea label="Texto bajo el logo" value={value.text} max={LIMITS.text} onChange={(text) => set({ text })} />
        <TextField
          label="Instagram"
          type="url"
          value={value.instagram}
          max={500}
          placeholder="https://www.instagram.com/…"
          hint={URL_HINT}
          onChange={(instagram) => set({ instagram })}
        />
      </FieldGroup>
    </AdminCard>
  );
}

export const EDITORS: { [K in SectionId]: React.ComponentType<EditorProps<HomeContent[K]>> } = {
  header: HeaderEditor,
  hero: HeroEditor,
  steps: StepsEditor,
  forSale: ForSaleEditor,
  why: WhyEditor,
  grow: GrowEditor,
  delivered: DeliveredEditor,
  contact: ContactEditor,
  footer: FooterEditor,
};
