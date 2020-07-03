import axios from 'axios'
import Craniocaudal from '@/components/craniocaudal.js'
import WebCard from '@/components/webcard.js'

export default ({ contents }) => (<>
  <Craniocaudal>
    <main className="main">
      <div className="cards cards--col3">
        {/*
          Fragment には className をアサインできない...
          DOM が消えるから、そりゃそうか...
          <WebCard className="cards__item" article={article} key={article.slug} /> 
          Workaround to add className to Fragment in React - Stackoverflow
          https://stackoverflow.com/questions/49069746/workaround-to-add-classname-to-fragment-in-react
          */}
        { contents.map(content => (
          <div className="cards__item" key={content.id}>
            <WebCard content={content} />
          </div>
        )) }
      </div>
    </main>
  </Craniocaudal>
  <style jsx>{`
  $max-content-width: 700px;
  .main {
    width: 100%;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    max-width: $max-content-width;
    margin-left: auto;
    margin-right: auto;
  }
  .cards--col3 {
    margin-bottom: -20px;
  }
  .cards--col3 > .cards__item {
    width:  48%;
    margin-right: 4%;
    margin-top: 30px;
  }
  .cards--col3 > .cards__item:nth-of-type(2n) {
    margin-right: 0;
  }
  @media screen and (max-width: 768px) {
    .cards > .cards__item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
  `}</style>
</>)
export const getStaticProps = async () => {
  const { data } = await axios.get(
    "https://hello-nihao.microcms.io/api/v1/blog?limit=100",
    {
      headers: { "X-API-KEY": "dcda770e-85dc-43eb-9308-49961ea0e6ea" },
    }
  );
  const { contents } = data
  return {
    props: { contents }
  }
}