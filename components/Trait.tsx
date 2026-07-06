import KintsugiLine from "@/components/KintsugiLine";

/**
 * Séparateur de section — la fêlure d'or, dessinée au scroll.
 * (Shim de compatibilité : les pages migrent vers <KintsugiLine/> direct.)
 */
export default function Trait() {
  return (
    <div className="sep">
      <KintsugiLine variant="separator" />
    </div>
  );
}
