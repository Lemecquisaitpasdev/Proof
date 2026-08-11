"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « Share your story » — parcours guidé, étape par étape, dans une modale.
 * 1. e-mail (pour recevoir le code promo)  2. comment c'est arrivé
 * 3. ce que ça a changé (facultatif)       4. photos (facultatif)
 * → écran de fin : le code PROOF17 révélé + copie. La partie texte part par
 * mailto (pas de backend), les photos restent des aperçus côté client.
 */

const STEPS = ["Email", "What happened", "What it changed", "Photos"];
const CODE = "PROOF17";
const TO = "contactus@trackk.fr";
const MAX_PHOTOS = 4;

export default function StoryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [happened, setHappened] = useState("");
  const [changed, setChanged] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urls = photos.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [photos]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canAdvance =
    step === 0 ? emailValid : step === 1 ? happened.trim().length > 0 : true;
  const last = step === STEPS.length - 1;

  const openDialog = () => {
    setStep(0);
    setDone(false);
    setCopied(false);
    ref.current?.showModal();
  };
  const closeDialog = () => ref.current?.close();

  const next = () => {
    if (!canAdvance) return;
    if (last) submit();
    else setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const addPhotos = (list: FileList | null) => {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setPhotos((p) => [...p, ...imgs].slice(0, MAX_PHOTOS));
  };
  const removePhoto = (i: number) =>
    setPhotos((p) => p.filter((_, idx) => idx !== i));

  const submit = () => {
    const lines = [
      `Email: ${email.trim()}`,
      "",
      "How it happened:",
      happened.trim() || "—",
      "",
      "What it changed:",
      changed.trim() || "—",
    ];
    if (photos.length) {
      lines.push("", `(${photos.length} photo${photos.length > 1 ? "s" : ""} to attach)`);
    }
    const subject = encodeURIComponent("PROOF, the story of my scar");
    const body = encodeURIComponent(lines.join("\n"));
    // acheminement au mieux du texte — les photos restent à joindre à la main
    window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard indisponible — le code reste lisible à l'écran */
    }
  };

  return (
    <>
      <button type="button" className="btn btn--primary" onClick={openDialog}>
        Share your story
      </button>

      <dialog
        ref={ref}
        className="storydlg"
        aria-label="Share your scar's story"
        onClick={(e) => {
          if (e.target === ref.current) closeDialog();
        }}
      >
        <div className="storydlg__inner">
          <button
            type="button"
            className="storydlg__x"
            aria-label="Close"
            onClick={closeDialog}
          >
            ×
          </button>

          {!done ? (
            <>
              <div className="storydlg__head">
                <span className="mlabel">Proof 17 book / Season 01</span>
                <span className="storydlg__count">
                  {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="storydlg__bar" aria-hidden="true">
                <i style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>

              {step === 0 ? (
                <div className="storydlg__step">
                  <h2 className="storydlg__title">Unlock your code.</h2>
                  <p className="storydlg__sub">
                    Your email gets you <b>Code {CODE}</b>, 10% off, and opens
                    your story in the Proof 17 book.
                  </p>
                  <label className="fieldlabel" htmlFor="sd-email">
                    Email
                  </label>
                  <input
                    id="sd-email"
                    type="email"
                    className="field"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
              ) : null}

              {step === 1 ? (
                <div className="storydlg__step">
                  <h2 className="storydlg__title">How did it happen?</h2>
                  <p className="storydlg__sub">A line or a paragraph, in your words.</p>
                  <textarea
                    className="field field--area"
                    rows={5}
                    placeholder="The day, the accident, the surgery…"
                    value={happened}
                    onChange={(e) => setHappened(e.target.value)}
                    autoFocus
                  />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="storydlg__step">
                  <h2 className="storydlg__title">What did it change?</h2>
                  <p className="storydlg__sub">
                    What it changed, or what it taught you. Optional.
                  </p>
                  <textarea
                    className="field field--area"
                    rows={5}
                    placeholder="What you carry differently now…"
                    value={changed}
                    onChange={(e) => setChanged(e.target.value)}
                    autoFocus
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="storydlg__step">
                  <h2 className="storydlg__title">Add a photo or two.</h2>
                  <p className="storydlg__sub">
                    The scar, the ritual, your call. Optional, up to four.
                  </p>
                  <label className="dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => addPhotos(e.target.files)}
                      hidden
                    />
                    <span className="dropzone__plus" aria-hidden="true">
                      +
                    </span>
                    <span>
                      {photos.length ? "Add more" : "Choose photos"}
                    </span>
                  </label>
                  {previews.length ? (
                    <div className="thumbs">
                      {previews.map((src, i) => (
                        <div className="thumb" key={src}>
                          {/* aperçu local, pas d'optimisation next/image */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Selected ${i + 1}`} />
                          <button
                            type="button"
                            aria-label="Remove photo"
                            onClick={() => removePhoto(i)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="storydlg__foot">
                {step > 0 ? (
                  <button type="button" className="btn btn--line" onClick={back}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={next}
                  disabled={!canAdvance}
                >
                  {last ? "Send my story" : "Continue"}
                </button>
              </div>
            </>
          ) : (
            <div className="storydlg__done">
              <span className="storydlg__check" aria-hidden="true">
                ✓
              </span>
              <h2 className="storydlg__title">Your story is in.</h2>
              <p className="storydlg__sub">
                Thank you. Here is your code, 10% off the whole shop.
              </p>
              <button type="button" className="codechip" onClick={copyCode}>
                <span>{CODE}</span>
                <b>{copied ? "Copied" : "Copy"}</b>
              </button>
              {photos.length ? (
                <p className="storydlg__note">
                  One thing: attach your {photos.length} photo
                  {photos.length > 1 ? "s" : ""} to the email we just opened.
                </p>
              ) : null}
              <button
                type="button"
                className="btn btn--primary"
                onClick={closeDialog}
                style={{ marginTop: 20 }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
