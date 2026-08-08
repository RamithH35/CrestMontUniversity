const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const ClubHead = require("./models/ClubHead");
const Department = require("./models/Department");
const Club = require("./models/Club");
const Event = require("./models/Event");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
    const parsed = dotenv.parse(raw);
    Object.entries(parsed).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const MONGODB_URI = (process.env.MONGODB_URI || "").trim();

async function seed() {
  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      tlsAllowInvalidCertificates: true,
    });
    console.log("Connected to MongoDB for seeding...");

    // Clear existing events, clubs, and club heads to prevent duplicates/drift
    await Event.deleteMany({});
    await Club.deleteMany({});
    await ClubHead.deleteMany({});
    console.log("Cleared existing events, clubs, and club heads.");

    // 1. Seed ClubHead accounts from Environment Variables
    const adminUser = (process.env.ADMIN_USERNAME || "").trim();
    const adminPass = (process.env.ADMIN_PASSWORD || "").trim();
    const demoUser = (process.env.DEMO_CLUBHEAD_USERNAME || "").trim();
    const demoPass = (process.env.DEMO_CLUBHEAD_PASSWORD || "").trim();

    if (!adminUser || !adminPass || !demoUser || !demoPass) {
      throw new Error("Seeding failed: ADMIN_USERNAME, ADMIN_PASSWORD, DEMO_CLUBHEAD_USERNAME, and DEMO_CLUBHEAD_PASSWORD must all be specified in the environment (.env). Fallback defaults are disabled for security.");
    }

    const adminHashed = await bcrypt.hash(adminPass, 10);
    const demoHashed = await bcrypt.hash(demoPass, 10);

    await ClubHead.create([
      {
        username: adminUser,
        password: adminHashed,
        isDemo: false
      },
      {
        username: demoUser,
        password: demoHashed,
        isDemo: true
      }
    ]);
    console.log(`Seeded ClubHeads: ${adminUser} (permanent) and ${demoUser} (demo).`);

    // 2. Seed Clubs
    const clubsToSeed = [
      {
        name: "CodeForge Club",
        description: "Crestmont's premier coding club focusing on algorithms, web dev, and national hackathons.",
        achievements: [
          "Winner of the National Clean-Tech Hackathon 2025.",
          "Contributed 50+ pull requests to major open-source web frameworks.",
          "Conducted 10+ bootcamp sessions for student developers."
        ]
      },
      {
        name: "AeroDesign Society",
        description: "Designing, building, and flying remote-controlled aircraft and high-powered rockets.",
        achievements: [
          "Placed 3rd in the International UAV Flight Competition.",
          "Successfully designed and launched a payload-bearing solid fuel rocket.",
          "Mentored 100+ students in aerodynamic modeling."
        ]
      },
      {
        name: "EcoImpact Collective",
        description: "Promoting sustainability, campus recycling drives, and ecological conservation studies.",
        achievements: [
          "Reduced campus plastic usage by 40% through reusable bottle initiatives.",
          "Completed a local river cleanup project gathering 2 tons of waste.",
          "Hosted the annual Climate Action Summit on campus."
        ]
      },
      {
        name: "Robotics Guild",
        description: "Building autonomous systems and competing in battlebots and maze solver competitions.",
        achievements: [
          "Championship gold in the Robocon Maze Solver event.",
          "Built an autonomous floor cleaning rover now used in Crestmont library.",
          "Collaborated with local industry on smart sensors project."
        ]
      },
      {
        name: "Entrepreneurs Cell",
        description: "Incubating ideas, conducting case studies, and hosting founder demo nights.",
        achievements: [
          "Successfully launched 5 student ventures currently raising capital.",
          "Organized the Crestmont Startup Bootcamp with 300+ participants.",
          "Maintained a database of 50+ alumni mentors for student founders."
        ]
      }
    ];

    for (const c of clubsToSeed) {
      await Club.create(c);
      console.log(`Seeded Club: ${c.name}`);
    }

    // 3. Seed Departments
    const deptsToSeed = [
      {
        name: "Technology & Engineering",
        description: "Hackathons, robotics builds, and open lab hours across AI, embedded systems, and software.",
        faculty: [
          { name: "Dr. Alan Turing", title: "Professor of Artificial Intelligence", bio: "Researching neural networks and automated reasoning systems." },
          { name: "Dr. Grace Hopper", title: "Professor of Software Engineering", bio: "Leading compiler construction and language design efforts." }
        ],
        achievements: [
          "First place in the National Robotics Championship 2025.",
          "Published 15+ papers in top-tier computer vision conferences."
        ]
      },
      {
        name: "Business & Leadership",
        description: "Founder talks, case competitions, and the campus incubator's demo nights.",
        faculty: [
          { name: "Prof. Peter Drucker", title: "Professor of Organizational Behavior", bio: "Expert in corporate strategy and social innovation." },
          { name: "Dr. Sheryl Sandberg", title: "Professor of Leadership Studies", bio: "Focusing on women in technology and entrepreneurial leadership." }
        ],
        achievements: [
          "Incubated 8 student-led startups that secured seed funding.",
          "Ranked top 10 campus incubator globally."
        ]
      },
      {
        name: "Arts, Culture & Community",
        description: "Showcases, cultural nights, and the clubs fair that kicks off every semester.",
        faculty: [
          { name: "Prof. Maya Angelou", title: "Professor of Creative Writing", bio: "Renowned writer and social activist leading humanities programs." },
          { name: "Dr. Yo-Yo Ma", title: "Professor of Musicology", bio: "Exploring the intersection of cultural expression and community development." }
        ],
        achievements: [
          "Organized the annual campus arts festival with 5000+ attendees.",
          "Partnered with local NGOs for 20+ community development drives."
        ]
      },
      {
        name: "Media & Communication",
        description: "Design labs, production studios, and journal writing circles.",
        faculty: [
          { name: "Dr. Marshall McLuhan", title: "Professor of Media Ecology", bio: "Researching digital media networks and communication ecology." },
          { name: "Dr. Ida B. Wells", title: "Professor of Investigative Journalism", bio: "Leading investigative reporting and student media publication." }
        ],
        achievements: [
          "Published Crestmont Daily campus paper with 2000+ physical copies.",
          "Won Best Documentary Short Film award at the state level."
        ]
      },
      {
        name: "Natural Sciences & Research",
        description: "Lab experiments, environmental audits, and chemistry symposiums.",
        faculty: [
          { name: "Dr. Marie Curie", title: "Professor of Physics", bio: "Leading radiation physics research and chemical separation protocols." },
          { name: "Dr. Carl Sagan", title: "Professor of Astronomy & Astrophysics", bio: "Promoting science communication, planetary modeling, and SETI observation." }
        ],
        achievements: [
          "Identified 3 new candidate exoplanetary system profiles.",
          "Established a state-of-the-art biochemistry clean room facility."
        ]
      }
    ];

    for (const d of deptsToSeed) {
      const existingDept = await Department.findOne({ name: d.name });
      if (existingDept) {
        existingDept.description = d.description;
        existingDept.faculty = d.faculty;
        existingDept.achievements = d.achievements;
        await existingDept.save();
        console.log(`Updated existing Department: ${d.name}`);
      } else {
        await Department.create(d);
        console.log(`Seeded new Department: ${d.name}`);
      }
    }

    // 4. Seed Events (relative dates to keep status valid)
    const eventsToSeed = [
      {
        title: "Hackathon 48",
        description: "Develop software solutions for smart university infrastructure in a 48-hour build run.",
        club: "CodeForge Club",
        type: "both",
        category: "marquee",
        registerLink: "https://forms.gle/codeforge-hack-reg",
        volunteerLink: "https://forms.gle/codeforge-hack-vol",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Intro to React Bootcamp",
        description: "Learn component design, hooks state management, and modern routing setups in this hands-on workshop.",
        club: "CodeForge Club",
        type: "register",
        category: "upcoming",
        registerLink: "https://forms.gle/codeforge-react-reg",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Git Mastery Workshop",
        description: "Master rebase, cherry-pick, conflict resolution, and teamwork repository workflows.",
        club: "CodeForge Club",
        type: "register",
        category: "past",
        registerLink: "https://forms.gle/codeforge-git-reg",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        title: "RC Aircraft Assembly Workshop",
        description: "Assemble and program miniature fixed-wing aircraft guided by senior engineering mentors.",
        club: "AeroDesign Society",
        type: "both",
        category: "upcoming",
        registerLink: "https://forms.gle/aero-rc-reg",
        volunteerLink: "https://forms.gle/aero-rc-vol",
        imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Rocket Propulsion Seminar",
        description: "A theoretical deep-dive into solid fuels, nozzle design, and trajectory telemetry tracking.",
        club: "AeroDesign Society",
        type: "register",
        category: "upcoming",
        registerLink: "https://forms.gle/aero-prop-reg",
        imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Spring Fly-In Exhibition",
        description: "Public flight demo of student built custom drones and autonomous remote aircraft.",
        club: "AeroDesign Society",
        type: "volunteer",
        category: "past",
        volunteerLink: "https://forms.gle/aero-fly-vol",
        imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Campus Zero-Waste Campaign",
        description: "Join audit operations targeting food packaging waste and single-use campus plastics.",
        club: "EcoImpact Collective",
        type: "volunteer",
        category: "upcoming",
        volunteerLink: "https://forms.gle/eco-waste-vol",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Tree Plantation Drive",
        description: "Help plant native trees around the perimeter campus borders and local community parks.",
        club: "EcoImpact Collective",
        type: "both",
        category: "upcoming",
        registerLink: "https://forms.gle/eco-tree-reg",
        volunteerLink: "https://forms.gle/eco-tree-vol",
        imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Earth Hour Symposium",
        description: "Guest lectures addressing renewable energy grids, battery design, and green campuses.",
        club: "EcoImpact Collective",
        type: "register",
        category: "past",
        registerLink: "https://forms.gle/eco-hour-reg",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Battlebots Showdown",
        description: "Spectator show featuring custom weight bots crashing down in the arena for absolute glory.",
        club: "Robotics Guild",
        type: "register",
        category: "marquee",
        registerLink: "https://forms.gle/robo-battle-reg",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: "ROS2 Robotics Simulation Lab",
        description: "Quick start guide into writing node messaging setups and kinematics packages in ROS2.",
        club: "Robotics Guild",
        type: "register",
        category: "upcoming",
        registerLink: "https://forms.gle/robo-ros-reg",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Line Follower Contest",
        description: "Speed run trial event testing simple PID tuning parameters on black track designs.",
        club: "Robotics Guild",
        type: "both",
        category: "past",
        registerLink: "https://forms.gle/robo-line-reg",
        volunteerLink: "https://forms.gle/robo-line-vol",
        imageUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Founders Talk",
        description: "Startup founders detail early customer development runs, funding structures, and pivot moves.",
        club: "Entrepreneurs Cell",
        type: "register",
        category: "upcoming",
        registerLink: "https://forms.gle/ent-talk-reg",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Crestmont Pitch Fest",
        description: "Submit pitch presentations to angel panels and receive critical roadmap strategy feedback.",
        club: "Entrepreneurs Cell",
        type: "both",
        category: "upcoming",
        registerLink: "https://forms.gle/ent-pitch-reg",
        volunteerLink: "https://forms.gle/ent-pitch-vol",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: "Startup Incubator Demo Night",
        description: "Showcase graduation runs from early stage project iterations pitching product models.",
        club: "Entrepreneurs Cell",
        type: "register",
        category: "past",
        registerLink: "https://forms.gle/ent-demo-reg",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        eventDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        registrationEndDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];

    for (const e of eventsToSeed) {
      await Event.create(e);
      console.log(`Seeded Event: ${e.title}`);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
