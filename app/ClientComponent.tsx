'use client';

import styled from '@emotion/styled';

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
          />
        );
      })}
    </Container>
  );
}
