import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: { type: String, default: "Untitled Resume" },

    template: {
      category: {
        type: String,
        enum: ["minimal", "modern", "executive"]
      },
      name: String
    },

    // JD Analysis
    jobDescription: String,
    extractedKeywords: [String],
    atsScore: { type: Number, default: 0 },

    // CONTACT
    contact: {
      firstName: String,
      middleName: String,
      lastName: String,
      email: String,
      phone: String,
      countryCode: String,
      location: {
        country: String,
        city: String,
        address: String,
        postalCode: String
      },
      desiredRole: String,
      photo: String
    },

    // EXPERIENCE
    experience: [
      {
        id: String,
        jobTitle: String,
        employer: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String,
        aiEnhanced: { type: Boolean, default: false },
        order: Number
      }
    ],

    // EDUCATION
    education: [
      {
        id: String,
        instituteName: String,
        level: String, // school/college/university
        degree: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String,
        aiEnhanced: { type: Boolean, default: false },
        order: Number
      }
    ],

    // SKILLS
    skills: [
      {
        name: String,
        level: String, // Beginner/Intermediate/Advanced
      }
    ],

    // SUMMARY
    summary: {
      text: String,
      aiEnhanced: { type: Boolean, default: false }
    },

    // FINALIZE SECTION
    links: [
      {
        title: String,
        url: String
      }
    ],

    languages: [
      {
        name: String,
        level: String
      }
    ],

    certifications: [
      {
        title: String,
        description: String,
        aiEnhanced: Boolean
      }
    ],

    awards: [
      {
        title: String,
        description: String,
        aiEnhanced: Boolean
      }
    ],

    hobbies: [String],

    customSections: [
      {
        sectionName: String,
        description: String,
        aiEnhanced: Boolean
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);