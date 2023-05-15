import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const getApplication = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await getAccessToken(req, res);
    console.log(accessToken);

    const raw = await fetch(
      `${process.env.BACKEND_DOCKER_NETWORK_HOST}/api/v1/events/1/application`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      }
    );
    const data = await raw.json();
    console.log("data", data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export default withApiAuthRequired(getApplication);
