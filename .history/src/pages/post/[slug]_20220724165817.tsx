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
              <li>
                <FiCalendar />
                11 mar 2022
              </li>
              <li>
                <FiUser />
                ghdfsligisdnfgifnd
              </li>
              <li>
                <FiClock />5 Minuetos
              </li>
            </ul>
          </div>

          <article>
            <h2>skdfklafkladsfkasf</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              quas animi nobis qui corporis consequuntur ratione pariatur
              laborum dolore, ipsam tempore eveniet{' '}
              <strong> officiis quis maxime rem</strong>, maiores non vel
              inventore?
            </p>
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const prismic = getPrismicClient({});
  //   const posts = await prismic.getByType(TODO);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {

  }
};
