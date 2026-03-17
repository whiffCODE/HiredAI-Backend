export const executiveTemplate1 = (resume, isPro) => {
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 30px;
          font-family: Arial, sans-serif;
          color: #222;
        }

        h1 {
          margin: 0;
          font-size: 30px;
        }

        .role {
          color: #4f7c5b;
          margin-top: 5px;
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
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 16px;
        }

        /* ACHIEVEMENTS GRID */
        .achievements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .achievement strong {
          color: #4f7c5b;
        }

        /* TIMELINE */
        .timeline {
          position: relative;
          margin-left: 20px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #ccc;
        }

        .job {
          position: relative;
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .job::before {
          content: "";
          position: absolute;
          left: -3px;
          top: 5px;
          width: 10px;
          height: 10px;
          background: #4f7c5b;
          border-radius: 50%;
        }

        .job-title {
          font-weight: bold;
        }

        .company {
          color: #4f7c5b;
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

        /* SKILLS */
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill {
          border-bottom: 2px solid #4f7c5b;
          font-size: 13px;
          padding-bottom: 2px;
        }

        /* LANGUAGES */
        .lang-row {
          margin-bottom: 5px;
        }

        .dot {
          height: 6px;
          width: 6px;
          background: #4f7c5b;
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

      <!-- SUMMARY -->
      <div class="section">
        <div class="section-title">SUMMARY</div>
        <p>${resume.summary?.text || ""}</p>
      </div>

      <!-- ACHIEVEMENTS -->
      <div class="section">
        <div class="section-title">KEY ACHIEVEMENTS</div>

        <div class="achievements">
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

      <!-- EXPERIENCE -->
      <div class="section">
        <div class="section-title">EXPERIENCE</div>

        <div class="timeline">
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
      </div>

      <!-- SKILLS -->
      <div class="section">
        <div class="section-title">SKILLS</div>

        <div class="skills">
          ${
            resume.skills?.map(s => `<span class="skill">${s.name}</span>`).join("") || ""
          }
        </div>
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
              <div class="lang-row">
                ${lang.name}
                ${
                  Array(5).fill(0).map((_,i)=>
                    `<span class="dot ${i < (levelMap[lang.level] || 2) ? "" : "gray"}"></span>`
                  ).join("")
                }
              </div>
            `;
          }).join("") || ""
        }
      </div>

      <div class="footer-left">www.hired.ai</div>

      ${!isPro ? `<div class="watermark">Made with Hired.ai</div>` : ""}

    </body>
  </html>
  `;
};