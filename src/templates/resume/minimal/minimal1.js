export const minimalTemplate1 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 30px;
          color: #222;
        }

        .container {
          display: flex;
          gap: 40px;
        }

        .left {
          width: 65%;
        }

        .right {
          width: 35%;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .subtitle {
          color: #555;
          margin-bottom: 10px;
        }

        .contact {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .section {
          margin-top: 25px;
        }

        .section-title {
          color: #2e8b57;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 8px;
          letter-spacing: 1px;
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
          margin-bottom: 5px;
        }

        ul {
          padding-left: 18px;
          margin: 5px 0;
        }

        li {
          margin-bottom: 4px;
        }

        .skills {
          font-size: 14px;
          line-height: 1.6;
        }

        .achievement {
          margin-bottom: 15px;
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

      <div class="subtitle">
        ${resume.contact?.desiredRole || ""}
      </div>

      <div class="contact">
        ${resume.contact?.email || ""} | ${resume.contact?.phone || ""} | 
        ${resume.contact?.location?.city || ""}
      </div>

      <div class="container">

        <!-- LEFT COLUMN -->
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
              resume.experience
                ?.sort((a, b) => a.order - b.order)
                .map(
                  (exp) => `
                  <div class="job">
                    <div class="job-title">${exp.jobTitle}</div>
                    <div class="meta">
                      ${exp.employer || ""} | 
                      ${exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - 
                      ${exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                    </div>

                    <ul>
                      ${
                        exp.description
                          ?.split(".")
                          .filter(Boolean)
                          .map((point) => `<li>${point.trim()}</li>`)
                          .join("") || ""
                      }
                    </ul>
                  </div>
                `
                )
                .join("")
            }
          </div>

          <!-- EDUCATION -->
          <div class="section">
            <div class="section-title">EDUCATION</div>

            ${
              resume.education
                ?.map(
                  (edu) => `
                  <div class="job">
                    <div class="job-title">${edu.degree}</div>
                    <div class="meta">
                      ${edu.instituteName || ""} | 
                      ${edu.startDate ? new Date(edu.startDate).getFullYear() : ""}
                    </div>
                  </div>
                `
                )
                .join("")
            }
          </div>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="right">

          <!-- KEY ACHIEVEMENTS -->
          <div class="section">
            <div class="section-title">KEY ACHIEVEMENTS</div>

            ${
              resume.customSections
                ?.map(
                  (item) => `
                  <div class="achievement">
                    <strong>${item.sectionName}</strong>
                    <p>${item.description}</p>
                  </div>
                `
                )
                .join("") || ""
            }
          </div>

          <!-- SKILLS -->
          <div class="section">
            <div class="section-title">SKILLS</div>
            <div class="skills">
              ${resume.skills?.map((s) => s.name).join(", ") || ""}
            </div>
          </div>

          <!-- CERTIFICATIONS -->
          <div class="section">
            <div class="section-title">TRAINING & COURSES</div>

            ${
              resume.certifications
                ?.map(
                  (cert) => `
                  <p>
                    <strong>${cert.title}</strong><br/>
                    ${cert.description || ""}
                  </p>
                `
                )
                .join("") || ""
            }
          </div>

          <!-- LANGUAGES -->
          <div class="section">
            <div class="section-title">LANGUAGES</div>

            ${
              resume.languages
                ?.map(
                  (lang) => `
                  <p>
                    ${lang.name} - ${lang.level}
                  </p>
                `
                )
                .join("") || ""
            }
          </div>

        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer-left">www.hired.ai</div>

      ${
        !isPro
          ? `<div class="watermark">Made with Hired.ai</div>`
          : ""
      }

    </body>
  </html>
  `;
};