import axios from "axios";
import { RequestHandler } from "express";
import * as cheerio from "cheerio";
import qs from "qs";

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

export const coloradoBusiness: RequestHandler = async (req, res, next) => {
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
      //   docWorkThruDt: "06/25/2025",
      searchName: name,
      resetTransTyp: "",
      cmd: "Search",
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.sos.state.co.us/biz/NameCriteria.do",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://www.sos.state.co.us",
        pragma: "no-cache",
        priority: "u=0, i",
        referer: "https://www.sos.state.co.us/biz/NameCriteria.do",
        "sec-ch-ua":
          '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Cookie: process.env.COLORADO_COOKIE_TOKEN || "Colorado_Cookie_Token",
        Authorization: `Bearer ${
          process.env.COLORADO_BEARER_TOKEN || "Colorado_Bearer_Token"
        }`,
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

export const floridaBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults/EntityName/${name}/Page1?searchNameOrder=${name}`,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=0, i",
        referer: "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName",
        "sec-ch-ua":
          '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Cookie: process.env.FLORIDA_COOKIE_TOKEN || "florida_Cookie_Token",
        // Authorization: "••••••",
      },
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
