import { NextApiRequest, NextApiResponse } from "next";

const generateRandomCode = (
  eventAlias: string,
  phoneNumber: string,
  lastId: string
) => {
  const lastTowDigitsFromPhone = `${phoneNumber.at(-2)}${phoneNumber.at(-1)}`;
  let randomCode: string;
  if (lastId.split("").length > 1) {
    randomCode = `${eventAlias}${lastTowDigitsFromPhone[0]}${lastId}`;
  } else {
    randomCode = `${eventAlias}${lastTowDigitsFromPhone}${lastId}`;
  }
  return randomCode;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const bodyPersed = JSON.parse(body);
  const lastRaffleId = await fetch(
    "https://27nddeh5.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == 'raffle']"
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
        return data.result.at(-1)?._id || "0";
      }
    );
  const currentEvent = await fetch(
    `https://27nddeh5.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == 'event']&$id="a6813d12-213e-4506-bfad-86ddc0a701ee"`
  )
    .then((_res) => {
      return _res.json();
    })
    .then((data) => {
      console.log(data.result);
      return data.result.at(0);
    });

  const customerCreated = await fetch(
    "https://27nddeh5.api.sanity.io/v2021-10-21/data/mutate/production?returnDocuments=true",
    {
      method: "post",
      headers: {
        Authorization:
          "Bearer sk56l8Tri7q7Bw7nqcalPtBRTdTE2VZ5Cg8Ps8SGNHQXAAm66bLO7cCVkrNhAvHcbqm4QWXiM5wpol0x1BZQOsKFSs3b58Ygh7h9HsmTAWAnUpUXeUBZK5vFpH8DWANgWru41W4pXdUnujc6yxL1wBDCfmtpBv6ZylKfLbTuZDGIeRB1tmDl",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: "customer",
              name: bodyPersed.name,
              location: bodyPersed.location,
              email: bodyPersed.email,
              phoneNumber: bodyPersed.phoneNumber,
            },
          },
        ],
      }),
    }
  )
    .then((value) => {
      return value.json();
    })
    .then((data) => {
      console.log(data.results.at(0).document);
      const client = require("twilio")(
        "AC101ab37d18b3418141c15655cafe24b8",
        "8c375c94505f011c7272c6d544baaec9"
      );

      client.messages
        .create({
          body: generateRandomCode(
            "LM",
            data.results.at(0).document.phoneNumber,
            lastRaffleId
          ),
          from: "+12058823749",
          to: data.results.at(0).document.phoneNumber,
        })
        .then((message: { sid: any }) => console.log(message.sid));
      return data.results.at(0).document;
    });
  return res.status(200).json({
    ...customerCreated,
  });
  //   const raffle = fetch(
  //     "https://27nddeh5.api.sanity.io/v2021-10-21/data/mutate/production?returnDocuments=true",
  //     {
  //       method: "post",
  //       headers: {
  //         Authorization:
  //           "Bearer sk56l8Tri7q7Bw7nqcalPtBRTdTE2VZ5Cg8Ps8SGNHQXAAm66bLO7cCVkrNhAvHcbqm4QWXiM5wpol0x1BZQOsKFSs3b58Ygh7h9HsmTAWAnUpUXeUBZK5vFpH8DWANgWru41W4pXdUnujc6yxL1wBDCfmtpBv6ZylKfLbTuZDGIeRB1tmDl",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         mutations: [
  //           {
  //             create: {
  //               _type: "raffle",
  //               _id: `${parseInt(lastRaffleId) + 1}`,
  //               customer: customerCreated._id,
  //               event: currentEvent._id,
  //               status: "non-winner",
  //               ticketCode: generateRandomCode(
  //                 "LM",
  //                 customerCreated.phoneNumber,
  //                 lastRaffleId
  //               ),
  //             },
  //           },
  //         ],
  //       }),
  //     }
  //   )
  //     .then((_res) => {
  //       return _res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const raffle = data.results.at(0).document;
  //       const client = require("twilio")(
  //         "AC101ab37d18b3418141c15655cafe24b8",
  //         "8c375c94505f011c7272c6d544baaec9"
  //       );

  //       client.messages
  //         .create({
  //           body: raffle.ticketCode,
  //           from: "+12058823749",
  //           to: customerCreated.phoneNumber,
  //         })
  //         .then((message: { sid: any }) => console.log(message.sid));
  //       return raffle;
  //     });

  //   return res.status(200).json({
  //     ...raffle,
  //   });
};
