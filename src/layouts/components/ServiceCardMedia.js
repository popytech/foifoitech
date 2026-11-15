import Icon from "@layouts/components/Icon";
import Image from "next/image";

// Visuel en tête d'une carte de service. Sans photo, on garde un fond
// dégradé avec l'icône du domaine, pour que toutes les cartes aient
// la même hauteur et le même rythme.
const ServiceCardMedia = ({ image, alt, icon }) => (
  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
    {image ? (
      <Image
        src={image}
        alt={alt || ""}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <Icon name={icon} className="h-16 w-16 text-primary/30" />
      </div>
    )}
  </div>
);

export default ServiceCardMedia;
