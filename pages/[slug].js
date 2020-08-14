import axios from "axios";
import MarkdownIt from "markdown-it";
// import markdownItPrism from "markdown-it-prism";
import Head from "next/head";
import Craniocaudal from "@/components/craniocaudal.js";

const Post = ({ content }) => (
  <>
    <Head>
      <title>{content.title.replace(/<\/?[^>]+(>|$)/g, "")}</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css"
        rel="stylesheet"
      />
      <meta name="description" content={content.description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Craniocaudal>
      <main className="main">
        <div className="main__title title">
          <h1
            className="title__text"
            dangerouslySetInnerHTML={{ __html: content.title }}
          ></h1>
          <p className="title__description">{content.description}</p>
          <figure className="title__img-wrapper">
            <img
              className="title__img"
              style={{ maxWidth: "100%" }}
              src={content.eyecatchSRC}
            />
          </figure>
        </div>
        <div
          className="main__body"
          dangerouslySetInnerHTML={{ __html: content.innerHtml }}
        ></div>
      </main>
    </Craniocaudal>
    <style jsx>{`
      $max-content-width: 768px;
      .main {
        padding-top: 100px;
      }
      .main__title {
        max-width: $max-content-width;
        margin-left: auto;
        margin-right: auto;
      }
      .main__title + .main__body {
        margin-top: 100px;
      }
      .main__body {
        max-width: $max-content-width;
        margin-left: auto;
        margin-right: auto;
      }
      .eye-catch {
        max-width: 100%;
      }
      .eye-catch-wrapper {
        max-width: $max-content-width;
        margin-left: auto;
        margin-right: auto;
      }
      .title {
        // position: relative;
        // overflow: hidden;
      }
      .title__text {
        font-size: 2rem;
        line-height: 1.45;
        text-align: center;
      }
      .title__description {
        font-size: 0.875rem;
        line-height: 1.86;
        color: #707980;
        padding-left: 12px;
        padding-right: 12px;
      }
      .title__description + .title__img-wrapper {
        margin-top: 30px;
      }
      .title__img-wrapper {
        position: relative;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .title__img {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
      }
    `}</style>
    {/* 
  css modules not working
  <ComponentStyle></ComponentStyle>
*/}
  </>
);

//
// Return paths to all of pages.
//   Dynamic Route のみで使える... はず？
//

//
// timezone locale should be fixed by a site not by a page.
//
// 時間の標準
// https://ja.wikipedia.org/wiki/ISO_8601
//
// google
// https://www.google.com/search?q=Asia%2FTokyo+gmt&oq=Asia%2FTokyo+gmt&aqs=chrome..69i57j69i58.5927j0j1&sourceid=chrome&ie=UTF-8
//
export async function getStaticPaths() {
  const { data } = await axios.get(
    "https://hello-nihao.microcms.io/api/v1/blog?limit=100",
    {
      headers: { "X-API-KEY": process.env.X_API_KEY },
    }
  );
  const paths = data.contents.map((content) => ({
    params: {
      slug: content.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
//
// Set up parameters for each page.
//
export const getStaticProps = async (context) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const { data } = await axios.get(
    `https://hello-nihao.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    {
      headers: { "X-API-KEY": process.env.X_API_KEY },
    }
  );
  const markdownIt = new MarkdownIt({ html: true });
  // Vercel Preview Mode - Error: Cannot find module 'prismjs/components/' - Stackoverflow
  // https://stackoverflow.com/questions/63187735/vercel-preview-mode-error-cannot-find-module-prismjs-components
  if (process.env.RUNNING_ENVIRONMENT !== 'preview-mode') {
    // import 文は使えないらしい, import 関数
    // * Dynamic imports(ダイナミックインポート)
    //   https://ja.javascript.info/modules-dynamic-imports
    const markdownItPrism = await import('markdown-it-prism').then(result => result.default)
    markdownIt.use(markdownItPrism, {});
  }
  const content = {
    ...data,
    innerHtml: markdownIt.render(data.body),
  };
  return { props: { content } };
};
export default Post;
// const ComponentStyle = () => ((<style jsx>{`
//     p {
//       color: blue;
//     }
//     div {
//       background: red;
//     }
//     @media (max-width: 600px) {
//       div {
//         background: blue;
//       }
//     }
// `}</style>))
