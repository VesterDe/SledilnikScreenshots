module.exports = {
  homeAllCards: {
    url: "https://covid-19.sledilnik.org/",
    waitForSelector: ".card-number",
    pageWidth: 1000,
    pageHeight: 520,
    scrollY: 48,
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
      Highcharts.charts[0].series[0].animationTimeout = 0
      Highcharts.charts[0].series[0].hide()
      Highcharts.charts[0].series[1].hide()
      Highcharts.charts[0].series[4].hide()
      Highcharts.charts[0].series[5].hide()
      document.querySelector('main > .container').style['max-width'] = '100%'
      document.querySelector('main > .container').style.padding = '0'
      document.querySelector('.visualization.container.embeded').style['max-width'] = '100%'
      document.querySelector('.visualization.container.embeded').style.padding = 0
      document.querySelector('.embeded.col').style.padding = 0
      document.querySelector('*').style.overflow = 'hidden'
      Highcharts.charts[0].reflow()
    },
    pageWidth: 1000,
    pageHeight: 553,
    scrollY: 33,
  },
};
