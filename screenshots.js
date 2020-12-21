module.exports = {
  homeAllCards: {
    url: "https://covid-19.sledilnik.org/",
    waitForSelector: ".card-number",
    pageWidth: 560,
    pageHeight: 670,
    scrollY: 70,
  },
  homeTop3Cards: {
    url: "https://covid-19.sledilnik.org/",
    waitForSelector: ".card-number",
    pageWidth: 992,
    pageHeight: 275,
    scrollY: 70,
  },
  icuStatus: {
    url: "https://covid-19.sledilnik.org/embed.html#/chart/Patients",
    waitForSelector: ".highcharts-root",
    beforeShot: function() {
      Highcharts.charts[0].series[0].hide()
      Highcharts.charts[0].series[1].hide()
      Highcharts.charts[0].series[4].hide()
      Highcharts.charts[0].series[6].hide()
    },
    pageWidth: 1200,
    pageHeight: 500,
    scrollY: 41,
  },
};
