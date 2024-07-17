'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Container = styled.div`
  border: 1px solid red;
`;

export default function ClientComponent() {
  const [hiddenImageNumbers, setHiddenImageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHiddenImageNumbers([23, 29, 31, 37, 41]);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {Array.from({ length: 20 }, (_, i) => {
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
            style={{
              display: hiddenImageNumbers.includes(imgNum) ? 'none' : 'block',
              marginTop: 500,
            }}
          />
        );
      })}
    </Container>
  );
}
