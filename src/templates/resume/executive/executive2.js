export const executiveTemplate2 = (resume, isPro) => {
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

        .section {
          margin-top: 25px;
        }

        .section-title {
          font-weight: bold;
          border-bottom: 3px solid #1f3c88;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        /* ACHIEVEMENTS GRID */
        .achievements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .achievement strong {
          color: #1f3c88;
        }

        /* JOB */
        .job {
          margin-bottom: 20px;
        }

        .job-title {
          font-weight: bold;
        }

        .company {
          color: #3b82f6;
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

        /* SKILLS */
        .skills {
          font-size: 13px;
          line-height: 1.6;
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

      <!-- SKILLS -->
      <div class="section">
        <div class="section-title">CORE COMPETENCIES</div>

        <div class="skills">
          ${resume.skills?.map(s => s.name).join(", ") || ""}
        </div>
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

      <div class="footer-left">www.hired.ai</div>

      ${!isPro ? `<div class="watermark">Made with Hired.ai</div>` : ""}

    </body>
  </html>
  `;
};