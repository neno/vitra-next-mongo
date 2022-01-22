import { IListItem } from './../../../types/clientTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import createHandler from '../../../middleware';
import { autoCompleteObjects } from '../../../lib/api';

const handler = createHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.body;

  try {
    const objects: IListItem[] = await autoCompleteObjects(q);
    res.status(200).json(objects.map((obj) => obj));
  } catch (error: any) {
    console.error(error);

    res.status(error.status || 400).json([{ message: 'Something went wrong' }]);
  }
});

export default handler;
