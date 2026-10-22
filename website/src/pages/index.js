import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

const features = [
  {
    "title": "Same name on iOS and Android",
    "body": "Each font exports PostScript names that resolve on both platforms, so there's no Platform.select."
  },
  {
    "title": "One command to add",
    "body": "Pick fonts from a list. The CLI installs them and sets up react-native.config.js."
  },
  {
    "title": "Typed weights",
    "body": "Weight keys like '400' and '700i' are checked by TypeScript, so a typo fails at compile time."
  },
  {
    "title": "Static, bundled files",
    "body": "Every package ships static .ttf files that are linked at build time. Nothing loads at runtime."
  }
];
const steps = [
  {
    "title": "Run the CLI",
    "code": "npx @88khp/rn-fonts"
  },
  {
    "title": "Link the assets",
    "code": "npx react-native-asset"
  },
  {
    "title": "Use the typed name",
    "code": "fontFamily: manropeFonts.manrope['700']"
  }
];
const code = "import { manropeFonts } from '@88khp/rn-font-manrope';\n\nconst styles = StyleSheet.create({\n  heading: {\n    fontFamily: manropeFonts.manrope['700'],\n    fontSize: 24,\n  },\n});";

const Art = () => (
  <svg viewBox="0 0 480 360" role="img" aria-label="A font specimen card with weight samples">
    <defs>
      <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
        <stop className="art-s1" offset="0" />
        <stop className="art-s2" offset="1" />
      </linearGradient>
      <filter id="artShadow" x="-25%" y="-25%" width="150%" height="170%">
        <feDropShadow dx="0" dy="14" stdDeviation="14" floodOpacity="0.28" />
      </filter>
    </defs>
    <rect x="0" y="0" width="480" height="360" rx="28" fill="url(#artBg)" />
    <rect className="art-card" x="64" y="62" width="236" height="224" rx="22" filter="url(#artShadow)" />
    <text className="art-display" x="98" y="220">Aa</text>
    <text className="art-label" x="98" y="256">Manrope 700</text>
    <rect className="art-card" x="262" y="150" width="170" height="150" rx="20" filter="url(#artShadow)" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} className="art-accent" x="284" y={172 + i * 22} width={54 + i * 18} height="10" rx="5" style={{ opacity: 0.4 + i * 0.15 }} />
    ))}
    <circle className="art-accent" cx="400" cy="78" r="30" />
    <text className="art-badge" x="400" y="86">Ag</text>
    <text className="art-mark" x="36" y="332">88khp / rn-fonts</text>
  </svg>
);

export default function Home() {
  return (
    <Layout title="Typed React Native fonts" description="Add custom fonts to a React Native app in one command. Every font exports a typed weight map that resolves the same way on iOS and Android.">
      <header className="hero">
        <div className="container">
          <div className="hero__text">
          <span className="hero__eyebrow">rn-fonts</span>
          <h1 className="hero__title">Typed React Native fonts</h1>
          <p className="hero__lede">Add custom fonts to a React Native app in one command. Every font exports a typed weight map that resolves the same way on iOS and Android.</p>
          <div className="hero__install">
            <span className="prompt">$</span>
            <code>npx @88khp/rn-fonts</code>
          </div>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/docs/add-a-font">Add fonts</Link>
            <Link className="btn" to="/docs/intro">Read the docs</Link>
          </div>
          </div>
          <div className="hero__art"><Art /></div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>How it fits together</h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step__num">{i + 1}</span>
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <code className="step__code">{s.code}</code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split">
          <div>
            <h2>Use it</h2>
            <p className="section__body">Pick a weight from the typed map. The name is checked by TypeScript and resolves on both platforms.</p>
          </div>
          <div className="split__code">
            <CodeBlock language="tsx" title="Button.tsx">{code}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>Why it's worth using</h2>
          </div>
          <div className="features__grid">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Start with the docs</h2>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/docs/intro">Open the docs</Link>
            <a className="btn" href="https://github.com/88khp/rn-fonts">View on GitHub</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
