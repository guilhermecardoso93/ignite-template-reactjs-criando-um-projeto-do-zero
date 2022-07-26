import { NextApiRequest, NextApiResponse } from 'next';
import { getPrismicClient } from '../../services/prismic';

function linkResolver(doc): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

export const Preview = async ( req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  const { token: ref, documentId } = req.query;
  const prismic = getPrismicClient({});
  const redirectUrl = await prismic
    .getPreviewResolver(String(ref), String(documentId))
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  res.setPreviewData({ ref });
  res.writeHead(302, { location: `${redirectUrl}` });
  res.end();
  return null;
};

