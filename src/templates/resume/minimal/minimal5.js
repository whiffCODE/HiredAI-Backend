export const minimalTemplate5 = (resume, isPro) => {
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
          font-size: 30px;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .role {
          color: #2c6e9b;
          font-size: 16px;
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

        .section-title {
          font-size: 14px;
          font-weight: bold;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .sub-title {
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

        .two-col {
          display: flex;
          gap: 30px;
        }

        .half {
          width: 50%;
        }

        .language-bar {
          margin-top: 5px;
        }

        .bar {
          height: 6px;
          background: #ddd;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 3px;
        }

        .bar-fill {
          height: 6px;
          background: #2c6e9b;
        }

        .skills {
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

      <!-- EDUCATION -->
      <div class="section">
        <div class="section-title">EDUCATION</div>

        ${
          resume.education?.map(edu => `
            <div>
              <div class="sub-title">${edu.degree}</div>
              <div class="meta">${edu.instituteName}</div>

              <ul>
                ${
                  edu.description
                    ?.split(".")
                    .filter(Boolean)
                    .map(d => `<li>${d.trim()}</li>`)
                    .join("") || ""
                }
              </ul>
            </div>
          `).join("") || ""
        }
      </div>

      <!-- COURSES -->
      <div class="section">
        <div class="section-title">TRAINING & COURSES</div>

        <div class="two-col">
          ${
            resume.certifications?.map(cert => `
              <div class="half">
                <div class="sub-title">${cert.title}</div>
                <p>${cert.description || ""}</p>
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
            <div>
              <div class="sub-title">${exp.jobTitle}</div>
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
                    .map(d => `<li>${d.trim()}</li>`)
                    .join("") || ""
                }
              </ul>
            </div>
          `).join("") || ""
        }
      </div>

      <!-- LANGUAGES -->
      <div class="section">
        <div class="section-title">LANGUAGES</div>

        ${
          resume.languages?.map(lang => {
            const levelMap = {
              Beginner: 30,
              Intermediate: 50,
              Advanced: 75,
              Native: 100
            };
            return `
              <div>
                ${lang.name} (${lang.level})
                <div class="bar">
                  <div class="bar-fill" style="width:${levelMap[lang.level] || 40}%"></div>
                </div>
              </div>
            `;
          }).join("") || ""
        }
      </div>

      <!-- SKILLS -->
      <div class="section">
        <div class="section-title">TECHNICAL SKILLS</div>
        <div class="skills">
          ${resume.skills?.map(s => s.name).join(", ") || ""}
        </div>
      </div>

      <!-- VOLUNTEERING -->
      <div class="section">
        <div class="section-title">VOLUNTEERING</div>

        ${
          resume.customSections?.map(v => `
            <div>
              <div class="sub-title">${v.sectionName}</div>
              <p>${v.description}</p>
            </div>
          `).join("") || ""
        }
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