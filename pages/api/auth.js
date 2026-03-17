// Optional: auth API routes (e.g. for server-side session or token refresh)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  res.status(200).json({ message: 'Auth API placeholder' });
}
