import { NextApiRequest, NextApiResponse } from 'next';
import createHandler from '../../../middleware';
import { fetchObjectItems } from '../../../lib/api';
import { getAsString } from '@helper';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  try {
    const objects = await fetchObjectItems(Number(getAsString(page)));
    res.status(200).json(objects);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json([{ message: error.message || 'Something went wrong' }]);
  }
});

export default handler;
