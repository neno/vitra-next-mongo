import { IListItem } from './../../../types/clientTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import createHandler from '../../../middleware';
import { autoCompleteDesigners } from '../../../lib/api';

const handler = createHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.body;

  try {
    const designers: IListItem[] = await autoCompleteDesigners(q);

    res.status(200).json(designers.map((designer) => designer));
  } catch (error: any) {
    console.error(error);

    res.status(error.status || 400).json([{ message: 'Something went wrong' }]);
  }
});

export default handler;
