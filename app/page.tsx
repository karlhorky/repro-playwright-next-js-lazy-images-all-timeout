import Image from 'next/image';
import ClientComponent from './ClientComponent';

export default function Home() {
  return (
    <div>
      {Array.from({ length: 20 }, (_, i) => {
        const imgNum = i + 1;
        const imgName = `image_${imgNum}.${imgNum % 2 === 0 ? 'jpg' : 'png'}`;
        return (
          <Image
            key={imgNum}
            src={`/images/${imgName}`}
            alt={`Demo Image ${imgNum}`}
            loading="lazy"
            width={300}
            height={300}
            style={{ display: 'block', marginTop: 500 }}
          />
        );
      })}
      <ClientComponent />
    </div>
  );
}
