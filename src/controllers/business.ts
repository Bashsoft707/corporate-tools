import axios from "axios";
import { RequestHandler } from "express";

export const californiaBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = {
      SEARCH_VALUE: name,
      SEARCH_FILTER_TYPE_ID: "0",
      SEARCH_TYPE_ID: "1",
      FILING_TYPE_ID: "",
      STATUS_ID: "",
      FILING_DATE: {
        start: null,
        end: null,
      },
      CORPORATION_BANKRUPTCY_YN: false,
      CORPORATION_LEGAL_PROCEEDINGS_YN: false,
      OFFICER_OBJECT: {
        FIRST_NAME: "",
        MIDDLE_NAME: "",
        LAST_NAME: "",
      },
      NUMBER_OF_FEMALE_DIRECTORS: "99",
      NUMBER_OF_UNDERREPRESENTED_DIRECTORS: "99",
      COMPENSATION_FROM: "",
      COMPENSATION_TO: "",
      SHARES_YN: false,
      OPTIONS_YN: false,
      BANKRUPTCY_YN: false,
      FRAUD_YN: false,
      LOANS_YN: false,
      AUDITOR_NAME: "",
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bizfileonline.sos.ca.gov/api/Records/businesssearch",
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        origin: "https://bizfileonline.sos.ca.gov",
        pragma: "no-cache",
        referer: "https://bizfileonline.sos.ca.gov/search/business",
        "sec-ch-ua":
          '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Cookie: process.env.CALIFORNIA_COOKIE_TOKEN || "",
        Authorization: `Bearer ${process.env.CALIFORNIA_BEARER_TOKEN || ""}`,
      },
      data: JSON.stringify(payload),
    };

    const { data } = await axios.request(config);

    res.status(200).json({ success: true, data });
    return;
  } catch (error) {
    console.error("Error fetching data from California:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};
