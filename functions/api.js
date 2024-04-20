const express = require("express");
const app = express();
const serverless = require('serverless-http');
const cors = require("cors");
app.use(cors());

const router = express.Router();


router.get("/", (req, res) => {
  res.send('sse server heartbeat is running ')
}
);

router.post("/events", (req, res) => {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const message = "Rating= 8.5\n Candidate id - 9aT1W7kN\nCandidate Name - Punitha\nCandidate domain - Information Technology\nCandidate Location - Visakhapatnam\nTotal Experience - Over 5 years\nSkills and Summary: Expertise in Power BI, including creating solution-driven dashboards, developing different chart types like Heat Maps, Geo Maps, Symbol Maps, Pie Charts, Bar Charts, Tree Maps, Gantts, Circle Views, Line Charts, Area Charts, Scatter Plots, Bullet Graphs, and Histograms. Proficient in SSIS, SSAS, SSRS, SQL Server, and Azure technologies. Extensively used Power BI Desktop, Power BI Service, Power Apps, Power Automation. Involved in creating Datawarehouse solutions using SSIS (ETL), SSAS (Data modeling), and reporting using Power BI. Strong knowledge of Data Warehousing methodologies and concepts, including star schemas, snowflakes, dimensional modeling, and reporting tools. Worked with high volume databases with partitioned data.\n\n Rating= 7.8\n Candidate id - n9bha84r\nCandidate Name - Umapathi\nCandidate domain - Information Technology\nCandidate Location - Chennai\nTotal Experience - Not explicitly mentioned, but has valuable experience\nSkills and Summary: Proficient in Power BI, including creating Filters like Visual level, page level, Drill through, and Report level filter. Expertise in Formatting visuals and conditional formatting, creating Parameters, sorting and grouping, binning, and developing Data Visualizations like Matrix table, Area Charts, tree map, Line and Stacked column chart. Experience in sharing reports, gateways, creating content packs, and scheduling. Extensive knowledge of SQL queries relevant to PowerBI. Experience as a MS SQL Server & Power BI Developer.\n\n Rating= 7.5\n Candidate id - 3Q2h1b85\nCandidate Name - Vaibhav Ashok Patil\nCandidate domain - Information Technology\nCandidate Location - Pune\nTotal Experience - Not explicitly mentioned, but has skills in Data Transformation and Modelling, Data Analysis and Visualisation, and Project Management Support. Proficient in SQL and data visualization with tools such as MS Excel and Power BI. Certified in Business Analytics with Excel, Power BI for Data Analysis, and AWS Cloud Computing.\n\n Rating= 7.0\n Candidate id - Unsbe3ci\nCandidate Name - NANDEESH\nCandidate domain - Information Technology\nCandidate Location - Banglore\nTotal Experience - 4.5 years\nSkills and Summary: Proficient in Power BI, including designing, developing, and implementing business intelligence solutions. Experience in connecting to and integrating data from various sources, designing and creating data models, dashboards, reports, and other data visualizations. Deep skills in DAX, Data Modeling, Power Query, and visualization. Experience in creating Packages on SSIS by using different data Transformations.\n\nNote: None of the candidates explicitly mentioned experience in API Designing, MySQL, or an MBA qualification. The ratings are based on their expertise in Power BI and SQL, which were part of the requirements";


  const message2 = "Rating= 8.5\n Candidate id - 9aT1W7kN\nCandidate Name - Punitha\nCandidate domain - Information Technology\nCandidate Location - Visakhapatnam\nTotal Experience - Over 5 years\nSkills and Summary: Expertise in Power BI, including creating solution-driven dashboards, developing different chart types like Heat Maps, Geo Maps, Symbol Maps, Pie Charts, Bar Charts, Tree Maps, Gantts, Circle";

  const words = message.split(' ');
  let index = 0;

  const intervalId = setInterval(() => {
    if (index < words.length) {
      res.write(`data: ${words[index++]}\n\n`);
    } else {
      clearInterval(intervalId);
      res.end();
    }
  }, 100); 

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler= serverless(app)