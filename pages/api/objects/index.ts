import { NextApiRequest, NextApiResponse } from 'next';
import createHandler from '../../../middleware';
import { fetchObjectItems } from '../../../lib/api';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const objects = await fetchObjectItems();
    res.status(200).json(objects);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json([{ message: error.message || 'Something went wrong' }]);
  }
});

export default handler;
