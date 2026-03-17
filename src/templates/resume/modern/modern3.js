export const modernTemplate3 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 30px;
          font-family: Arial, sans-serif;
          color: #222;

          /* subtle dotted background */
          background-image: radial-gradient(#ddd 1px, transparent 1px);
          background-size: 10px 10px;
        }

        h1 {
          margin: 0;
          font-size: 30px;
          color: #c0392b;
        }

        .role {
          margin-top: 5px;
          color: #444;
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
          border-bottom: 2px solid #ccc;
          margin-bottom: 10px;
          padding-bottom: 5px;
        }

        .job {
          margin-bottom: 15px;
        }

        .job-title {
          font-weight: bold;
          color: #c0392b;
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

        /* SKILL TAGS */
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-tag {
          border-bottom: 2px solid #c0392b;
          padding-bottom: 2px;
          font-size: 13px;
        }

        /* ACHIEVEMENTS */
        .achievement {
          margin-bottom: 15px;
        }

        .achievement strong {
          color: #c0392b;
        }

        /* LANGUAGES */
        .dots {
          margin-left: 5px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: #c0392b;
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

          <!-- SKILLS -->
          <div class="section">
            <div class="section-title">SKILLS</div>

            <div class="skills">
              ${
                resume.skills
                  ?.map((s) => `<span class="skill-tag">${s.name}</span>`)
                  .join("") || ""
              }
            </div>
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
                      ${exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                    </div>

                    <ul>
                      ${
                        exp.description
                          ?.split(".")
                          .filter(Boolean)
                          .map((d) => `<li>${d.trim()}</li>`)
                          .join("") || ""
                      }
                    </ul>
                  </div>
                `
                )
                .join("")
            }
          </div>

          <!-- LANGUAGES -->
          <div class="section">
            <div class="section-title">LANGUAGES</div>

            ${
              resume.languages
                ?.map((lang) => {
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
                      ${Array(5)
                        .fill(0)
                        .map(
                          (_, i) =>
                            `<span class="dot ${
                              i < (levelMap[lang.level] || 2) ? "" : "gray"
                            }"></span>`
                        )
                        .join("")}
                    </span>
                  </div>
                `;
                })
                .join("") || ""
            }

          </div>

        </div>

        <!-- RIGHT -->
        <div class="right">

          <!-- ACHIEVEMENTS -->
          <div class="section">
            <div class="section-title">KEY ACHIEVEMENTS</div>

            ${
              resume.customSections
                ?.map(
                  (a) => `
                  <div class="achievement">
                    <strong>${a.sectionName}</strong>
                    <p>${a.description}</p>
                  </div>
                `
                )
                .join("") || ""
            }
          </div>

          <!-- COURSES -->
          <div class="section">
            <div class="section-title">TRAINING / COURSES</div>

            ${
              resume.certifications
                ?.map(
                  (c) => `
                  <p>
                    <strong>${c.title}</strong><br/>
                    ${c.description || ""}
                  </p>
                `
                )
                .join("") || ""
            }
          </div>

          <!-- EDUCATION -->
          <div class="section">
            <div class="section-title">EDUCATION</div>

            ${
              resume.education
                ?.map(
                  (edu) => `
                  <p>
                    <strong>${edu.degree}</strong><br/>
                    ${edu.instituteName}
                  </p>
                `
                )
                .join("") || ""
            }
          </div>

          <!-- INTERESTS -->
          <div class="section">
            <div class="section-title">INTERESTS</div>

            ${
              resume.hobbies
                ?.map((h) => `<p>${h}</p>`)
                .join("") || ""
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