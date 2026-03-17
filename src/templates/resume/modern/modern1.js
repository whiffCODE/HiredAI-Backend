export const modernTemplate1 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          color: #222;
        }

        /* HEADER */
        .header {
          background: #1aa3ad;
          color: white;
          padding: 25px 30px;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
        }

        .header .role {
          margin-top: 5px;
          font-size: 15px;
        }

        .header .contact {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.9;
        }

        /* MAIN */
        .container {
          display: flex;
          padding: 25px 30px;
          gap: 30px;
        }

        .left {
          width: 65%;
        }

        .right {
          width: 35%;
        }

        /* SECTIONS */
        .section {
          margin-bottom: 20px;
        }

        .section-title {
          font-weight: bold;
          border-bottom: 2px solid #333;
          margin-bottom: 10px;
          padding-bottom: 5px;
        }

        .job {
          margin-bottom: 15px;
        }

        .job-title {
          font-weight: bold;
        }

        .company {
          color: #1aa3ad;
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

        /* ACHIEVEMENTS */
        .achievement {
          margin-bottom: 15px;
        }

        .achievement-title {
          font-weight: bold;
        }

        /* SKILLS */
        .skills span {
          display: inline-block;
          margin-bottom: 5px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 2px;
          margin-right: 10px;
        }

        /* LANGUAGES */
        .dots {
          margin-left: 5px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: #1aa3ad;
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

      <!-- HEADER -->
      <div class="header">
        <h1>${resume.contact?.firstName || ""} ${resume.contact?.lastName || ""}</h1>

        <div class="role">
          ${resume.contact?.desiredRole || ""}
        </div>

        <div class="contact">
          ${resume.contact?.email || ""} |
          ${resume.contact?.phone || ""} |
          ${resume.contact?.location?.city || ""}
        </div>
      </div>

      <div class="container">

        <!-- LEFT -->
        <div class="left">

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
                  <div class="company">${exp.employer || ""}</div>

                  <div class="meta">
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
                  <div class="company">${edu.instituteName}</div>
                </div>
              `).join("") || ""
            }
          </div>

        </div>

        <!-- RIGHT -->
        <div class="right">

          <!-- ACHIEVEMENTS -->
          <div class="section">
            <div class="section-title">KEY ACHIEVEMENTS</div>

            ${
              resume.customSections?.map(item => `
                <div class="achievement">
                  <div class="achievement-title">${item.sectionName}</div>
                  <p>${item.description}</p>
                </div>
              `).join("") || ""
            }
          </div>

          <!-- SKILLS -->
          <div class="section">
            <div class="section-title">SKILLS</div>

            <div class="skills">
              ${resume.skills?.map(s => `<span>${s.name}</span>`).join("") || ""}
            </div>
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

          <!-- INTERESTS -->
          <div class="section">
            <div class="section-title">INTERESTS</div>

            ${
              resume.hobbies?.map(h => `<p>${h}</p>`).join("") || ""
            }
          </div>

          <!-- LANGUAGES -->
          <div class="section">
            <div class="section-title">LANGUAGES</div>

            ${
              resume.languages?.map(lang => {
                const levelMap = {
                  Beginner: 2,
                  Intermediate: 3,
                  Advanced: 4,
                  Native: 5
                };
                return `
                  <div>
                    ${lang.name}
                    <span class="dots">
                      ${Array(5).fill(0).map((_,i)=>
                        `<span class="dot ${i < (levelMap[lang.level] || 2) ? "" : "gray"}"></span>`
                      ).join("")}
                    </span>
                  </div>
                `;
              }).join("") || ""
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