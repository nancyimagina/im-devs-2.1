import logoLight from "@/assets/logos/logo-im-devs-light.png.asset.json";
import logoDark from "@/assets/logos/logo-im-devs-dark.png.asset.json";
import iconGreen from "@/assets/logos/icon-green.png.asset.json";
import iconLight from "@/assets/logos/icon-light.png.asset.json";
import bbva from "@/assets/logos/logo-BBVA.png.asset.json";
import nutresa from "@/assets/logos/logo-Nutresa.png.asset.json";
import agione from "@/assets/logos/logo-agione.png.asset.json";
import amazonia from "@/assets/logos/logo-amazonia.png.asset.json";
import bimbo from "@/assets/logos/logo-bimbo.png.asset.json";
import dane from "@/assets/logos/logo-dane.png.asset.json";
import renuity from "@/assets/logos/logo-renuity.png.asset.json";

export const brand = {
  logoLight: logoLight.url,
  logoDark: logoDark.url,
  iconGreen: iconGreen.url,
  iconLight: iconLight.url,
  email: "info@imaginadevs.com",
  phone: "+1 3212522392",
  phoneHref: "+13212522392",
};

export type ClientLogo = { name: string; url: string };

export const clientLogos: ClientLogo[] = [
  { name: "BBVA", url: bbva.url },
  { name: "Renuity", url: renuity.url },
  { name: "Nutresa", url: nutresa.url },
  { name: "AgiOne", url: agione.url },
  { name: "Amazonía", url: amazonia.url },
  { name: "Bimbo", url: bimbo.url },
  { name: "DANE", url: dane.url },
];

export const logoByName = Object.fromEntries(clientLogos.map((l) => [l.name, l.url]));
