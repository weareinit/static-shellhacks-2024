import { NextApiRequest, NextApiResponse } from "next"
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

const getApplication = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await getAccessToken(req, res)
    console.log(accessToken)

    const raw = await fetch("http://172.19.0.3/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await raw.json()
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

export default withApiAuthRequired(getApplication)
