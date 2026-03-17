export const minimalTemplate2 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 30px;
          color: #222;
          background: #fff;
        }

        h1 {
          font-size: 30px;
          margin-bottom: 5px;
        }

        .role {
          color: #7b5cff;
          font-size: 16px;
          margin-bottom: 10px;
        }

        .contact {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
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

        .section {
          margin-top: 20px;
        }

        .section-title {
          font-size: 13px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          padding-bottom: 4px;
          margin-bottom: 10px;
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
        }

        ul {
          padding-left: 18px;
          margin-top: 5px;
        }

        li {
          margin-bottom: 4px;
        }

        .achievement {
          margin-bottom: 15px;
        }

        .achievement-title {
          font-weight: bold;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-chip {
          border: 1px solid #ccc;
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 4px;
        }

        .course {
          margin-bottom: 10px;
        }

        .interest {
          margin-bottom: 10px;
        }

        .language {
          margin-bottom: 5px;
        }

        .dots {
          display: inline-block;
          margin-left: 10px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: #7b5cff;
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

          <!-- EDUCATION -->
          <div class="section">
            <div class="section-title">EDUCATION</div>

            ${
              resume.education
                ?.map(
                  (edu) => `
                  <div class="job">
                    <div class="job-title">${edu.degree}</div>
                    <div class="meta">${edu.instituteName}</div>
                  </div>
                `
                )
                .join("")
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
                  (item) => `
                  <div class="achievement">
                    <div class="achievement-title">${item.sectionName}</div>
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
              ${
                resume.skills
                  ?.map((s) => `<div class="skill-chip">${s.name}</div>`)
                  .join("") || ""
              }
            </div>
          </div>

          <!-- COURSES -->
          <div class="section">
            <div class="section-title">TRAINING / COURSES</div>

            ${
              resume.certifications
                ?.map(
                  (c) => `
                  <div class="course">
                    <strong>${c.title}</strong>
                    <p>${c.description || ""}</p>
                  </div>
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
                ?.map(
                  (h) => `
                  <div class="interest">${h}</div>
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
                  <div class="language">
                    ${lang.name} (${lang.level})
                    <span class="dots">
                      ${
                        ["Beginner", "Intermediate", "Advanced", "Native"]
                          .indexOf(lang.level) >= 0
                          ? Array(5)
                              .fill(0)
                              .map((_, i) => {
                                const levelMap = {
                                  Beginner: 2,
                                  Intermediate: 3,
                                  Advanced: 4,
                                  Native: 5
                                };
                                return `<span class="dot ${
                                  i < (levelMap[lang.level] || 2)
                                    ? ""
                                    : "gray"
                                }"></span>`;
                              })
                              .join("")
                          : ""
                      }
                    </span>
                  </div>
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