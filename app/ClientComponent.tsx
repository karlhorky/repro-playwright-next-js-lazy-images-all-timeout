'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Container = styled.div`
  img {
    display: block;
    margin-top: 500px;
  }
  img + img + img + img + img + img,
  img + img + img + img + img + img + img + img,
  img + img + img + img + img + img + img + img + img + img,
  img + img + img + img + img + img + img + img + img + img + img + img {
    display: none;
  }
`;

export default function ClientComponent() {
  const [numberOfImages, setNumberOfImages] = useState(6);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumberOfImages(18);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {Array.from({ length: numberOfImages }, (_, i) => {
        const imgNum = i + 21;
        const imgName = `image_${imgNum}.${imgNum % 2 === 0 ? 'jpg' : 'png'}`;
        return (
          <img
            key={imgNum}
            src={`/images/${imgName}`}
            alt={`Demo Image in Client Component ${imgNum}`}
            loading="lazy"
            width={300}
            height={300}
          />
        );
      })}
    </Container>
  );
}
