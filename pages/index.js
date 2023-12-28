import Head from 'next/head';
import { useState, useEffect } from 'react';
import Metronome from '../components/Metronome';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils/localStorage';
import { MetronomeState } from '../hooks/useMetronome';

export default function Home() {
  const [metronomeState, setMetronomeState] = useState(MetronomeState);

  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      setMetronomeState(savedState);
    }
  }, []);

  useEffect(() => {
    saveStateToLocalStorage(metronomeState);
  }, [metronomeState]);

  return (
    <div className="container">
      <Head>
        <title>Metronome App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Metronome App
        </h1>

        <Metronome metronomeState={metronomeState} setMetronomeState={setMetronomeState} />
      </main>

      <footer>
        Powered by <a href="https://vercel.com">Vercel</a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}