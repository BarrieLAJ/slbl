import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const raffles = await fetch(
    `https://27nddeh5.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == 'raffle']&$_event_id=${query.id}`
  )
    .then((_res) => {
      return _res.json();
    })
    .then(
      (data: {
        ms: number;
        query: string;
        result: {
          _id: string;
        }[];
      }) => {
        return data.result;
      }
    );

  const event = await fetch(
    `https://27nddeh5.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == 'raffle']&$_event_id=${query.id}`
  )
    .then((_res) => {
      return _res.json();
    })
    .then(
      (data: {
        ms: number;
        query: string;
        result: {
          _id: string;
        }[];
      }) => {
        return data.result;
      }
    );

  res.status(200).json({
    raffles: raffles,
    event: event,
  });
};
