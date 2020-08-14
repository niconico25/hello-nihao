import Link from "next/link";
export default ({ children }) => (
  <>
    <header className="header">
      <Link href="/">
        <a className="header__title">Hello, nihao!</a>
      </Link>
    </header>
    {children}
    <footer className="footer">
      <Link href="/">
        <a className="footer__title">Hello, nihao!</a>
      </Link>
    </footer>
    <style jsx>{`
      .header {
        border-bottom: 1px solid #ebedef;
        &__title {
          text-decoration: none;
          font-size: 2rem;
          color: #2c2e31;
          display: inline-block;
          padding: 12px 0 12px 16px;
          font-weight: 100;
        }
      }
      .footer {
        background-color: #fafafa;
        margin-top: 100px; // 妥協
        padding-top: 20px;
        padding-bottom: 20px;
        bottom: 0;

        &__title {
          text-decoration: none;
          font-size: 1.5rem;
          color: #2c2e31;
          padding: 10px 0 10px 80px;
          font-weight: 100;
        }
      }
      @media screen and (max-width: 768px) {
        .footer {
          &__title {
            padding: 10px 0;
            display: block;
            text-align: center;
          }
        }
      }
    `}</style>
  </>
);
