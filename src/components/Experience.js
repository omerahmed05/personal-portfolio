import React, { useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../styles.css";
import cwnblogo from "../assets/cwnb-logo.jpg";
import reachlogo from "../assets/reach-lab-logo.png";
import xylemlogo from "../assets/xylem-logo.png";

function Experience() {
  const [showMore, setShowMore] = useState({
    cwnb: false,
    reach: false,
    xylem: false,
  });

  const handleToggle = (key) => {
    setShowMore((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  return (
    <div className="experience">
      <VerticalTimeline lineColor="#3e497a">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date">May 2023 - December 2023</span>}
          iconStyle={{ background: "#3e497a", color: "#fff", backgroundImage: `url(${cwnblogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h3 className="vertical-timeline-element-title">Research Intern - Virginia Tech</h3>
          <h4 className="vertical-timeline-element-subtitle">Blacksburg, Virginia</h4>
          <div className="timeline-content">
            <p>
              During my time as a Research Intern at the <strong>Code World, No Blanket Lab</strong>, I received mentorship from and assisted PhD student Minhyuk Ko and our advisor Chris Brown with the debugging tool project.&nbsp; 
              {showMore.cwnb ? (
                <>
                  I played a crucial role in refining the software architecture. By replacing regular expressions (RegEx) with JavaParser, we achieved a notable reduction in code execution time, significantly enhancing the tool’s performance.&nbsp; 
                  In addition, I supported a study analyzing the effectiveness of AI tools for debugging. This research provided valuable insights into user preferences and the efficacy of various debugging methodologies. My active involvement in lab discussions was instrumental, as I provided feedback on research papers and helped ensure the high quality of our research outputs.&nbsp; 
                  For my personal study on "AI Tools vs. Debugging Tools: Exploring User Perceptions on Bug Locating Performance," I received significant recognition, securing 1st Place at the VA–NC Alliance Undergraduate Research Symposium and 2nd Place at the Dr. Wayne Scales Undergraduate Research Symposium. This research shed light on how users perceive the efficiency and ease of use of different debugging tools, offering valuable contributions to the academic understanding of debugging methodologies.
                </>
              ) : (
                <>
                  I played a crucial role in refining the software architecture...
                </>
              )}
            </p>
            <button className="show-more-button" onClick={() => handleToggle('cwnb')}>
              {showMore.cwnb ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date">February 2024 - PRESENT</span>}
          iconStyle={{ background: "#3e497a", color: "#fff", backgroundImage: `url(${reachlogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h3 className="vertical-timeline-element-title">Research Assistant</h3>
          <h4 className="vertical-timeline-element-subtitle">Blacksburg, Virginia</h4>
          <div className="timeline-content">
            <p>
              In my role as a Research Assistant at <strong>REACH Lab</strong>, I worked closely with my partner Aisha Ismael and research advisor Dr. Ihudiya Finda Williams on the First Generation Low-Income (FGLI) project.&nbsp; 
              {showMore.reach ? (
                <>
                  This project examined how FGLI students use technology to navigate the social aspects of college. My role involved conducting a thorough literature review to understand the challenges faced by FGLI students, such as difficulties in adapting to college life and engaging with social norms. I developed and applied advanced research techniques, including searching for relevant papers and detecting papers with false data, to uncover relevant studies and insights. Additionally, I learned skimming techniques to efficiently read papers.&nbsp; 
                  I also played a key role in creating support tools tailored for low-income engineering students, aimed at improving their academic and social experiences. I contributed to enhancing the lab’s website, utilizing CSS, HTML, and JavaScript to improve its functionality and user experience.
                </>
              ) : (
                <>
                  This project examined how FGLI students use technology to navigate the social aspects of college...
                </>
              )}
            </p>
            <button className="show-more-button" onClick={() => handleToggle('reach')}>
              {showMore.reach ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date">June 2024 - PRESENT</span>}
          iconStyle={{ background: "#3e497a", color: "#fff", backgroundImage: `url(${xylemlogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h3 className="vertical-timeline-element-title">Software Engineer Intern</h3>
          <h4 className="vertical-timeline-element-subtitle">Charlotte, NC (Remote)</h4>
          <div className="timeline-content">
            <p>
              As a Software Engineer at <strong>Xylem Inc.</strong>, I developed a real-time timeline view for the RNI Scheduler, a critical application for managing jobs on Remote Network Interface (RNI) servers that facilitate smart utility readings and reports.&nbsp; 
              {showMore.xylem ? (
                <>
                  Utilizing Angular, FullCalendar, and REST APIs, I transformed the scheduler's user interface from a static tabular format to a dynamic, visually intuitive timeline. To ensure data accuracy and efficiency, the REST API was designed to invoke stored procedures in the company's SQL database using JDBC, fetching real-time job information.&nbsp; 
                  The new timeline view provides users with a clear overview of job interactions, enabling them to effectively track and manage tasks across the RNI network. For instance, long-running report generation processes, which can consume substantial memory and processing power, are now clearly visible, preventing users from accidentally initiating duplicate jobs. By visually indicating the status of jobs, including those with long runtimes like report generation, the timeline prevents unnecessary resource consumption and reduces system load. This enhanced visibility has significantly improved operational efficiency, decreased wait times for users, and minimized support inquiries related to job status.
                </>
              ) : (
                <>
                  Utilizing Angular, FullCalendar, and REST APIs, I transformed the scheduler's user interface from a static tabular format to a dynamic, visually intuitive timeline...
                </>
              )}
            </p>
            <button className="show-more-button" onClick={() => handleToggle('xylem')}>
              {showMore.xylem ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
