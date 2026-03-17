export const minimalTemplate4 = (resume, isPro) => {
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

        /* LEFT PANEL */
        .left {
          width: 32%;
          background: #5a2400;
          color: #fff;
          padding: 25px 20px;
        }

        .name {
          font-size: 26px;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .section-title {
          font-size: 13px;
          border-bottom: 1px solid rgba(255,255,255,0.5);
          margin-top: 20px;
          padding-bottom: 5px;
        }

        .item {
          margin-top: 10px;
          font-size: 13px;
        }

        .item strong {
          display: block;
          margin-bottom: 3px;
        }

        .skills {
          line-height: 1.6;
        }

        .lang-dots {
          margin-top: 5px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: white;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2px;
        }

        .dot.gray {
          background: rgba(255,255,255,0.3);
        }

        /* RIGHT PANEL */
        .right {
          width: 68%;
          padding: 30px;
        }

        .role {
          font-size: 16px;
          color: #444;
          margin-bottom: 10px;
        }

        .contact {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .section {
          margin-top: 20px;
        }

        .section-title-right {
          font-size: 14px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
          padding-bottom: 5px;
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

        .interest {
          margin-bottom: 10px;
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
          color: #aaa;
        }
      </style>
    </head>

    <body>

      <div class="container">

        <!-- LEFT -->
        <div class="left">

          <div class="name">
            ${resume.contact?.firstName || ""} ${resume.contact?.lastName || ""}
          </div>

          <!-- SKILLS -->
          <div class="section-title">SKILLS</div>
          <div class="item skills">
            ${resume.skills?.map(s => s.name).join(" • ") || ""}
          </div>

          <!-- COURSES -->
          <div class="section-title">TRAINING / COURSES</div>
          ${
            resume.certifications?.map(c => `
              <div class="item">
                <strong>${c.title}</strong>
                <p>${c.description || ""}</p>
              </div>
            `).join("") || ""
          }

          <!-- EDUCATION -->
          <div class="section-title">EDUCATION</div>
          ${
            resume.education?.map(edu => `
              <div class="item">
                <strong>${edu.degree}</strong>
                <p>${edu.instituteName}</p>
              </div>
            `).join("") || ""
          }

          <!-- ACHIEVEMENTS -->
          <div class="section-title">KEY ACHIEVEMENTS</div>
          ${
            resume.customSections?.map(item => `
              <div class="item">
                <strong>${item.sectionName}</strong>
                <p>${item.description}</p>
              </div>
            `).join("") || ""
          }

          <!-- LANGUAGES -->
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
                <div class="item">
                  ${lang.name} (${lang.level})
                  <div class="lang-dots">
                    ${Array(5).fill(0).map((_, i) =>
                      `<span class="dot ${i < (levelMap[lang.level] || 2) ? "" : "gray"}"></span>`
                    ).join("")}
                  </div>
                </div>
              `;
            }).join("") || ""
          }

        </div>

        <!-- RIGHT -->
        <div class="right">

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
            <div class="section-title-right">SUMMARY</div>
            <p>${resume.summary?.text || ""}</p>
          </div>

          <!-- EXPERIENCE -->
          <div class="section">
            <div class="section-title-right">EXPERIENCE</div>

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

          <!-- VOLUNTEERING -->
          <div class="section">
            <div class="section-title-right">VOLUNTEERING</div>

            ${
              resume.customSections?.map(v => `
                <div class="job">
                  <div class="job-title">${v.sectionName}</div>
                  <p>${v.description}</p>
                </div>
              `).join("") || ""
            }
          </div>

          <!-- INTERESTS -->
          <div class="section">
            <div class="section-title-right">INTERESTS</div>

            ${
              resume.hobbies?.map(h => `
                <div class="interest">${h}</div>
              `).join("") || ""
            }
          </div>

        </div>

      </div>

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