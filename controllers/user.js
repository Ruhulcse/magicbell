require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const https = require("https");

// Your existing options object, modified to use environment variables for API keys
const options = {
  method: "POST",
  hostname: "api.magicbell.com",
  port: null,
  path: "/users",
  headers: {
    "Content-Type": "application/json", // Ensure the content type is set for JSON payload
    "X-MAGICBELL-API-KEY": process.env.API_KEY,
    "X-MAGICBELL-API-SECRET": process.env.API_SECRET,
  },
};
module.exports.createUser = async (req, res, next) => {
  const { user } = req.body;
  const newRecord = await prisma.User.create({
    data: {
      external_id: user.external_id,
      email: user.email,
      first_name: user.first_name.trim(),
      last_name: user.last_name,
      custom_attributes: user.custom_attributes,
      phone_numbers: user.phone_numbers,
    },
  });
  const postData = JSON.stringify(req.body);

  const requestOptions = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const reqMagicBell = https.request(requestOptions, (resMagicBell) => {
    const chunks = [];

    resMagicBell.on("data", (chunk) => {
      chunks.push(chunk);
    });

    resMagicBell.on("end", () => {
      const body = Buffer.concat(chunks);
      console.log(body.toString());

      // Parse the response body to JSON
      let responseBody;
      try {
        responseBody = JSON.parse(body.toString());
      } catch (error) {
        return res
          .status(500)
          .send({ status: false, error: "Failed to parse MagicBell response" });
      }

      // Send success response with MagicBell response or error if any
      res.send({
        status: true,
        data: responseBody,
      });
    });
  });

  reqMagicBell.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
    res.status(500).send({ status: false, error: e.message });
  });
  reqMagicBell.write(postData);
  reqMagicBell.end();
};

module.exports.getUsers = async (req, res, next) => {
  const options = {
    method: "GET",
    hostname: "api.magicbell.com",
    port: null,
    path: "/users",
    headers: {
      "X-MAGICBELL-API-KEY": process.env.API_KEY,
      "X-MAGICBELL-API-SECRET": process.env.API_SECRET,
    },
  };

  const reqMagicBell = https.request(options, (resMagicBell) => {
    const chunks = [];

    resMagicBell.on("data", (chunk) => {
      chunks.push(chunk);
    });

    resMagicBell.on("end", () => {
      const body = Buffer.concat(chunks);
      console.log("Response from MagicBell API:", body.toString());

      // Parse the response and send it back to the client
      let responseBody;
      try {
        responseBody = JSON.parse(body.toString());
        res.status(200).json(responseBody); // Send the parsed response to the client
      } catch (error) {
        console.error("Error parsing response from MagicBell:", error);
        res
          .status(500)
          .json({ error: "Error parsing response from MagicBell" });
      }
    });
  });

  reqMagicBell.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
    res.status(500).json({ error: `Problem with request: ${e.message}` });
  });
  reqMagicBell.end();
};

module.exports.getUserNotifications = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("user id ", userId);
  const options = {
    method: "GET",
    hostname: "api.magicbell.com",
    path: `/users/${userId}/notifications`,
    headers: {
      "X-MAGICBELL-API-KEY": process.env.API_KEY,
      "X-MAGICBELL-API-SECRET": process.env.API_SECRET,
    },
  };

  const reqMagicBell = https.request(options, (resMagicBell) => {
    const chunks = [];

    resMagicBell.on("data", (chunk) => {
      chunks.push(chunk);
    });

    resMagicBell.on("end", () => {
      const body = Buffer.concat(chunks);
      console.log("Response from MagicBell API:", body.toString());

      let responseBody;
      try {
        responseBody = JSON.parse(body.toString());
        res.status(200).json(responseBody);
      } catch (error) {
        console.error("Error parsing response from MagicBell:", error);
        res
          .status(500)
          .json({ error: "Error parsing response from MagicBell" });
      }
    });
  });

  reqMagicBell.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
    res.status(500).json({ error: `Problem with request: ${e.message}` });
  });

  reqMagicBell.end();
};

module.exports.sendNotifications = async (req, res, next) => {
  const payload = req.body.broadcast;
  const postData = JSON.stringify({
    broadcast: {
      ...payload,
    },
  });
  const options = {
    method: "POST",
    hostname: "api.magicbell.com",
    port: null,
    path: "/broadcasts",
    headers: {
      "Content-Type": "application/json",
      "X-MAGICBELL-API-KEY": process.env.API_KEY,
      "X-MAGICBELL-API-SECRET": process.env.API_SECRET,
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const reqMagicBell = https.request(options, (resMagicBell) => {
    const chunks = [];

    resMagicBell.on("data", (chunk) => {
      chunks.push(chunk);
    });

    resMagicBell.on("end", () => {
      const body = Buffer.concat(chunks);
      console.log(body.toString());

      // Parse the response and send it back to the client
      let responseBody;
      try {
        responseBody = JSON.parse(body.toString());
        res.status(200).json(responseBody);
      } catch (error) {
        console.error("Error parsing response from MagicBell:", error);
        res
          .status(500)
          .json({ error: "Error parsing response from MagicBell" });
      }
    });
  });

  reqMagicBell.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
    res.status(500).json({ error: `Problem with request: ${e.message}` });
  });
  console.log("success");
  // Write data to request body
  reqMagicBell.write(postData);
  reqMagicBell.end();
};
