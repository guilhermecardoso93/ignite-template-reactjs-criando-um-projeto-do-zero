import { NextApiRequest, NextApiResponse } from 'next';

const apiEndpoint = process.env.PRISMIC_API_ENDPOINT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;


const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

function linkResolver(doc): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

export const Preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token: ref, documentId } = req.query;
  const redirectUrl = await Client(req).getPreviewResolver(ref, documentId).resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({ ref });
  res.writeHead(302, { location: `${redirectUrl}` });
  res.end();
  return null;
}





