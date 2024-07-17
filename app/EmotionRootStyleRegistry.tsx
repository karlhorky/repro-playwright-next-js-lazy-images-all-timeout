'use client';

import createCache from '@emotion/cache';
import { CacheProvider, css, Global, ThemeProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation.js';
import { ReactNode, useState } from 'react';

const GlobalStyles = () => css`
  /*
    Disable warning with @reach/tabs styles not being included.

    We take over styling of the tabs ourselves.

    https://github.com/reach/reach-ui/issues/136#issuecomment-515356668
  */
  :root {
    --reach-tabs: 1;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    /* For fixed header */
    padding: 92px 0 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Helvetica, Arial, sans-serif;
    color: #333;
    line-height: 1.5;
  }

  a,
  button,
  input {
    /**
     * Disable additional non-standard gestures like double-tap
     * to zoom
     *
     * - Avoid delay tapping on buttons and links
     * - Avoid multiple clicks on an input or button causing a
     *   zoom
     *
     * References:
     * - https://dbushell.com/2024/03/10/css-button-styles-you-might-not-know/#touch-actions
     */
    touch-action: manipulation;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px red;
    }
  }

  button {
    cursor: pointer;

    /**
     * Prevent selection of text in button
     * - https://dbushell.com/2024/03/10/css-button-styles-you-might-not-know/#accidental-selection
     */
    user-select: none;
  }
`;

// Copied from Emotion issue and MUI docs:
// - https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
// - https://mui.com/base-ui/guides/next-js-app-router/#emotion
export default function EmotionRootStyleRegistry({
  children,
}: {
  children: ReactNode;
}) {
  // ```
  // eslint-disable-next-line react/hook-use-state -- Allow state pattern for copied code
  const [{ cache, flush }] = useState(() => {
    // ```
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Allow shadowing for copied code
    const cache = createCache({ key: 'my' });
    // ```
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    // ```
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Allow shadowing for copied code
    const flush = () => {
      // ```
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={{}}>
        <Global styles={GlobalStyles} />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
