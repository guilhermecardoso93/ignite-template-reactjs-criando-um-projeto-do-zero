import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { Header } from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Header />
      <img
        src="https://t.ctcdn.com.br/1oUyH3_VxAFMXR6YwI_DYmUgKBE=/1024x0/smart/filters:format(webp)/i569772.jpeg"
        alt=""
        className={styles.banner}
      />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>dfkgbnisdnfglndflkigs</h1>
            <ul>
              <ul>
                <li>
                  <FiCalendar />
                  11 mar 2022
                </li>
                <li>
                  <FiUser />
                  ghdfsligisdnfgifnd
                </li>
                <li>
                  <FiClock />
                  5 Minuetos
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
