'use client';

export default function ClientComponent() {
  return (
    <style>{`
    img + img + img + img + img + img,
    img + img + img + img + img + img + img + img,
    img + img + img + img + img + img + img + img + img + img,
    img + img + img + img + img + img + img + img + img + img + img + img {
      display: none;
    }
  `}</style>
  );
}
