module.exports = {
  home: {
    url: "https://covid-19.sledilnik.org/",
    waitforSelector: "",
    pageWidth: 1024,
    pageHeight: 768,
    createResponse(image) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: image,
        isBase64Encoded: true,
      };
    },
  },
};
