export const modernTemplate4 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 30px;
          font-family: Arial, sans-serif;
          color: #222;

          /* soft background shapes */
          background: linear-gradient(120deg, #f8fbff 60%, #e6f0ff 100%);
        }

        h1 {
          margin: 0;
          font-size: 30px;
          color: #1f3c88;
        }

        .role {
          color: #3b82f6;
          margin-top: 5px;
        }

        .contact {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .container {
          display: flex;
          gap: 30px;
        }

        .left {
          width: 65%;
        }

        .right {
          width: 35%;
        }

        .section {
          margin-top: 20px;
        }

        .section-title {
          font-weight: bold;
          margin-bottom: 10px;
          color: #1f3c88;
        }

        .job {
          margin-bottom: 15px;
        }

        .job-title {
          font-weight: bold;
          color: #1f3c88;
        }

        .company {
          color: #3b82f6;
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

        /* SKILL PILLS */
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pill {
          border: 1px solid #3b82f6;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          color: #1f3c88;
        }

        /* ACHIEVEMENTS */
        .achievement {
          margin-bottom: 12px;
        }

        .achievement strong {
          color: #1f3c88;
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
      <h1>${resume.contact?.firstName || ""} ${resume.contact?.lastName || ""}</h1>

      <div class="role">
        ${resume.contact?.desiredRole || ""}
      </div>

      <div class="contact">
        ${resume.contact?.email || ""} |
        ${resume.contact?.phone || ""} |
        ${resume.contact?.location?.city || ""}
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

          <!-- SKILLS -->
          <div class="section">
            <div class="section-title">SKILLS</div>

            <div class="skills">
              ${
                resume.skills?.map(s => `<span class="pill">${s.name}</span>`).join("") || ""
              }
            </div>
          </div>

          <!-- COURSES -->
          <div class="section">
            <div class="section-title">TRAINING / COURSES</div>

            ${
              resume.certifications?.map(c => `
                <p>
                  <strong>${c.title}</strong><br/>
                  ${c.description || ""}
                </p>
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

          <!-- INTERESTS -->
          <div class="section">
            <div class="section-title">INTERESTS</div>

            ${
              resume.hobbies?.map(h => `<p>${h}</p>`).join("") || ""
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