const app = require("./app");
const cloudinary = require("cloudinary");


const PORT = 3000;


cloudinary.config({
  cloud_name: 'dyxumpm4a',
  api_key: '849122369237317',
  api_secret: 'NT40GIQv0rOxeTwX2Dd32lfya2o',
});


// Initialize Firebase


const server = app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
