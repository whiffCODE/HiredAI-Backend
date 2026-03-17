export const modernTemplate2 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          color: #222;
        }

        .container {
          display: flex;
        }

        /* LEFT SIDE */
        .left {
          width: 65%;
          padding: 30px;
          background: #fff;
        }

        h1 {
          margin: 0;
          font-size: 28px;
        }

        .role {
          margin-top: 5px;
          color: #555;
        }

        .contact {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .section {
          margin-top: 20px;
        }

        .section-title {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        .job {
          margin-bottom: 15px;
        }

        .job-title {
          font-weight: bold;
        }

        .meta {
          font-size: 12px;
          color: #777;
        }

        ul {
          padding-left: 18px;
          margin-top: 5px;
        }

        li {
          margin-bottom: 4px;
        }

        /* RIGHT PANEL */
        .right {
          width: 35%;
          background: #c96a00;
          color: white;
          padding: 30px 20px;
        }

        .right .section-title {
          border-bottom: 1px solid rgba(255,255,255,0.6);
        }

        .skill-list {
          line-height: 1.6;
        }

        .project {
          margin-bottom: 15px;
        }

        .project strong {
          display: block;
        }

        .achievement {
          margin-bottom: 15px;
        }

        /* LANGUAGE BARS */
        .lang-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .dots {
          margin-left: 5px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: #333;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2px;
        }

        .dot.gray {
          background: #ccc;
        }

        .watermark {
          position: fixed;
          bottom: 10px;
          right: 10px;
          font-size: 11px;
          opacity: 0.5;
        }

        .footer-left {
          position: fixed;
          bottom: 10px;
          left: 10px;
          font-size: 11px;
          color: #888;
        }
      </style>
    </head>

    <body>

      <div class="container">

        <!-- LEFT -->
        <div class="left">

          <h1>${resume.contact?.firstName || ""} ${resume.contact?.lastName || ""}</h1>

          <div class="role">
            ${resume.contact?.desiredRole || ""}
          </div>

          <div class="contact">
            ${resume.contact?.email || ""} |
            ${resume.contact?.phone || ""} |
            ${resume.contact?.location?.city || ""}
          </div>

          <!-- SUMMARY -->
          <div class="section">
            <div class="section-title">SUMMARY</div>
            <p>${resume.summary?.text || ""}</p>
          </div>

          <!-- EXPERIENCE -->
          <div class="section">
            <div class="section-title">EXPERIENCE</div>

            ${
              resume.experience?.sort((a,b)=>a.order-b.order).map(exp => `
                <div class="job">
                  <div class="job-title">${exp.jobTitle}</div>
                  <div class="meta">
                    ${exp.employer || ""} |
                    ${exp.startDate ? new Date(exp.startDate).getFullYear() : ""} -
                    ${exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                  </div>

                  <ul>
                    ${
                      exp.description?.split(".").filter(Boolean)
                      .map(d => `<li>${d.trim()}</li>`).join("") || ""
                    }
                  </ul>
                </div>
              `).join("")
            }
          </div>

          <!-- EDUCATION -->
          <div class="section">
            <div class="section-title">EDUCATION</div>

            ${
              resume.education?.map(edu => `
                <div class="job">
                  <div class="job-title">${edu.degree}</div>
                  <div class="meta">${edu.instituteName}</div>
                </div>
              `).join("") || ""
            }
          </div>

          <!-- PROGRAMMING LANGUAGES -->
          <div class="section">
            <div class="section-title">PROGRAMMING LANGUAGES</div>

            ${
              resume.skills?.map(skill => {
                return `
                  <div class="lang-row">
                    ${skill.name}
                    <span class="dots">
                      ${Array(5).fill(0).map((_,i)=>
                        `<span class="dot ${i<4 ? "" : "gray"}"></span>`
                      ).join("")}
                    </span>
                  </div>
                `;
              }).join("") || ""
            }
          </div>

        </div>

        <!-- RIGHT -->
        <div class="right">

          <!-- SKILLS -->
          <div class="section">
            <div class="section-title">SKILLS</div>
            <div class="skill-list">
              ${resume.skills?.map(s => s.name).join(" • ") || ""}
            </div>
          </div>

          <!-- PROJECTS -->
          <div class="section">
            <div class="section-title">PROJECTS</div>

            ${
              resume.customSections?.map(p => `
                <div class="project">
                  <strong>${p.sectionName}</strong>
                  <p>${p.description}</p>
                </div>
              `).join("") || ""
            }
          </div>

          <!-- COURSES -->
          <div class="section">
            <div class="section-title">TRAINING / COURSES</div>

            ${
              resume.certifications?.map(c => `
                <p><strong>${c.title}</strong><br/>
                ${c.description || ""}</p>
              `).join("") || ""
            }
          </div>

          <!-- ACHIEVEMENTS -->
          <div class="section">
            <div class="section-title">KEY ACHIEVEMENTS</div>

            ${
              resume.customSections?.map(a => `
                <div class="achievement">
                  <strong>${a.sectionName}</strong>
                  <p>${a.description}</p>
                </div>
              `).join("") || ""
            }
          </div>

        </div>

      </div>

      <div class="footer-left">www.hired.ai</div>

      ${!isPro ? `<div class="watermark">Made with Hired.ai</div>` : ""}

    </body>
  </html>
  `;
};