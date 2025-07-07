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

export const delawareBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = qs.stringify({
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE:
        "/wEPDwUKLTcxODA5MDE3NA9kFgJmD2QWAgIDD2QWBAIED2QWAgIBD2QWAmYPDxYCHgRUZXh0ZWRkAgUPZBYEZg8WAh4HVmlzaWJsZWhkAgkPZBYCAgEPZBYIAgMPDxYCHwBlZGQCBQ8WAh4FVmFsdWUFJDFhYzMxNjliLTc3NmQtNDRhMC05ODU4LTdiYmJhMDAxM2NlM2QCBg8WAh8CBQExZAIHDxYCHwIFbGh0dHBzOi8vaWNpcy5jb3JwLmRlbGF3YXJlLmdvdi9FY29ycC9DYXB0Y2hhSGFuZGxlci5hc2h4P3R5cGU9aW1hZ2Uma2V5PTFhYzMxNjliLTc3NmQtNDRhMC05ODU4LTdiYmJhMDAxM2NlM2QYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFD2N0bDAwJGltZ0xvZ291dBkSRMnlgM+MQULVEjmc5Cb+Shez",
      __VIEWSTATEGENERATOR: "A5BC2864",
      ctl00$hdnshowlogout: "",
      ctl00$hdnfilingtype: "",
      as_sitesearch: "",
      ctl00$ContentPlaceHolder1$frmEntityName: name,
      ctl00$ContentPlaceHolder1$frmFileNumber: "",
      ctl00$ContentPlaceHolder1$hdnPostBackSource: "",
      ctl00$ContentPlaceHolder1$lblMessage: "",
      email_confirm: "",
      ctl00$ContentPlaceHolder1$btnSubmit: "Search",
      ctl00$ContentPlaceHolder1$hdnNavigation: "",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://icis.corp.delaware.gov/ecorp/entitysearch/namesearch.aspx",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://icis.corp.delaware.gov",
        pragma: "no-cache",
        priority: "u=0, i",
        referer:
          "https://icis.corp.delaware.gov/ecorp/entitysearch/namesearch.aspx",
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
        Cookie:
          "ASP.NET_SessionId=7cadc1152cfcc9e97dce443a61aeaa8f; valid_check=1; TS017cb0e9=01332b192097b9f290f8d3a15f1f6c724b09d3751c37342d16b483e9661146cc4bf0c3bc79d1aa8a103d2ff367419ff64030526a67; js_token=MTc1MDk2ODA1Nzk5MA==; TS017cb0e9=01332b1920dcbd9cbf0b56161abebd135b10219f930f00b40cb455fcc2955ae270899599acb818ee37d363c530e2104ad0daa5f501",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmYmQxYWEwZGY4ZjcyOWIxZDUwNzMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJHcmF5IiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJpYXQiOjE2Nzc0ODUxNjgsImV4cCI6MTY3NzUyODM2OH0.yHKvJkO3ePt__8wVFc-bhdheO-kcn_lEp3AtPeyBqHM",
      },
      data: payload,
    };

    const { data } = await axios.request(config);

    res.status(200).json({ success: true, data });
    return;
  } catch (error) {
    console.error("Error fetching data from Delaware:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const idahoBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = JSON.stringify({
      SEARCH_VALUE: name,
      STARTS_WITH_YN: true,
      CRA_SEARCH_YN: false,
      ACTIVE_ONLY_YN: false,
      FILING_DATE: {
        start: null,
        end: null,
      },
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://sosbiz.idaho.gov/api/Records/businesssearch",
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmYmQxYWEwZGY4ZjcyOWIxZDUwNzMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJHcmF5IiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJpYXQiOjE2Nzc0ODUxNjgsImV4cCI6MTY3NzUyODM2OH0.yHKvJkO3ePt__8wVFc-bhdheO-kcn_lEp3AtPeyBqHM",
        "cache-control": "no-cache",
        "content-type": "application/json",
        origin: "https://sosbiz.idaho.gov",
        pragma: "no-cache",
        priority: "u=1, i",
        referer: "https://sosbiz.idaho.gov/search/business",
        "sec-ch-ua":
          '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Cookie:
          "_ga=GA1.1.703394173.1750968429; _ga_SN820FRG5P=GS2.1.s1750968429$o1$g1$t1750968441$j48$l0$h0; cf_clearance=enr45zi7clTZTGLuiM11QbwUmLaZzCVZXZwyaTsivbE-1750968443-1.2.1.1-bAB_imekJUpQVE7Xkb343Rft833JFFzalLfRIbiX7QYvAlacVLIjQ4Zh3i4UPN4tK_thMz_2lsY9Og0zRYK6Hd8G6LyNBIVRSY1wz7p12K_sH2TYuEuXkTD8JxLQzQY67v41TvyC9f2W_LV4xzV2J32e3TcfPCuVLssL0AVEjMldpoAfaSenb1JmmLceiGnS5.30T3FvSz3870MEBQLI5Th_JLdlomA_PAlKKl8prf.EKda_VarUsmir4.U0OdnFI7QllMSGtjg2BSmHHOn8pJFnRH5y1F4oNlSrMBcL8V_lQTGHf8MA.z2RnfTQLD5blV5vBxnIs_eCt5_qrMK3WqLMI4_tfTBiGQg3OM2amXE; ASP.NET_SessionId=u3jdvnqz4x230argi5arct5o",
      },
      data: payload,
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

export const kansasBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = qs.stringify({
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE:
        "hwdqBucPYmaFrwJXga61vOtYciIKdFjfimrTtMxIRAAmwYTPAvxkzsvD492rRL24QzrfA10AQquTWElS3j0UfubgFrWzSbPstWF4scRMlsNl4DPQKkzCQkOzUB6bXLVDGxkh5AbNLImD+c07sjK2kXaFQoBUzHktYLlNZtrt+PqoPT1dN0k03Ov7NcEAwiVLZrP4COfXcRKL2SXpJOIQRYLw6wPjn6c38ScI3+Awvw54c9EwIL9pOUEuXq+J7vafFzVoMrYtyOJILDwINpN5MaCygJRm3MBQcjs4kthXDeY3sUHfEtusdgvypyE7Gc1f/cygytUCUak27K6mlarqJHOjq0LurXFeNhZEk2q3Uwb8gRkNKmdopbrv8n81Vrzcuajc3bsFawoRnByHXe+HZLgxliz5eN76B2ACztc7wyYRORs1QOrDdmQRPsoJ+zsX",
      __VIEWSTATEGENERATOR: "1BF965EF",
      __SCROLLPOSITIONX: "0",
      __SCROLLPOSITIONY: "0",
      __VIEWSTATEENCRYPTED: "",
      __EVENTVALIDATION:
        "g6R67bQkcetLhrWRDdjVNklKlZd5/iXkTzFu1hfHG78JPqoE+ZxBZA8FL3963etobcmmR17N+rmGeGDXnsdKvNG3FPAFscV2bThtba4zxnV+PEjTQfZhpEUkuDfDwTXBZwIJ8RFp5SwJHYVdjBIinZh7dZTl3eZerNGFj4WvhyQ74MuTlM8UQYeII+2Kcf3/5A5JIY4DFeRAipMpa/4z6Pbs/Mdwo/y/JjDd9w0GyObhvlWAXKvQkAQ9I8HGZMwTwW1e37ud6UU2pl7fZxGtN5+MgPxnzqHLw5faO2cnawh6nZbVniefJ02juP48B6+ski9iLSzD7wKny9fNlnHdvrC0389K3NLh7iiSoMAEirAs2LOfv8BPA3dLCvMMcTsKqLjcPeAVxZdypJfKEOJW1v4ZJKGbqNPEj5dLYOgzYt4k6Nzh57EvdzMfPnpEBE1UJ1ASIQyjtnirEWFhLr351A==",
      ctl00$MainContent$rblSearchType: "NAME",
      ctl00$MainContent$txtSearchEntityID: "",
      ctl00$MainContent$txtSearchEntityName: name,
      ctl00$MainContent$rblNameSearchType: "CONTAINS",
      ctl00$MainContent$txtSearchRAName: "",
      ctl00$MainContent$rblRANameSearchType: "CONTAINS",
      ctl00$MainContent$btnSearchEntity: "Search",
      ctl00$MainContent$hdnEntityID: "",
      ctl00$MainContent$hdnSelectedTab: "",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.sos.ks.gov/eforms/BusinessEntity/Search.aspx",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://www.sos.ks.gov",
        pragma: "no-cache",
        priority: "u=0, i",
        referer: "https://www.sos.ks.gov/eforms/BusinessEntity/Search.aspx",
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
        Cookie:
          "_gid=GA1.2.559935145.1750968675; _gat_gtag_UA_110819933_1=1; _ga_5EFVNNJVCW=GS2.1.s1750968675$o1$g0$t1750968675$j60$l0$h0; _ga=GA1.1.29244180.1750968675",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmYmQxYWEwZGY4ZjcyOWIxZDUwNzMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJHcmF5IiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJpYXQiOjE2Nzc0ODUxNjgsImV4cCI6MTY3NzUyODM2OH0.yHKvJkO3ePt__8wVFc-bhdheO-kcn_lEp3AtPeyBqHM",
      },
      data: payload,
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

export const marylandBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = qs.stringify({
      __RequestVerificationToken:
        "kzao-0mWwmvret22HYHbV3tf8g83GNCkam-SLrm-2hxvFlQAVe-IIN5RI3F21jFsdqh5NKydMytrCtXrVjSvP6AuNcY1",
      SearchAction: "Search",
      ReturnUrl: "",
      CblpLinkId: "0",
      UserRegistrationId: "0",
      FilingId: "0",
      Subheading: "",
      "g-recaptcha-response":
        "03AFcWeA5Lu2rJHWJgY8LGL3YCuDpcNrrjRjJomMj3O_20hRHv1J7skrBHNszc41ll7gPTlW_awgqjs3jKzKFYnhciFLCCmopB-U0tGxEfuGJuQqgOA4XIxNMhRFa4VWIYiennDh2baIa8uHNrXhBz00kO2M7jQ3PNbo_92xJQ0anSaOtVZuDSCNPzdbLUNu2_ARHuJn0NOGnht8IommEpbBPccCbwibhKi9kSv3sHd2k9eqii6vmA1NbL5h9LG_C2APS5bAaX-1-w85BJQMuD4m0jp1tWL4hAX1az6nRXIDV83uB9WIFv_WmVy9a8LnYnvK0HfgGYE6szYRezZHUhKRewzJ80G4ueofM0EcsN2ZjReLMbHi83QAnGuIe3VbGQxTBuKu4Q2Wp3vwXPLfNlmy0lJqOfWiAoWgkfqAFXGjJqrSnx3pb3JvBTgiISY74uITKSFG3PC1PYwnTaiTt4S3awCLsQA7ylDe4Bmu-nQ9jT4ibNtDzhmc0pRSK1yp7pefV97TKCYBx1IQ5KMRPfZU9Olpf6pnq8zDFFhwsKMaj31rq_3u7kUGfiXd56ROR0KXwEHR9AkgWv1vSfA3ojneMvrK9CLy-Sh7VjeMucM75knnAyadTAh9f__k20U-cqyzL1Jy1Dhwu0j295kPeRvtYTlC_3CIzQxWmjb2vbEgRkDKG_uWJX8A1u1NgIO0ebcVzXE9oBTIY3yL5FQkYWX_lHAU61z6vTJ7D6juQsZSm9i0zd6xf2IM8aO6IYdv9F-7NTDiGN4lALyRvUu3RdOKgn2W8ZquQNQnhQUArWBv0bFtm-JdrvXp1UamQX9e1HQpo-z3G3VPlWs2bYzUOqVnPLkfdImFB6RBJ9lhG9sNqDfTMKQ4xqW5BgMHdwdwqt5MYC02SalnBV2zyfZhWHK8eGVK5eF_J7iBZA643mXO4fthiX-aWzAwUOmMu2dhnDDdZXwXcHZYOM_0B949_Eqrk1uf3dzkC8ulrTbnIWP2g2hHKGPyG0LXidEeLd7okTg99sGb_10ASpcO-sgBqKa1yLz1tiyM6xkwhqctl1SOJaYmqWIT-2X3E",
      BusinessName: name,
      DepartmentId: "",
      FEINNumber: "",
      SearchType: "BusinessName",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://egov.maryland.gov/BusinessExpress/EntitySearch",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://egov.maryland.gov",
        Pragma: "no-cache",
        Referer: "https://egov.maryland.gov/businessexpress/entitysearch",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        "sec-ch-ua":
          '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        Cookie:
          "ASP.NET_SessionId=ko3icd13vzr5revmvfb2wcor; __RequestVerificationToken_L0J1c2luZXNzRXhwcmVzcw2=j-8AbCu306-wJjV2ZYSFrcBvfp-d0zCEfrPLWNtf2slH_xq0Jei0VO9SugpZIuOQ_WB3mDDcjyFiF32jRYyd4aYD4yU1; mdegov=!nwjC0Qkv5zmQmr6OxI10oCSkJ6tF5yoXnRPKyPwDHW13qnLgs0WugAe+pwDNsML/aZXAFwd+8lZzVbllSiMCV8fMl+XzicleYR4Wz80Jz8s=; _ga_KJKE71WK2Y=GS2.1.s1750969011$o1$g0$t1750969011$j60$l0$h0; _ga=GA1.1.1956456107.1750969012; _ga_LJCC9XG5J9=GS2.1.s1750969012$o1$g0$t1750969012$j60$l0$h0",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmYmQxYWEwZGY4ZjcyOWIxZDUwNzMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJHcmF5IiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJpYXQiOjE2Nzc0ODUxNjgsImV4cCI6MTY3NzUyODM2OH0.yHKvJkO3ePt__8wVFc-bhdheO-kcn_lEp3AtPeyBqHM",
      },
      data: payload,
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

export const maineBusiness: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid 'name' query parameter.",
      });
      return;
    }

    const payload = qs.stringify({
      _csrf: "793224bb-849e-4981-ba77-6ee747750a34",
      WAISqueryString: name,
      number: "",
      search: "Click Here to Search",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://apps3.web.maine.gov/nei-sos-icrs/ICRS",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://apps3.web.maine.gov",
        pragma: "no-cache",
        priority: "u=0, i",
        referer: "https://apps3.web.maine.gov/nei-sos-icrs/ICRS?MainPage=x",
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
        Cookie:
          "SESSION=ZDQ1Nzc5ODYtOTQwMy00YzRlLTkzMzEtYTZhZDhkN2M2ZDBl; SESSION=NWI0YmM1NzItMTE0Ny00NDdlLTkwZGUtMmU0MDc0MzI2NWJk",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmYmQxYWEwZGY4ZjcyOWIxZDUwNzMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJHcmF5IiwiZW1haWwiOiJzdXBlckBhZG1pbi5jb20iLCJpYXQiOjE2Nzc0ODUxNjgsImV4cCI6MTY3NzUyODM2OH0.yHKvJkO3ePt__8wVFc-bhdheO-kcn_lEp3AtPeyBqHM",
      },
      data: payload,
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
