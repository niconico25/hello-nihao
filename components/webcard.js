import Link from "next/link";

export default ({ content }) => (
  <>
    <Link href="/[slug]" as={`/${content.id}`}>
      <a>
        <article className="card">
          <figure className="card__img-wrapper">
            <img
              className="card__img"
              alt="写真：HTMLコードが写っている画面"
              src={content.eyecatchSRC}
            />
          </figure>
          <div className="card__body">
            <h3 className="card__title">
              {content.title.replace(/<\/?[^>]+(>|$)/g, "")}
            </h3>
            <p className="card__description">{content.description}</p>
            <p className="card__date">{content.date}</p>
          </div>
          {/*<!-- /.card__body -->*/}
        </article>
        {/* <!-- /.card --> */}
      </a>
    </Link>
    <style jsx>{`
      a {
        text-decoration: none;
      }
      .card {
        text-decoration: none;
      }
      .card__img-wrapper {
        position: relative;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .card__img {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
      }
      .card__body {
        padding-top: 10px;
      }
      .card__body > *:last-child {
        margin-bottom: 0;
      }
      .card__title {
        margin-bottom: 5px;
        font-size: 1.125rem;
        font-weight: bold;
        color: #2c2e31;
        line-height: 1.4;
      }
      .card__description {
        color: #777;
        line-height: 1.5;
        font-size: 0.8;
      }
      .card__date {
        color: #777;
        text-align: right;
        margin-top: 5px;
        font-size: 0.75rem;
      }
      @media screen and (max-width: 768px) {
        .card__body {
          padding: 30px;
        }
      }
    `}</style>
  </>
);
