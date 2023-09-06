const puppeteer = require("puppeteer");
const fs = require("fs");
const http = require("http");
const path = require("path");

// let prev = 0;
// const data = [];

// // Define a function to get the text content of an element with a specific class
// const getTextFromClass = () => {
//   // Get the first element with the class 'css-19toqs6'
//   var element = document.querySelector(".css-19toqs6");
//   var text = "x";
//   try {
//     text = element.textContent;
//   } catch (error) {
//     // If an error occurs, handle it here
//     console.log("Error getting text content:", error);
//   }

//   // Return the text content of the <a> element
//   return text;
// };

// // Define a function to get the entries from the website
// const getEntries = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1920, height: 1080 });
//   await page.goto("https://play.pakakumi.com/");

//   setInterval(async () => {
//     const latestValue = await page.evaluate(() => {
//       //   const textContent = getTextFromClass();
//       //   return parseFloat(textContent.replace("x", ""));
//       var element = document.querySelector(".css-19toqs6");
//       var text = "x";
//       try {
//         text = element.textContent;
//       } catch (error) {
//         // If an error occurs, handle it here
//         console.log("Error getting text content:", error);
//       }

//       // Return the text content of the <a> element
//       //return text;
//       return parseFloat(text.replace("x", ""));
//     });

//     if (latestValue === null) {
//       console.log("Failed to fetch entry");
//     } else {
//       console.log(`Entry: ${latestValue}`);
//       // Add the entry to the list of entries
//       const entries = await getEntries();
//       entries.push({
//         value: latestValue,
//         date: new Date(),
//       });

//       // Write the updated list of entries to a file
//       fs.writeFileSync("entries.json", JSON.stringify(entries));
//     }
//   }, 10000);
// };

// Start the interval to fetch the entries
// getEntries();

let prev = 0;
const data = [];

const getEntries = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://play.pakakumi.com/");

  setInterval(async () => {
    const latestValue = await page.evaluate(() => {
      var element = document.querySelector(".css-19toqs6");
      var text = "x";
      try {
        text = element.textContent;
      } catch (error) {
        // If an error occurs, handle it here
        console.log("Error getting text content:", error);
      }

      // Return the text content of the <a> element
      //return text;
      return parseFloat(text.replace("x", ""));
    });

    if (latestValue == prev) {
    } else {
      prev = latestValue;
      console.log(`Entry: ${latestValue}`);
      data.push({
        value: latestValue,
        date: new Date(),
      });
      fs.writeFile("entries.js", JSON.stringify(data), (err) => {
        if (err) console.log(err);
        else {
        }
      });
    }
    console.log(latestValue);
  }, 10000);
};

const server = http.createServer((req, res) => {
  // Set the content type based on the file extension
  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };

  // Get the file path from the request URL
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html"; // Default to serving index.html
  }

  // Determine the content type based on the file extension
  const extname = path.extname(filePath);
  const contentTypeHeader = contentType[extname] || "text/plain";

  // Read the file and send it as a response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found, send a 404 response
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        // Server error, send a 500 response
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("500 Internal Server Error");
      }
    } else {
      // File found, send the content with the appropriate content type
      res.writeHead(200, { "Content-Type": contentTypeHeader });
      res.end(data, "utf-8");
    }
  });
});

const port = process.env.PORT || 10000; // Use the specified port or default to 10000

getEntries();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
