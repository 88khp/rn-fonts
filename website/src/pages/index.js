import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="RN Fonts" description="Typed font packages for React Native">
      <main className="container margin-vert--xl">
        <h1>RN Fonts</h1>
        <p>Typed font packages for React Native, added in one command.</p>
        <Link className="button button--primary button--lg" to="/docs/intro">
          Read the docs
        </Link>
      </main>
    </Layout>
  );
}
