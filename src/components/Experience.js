import React, { useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { Typography, Box } from "@mui/material";
import "react-vertical-timeline-component/style.min.css";
import "../styles.css";
import cwnblogo from "../assets/cwnb-logo.jpg";
import reachlogo from "../assets/reach-lab-logo.png";
import xylemlogo from "../assets/xylem-logo.png";
import bnylogo from "../assets/bny-logo.png";

function Experience() {
  const [showMore, setShowMore] = useState({
    cwnb: false,
    reach: false,
    xylem: false,
    bny: false,
  });

  const handleToggle = (key) => {
    setShowMore((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h3" sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        mb: 4
      }}>
        My Experience
      </Typography>
      <VerticalTimeline lineColor="#3e497a">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>May 2023 - December 2023</span>}
          iconStyle={{ 
            background: "#3e497a", 
            color: "#fff", 
            backgroundImage: `url(${cwnblogo})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '60px',
            height: '60px'
          }}
        >
          <h3 className="vertical-timeline-element-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Research Intern - Virginia Tech</h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ fontSize: '1.3rem', color: '#666' }}>Blacksburg, Virginia</h4>
          <div className="timeline-content">
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              During my time as a Research Intern at the <strong>Code World, No Blanket Lab</strong>, I received mentorship from and assisted PhD student Minhyuk Ko and our advisor Chris Brown with the debugging tool project.&nbsp;
              {showMore.cwnb ? (
                <>
                  I played a crucial role in refining the software architecture. By replacing regular expressions (RegEx) with JavaParser, we achieved a notable reduction in code execution time, significantly enhancing the tool's performance.&nbsp;
                  In addition, I supported a study analyzing the effectiveness of AI tools for debugging. This research provided valuable insights into user preferences and the efficacy of various debugging methodologies. My active involvement in lab discussions was instrumental, as I provided feedback on research papers and helped ensure the high quality of our research outputs.&nbsp;
                  For my personal study on "AI Tools vs. Debugging Tools: Exploring User Perceptions on Bug Locating Performance," I received significant recognition, securing 1st Place at the VA–NC Alliance Undergraduate Research Symposium and 2nd Place at the Dr. Wayne Scales Undergraduate Research Symposium. This research shed light on how users perceive the efficiency and ease of use of different debugging tools, offering valuable contributions to the academic understanding of debugging methodologies.
                </>
              ) : (
                <>
                  I played a crucial role in refining the software architecture...
                </>
              )}
            </p>
            <button 
              className="show-more-button" 
              onClick={() => handleToggle('cwnb')}
              style={{ 
                fontSize: '1.1rem',
                padding: '12px 24px',
                borderRadius: '6px'
              }}
            >
              {showMore.cwnb ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>February 2024 - October 2024</span>}
          iconStyle={{ 
            background: "#3e497a", 
            color: "#fff", 
            backgroundImage: `url(${reachlogo})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '60px',
            height: '60px'
          }}
        >
          <h3 className="vertical-timeline-element-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Research Assistant</h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ fontSize: '1.3rem', color: '#666' }}>Blacksburg, Virginia</h4>
          <div className="timeline-content">
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              In my role as a Research Assistant at <strong>REACH Lab</strong>, I worked closely with my partner Aisha Ismael and research advisor Dr. Ihudiya Finda Williams on the First Generation Low-Income (FGLI) project.&nbsp;
              {showMore.reach ? (
                <>
                  I conducted a comprehensive literature review and analysis for the project "Designing to Support the Social Aspects of College for First-Generation, Low-Income Students," focusing on the social, cultural, and academic challenges faced by this population. My work involved extensive user experience research, usability testing, and cross-functional collaboration to enhance the inclusivity and functionality of support tools. Additionally, I enhanced the lab's website using HTML, CSS, and JavaScript, applying Universal Design for Learning (UDL) guidelines to improve its usability and aesthetics, ensuring a more inclusive user experience. I utilized critical research skills such as skimming and critiquing academic papers to provide valuable insights and recommendations, contributing to the project's overall effectiveness. I also actively engaged in lab discussions, providing feedback and insights that further refined our research approach and outcomes.
                </>
              ) : (
                <>
                  I conducted a comprehensive literature review and analysis for the project "Designing to Support the Social Aspects of College for First-Generation, Low-Income Students," focusing on the social, cultural, and academic challenges faced by this population...
                </>
              )}
            </p>
            <button 
              className="show-more-button" 
              onClick={() => handleToggle('reach')}
              style={{ 
                fontSize: '1.1rem',
                padding: '12px 24px',
                borderRadius: '6px'
              }}
            >
              {showMore.reach ? "Show Less" : "Show More"}
            </button>
          </div>

        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>June 2024 - August 2024</span>}
          iconStyle={{ 
            background: "#3e497a", 
            color: "#fff", 
            backgroundImage: `url(${xylemlogo})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '60px',
            height: '60px'
          }}
        >
          <h3 className="vertical-timeline-element-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Software Engineer Intern</h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ fontSize: '1.3rem', color: '#666' }}>Morrisville, NC (Remote)</h4>
          <div className="timeline-content">
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
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
            <button 
              className="show-more-button" 
              onClick={() => handleToggle('xylem')}
              style={{ 
                fontSize: '1.1rem',
                padding: '12px 24px',
                borderRadius: '6px'
              }}
            >
              {showMore.xylem ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={<span className="timeline-date" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>June 2025 - August 2025</span>}
          iconStyle={{ 
            background: "#3e497a", 
            color: "#fff", 
            backgroundImage: `url(${bnylogo})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '60px',
            height: '60px'
          }}
        >
          <h3 className="vertical-timeline-element-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Software Engineer Intern</h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ fontSize: '1.3rem', color: '#666' }}>Pittsburgh, PA</h4>
          <div className="timeline-content">
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              As a Software Engineer Intern at <strong>Bank of New York</strong>, I enhanced an existing disclosure generation system by exporting legacy metadata from MongoDB Compass and developing Python scripts to restructure JSON data, enabling smoother frontend integration.&nbsp;
              {showMore.bny ? (
                <>
                  As a Software Engineer Intern at Bank of New York, I enhanced a legacy disclosure generation system by exporting metadata from MongoDB Compass and developing Python scripts to restructure JSON data, enabling seamless frontend integration. I designed and implemented RESTful APIs in Java using Spring Boot to efficiently retrieve and deliver transformed metadata from MongoDB collections to the frontend, improving system performance and maintainability. I gained hands-on exposure to CI/CD pipelines and containerized applications, learning how containers are used to package and deploy services reliably and how updates flow from development through testing to deployment. Working within an Agile team, I tracked progress and coordinated tasks through Jira, participating in sprint planning, code reviews, and iterative development cycles. I also strengthened application security by remediating over 10 critical vulnerabilities flagged by SonarQube, including SQL injection, cross-site scripting (XSS), insecure deserialization, and outdated dependencies. This experience allowed me to apply full-stack development, database management, and secure development practices in a collaborative, high-stakes financial services environment.
                </>
              ) : (
                <>
                  As a Software Engineer Intern at Bank of New York, I enhanced a legacy disclosure generation system by exporting metadata from MongoDB Compass and...
                </>
              )}
            </p>
            <button 
              className="show-more-button" 
              onClick={() => handleToggle('bny')}
              style={{ 
                fontSize: '1.1rem',
                padding: '12px 24px',
                borderRadius: '6px'
              }}
            >
              {showMore.bny ? "Show Less" : "Show More"}
            </button>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
}

export default Experience;
