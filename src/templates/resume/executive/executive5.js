export const executiveTemplate5 = (resume, isPro) => {
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

        /* LEFT SIDEBAR */
        .left {
          width: 32%;
          background: #fdf4ec;
          padding: 25px 20px;
        }

        .profile {
          text-align: center;
          margin-bottom: 20px;
        }

        .profile img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
        }

        .section-title {
          margin-top: 20px;
          font-weight: bold;
          color: #c94f2d;
          font-size: 14px;
        }

        .item {
          margin-top: 10px;
          font-size: 13px;
        }

        /* RIGHT MAIN */
        .right {
          width: 68%;
          padding: 30px;
        }

        h1 {
          margin: 0;
          font-size: 30px;
        }

        .role-box {
          margin-top: 10px;
          background: #e9b89b;
          padding: 10px;
          border-radius: 12px;
          font-size: 14px;
        }

        .section {
          margin-top: 20px;
        }

        .section-header {
          font-weight: bold;
          color: #c94f2d;
          margin-bottom: 8px;
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

        /* LANGUAGE DOTS */
        .dot {
          height: 6px;
          width: 6px;
          background: #c94f2d;
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

          <div class="profile">
            ${
              resume.contact?.photo
                ? `<img src="${resume.contact.photo}" />`
                : ""
            }
          </div>

          <!-- CONTACT -->
          <div class="section-title">CONTACTS</div>
          <div class="item">${resume.contact?.email || ""}</div>
          <div class="item">${resume.contact?.phone || ""}</div>
          <div class="item">${resume.contact?.location?.city || ""}</div>

          <!-- STRENGTHS -->
          <div class="section-title">STRENGTHS</div>
          ${
            resume.customSections?.map(s => `
              <div class="item">
                <strong>${s.sectionName}</strong>
                <p>${s.description}</p>
              </div>
            `).join("") || ""
          }

          <!-- COURSES -->
          <div class="section-title">TRAINING & COURSES</div>
          ${
            resume.certifications?.map(c => `
              <div class="item">
                <strong>${c.title}</strong>
                <p>${c.description}</p>
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

        <!-- RIGHT -->
        <div class="right">

          <h1>${resume.contact?.firstName || ""} ${resume.contact?.lastName || ""}</h1>

          <div class="role-box">
            ${resume.contact?.desiredRole || ""}
          </div>

          <!-- SUMMARY -->
          <div class="section">
            <div class="section-header">OBJECTIVE</div>
            <p>${resume.summary?.text || ""}</p>
          </div>

          <!-- SKILLS -->
          <div class="section">
            <div class="section-header">TECHNICAL SKILLS</div>
            <p>${resume.skills?.map(s => s.name).join(", ") || ""}</p>
          </div>

          <!-- EXPERIENCE -->
          <div class="section">
            <div class="section-header">EXPERIENCE</div>

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
            <div class="section-header">EDUCATION</div>

            ${
              resume.education?.map(edu => `
                <div class="job">
                  <div class="job-title">${edu.degree}</div>
                  <div class="meta">${edu.instituteName}</div>
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