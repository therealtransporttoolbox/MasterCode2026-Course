// 2026 NHVR Master Code of Practice – Course Data
// Design Philosophy: Clean Professional — DM Sans UI, Lora body text, NHVR blue palette

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string; // HTML string
  keyPoints: string[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: Question[];
}

export const courseModules: Module[] = [
  {
    id: "module-1",
    number: 1,
    title: "Introduction to the Master Code",
    description: "Understand what the 2026 NHVR Master Code is, why it was developed, and how it fits within the Australian heavy vehicle regulatory landscape.",
    icon: "BookOpen",
    color: "#003087",
    lessons: [
      {
        id: "m1-l1",
        title: "What Is the Master Code and Why Does It Exist?",
        duration: "8 min",
        keyPoints: [
          "The Master Code is a registered Industry Code of Practice under s 706 of the HVNL.",
          "It was developed to help CoR parties comply with their legal duties to ensure heavy vehicle safety.",
          "The 2026 Code replaces the 2018 version and addresses expanded hazards and contemporary operating conditions.",
          "It has evidentiary status — courts may use it to assess what was 'reasonably practicable'.",
          "It does not create new legal obligations but provides practical guidance for risk management."
        ],
        content: `
          <h2>What Is the Master Code and Why Does It Exist?</h2>
          <p>Heavy vehicles are an essential part of the Australian economy, but their use brings significant risks to workers and the public who share roads with them. Road transport is consistently identified as one of the most dangerous occupations for Australian workers. Where heavy vehicles are involved, the potential for harm is substantially greater.</p>
          <p>The <strong>2026 NHVR Master Code of Practice</strong> (referred to throughout this course as "the Code") has been developed by the National Heavy Vehicle Regulator (NHVR) to assist parties in the Chain of Responsibility (CoR) and their executives to comply with their legal duties to ensure heavy vehicle safety.</p>
          <div class="callout callout-blue">
            <strong>Purpose of the Code</strong>
            <p>The Code captures and shares existing knowledge and experience about factors that cause and contribute to heavy vehicle risk, and the control measures that can be used to manage that risk. CoR parties can then apply that information to their own operations and choose suitable control measures to eliminate or minimise risk so far as is reasonably practicable.</p>
          </div>
          <h3>How the Code Is Used</h3>
          <p>The Code can be used in diverse ways by different organisations. It may assist a business to create its first risk register or to review an existing one. It may suggest alternatives to existing controls. Two businesses about to form an agreement may use it to help prioritise what each requires from the other. It can inform the development of a new Safety Management System or a Learning Management System.</p>
          <h3>Evidentiary Status</h3>
          <p>As a registered Code of Practice under s 706 of the HVNL, the Master Code has an important legal status. Per s 632A, HVNL, a court hearing charges of breaches of the Primary Duty or Executive Duty <em>may use the Master Code in assessing what would have been reasonably practicable</em> for a duty holder to have done. This means that following the Code's guidance provides a strong defence in any legal proceedings.</p>
          <div class="callout callout-amber">
            <strong>Important Note</strong>
            <p>The Code does not create new legal obligations or replace existing requirements under the HVNL or its regulations. It is a source of knowledge which helps duty holders improve safety in their own businesses.</p>
          </div>
          <h3>The 2026 Update</h3>
          <p>The previous Master Code, first registered in November 2018, was focused on the transport sector and was structured around the 10 roles identified in the HVNL. It mainly addressed risks related to speed, fatigue, mass, dimension and loading, and vehicle standards. The 2026 Code is broader in scope, addressing expanded hazards, contemporary operating conditions, and a wider range of activities across all sectors that use heavy vehicles.</p>
        `
      },
      {
        id: "m1-l2",
        title: "Who Does the Master Code Apply To?",
        duration: "7 min",
        keyPoints: [
          "The Code applies to every sector that uses heavy vehicles directly or indirectly.",
          "It covers manufacturing, construction, mining, retail, emergency services, livestock, container transport, and many others.",
          "It is relevant to all parties in the CoR — from operators to large corporations in the supply chain.",
          "The Code is required reading for executives of CoR parties.",
          "Western Australia and the Northern Territory are not covered by the HVNL."
        ],
        content: `
          <h2>Who Does the Master Code Apply To?</h2>
          <p>The scope and application of the Master Code are deliberately broad, covering every sector that uses heavy vehicles directly or indirectly — whether in commerce, public transport, agriculture, government, or industry.</p>
          <h3>Industries Covered</h3>
          <p>Examples of relevant industries include manufacturing, construction, mining, energy, utilities, retail, emergency services, towing, car carrying, import and export, livestock, grain, timber, waste and recycling, bulk tankers, landscaping, container transport, bus services, and many others. If your business uses or relies on heavy vehicles in any way, the Code is relevant to you.</p>
          <h3>Geographic Scope</h3>
          <p>The HVNL applies in all Australian states and territories <strong>except Western Australia and the Northern Territory</strong>. It regulates the use of heavy vehicles with a gross vehicle mass or aggregated trailer mass over 4.5 tonnes. Businesses operating in WA or NT must refer to the relevant state-specific legislation.</p>
          <div class="callout callout-blue">
            <strong>Is the Code Relevant to Drivers and Employees?</strong>
            <p>Heavy vehicle drivers (other than owner drivers) are not parties in the CoR and the Primary Duty does not apply to them directly. However, an owner driver is a party in the CoR because they fall within the definition of an "operator". Any driver or employee who performs a CoR function — such as packing, loading, or unloading — is also a party in the CoR.</p>
          </div>
          <h3>Executives Must Read the Code</h3>
          <p>The Master Code is <strong>required reading for executives</strong> of CoR parties. Their duty to exercise due diligence requires them — among other things — to gain an understanding of their business's transport activities and the hazards and risks associated with those activities. Reading and understanding the Code is itself an act of due diligence.</p>
          <div class="callout callout-amber">
            <strong>What the Code Does Not Cover</strong>
            <p>The Code does not contain information about all hazards, risks, and controls. Some hazards are too specific or rare for inclusion in a general code. It also does not identify every possible control measure. Duty holders must identify all hazards and eliminate or minimise all risks associated with their transport activities, regardless of whether those hazards are identified in the Code.</p>
          </div>
        `
      },
      {
        id: "m1-l3",
        title: "The Legal Framework: HVNL and the Master Code",
        duration: "10 min",
        keyPoints: [
          "The HVNL contains approximately 300 prescriptive obligations across 14 chapters.",
          "The Master Code relates to two distinct duties: the Primary Duty (s 26C) and the Executive Duty (s 26D).",
          "Prescriptive law requires following specific rules; duty-based law requires achieving safe outcomes.",
          "Category 1 penalties can reach $4.1 million for corporations and 5 years imprisonment for individuals.",
          "The Code is based on the HVNL as it stood on 1 December 2025."
        ],
        content: `
          <h2>The Legal Framework: HVNL and the Master Code</h2>
          <p>The <strong>Heavy Vehicle National Law (HVNL)</strong> is the primary legislation governing heavy vehicle use in Australia (excluding WA and NT). Its fourteen chapters contain approximately 300 prescriptive obligations, many applying to heavy vehicle drivers and operators. These include regulation of mass and dimension limits, prescribed work and rest hours, vehicle standards, loading requirements, and permit conditions.</p>
          <h3>Two Types of Legal Obligation</h3>
          <p>The Master Code relates to two distinct types of legal duty within Chapter 1A of the HVNL. Understanding the difference between prescriptive law and duty-based law is fundamental to understanding the Code.</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Prescriptive Law: Follow the Rules</th>
                  <th>Duty-Based Law: Safe Outcomes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>There is one right way, regardless of the situation</td>
                  <td>What's required depends on the situation</td>
                </tr>
                <tr>
                  <td>Provides certainty</td>
                  <td>Provides flexibility</td>
                </tr>
                <tr>
                  <td>Scope is defined</td>
                  <td>Anything affecting safety is in scope</td>
                </tr>
                <tr>
                  <td>Example: Send vehicle for annual inspection by state authority</td>
                  <td>Example: Daily driver checks and program of regular maintenance following OEM guidance</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Serious Penalties Apply</h3>
          <p>Breaches of the Primary Duty and Executive Duty carry serious maximum penalties. These are indexed to CPI on 1 July each year.</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Offence Category</th>
                  <th>Maximum Penalty (Corporation)</th>
                  <th>Maximum Penalty (Individual)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Category 1 (s 26F)</td>
                  <td>$4,113,837</td>
                  <td>$424,794 or 5 years imprisonment or both</td>
                </tr>
                <tr>
                  <td>Category 2 (s 26G)</td>
                  <td>$2,062,370</td>
                  <td>$206,237</td>
                </tr>
                <tr>
                  <td>Category 3 (s 26H)</td>
                  <td>$686,350</td>
                  <td>$68,635</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-red">
            <strong>Executive Personal Liability</strong>
            <p>The maximum penalty for an executive who breaches their Executive Duty is equivalent to the maximum penalty for an <em>individual</em> who breaches the Primary Duty. This is a personal, non-delegable duty that cannot be passed to someone else.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m1-q1",
        text: "What is the primary purpose of the 2026 NHVR Master Code of Practice?",
        options: [
          "To create new legal obligations for heavy vehicle operators",
          "To assist CoR parties and their executives to comply with their legal duties to ensure heavy vehicle safety",
          "To replace all existing requirements under the HVNL",
          "To provide a mandatory checklist for vehicle inspections"
        ],
        correctIndex: 1,
        explanation: "The Master Code is designed to assist parties in the CoR and their executives to comply with their legal duties. It does not create new legal obligations or replace existing HVNL requirements — it is a source of knowledge and practical guidance."
      },
      {
        id: "m1-q2",
        text: "Which Australian jurisdictions are NOT covered by the HVNL?",
        options: [
          "Queensland and South Australia",
          "Victoria and Tasmania",
          "Western Australia and the Northern Territory",
          "New South Wales and the ACT"
        ],
        correctIndex: 2,
        explanation: "The HVNL applies in all Australian states and territories except Western Australia and the Northern Territory. Businesses operating in WA or NT must refer to relevant state-specific legislation."
      },
      {
        id: "m1-q3",
        text: "What is the maximum penalty for a corporation that commits a Category 1 offence under the HVNL (2025/26 financial year)?",
        options: [
          "$686,350",
          "$2,062,370",
          "$4,113,837",
          "$424,794"
        ],
        correctIndex: 2,
        explanation: "The maximum penalty for a corporation committing a Category 1 offence (s 26F, HVNL) is $4,113,837 for the 2025/26 financial year. These penalties are indexed to CPI on 1 July each year."
      },
      {
        id: "m1-q4",
        text: "The Master Code has 'evidentiary status'. What does this mean in practice?",
        options: [
          "Following the Code is mandatory and failure to do so is automatically a criminal offence",
          "A court may use the Code to assess what would have been reasonably practicable for a duty holder",
          "The Code replaces the HVNL as the primary source of heavy vehicle law",
          "The Code only applies in court proceedings, not in day-to-day operations"
        ],
        correctIndex: 1,
        explanation: "Per s 632A, HVNL, a court hearing charges of breaches of the Primary Duty or Executive Duty may use the Master Code in assessing what would have been reasonably practicable for a duty holder to have done. This gives the Code significant legal weight without making it mandatory."
      }
    ]
  },
  {
    id: "module-2",
    number: 2,
    title: "Chain of Responsibility (CoR)",
    description: "Identify who is a party in the CoR, understand the Primary Duty and Executive Duty, and learn how responsibility is shared across the supply chain.",
    icon: "Link",
    color: "#1D4ED8",
    lessons: [
      {
        id: "m2-l1",
        title: "Who Is a Party in the Chain of Responsibility?",
        duration: "10 min",
        keyPoints: [
          "A party in the CoR is a business or individual who performs one of 10 defined roles in relation to a heavy vehicle.",
          "The 10 roles are: Employer, Prime Contractor, Operator, Scheduler, Consignor, Consignee, Packer, Loading Manager, Loader, and Unloader.",
          "Individual employees can be CoR parties, but their employer is expected to take the lead.",
          "A business can hold multiple CoR roles simultaneously.",
          "The same duty — the Primary Duty — applies to all CoR parties."
        ],
        content: `
          <h2>Who Is a Party in the Chain of Responsibility?</h2>
          <p>A business or individual is a 'party in the CoR' when they or their employees perform any of the following roles or functions in relation to a heavy vehicle. Understanding which roles apply to your business is the essential first step in compliance.</p>
          <div class="role-grid">
            <div class="role-card">
              <strong>Employer</strong>
              <p>Employs a heavy vehicle driver</p>
            </div>
            <div class="role-card">
              <strong>Prime Contractor</strong>
              <p>Engages a self-employed driver under a contract for services</p>
            </div>
            <div class="role-card">
              <strong>Operator</strong>
              <p>Directs the control and use of a heavy vehicle</p>
            </div>
            <div class="role-card">
              <strong>Scheduler</strong>
              <p>Schedules the transport of goods/passengers or a driver's work and rest hours</p>
            </div>
            <div class="role-card">
              <strong>Consignor</strong>
              <p>Consigns goods for transport by a heavy vehicle</p>
            </div>
            <div class="role-card">
              <strong>Consignee</strong>
              <p>Receives goods delivered by a heavy vehicle</p>
            </div>
            <div class="role-card">
              <strong>Packer</strong>
              <p>Packs or assembles goods for transport in a heavy vehicle</p>
            </div>
            <div class="role-card">
              <strong>Loading Manager</strong>
              <p>Manages premises where 5 or more heavy vehicles are loaded or unloaded each day</p>
            </div>
            <div class="role-card">
              <strong>Loader</strong>
              <p>Loads a heavy vehicle</p>
            </div>
            <div class="role-card">
              <strong>Unloader</strong>
              <p>Unloads a heavy vehicle</p>
            </div>
          </div>
          <h3>Case Study: Big Red, TT Trucking, and Supa Mart</h3>
          <p>Big Red manufactures tinned tomatoes and packs them on pallets to send to Supa Mart daily. They engage TT Trucking to collect loaded pallets each morning and deliver empty pallets each afternoon. Sometimes a Big Red employee loads the pallet and sometimes the driver does. Supa Mart has large depot operations with trucks arriving every half hour.</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>CoR Role</th>
                  <th>Big Red</th>
                  <th>TT Trucking</th>
                  <th>Supa Mart</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Operator</td><td>—</td><td>Yes</td><td>—</td></tr>
                <tr><td>Scheduler</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>Consignor</td><td>Yes</td><td>—</td><td>—</td></tr>
                <tr><td>Consignee</td><td>—</td><td>—</td><td>Yes</td></tr>
                <tr><td>Packer</td><td>Yes</td><td>—</td><td>—</td></tr>
                <tr><td>Loading Manager</td><td>—</td><td>—</td><td>Yes</td></tr>
                <tr><td>Loader</td><td>Yes</td><td>Yes</td><td>—</td></tr>
                <tr><td>Unloader</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-blue">
            <strong>Key Insight</strong>
            <p>All CoR parties have the same duty — the Primary Duty. How each of them discharges that duty will be different because each of them does different things and has different opportunities to eliminate or minimise risk.</p>
          </div>
        `
      },
      {
        id: "m2-l2",
        title: "The Primary Duty: What It Requires",
        duration: "12 min",
        keyPoints: [
          "The Primary Duty requires each CoR party to ensure, so far as reasonably practicable, the safety of their transport activities.",
          "It has two parts: a positive duty to apply risk management, and a prohibition against causing others to breach the HVNL.",
          "'Public risk' includes risks to persons, property, road infrastructure, and the environment.",
          "'Transport activities' is broadly defined and includes business practices, HR management, and board decisions.",
          "'Reasonably practicable' is assessed by weighing likelihood, harm, knowledge, availability of controls, and cost."
        ],
        content: `
          <h2>The Primary Duty: What It Requires</h2>
          <p>Section 26C of the HVNL sets out the Primary Duty. It requires each party in the CoR for a heavy vehicle to ensure, so far as is reasonably practicable, the safety of the party's transport activities relating to the vehicle.</p>
          <h3>Two Parts of the Primary Duty</h3>
          <p>The Primary Duty can be thought of as having two distinct parts:</p>
          <p><strong>Part 1 — The Positive Duty:</strong> To eliminate public risk so far as is reasonably practicable and, to the extent it is not reasonably practicable to eliminate public risk, to minimise it.</p>
          <p><strong>Part 2 — The Prohibition:</strong> Against conduct that could cause or encourage a driver to speed, or any person to breach the HVNL. This includes asking, directing, or requiring another person to do something, or entering into a contract that purports to annul or restrict the effect of the law.</p>
          <h3>What Is "Public Risk"?</h3>
          <p>The definition of "public risk" in the HVNL is broad and includes:</p>
          <ul>
            <li>Risks to the safety of persons or property</li>
            <li>Risks to the safety of drivers, passengers, and other persons in vehicles</li>
            <li>Risks to the safety of persons or property in or in the vicinity of road infrastructure and public places</li>
            <li>Risks to the safety of vehicles and combinations and any loads in them</li>
            <li>Risk of damage to road infrastructure</li>
            <li>Risk of harm to the environment</li>
          </ul>
          <h3>What Is "Reasonably Practicable"?</h3>
          <p>Doing what is "reasonably practicable" is the standard for complying with the Primary Duty. It requires weighing up all relevant matters, including:</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>What to Consider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Likelihood</strong></td>
                  <td>How often might the risk occur? Based on actual knowledge, experience, research, or statistics.</td>
                </tr>
                <tr>
                  <td><strong>Harm</strong></td>
                  <td>What could result from the hazardous incident? Always consider potential for death or injury.</td>
                </tr>
                <tr>
                  <td><strong>Knowledge</strong></td>
                  <td>What did the duty holder know or ought to have known about the risk and ways to remove it?</td>
                </tr>
                <tr>
                  <td><strong>Availability & Suitability</strong></td>
                  <td>Is the control available and suitable for the specific situation?</td>
                </tr>
                <tr>
                  <td><strong>Cost</strong></td>
                  <td>Cost may justify not implementing a control only where it is grossly disproportionate to the risk.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-amber">
            <strong>Cost Alone Is Not Enough</strong>
            <p>Cost may be the reason why a control is not reasonably practicable, but only where the cost is grossly disproportionate to the risk — i.e., the risk is very low and the cost is very high. Otherwise, cost alone is not a basis for concluding that a control measure is not reasonably practicable.</p>
          </div>
        `
      },
      {
        id: "m2-l3",
        title: "The Executive Duty and Due Diligence",
        duration: "10 min",
        keyPoints: [
          "An executive of a CoR party has a personal, non-delegable duty to exercise due diligence.",
          "Executives include directors, partners, and management members of unincorporated bodies.",
          "Due diligence means actively acquiring knowledge, understanding the business, and ensuring resources are provided.",
          "An executive can be convicted even if the business has not been proceeded against.",
          "Prohibited requests and contracts are a key compliance risk — never ask someone to do something that breaches the HVNL."
        ],
        content: `
          <h2>The Executive Duty and Due Diligence</h2>
          <p>Section 26D of the HVNL imposes a duty on executives of businesses that are parties in the CoR. An executive must exercise due diligence to ensure the business complies with its "safety duty". This is a <strong>personal, non-delegable duty</strong> — it cannot be passed to someone else.</p>
          <h3>Who Is an "Executive"?</h3>
          <p>For a corporation, an executive is a director or any person who is concerned with or takes part in the management of the corporation. For an unincorporated partnership, it is a partner. For an unincorporated body, it is a management member. The term is deliberately broad and captures anyone in a management role.</p>
          <h3>What Does "Due Diligence" Look Like?</h3>
          <p>The HVNL defines due diligence to include acquiring and keeping up-to-date knowledge of heavy vehicle safety matters, understanding the business's operations and the associated hazards and risks, ensuring appropriate resources and processes are available, and verifying that those processes are being used. In practice, this means:</p>
          <ul>
            <li>Attending seminars, conferences, webinars, and subscribing to industry updates</li>
            <li>Familiarising yourself with the full range of activities the business undertakes — talk to clients and employees, read reports and complaints, walk the floor</li>
            <li>Arranging for or taking part in regular risk assessments</li>
            <li>Reading and retaining copies of the hazard or risk register and proposed controls</li>
            <li>Providing funding to procure equipment, training, staff, or other resources that eliminate or minimise risks</li>
            <li>Implementing a schedule for implementing controls</li>
            <li>Verifying that controls are being implemented and are effective</li>
          </ul>
          <h3>Prohibited Requests and Contracts</h3>
          <p>A critical compliance risk for all CoR parties is the prohibition on making requests or entering contracts that cause or encourage a breach of the HVNL. This includes:</p>
          <ul>
            <li>Asking a driver to deliver within a timeframe that is only achievable by speeding</li>
            <li>Entering a contract that requires a driver to exceed their work hours</li>
            <li>Paying a driver in a way that incentivises unsafe behaviour (e.g., payment per kilometre with no consideration for rest time)</li>
            <li>Including contract terms that purport to exclude or limit HVNL obligations</li>
          </ul>
          <div class="callout callout-red">
            <strong>Personal Liability</strong>
            <p>An executive may be convicted of a breach of the Executive Duty even if the legal entity has not been proceeded against or convicted of an offence relating to the safety duty. This means executives cannot hide behind the corporate structure.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m2-q1",
        text: "A business that manages a depot where 7 heavy vehicles are loaded and unloaded each day holds which CoR role?",
        options: [
          "Operator",
          "Consignee",
          "Loading Manager",
          "Scheduler"
        ],
        correctIndex: 2,
        explanation: "A 'Loading Manager' is a party who manages premises where 5 or more heavy vehicles are loaded or unloaded each day. Since this depot handles 7 vehicles daily, the business is a Loading Manager."
      },
      {
        id: "m2-q2",
        text: "Which of the following best describes the 'prohibition' component of the Primary Duty?",
        options: [
          "Prohibiting heavy vehicles from operating at night",
          "Prohibiting conduct that could cause or encourage a driver to speed or any person to breach the HVNL",
          "Prohibiting the use of vehicles older than 10 years",
          "Prohibiting the transport of dangerous goods without a permit"
        ],
        correctIndex: 1,
        explanation: "The prohibition component of the Primary Duty is against conduct that could cause or encourage a driver to speed or any person to breach the HVNL. This includes making requests, giving directions, or entering contracts that have this effect."
      },
      {
        id: "m2-q3",
        text: "When assessing 'reasonably practicable', which factor alone is NOT sufficient to justify not implementing a control measure?",
        options: [
          "The control is not available in the market",
          "The control is unsuitable for the specific situation",
          "The cost of the control",
          "The risk is extremely unlikely to occur"
        ],
        correctIndex: 2,
        explanation: "Cost alone is not a basis for concluding that a control measure is not reasonably practicable. Cost may only justify not implementing a control where it is grossly disproportionate to the risk — i.e., the risk is very low AND the cost is very high."
      },
      {
        id: "m2-q4",
        text: "Can an executive be personally convicted of breaching the Executive Duty even if the company itself has not been charged?",
        options: [
          "No — the company must be convicted first before an executive can be charged",
          "Yes — the Executive Duty is a personal, non-delegable duty and executives can be convicted independently",
          "Only if the executive is also a director of the company",
          "Only in cases involving fatalities"
        ],
        correctIndex: 1,
        explanation: "Per s 26D(2), HVNL, an executive may be convicted of an offence even if the legal entity has not been proceeded against for or convicted of an offence relating to the safety duty. The Executive Duty is personal and non-delegable."
      }
    ]
  },
  {
    id: "module-3",
    number: 3,
    title: "Safety Risk Management",
    description: "Master the six-step risk management process that underpins the entire Master Code — from identifying hazards to reviewing the effectiveness of controls.",
    icon: "Shield",
    color: "#0F766E",
    lessons: [
      {
        id: "m3-l1",
        title: "Identifying Hazards and Assessing Risk",
        duration: "10 min",
        keyPoints: [
          "Hazard identification is the first step — you cannot manage what you have not identified.",
          "The Master Code identifies 12 categories of hazards across 60+ specific hazard types.",
          "Risk assessment considers both the likelihood of an event and the severity of its consequences.",
          "The Code does not categorise or evaluate different risks — that assessment is the duty holder's responsibility.",
          "Hazards include driver performance, vehicle condition, load restraint, organisational factors, and external/environmental factors."
        ],
        content: `
          <h2>Identifying Hazards and Assessing Risk</h2>
          <p>The foundation of the Master Code's approach to safety is systematic risk management. Before any controls can be selected or implemented, duty holders must first identify what hazards exist in their operations and assess the risks those hazards create.</p>
          <h3>The 12 Categories of Hazards</h3>
          <p>The Master Code identifies hazards across 12 broad categories. Understanding these categories helps ensure no significant hazard type is overlooked in your risk assessment process.</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Examples of Hazards</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>H1 – Hazards to drivers (non-crash)</td><td>Aggressive passengers, powerlines, equipment at loading premises, remote work</td></tr>
                <tr><td>H2 – Negligent or dangerous driving</td><td>Intentional speeding, drug/alcohol use, reckless driving, phone use while driving</td></tr>
                <tr><td>H3 – Driver skill and competence</td><td>Driver not current, competent, or supported to drive well; misjudging speed for conditions</td></tr>
                <tr><td>H4 – Driver performance or impairment</td><td>Fatigue, mental health, physical health, alcohol/drugs, distraction, monotony</td></tr>
                <tr><td>H5 – State or condition of vehicle</td><td>Poor maintenance, limited driver visibility, incompatible trailer systems, inappropriate vehicle for task</td></tr>
                <tr><td>H6 – Load restraint equipment</td><td>Inadequate lashings, poor attachment points, insufficient containment equipment</td></tr>
                <tr><td>H7 – Load restraint</td><td>Load not adequately restrained, poor packaging, loose items inside vehicle</td></tr>
                <tr><td>H8 – Nature of load</td><td>Hazardous contents, lithium-ion batteries in waste, environmental contaminants, exotic species</td></tr>
                <tr><td>H9 – Oversize loads</td><td>Over-dimension vehicle, overmass vehicle</td></tr>
                <tr><td>H10 – Loading/unloading premises</td><td>Traffic congestion, machinery hazards, bullying/harassment, untrained loaders</td></tr>
                <tr><td>H11 – Organisational/commercial hazards</td><td>Payment structures encouraging unsafe behaviour, inconsistent contract requirements, criminal infiltration</td></tr>
                <tr><td>H12 – External/environmental hazards</td><td>Other road users, poor road conditions, level crossings, natural disasters, steep descents</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Assessing Risk</h3>
          <p>Risk assessment is a two-part process. First, consider the possible outcome — what could go wrong? Then assess the likelihood of that outcome and the seriousness of the harm or damage that could be caused. The Code identifies 19 categories of potential consequences, ranging from loss of vehicle control causing fatality (C1) to introduction of invasive species (C17).</p>
          <div class="callout callout-blue">
            <strong>Your Responsibility</strong>
            <p>The Code does not attempt to categorise or evaluate different risks. That assessment must turn on specific circumstances and is the responsibility of the duty holder, who is better equipped to make the assessment based on their own operations.</p>
          </div>
        `
      },
      {
        id: "m3-l2",
        title: "Selecting and Implementing Control Measures",
        duration: "10 min",
        keyPoints: [
          "Controls should aim to eliminate risk first; if not practicable, minimise it.",
          "The hierarchy of controls applies: elimination > substitution > engineering controls > administrative controls > PPE.",
          "More effective controls are expected for the most serious risks.",
          "Multiple controls in combination generally produce better outcomes than a single control.",
          "Controls in the Code are written as directions (e.g., 'implement', 'establish') but are not mandatory — they must be assessed for suitability."
        ],
        content: `
          <h2>Selecting and Implementing Control Measures</h2>
          <p>Once hazards have been identified and risks assessed, the next step is to select appropriate control measures. The Master Code identifies controls across 45 activities, providing a comprehensive menu of options for duty holders to consider.</p>
          <h3>The Principle of Elimination First</h3>
          <p>The Primary Duty requires CoR parties to <em>eliminate</em> public risk so far as is reasonably practicable, and only where elimination is not reasonably practicable, to <em>minimise</em> it. This means the first question to ask about any risk is: can we stop doing the activity that creates this risk, or do it in a fundamentally different way?</p>
          <h3>Shared Responsibility for Controls</h3>
          <p>A key feature of the CoR framework is that more than one party will often be involved in undertaking any activity. It is rarely the responsibility of one party alone to implement all possible controls. When thinking about the activities you are doing, identify the controls which could or should be implemented by other businesses.</p>
          <p>If another party is implementing an effective control, you may not need to implement that control yourself. However, if you rely on that party to perform that action, you may also need to be satisfied that they do it consistently. An alternative approach is to implement your own controls, even if they are redundant, because it is easier to monitor and improve the actions of your own business than to rely on accurate information from another.</p>
          <div class="callout callout-amber">
            <strong>Controls Are Not Mandatory</strong>
            <p>Controls in the Code are written as directions (e.g., "implement", "establish", "develop", "maintain") for clarity and brevity. This drafting style should not be taken to mean that any control is a mandatory requirement. Parties are always expected to consider, assess, and evaluate all relevant matters before deciding to implement a control.</p>
          </div>
          <h3>Implementation and Training</h3>
          <p>Selecting a control is only the beginning. Controls must be properly implemented and the people responsible for carrying them out must be adequately trained. This includes ensuring that employees understand why the control exists, how to apply it correctly, and what to do when it is not working as intended.</p>
        `
      },
      {
        id: "m3-l3",
        title: "Monitoring, Reviewing, and Improving Controls",
        duration: "8 min",
        keyPoints: [
          "Controls must be monitored to verify they are working as intended.",
          "Monitoring includes audits, inspections, incident reporting, and data analysis.",
          "Reviews should be triggered by incidents, near misses, changes in operations, or on a regular schedule.",
          "Sharing information with other CoR parties improves the effectiveness of controls across the supply chain.",
          "The risk management process is cyclical — it never ends."
        ],
        content: `
          <h2>Monitoring, Reviewing, and Improving Controls</h2>
          <p>Implementing controls is not the end of the risk management process — it is the beginning of an ongoing cycle. Controls must be monitored to verify they are working as intended, and the entire risk management system must be regularly reviewed and improved.</p>
          <h3>Monitoring and Assurance</h3>
          <p>Monitoring involves collecting information about how controls are performing in practice. This can include formal audits and inspections, analysis of incident and near-miss reports, review of work diaries and fatigue records, vehicle telematics data, feedback from drivers and employees, and data from monitoring devices and safety systems.</p>
          <h3>When to Review</h3>
          <p>Reviews of the risk management system should be triggered by any of the following events:</p>
          <ul>
            <li>An incident, near miss, or dangerous occurrence</li>
            <li>A change in operations, routes, vehicles, or personnel</li>
            <li>A change in legislation or regulatory guidance</li>
            <li>Feedback from employees, contractors, or other CoR parties</li>
            <li>A regular scheduled review (at least annually for most businesses)</li>
          </ul>
          <h3>Sharing Information</h3>
          <p>One of the Foundation Activities in the Master Code is "Sharing Information" (Activity 9). Effective risk management across the supply chain requires CoR parties to share relevant safety information with each other. This includes information about hazards, incidents, near misses, and the effectiveness of controls. Businesses that share information proactively create a safer operating environment for everyone in the chain.</p>
          <div class="callout callout-blue">
            <strong>The Cyclical Nature of Risk Management</strong>
            <p>The risk management process is cyclical: Identify → Assess → Control → Implement → Monitor → Review → Identify again. As your operations change and as new hazards emerge, the process must be repeated. Safety is not a destination — it is an ongoing commitment.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m3-q1",
        text: "Which of the following is classified as an 'Organisational or Commercial Hazard' (H11) in the Master Code?",
        options: [
          "A driver who is impaired by fatigue",
          "A payment structure that incentivises unsafe driver behaviour",
          "A vehicle with poor maintenance",
          "Aggressive bus passengers"
        ],
        correctIndex: 1,
        explanation: "H11a specifically identifies 'Drivers are paid in a way which encourages unsafe behaviour' as an organisational/commercial hazard. This recognises that commercial arrangements and payment structures can create safety risks that are the responsibility of CoR parties to manage."
      },
      {
        id: "m3-q2",
        text: "When should a review of your risk management system be triggered?",
        options: [
          "Only after a serious incident or fatality",
          "Only when required by a regulator",
          "After incidents, near misses, operational changes, legislative changes, or on a regular schedule",
          "Once every five years as part of a formal audit"
        ],
        correctIndex: 2,
        explanation: "Reviews should be triggered by incidents, near misses, dangerous occurrences, changes in operations or legislation, feedback from stakeholders, and on a regular scheduled basis. Waiting only for serious incidents is insufficient to meet the Primary Duty."
      },
      {
        id: "m3-q3",
        text: "If another CoR party is already implementing an effective control, what is the best approach for your business?",
        options: [
          "You have no obligation to implement any controls since the other party has it covered",
          "You must implement all controls regardless of what others are doing",
          "Consider whether you need to implement the control yourself, and if you rely on the other party, verify they do it consistently",
          "Implement only controls that are unique to your role in the CoR"
        ],
        correctIndex: 2,
        explanation: "If another party is implementing an effective control, you may not need to implement that control yourself. However, if you rely on that party, you may also need to be satisfied that they do it consistently. An alternative is to implement your own controls even if redundant, as it is easier to monitor your own business."
      }
    ]
  },
  {
    id: "module-4",
    number: 4,
    title: "Foundation Activities",
    description: "Explore the 10 Foundation Activities that apply to all CoR parties — the building blocks of organisational safety capability.",
    icon: "Building2",
    color: "#7C3AED",
    lessons: [
      {
        id: "m4-l1",
        title: "Building Organisational Safety Capability",
        duration: "10 min",
        keyPoints: [
          "Safety capability is built through systems, culture, and competence.",
          "Activity 1 covers developing organisational safety capability.",
          "Activity 2 requires executives to understand the business's transport activities.",
          "Activity 3 covers establishing policies and procedures.",
          "Safety capability looks different depending on the scale of the business."
        ],
        content: `
          <h2>Building Organisational Safety Capability</h2>
          <p>The Foundation Activities are relevant to all businesses and organisations that are parties in the CoR, regardless of what transport activities are being undertaken. They describe the way that safety is embedded in everything a business does, long before a driver gets into or a load gets onto a heavy vehicle.</p>
          <h3>Activity 1: Developing Organisational Safety Capability</h3>
          <p>Safety capability is a product of an organisation's engagement with safety as a foundational element of how work is performed. It is built by implementing systems to ensure safety, establishing a culture of safety leadership and teamwork, and investing in skills and training to develop workforce competence. Systems, culture, and competence are recurring themes throughout the Master Code.</p>
          <p>Key controls include: establishing a safety management system appropriate to the scale and complexity of the business; appointing a person with responsibility for safety management; ensuring safety is a standing agenda item at management meetings; and conducting regular safety reviews.</p>
          <h3>Activity 2: Ensuring Executives Understand the Business</h3>
          <p>Executives must understand the full range of transport activities the business undertakes. This is not merely a legal requirement — it is a practical necessity for effective risk management. Controls include: executives regularly reviewing safety performance data; participating in site visits and driver briefings; and reviewing incident reports and near-miss data.</p>
          <h3>Activity 3: Establishing Policies and Procedures</h3>
          <p>Policies and procedures are the documented expression of how a business manages safety. They must be current, accessible, and understood by all relevant employees. Controls include: developing a suite of safety policies covering all relevant transport activities; ensuring procedures are written in plain language; and reviewing policies when operations change or incidents occur.</p>
          <div class="callout callout-blue">
            <strong>Scale Matters</strong>
            <p>Mature safety capability may look different depending on the scale of the business. A large business may develop safety capability as a formal program with dedicated resources. A smaller business may foster safety capability in less formal ways but may be equally effective. The key is that safety is genuinely embedded in how work is done.</p>
          </div>
        `
      },
      {
        id: "m4-l2",
        title: "Recruiting, Training, and Managing Fitness to Work",
        duration: "12 min",
        keyPoints: [
          "Activity 4 covers recruiting and employing all employees (not just drivers).",
          "Activity 5 covers training employees — a critical control for all CoR parties.",
          "Activity 6 covers managing fitness to work, including fatigue, health, and substance use.",
          "Training must be relevant, documented, and regularly refreshed.",
          "Fitness to work policies must address both physical and mental health."
        ],
        content: `
          <h2>Recruiting, Training, and Managing Fitness to Work</h2>
          <h3>Activity 4: Recruiting and Employing All Employees</h3>
          <p>The recruitment and employment process is a critical control point. Controls include: conducting reference checks and verifying qualifications; ensuring employment contracts include safety obligations; providing a comprehensive induction that covers safety responsibilities; and establishing clear performance expectations related to safety.</p>
          <h3>Activity 5: Training Employees</h3>
          <p>Training is one of the most important controls available to CoR parties. It ensures that employees understand the hazards and risks associated with their work, know how to apply the controls that have been put in place, and can identify when something is going wrong. Key controls include:</p>
          <ul>
            <li>Conducting a training needs analysis to identify gaps</li>
            <li>Providing induction training for all new employees</li>
            <li>Providing role-specific training for all employees who perform CoR functions</li>
            <li>Refreshing training regularly and when operations change</li>
            <li>Maintaining records of all training completed</li>
            <li>Assessing competency, not just attendance</li>
          </ul>
          <h3>Activity 6: Managing Fitness to Work</h3>
          <p>Fitness to work encompasses physical health, mental health, fatigue, and the effects of alcohol and other drugs. A comprehensive fitness to work program includes: pre-employment health assessments; ongoing health monitoring; fatigue management policies; drug and alcohol testing programs; and support for employees with health conditions. The program must address both the employer's obligations and the employee's own responsibility to present for work fit and ready.</p>
          <div class="callout callout-amber">
            <strong>Mental Health Is a Safety Issue</strong>
            <p>The 2026 Master Code explicitly recognises mental health as a fitness to work issue. Stress, anxiety, depression, and other mental health conditions can impair a driver's focus, decision-making, and reaction times just as significantly as physical illness or fatigue. Businesses must have policies and support mechanisms in place to address mental health in the workplace.</p>
          </div>
        `
      },
      {
        id: "m4-l3",
        title: "Working with Other Businesses, Monitoring, and Sharing Information",
        duration: "10 min",
        keyPoints: [
          "Activity 7 covers working with other businesses — a critical control for managing shared risks.",
          "Activity 8 covers monitoring and assurance — verifying that controls are working.",
          "Activity 9 covers sharing information — proactively communicating safety-relevant information.",
          "Activity 10 covers making agreements — ensuring contracts support rather than undermine safety.",
          "Prohibited contract terms include any provision that purports to annul or restrict the effect of the HVNL."
        ],
        content: `
          <h2>Working with Other Businesses, Monitoring, and Sharing Information</h2>
          <h3>Activity 7: Working with Other Businesses</h3>
          <p>Most transport operations involve multiple businesses working together. Managing the interfaces between businesses is a critical control. Key controls include: conducting due diligence on business partners before engaging them; including safety requirements in contracts; conducting joint risk assessments for shared activities; and establishing clear communication channels for safety-relevant information.</p>
          <h3>Activity 8: Monitoring and Assurance</h3>
          <p>Monitoring involves collecting and analysing data to verify that controls are working as intended. This includes formal audits, inspections, review of incident data, analysis of telematics and monitoring device data, and feedback from employees and contractors. Assurance activities should be documented and their findings acted upon.</p>
          <h3>Activity 9: Sharing Information</h3>
          <p>Proactive information sharing is a hallmark of a mature safety culture. Controls include: establishing systems for sharing safety-relevant information with business partners; participating in industry safety forums and networks; reporting incidents and near misses to relevant parties; and sharing the results of risk assessments and audits with other CoR parties where relevant.</p>
          <h3>Activity 10: Making Agreements</h3>
          <p>Contracts and agreements are powerful tools for embedding safety requirements across the supply chain. Key controls include: including safety obligations in all contracts with CoR parties; ensuring contracts do not include terms that could cause or encourage a breach of the HVNL; reviewing contracts regularly to ensure they remain current; and including mechanisms for addressing safety issues that arise during the contract term.</p>
          <div class="callout callout-red">
            <strong>Prohibited Contract Terms</strong>
            <p>Any contract term that purports to annul, exclude, restrict, or otherwise change the effect of the HVNL is prohibited. This includes terms that attempt to transfer liability for HVNL breaches, terms that require a driver to exceed work hours, and terms that set delivery timeframes that are only achievable by speeding.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m4-q1",
        text: "Which of the following is NOT a component of 'organisational safety capability' as described in the Master Code?",
        options: [
          "Systems to ensure safety",
          "A culture of safety leadership and teamwork",
          "Investment in skills and training",
          "A dedicated safety officer in every business regardless of size"
        ],
        correctIndex: 3,
        explanation: "Organisational safety capability is built through systems, culture, and competence. The Code recognises that safety capability looks different depending on the scale of the business. A dedicated safety officer is one possible control but is not a universal requirement — smaller businesses may achieve the same outcome through less formal means."
      },
      {
        id: "m4-q2",
        text: "When assessing employee training, what is more important than attendance at a training session?",
        options: [
          "The cost of the training program",
          "The duration of the training session",
          "Assessing competency — verifying that the employee can actually apply what they have learned",
          "Whether the training was delivered by a registered training organisation"
        ],
        correctIndex: 2,
        explanation: "The Master Code emphasises assessing competency, not just attendance. A training record showing attendance is insufficient if the employee cannot demonstrate that they can apply the knowledge and skills in practice. Competency assessment is a key control."
      },
      {
        id: "m4-q3",
        text: "A transport company includes a clause in its driver contracts stating that the driver accepts full responsibility for any HVNL breaches. Is this clause valid?",
        options: [
          "Yes — the driver is the one operating the vehicle so they should bear responsibility",
          "Yes — contracts can allocate responsibility however the parties agree",
          "No — any contract term that purports to annul or restrict the effect of the HVNL is prohibited",
          "Only valid if the driver is an owner-driver rather than an employee"
        ],
        correctIndex: 2,
        explanation: "Per s 26C(3)(b), HVNL, the prohibition on causing or encouraging HVNL breaches includes entering into a contract that purports to annul, exclude, restrict, or otherwise change the effect of the law. A clause attempting to transfer HVNL liability to a driver is prohibited and has no legal effect."
      }
    ]
  },
  {
    id: "module-5",
    number: 5,
    title: "Managing Drivers",
    description: "Deep dive into the controls for recruiting, training, and managing heavy vehicle drivers — covering health, fatigue, distraction, and equipping drivers for safe operations.",
    icon: "Truck",
    color: "#B45309",
    lessons: [
      {
        id: "m5-l1",
        title: "Recruiting, Employing, and Training Drivers",
        duration: "10 min",
        keyPoints: [
          "Activity 11 covers recruiting and employing heavy vehicle drivers specifically.",
          "Activity 15 covers training drivers — including induction, ongoing training, and competency assessment.",
          "Driver recruitment must verify licences, experience, and fitness to drive.",
          "Training must cover the specific vehicle, route, load type, and relevant regulations.",
          "Activity 16 covers equipping drivers with the information, tools, and PPE they need."
        ],
        content: `
          <h2>Recruiting, Employing, and Training Drivers</h2>
          <h3>Activity 11: Recruiting and Employing Heavy Vehicle Drivers</h3>
          <p>The recruitment process for heavy vehicle drivers must be thorough. Controls include: verifying that the driver holds the correct class of licence for the vehicle to be driven; conducting reference checks with previous employers; verifying that the driver has no relevant disqualifications or conditions on their licence; conducting a pre-employment medical assessment using the Austroads Assessing Fitness to Drive (AFTD) Standards; and conducting a pre-employment drug and alcohol test.</p>
          <h3>Activity 15: Training Drivers</h3>
          <p>Driver training is one of the most important controls available. It must be tailored to the specific role, vehicle, and operating environment. Key controls include:</p>
          <ul>
            <li>Providing a comprehensive induction covering the vehicle, routes, load types, and safety procedures</li>
            <li>Providing training on fatigue management, including how to complete a fatigue self-assessment</li>
            <li>Providing training on load restraint relevant to the loads the driver will carry</li>
            <li>Providing training on the use of monitoring devices and safety systems fitted to the vehicle</li>
            <li>Providing training on emergency procedures</li>
            <li>Assessing competency before allowing a driver to operate unsupervised</li>
            <li>Refreshing training regularly and when operations change</li>
          </ul>
          <h3>Activity 16: Equipping Drivers</h3>
          <p>Drivers must be equipped with everything they need to perform their work safely. This includes: providing drivers with information about the load, the route, and any known hazards; ensuring drivers have access to load restraint equipment appropriate for the load; providing personal protective equipment (PPE) appropriate for the tasks the driver will perform; and ensuring drivers have access to communication equipment suitable for the areas they will be operating in.</p>
        `
      },
      {
        id: "m5-l2",
        title: "Managing Driver Health and Fatigue",
        duration: "15 min",
        keyPoints: [
          "Activity 12 covers managing driver health — physical and mental.",
          "Activity 13 covers managing driver fatigue — one of the most critical controls in the Code.",
          "The Primary Duty applies to all heavy vehicles, not just fatigue-regulated heavy vehicles (FRHVs).",
          "Fatigue management requires a combination of controls — no single control is sufficient.",
          "Non-driving work and non-work activities must also be considered when assessing fatigue risk."
        ],
        content: `
          <h2>Managing Driver Health and Fatigue</h2>
          <h3>Activity 12: Managing Driver Health</h3>
          <p>Driver health management encompasses both physical and mental health. Key controls include: conducting regular fitness to drive assessments using the AFTD Standards; identifying an appropriate medical practitioner experienced with the AFTD Standards; including contract terms requiring drivers to provide authority for their employer to obtain condition management advice from their medical practitioner; and providing time for health and fitness assessments, counselling, and support.</p>
          <h3>Activity 13: Managing Driver Fatigue</h3>
          <p>Fatigue is a factor in a significant proportion of heavy vehicle accidents and near misses. Managing fatigue is rightly recognised as one of the most important measures for reducing public risk. The Master Code's approach to fatigue management goes beyond mere compliance with Chapter 6 of the HVNL (which sets out work and rest hour requirements for fatigue-regulated heavy vehicles).</p>
          <div class="callout callout-amber">
            <strong>Chapter 6 Compliance Is Not Enough</strong>
            <p>Meeting the requirements of Chapter 6 of the HVNL is not a guarantee of compliance with the Primary Duty. The Primary Duty is a broader overarching duty that applies to all heavy vehicles and requires a risk management approach. A business can be complying with Chapter 6 while still failing to discharge its Primary Duty — for example, by failing to account for the cumulative effects of fatigue from non-driving work or volunteer activities.</p>
          </div>
          <p>Key controls for fatigue management include:</p>
          <ul>
            <li>Assessing the operational capacity of the business before committing to undertake activities</li>
            <li>Maintaining a register of relief drivers who can replace a fatigued driver</li>
            <li>Choosing business partners who implement measures to minimise delays</li>
            <li>Implementing rosters that provide consistent and predictable work and rest schedules</li>
            <li>Identifying non-driving work, other employment, and lifestyle factors that contribute to fatigue</li>
            <li>Implementing a process to assess a driver's fatigue level at multiple points during their work period</li>
            <li>Using fatigue and distraction detection technology (FDDT) for elevated-risk operations</li>
          </ul>
          <h3>Non-Driving Work and Fatigue</h3>
          <p>The HVNL definition of "work" recognises that non-driving work can also contribute to fatigue. Tasks such as loading, unloading, pre- and post-trip vehicle checks, completing paperwork, and attending to passengers all count as work time for fatigue-regulated heavy vehicle drivers. These tasks also contribute to the fatigue of drivers of non-FRHVs and must be accounted for in driver rosters and schedules.</p>
        `
      },
      {
        id: "m5-l3",
        title: "Managing Distraction, Inattention, and Monitoring Devices",
        duration: "8 min",
        keyPoints: [
          "Activity 14 covers managing distraction and inattention — a growing road safety concern.",
          "Activity 17 covers using monitoring devices and safety systems.",
          "Distraction includes phone use, in-cab technology, and interactions with passengers or load.",
          "Monitoring devices include telematics, FDDT, dashcams, and electronic work diaries.",
          "Data from monitoring devices must be actively used to manage safety — not just collected."
        ],
        content: `
          <h2>Managing Distraction, Inattention, and Monitoring Devices</h2>
          <h3>Activity 14: Managing Distraction and Inattention</h3>
          <p>Driver distraction and inattention are significant contributors to heavy vehicle crashes. Sources of distraction include mobile phone use (even hands-free), in-cab technology such as navigation systems and communication devices, interactions with passengers, and tasks associated with the load. Key controls include: implementing a mobile phone policy that prohibits hand-held phone use and limits hands-free use; ensuring in-cab technology is designed and positioned to minimise distraction; providing training on the risks of distraction; and monitoring compliance with distraction policies.</p>
          <h3>Activity 17: Using Monitoring Devices and Safety Systems</h3>
          <p>Technology plays an increasingly important role in heavy vehicle safety management. Monitoring devices and safety systems include telematics systems, fatigue and distraction detection technology (FDDT), dashcams, electronic work diaries (EWDs), lane departure warning systems, automatic emergency braking, and stability control systems.</p>
          <p>Key controls include: selecting monitoring devices and safety systems appropriate for the vehicle and operating environment; ensuring devices are correctly installed and maintained; training drivers and managers in the use of devices and the interpretation of data; actively using data from monitoring devices to manage safety — not just collecting it; and having a clear policy on how data will be used and who has access to it.</p>
          <div class="callout callout-blue">
            <strong>Data Must Be Used</strong>
            <p>Installing monitoring devices is not sufficient on its own. The data generated by those devices must be actively reviewed and used to manage safety. A business that installs telematics but never reviews the data is not discharging its Primary Duty — it is simply creating a false sense of security.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m5-q1",
        text: "A driver works a full day driving a heavy vehicle, then spends 2 hours loading the vehicle for the next day's run. How should this loading time be treated?",
        options: [
          "It does not count as work time since the driver is not driving",
          "It counts as work time and must be included in fatigue risk assessments",
          "It only counts as work time if the vehicle is a fatigue-regulated heavy vehicle",
          "It is the driver's own responsibility to manage, not the employer's"
        ],
        correctIndex: 1,
        explanation: "The HVNL definition of 'work' includes loading, unloading, and load restraint activities. This time counts as work time for fatigue-regulated heavy vehicle drivers and must be included in fatigue risk assessments. It also contributes to the fatigue of drivers of non-FRHVs and must be accounted for in rosters and schedules."
      },
      {
        id: "m5-q2",
        text: "A transport company installs fatigue detection technology in all its vehicles but never reviews the data generated. Does this satisfy the Primary Duty?",
        options: [
          "Yes — installing the technology demonstrates a commitment to safety",
          "Yes — the technology itself prevents fatigue incidents from occurring",
          "No — data from monitoring devices must be actively reviewed and used to manage safety",
          "Only if the technology is approved by the NHVR"
        ],
        correctIndex: 2,
        explanation: "Installing monitoring devices is not sufficient on its own. The data generated must be actively reviewed and used to manage safety. A business that installs telematics or FDDT but never reviews the data is not discharging its Primary Duty — it is creating a false sense of security."
      },
      {
        id: "m5-q3",
        text: "Which of the following is a key difference between the Chapter 6 HVNL fatigue obligations and the Primary Duty fatigue obligations?",
        options: [
          "Chapter 6 applies to all heavy vehicles; the Primary Duty only applies to fatigue-regulated heavy vehicles",
          "The Primary Duty applies to all heavy vehicles and requires a risk management approach; Chapter 6 applies only to fatigue-regulated heavy vehicles and sets prescriptive work/rest hours",
          "They are essentially the same obligation expressed in different ways",
          "The Primary Duty only applies to employers; Chapter 6 applies to all CoR parties"
        ],
        correctIndex: 1,
        explanation: "Chapter 6 of the HVNL creates prescriptive work and rest hour requirements that apply specifically to drivers of fatigue-regulated heavy vehicles (FRHVs). The Primary Duty is broader — it applies to all heavy vehicles and requires a risk management approach. Meeting Chapter 6 obligations is not a guarantee of compliance with the Primary Duty."
      }
    ]
  },
  {
    id: "module-6",
    number: 6,
    title: "Vehicles, Equipment & Premises",
    description: "Understand the controls for vehicle procurement, maintenance, modification, and the design and management of loading and unloading premises.",
    icon: "Wrench",
    color: "#0369A1",
    lessons: [
      {
        id: "m6-l1",
        title: "Vehicle Procurement, Maintenance, and Modification",
        duration: "10 min",
        keyPoints: [
          "Activity 18 covers vehicle procurement and fleet management.",
          "Activity 19 covers maintaining vehicles and equipment.",
          "Activity 20 covers equipping and modifying vehicles.",
          "Vehicles must be appropriate for the task — not just roadworthy.",
          "Modifications must not compromise vehicle safety or compliance with vehicle standards."
        ],
        content: `
          <h2>Vehicle Procurement, Maintenance, and Modification</h2>
          <h3>Activity 18: Vehicle Procurement and Fleet Management</h3>
          <p>The decision to purchase or lease a vehicle is a critical safety decision. Controls include: selecting vehicles that are appropriate for the intended transport task, including the type of load, the routes to be travelled, and the operating environment; ensuring vehicles meet relevant vehicle standards; considering the safety features available and selecting vehicles with appropriate safety technology; and establishing a fleet management system that tracks vehicle age, condition, and maintenance history.</p>
          <h3>Activity 19: Maintaining Vehicles and Equipment</h3>
          <p>Vehicle maintenance is a fundamental control for managing the risk of vehicle defects. Key controls include: implementing a maintenance schedule based on OEM recommendations and the vehicle's operating conditions; conducting pre-trip and post-trip vehicle inspections; maintaining records of all maintenance and repairs; ensuring that defects identified during inspections are repaired before the vehicle is used; and establishing a system for drivers to report defects.</p>
          <h3>Activity 20: Equipping and Modifying Vehicles</h3>
          <p>Vehicles must be equipped with the safety systems, load restraint equipment, and other equipment necessary for the transport task. Modifications to vehicles must be carefully managed to ensure they do not compromise safety or compliance with vehicle standards. Key controls include: ensuring any modification is approved by a qualified engineer; ensuring modifications are documented and recorded; and ensuring that modified vehicles are re-inspected before use.</p>
          <div class="callout callout-amber">
            <strong>Compatibility Between Prime Movers and Trailers</strong>
            <p>The Master Code specifically identifies incompatibility between prime movers and trailers as a hazard (H5g). Before coupling a prime mover and trailer, ensure that the combination is safe and that the safety systems of both units are compatible and functioning correctly.</p>
          </div>
        `
      },
      {
        id: "m6-l2",
        title: "Designing and Managing Loading/Unloading Premises",
        duration: "10 min",
        keyPoints: [
          "Activity 21 covers the design and characteristics of loading/unloading premises.",
          "Activity 22 covers managing loading and unloading premises on an ongoing basis.",
          "Premises design must consider traffic flow, pedestrian safety, and vehicle manoeuvring.",
          "Loading managers must implement systems to manage queuing, delays, and driver welfare.",
          "Premises managers must share information with other CoR parties about vehicle movements and delays."
        ],
        content: `
          <h2>Designing and Managing Loading/Unloading Premises</h2>
          <h3>Activity 21: Design and Characteristics of Loading/Unloading Premises</h3>
          <p>The physical design of loading and unloading premises has a significant impact on safety. Controls include: designing premises to separate pedestrians and vehicles; providing adequate space for vehicles to manoeuvre safely; ensuring adequate lighting; providing driver amenities including toilets, rest areas, and drinking water; and designing loading docks to minimise the risk of falls and vehicle runaway.</p>
          <h3>Activity 22: Managing Loading and Unloading Premises</h3>
          <p>Ongoing management of premises is as important as their initial design. Key controls include:</p>
          <ul>
            <li>Implementing a timeslot booking system to manage vehicle arrivals and reduce queuing</li>
            <li>Rostering sufficient employees to load or unload vehicles within planned timeframes</li>
            <li>Monitoring average waiting and loading/unloading times and sharing this information with other CoR parties</li>
            <li>Implementing a queuing system that allows drivers to park and rest while waiting</li>
            <li>Providing real-time updates about delays to drivers and schedulers</li>
            <li>Implementing a system for communicating with drivers about delays and changes</li>
            <li>Including targeted truck turnaround times in agreements with CoR parties</li>
          </ul>
          <div class="callout callout-blue">
            <strong>Delays Create Fatigue Risk</strong>
            <p>Excessive waiting times at loading and unloading premises are a significant contributor to driver fatigue. When drivers are delayed, they may feel pressure to make up time by driving faster or skipping rest breaks. Loading managers have a responsibility to minimise delays and to communicate delays to drivers and schedulers as early as possible so that schedules can be adjusted.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m6-q1",
        text: "A loading manager notices that average truck waiting times at their premises have increased to 3 hours over the past month. What should they do?",
        options: [
          "Nothing — waiting times are a normal part of transport operations",
          "Adjust scheduling or staffing, share the information with other CoR parties, and implement a queuing system that allows drivers to rest while waiting",
          "Simply inform drivers that delays are expected",
          "Reduce the number of trucks permitted to enter the premises each day"
        ],
        correctIndex: 1,
        explanation: "Activity 22 requires loading managers to monitor average waiting and loading/unloading times, share this information with other CoR parties, adjust scheduling or staffing when turnaround times exceed targets, and implement queuing systems that allow drivers to rest while waiting. Excessive delays create fatigue risk and must be actively managed."
      },
      {
        id: "m6-q2",
        text: "Before coupling a prime mover and trailer, what specific hazard should be checked?",
        options: [
          "Whether the trailer has been recently painted",
          "Whether the safety systems of the prime mover and trailer are compatible and functioning correctly",
          "Whether the trailer is the same brand as the prime mover",
          "Whether the trailer is less than 5 years old"
        ],
        correctIndex: 1,
        explanation: "The Master Code specifically identifies incompatibility between prime movers and trailers as a hazard (H5g). Before coupling, it is essential to ensure that the combination is safe and that the safety systems of both units are compatible and functioning correctly."
      }
    ]
  },
  {
    id: "module-7",
    number: 7,
    title: "Operations and Journey Planning",
    description: "Learn the controls for arranging transport, journey planning, scheduling, route selection, and driver allocation that ensure safe operations from start to finish.",
    icon: "Map",
    color: "#065F46",
    lessons: [
      {
        id: "m7-l1",
        title: "Arranging Transport and Journey Planning",
        duration: "12 min",
        keyPoints: [
          "Activity 23 covers arranging for the transport of goods.",
          "Activity 25 covers allocating a driver to a driving task.",
          "Activity 26 covers scheduling transport tasks.",
          "Activity 27 covers route planning and selection.",
          "Journey planning decisions made before a journey begins are fundamental to safety."
        ],
        content: `
          <h2>Arranging Transport and Journey Planning</h2>
          <h3>Activity 23: Arranging for the Transport of Goods</h3>
          <p>The consignor plays a critical role in ensuring safe transport by providing accurate and complete information to the transporter. Controls include: establishing the mass and dimensions of the goods; providing the transporter with mass, dimension, and load information; providing information about pickup and delivery locations; ensuring a suitable vehicle is used; and arranging pickup and delivery times according to the capacity of the premises.</p>
          <h3>Activity 25: Allocating a Driver to a Driving Task</h3>
          <p>Driver allocation is distinct from employing a driver long term. This activity focuses on choosing the right driver for a specific task. Controls fall into three categories — fitness to work, competency, and information. Key controls include: obtaining information about the driver's licensing, skills, and experience; confirming the details of the transport task; assessing the driver's present and anticipated level of fatigue; and ensuring the driver has all relevant information about the task, route, and load.</p>
          <h3>Activity 26: Scheduling Transport Tasks</h3>
          <p>Scheduling is one of the most important controls for managing driver fatigue. A scheduler who sets unrealistic delivery timeframes is creating conditions for fatigue, speeding, and other unsafe behaviours. Key controls include: assessing the operational capacity of the business before committing to transport tasks; building in adequate time for rest breaks, loading and unloading, and contingencies; avoiding scheduling patterns that create cumulative fatigue; and communicating schedule changes to drivers as early as possible.</p>
          <h3>Activity 27: Route Planning and Selection</h3>
          <p>Route selection has a significant impact on safety. Controls include: identifying routes that are appropriate for the vehicle's dimensions and mass; identifying known hazards on the route (e.g., low bridges, level crossings, steep descents); considering the impact of weather and seasonal conditions; and providing drivers with route information in advance.</p>
        `
      },
      {
        id: "m7-l2",
        title: "Loads, Loading, Unloading, and Mass Management",
        duration: "12 min",
        keyPoints: [
          "Activities 30–36 cover the full lifecycle of load management.",
          "Activity 31 covers loading; Activity 32 covers restraining loads.",
          "The Load Restraint Guide 2025 is the key technical reference for load restraint.",
          "Activities 34 and 35 cover measuring, communicating, and monitoring mass and dimension.",
          "Overmass and over-dimension vehicles are a significant source of public risk."
        ],
        content: `
          <h2>Loads, Loading, Unloading, and Mass Management</h2>
          <h3>Activities 30–33: Manufacturing, Loading, Restraining, and Unloading</h3>
          <p>The safe handling of loads is a shared responsibility across multiple CoR parties. The packer, loader, and transporter all have roles to play. Key controls include: developing loading plans that ensure goods are appropriately distributed and properly restrained; using load restraint equipment rated and appropriate for the task; following the Load Restraint Guide 2025 for technical guidance; documenting the loading process with photographs; and ensuring that the remainder of the load is adequately restrained after partial delivery.</p>
          <h3>Activities 34–35: Mass and Dimension Management</h3>
          <p>Overmass and over-dimension vehicles are a significant source of public risk — they can damage road infrastructure, cause loss of vehicle control, and create hazards for other road users. Key controls include: weighing loads on calibrated scales before transport; calculating mass based on manufacturer information and packing materials; using vehicles fitted with on-board mass measuring equipment; communicating mass and dimension information to all relevant CoR parties; and monitoring mass throughout the journey.</p>
          <div class="callout callout-blue">
            <strong>Load Restraint Guide 2025</strong>
            <p>The Load Restraint Guide 2025 is the key technical reference for load restraint in Australia. It provides detailed diagrams, worked examples, and technical specifications for restraining a wide range of load types. All businesses involved in loading or transporting goods should have access to and be familiar with the current edition of this guide.</p>
          </div>
          <h3>Activity 36: Operating a Weighbridge</h3>
          <p>Weighbridges are a critical tool for mass management. Controls include: ensuring weighbridges are calibrated and maintained in accordance with relevant standards; ensuring weighbridge operators are trained and competent; providing mass information to drivers and other CoR parties; and using weighbridge data to identify and address patterns of overmass vehicles.</p>
        `
      }
    ],
    quiz: [
      {
        id: "m7-q1",
        text: "A scheduler sets a delivery timeframe that can only be achieved if the driver exceeds the speed limit. Which HVNL duty does this breach?",
        options: [
          "Only the driver's duty — the scheduler is not responsible for how the driver drives",
          "The Primary Duty's prohibition component — the scheduler's conduct is causing or encouraging the driver to speed",
          "Only the Executive Duty — this is a management decision",
          "No duty — the driver can choose not to speed"
        ],
        correctIndex: 1,
        explanation: "The prohibition component of the Primary Duty (s 26C(2)(b)) prohibits conduct that directly or indirectly causes or encourages the driver to exceed a speed limit. A scheduler who sets an unrealistic delivery timeframe is breaching this prohibition, regardless of whether the driver actually speeds."
      },
      {
        id: "m7-q2",
        text: "After a partial delivery, the remaining load is not re-restrained. Which hazard category does this fall under?",
        options: [
          "H5 – State or condition of vehicle",
          "H7 – Load restraint",
          "H8 – Nature of load",
          "H10 – Loading and unloading premises"
        ],
        correctIndex: 1,
        explanation: "H7c specifically identifies 'Remainder of load not adequately restrained after partial delivery' as a load restraint hazard. Activity 32 (Restraining loads) includes a control requiring that the remainder of the load be adequately restrained after each delivery."
      }
    ]
  },
  {
    id: "module-8",
    number: 8,
    title: "Sector-Specific Controls",
    description: "Explore the additional controls that apply to specific sectors including livestock transport, online freight platforms, construction sites, recovery operations, dangerous goods, and shipping containers.",
    icon: "Layers",
    color: "#9D174D",
    lessons: [
      {
        id: "m8-l1",
        title: "Livestock, Freight Platforms, and Construction Sites",
        duration: "10 min",
        keyPoints: [
          "Activity 37 covers arranging for the collection and transport of livestock.",
          "Activity 38 covers running an online freight platform.",
          "Activity 39 covers operating on and around construction sites.",
          "Livestock transport involves unique welfare and safety considerations.",
          "Online freight platforms have CoR obligations even though they do not directly operate vehicles."
        ],
        content: `
          <h2>Livestock, Freight Platforms, and Construction Sites</h2>
          <h3>Activity 37: Arranging for the Collection and Transport of Livestock</h3>
          <p>Livestock transport involves unique hazards including animal welfare, biosecurity, and the unpredictable behaviour of animals during loading and unloading. Key controls include: ensuring drivers are trained in the Land Transport Standards and Guidelines (LTSG) for livestock; ensuring vehicles are appropriate for the species and number of animals being transported; implementing biosecurity procedures to prevent the spread of disease; and ensuring animals are fit for transport before loading.</p>
          <h3>Activity 38: Running an Online Freight Platform</h3>
          <p>Online freight platforms that connect shippers with carriers have CoR obligations even though they do not directly operate vehicles. Controls include: verifying that carriers listed on the platform hold appropriate licences and accreditations; providing safety information to users of the platform; including safety requirements in the platform's terms of service; and monitoring the safety performance of carriers using the platform.</p>
          <h3>Activity 39: Operating on and Around Construction Sites</h3>
          <p>Construction sites present unique hazards for heavy vehicle operations, including congestion, restricted access, proximity to workers on foot, and the presence of plant and equipment. Key controls include: conducting a site-specific risk assessment before commencing operations; ensuring drivers have completed a site induction; providing mass and dimension measuring equipment for incoming and outgoing vehicles; and empowering workers to take action to rectify hazards before a vehicle drives onto a road.</p>
        `
      },
      {
        id: "m8-l2",
        title: "Recovery Operations, Dangerous Goods, and Shipping Containers",
        duration: "12 min",
        keyPoints: [
          "Activity 40 covers recovery vehicles and operations.",
          "Activity 41 covers transporting dangerous goods or explosives.",
          "Activities 42–45 cover packing, importing, transporting, and managing shipping containers.",
          "Recovery operations involve proximity to moving traffic and urgency-driven pressure to take risks.",
          "Dangerous goods transport requires compliance with the ADG Code plus additional risk management."
        ],
        content: `
          <h2>Recovery Operations, Dangerous Goods, and Shipping Containers</h2>
          <h3>Activity 40: Recovery Vehicles and Operations</h3>
          <p>Recovery of broken down or crashed vehicles presents unique hazards including proximity to moving traffic, space restriction, and hours of work. The element of urgency in recovery operations increases the inducement to speed or fail to manage fatigue effectively. Key controls include: deploying truck-mounted crash attenuators to create separation between recovery operations and other traffic; establishing exclusion zones; undertaking recovery operations only when it is safe to do so; and choosing a different time to recover a vehicle if immediate recovery is unsafe.</p>
          <h3>Activity 41: Transporting Dangerous Goods or Explosives</h3>
          <p>The presence of dangerous goods significantly alters the risk profile of the transport task. Compliance with the Australian Dangerous Goods Code (ADG Code) or the Australian Code for the Transport of Explosives is essential but may not be sufficient to fulfil the Primary Duty. Key controls include: verifying compliance with the ADG Code; providing emergency equipment in the vehicle; ensuring all employees are adequately trained; and ensuring drivers are trained in emergency response procedures.</p>
          <h3>Activities 42–45: Shipping Containers</h3>
          <p>Shipping containers present unique challenges because hazards are not visible once a container has been packed. For imported containers, the challenge is compounded by the fact that overseas businesses are not bound by the HVNL. Key controls include: developing a loading plan for each container; documenting the loading process with photographs; verifying the gross mass of the loaded container; and inspecting containers at the first safe and practicable opportunity after landing.</p>
          <div class="callout callout-red">
            <strong>Lithium-Ion Battery Fire Risk</strong>
            <p>The Master Code specifically identifies the risk of fire from lithium-ion batteries in waste loads (H8b) and in vehicles involved in collisions (Activity 40). Recovery operators must be aware of the risk of fire if the skin of a lithium-ion battery has been perforated or compromised, and must have appropriate emergency response procedures in place.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m8-q1",
        text: "An online freight platform connects shippers with owner-drivers. Does the platform operator have any CoR obligations?",
        options: [
          "No — the platform is just a technology intermediary and does not operate vehicles",
          "Yes — online freight platforms have CoR obligations including verifying carrier accreditations and including safety requirements in their terms of service",
          "Only if the platform directly employs the drivers",
          "Only if the platform handles goods worth more than $1 million per year"
        ],
        correctIndex: 1,
        explanation: "Activity 38 specifically addresses online freight platforms. These platforms have CoR obligations even though they do not directly operate vehicles. Controls include verifying carrier licences and accreditations, providing safety information to users, and including safety requirements in the platform's terms of service."
      },
      {
        id: "m8-q2",
        text: "A recovery operator is called to recover a vehicle that has been involved in a collision on a busy highway. The conditions are unsafe for recovery. What should the operator do?",
        options: [
          "Proceed with the recovery immediately to clear the road as quickly as possible",
          "Wait for police to arrive before commencing recovery",
          "Consider whether the vehicle can safely be left in place to be recovered later when conditions are safer",
          "Attempt a partial recovery to move the vehicle to the shoulder"
        ],
        correctIndex: 2,
        explanation: "Activity 40.9 states that if immediate recovery is unsafe for the recovery vehicle operator or other road users, the operator should decide whether the vehicle can safely be left in place to be recovered later — for example at night, outside peak traffic times, or when there is less traffic on the roadway. Safety must take precedence over urgency."
      }
    ]
  },
  {
    id: "module-9",
    number: 9,
    title: "Comparing CoR and WHS Duties",
    description: "Understand how the CoR Primary Duty compares and interacts with Work Health and Safety (WHS) obligations, and how responsibility is shared across the supply chain.",
    icon: "Scale",
    color: "#1E40AF",
    lessons: [
      {
        id: "m9-l1",
        title: "CoR vs WHS: Similarities and Differences",
        duration: "10 min",
        keyPoints: [
          "The Primary Duty is modelled on the WHS duty but applies to 'public risk' rather than worker health and safety.",
          "Both duties use the 'reasonably practicable' standard.",
          "The WHS duty focuses on the health and safety of workers and others; the CoR duty focuses on public risk from heavy vehicle transport.",
          "Both duties can apply simultaneously to the same activity.",
          "Compliance with one duty does not guarantee compliance with the other."
        ],
        content: `
          <h2>CoR vs WHS: Similarities and Differences</h2>
          <p>The Primary Duty in the HVNL is modelled on the equivalent duty in Work Health and Safety (WHS) legislation, but there are important differences. Understanding these differences is essential for businesses that are subject to both sets of obligations.</p>
          <h3>Key Similarities</h3>
          <p>Both the Primary Duty and the WHS duty use the "reasonably practicable" standard, requiring duty holders to weigh up the likelihood of harm, the severity of harm, knowledge of risks and controls, availability and suitability of controls, and cost. Both are duty-based rather than prescriptive, meaning they require duty holders to achieve safe outcomes rather than follow specific rules.</p>
          <h3>Key Differences</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>CoR Primary Duty</th>
                  <th>WHS Duty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Who is protected</td>
                  <td>The public — persons, property, road infrastructure, environment</td>
                  <td>Workers and others in the workplace</td>
                </tr>
                <tr>
                  <td>Who owes the duty</td>
                  <td>Parties in the CoR (10 defined roles)</td>
                  <td>Persons conducting a business or undertaking (PCBU)</td>
                </tr>
                <tr>
                  <td>Trigger</td>
                  <td>Transport activities relating to a heavy vehicle</td>
                  <td>Work carried out by workers</td>
                </tr>
                <tr>
                  <td>Legislation</td>
                  <td>HVNL (Chapter 1A)</td>
                  <td>WHS Act (Commonwealth/State/Territory)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Both Duties Can Apply Simultaneously</h3>
          <p>Many activities in heavy vehicle transport are subject to both the CoR Primary Duty and WHS obligations. For example, loading a heavy vehicle creates both public risks (the load could fall onto the road and injure other road users) and WHS risks (the loader could be injured by falling goods or machinery). Businesses must manage both sets of risks.</p>
          <div class="callout callout-blue">
            <strong>Compliance with One Does Not Guarantee Compliance with the Other</strong>
            <p>A business that complies with all WHS obligations is not automatically complying with the CoR Primary Duty, and vice versa. Both sets of obligations must be considered and addressed independently.</p>
          </div>
        `
      },
      {
        id: "m9-l2",
        title: "Sharing Responsibility Across the Supply Chain",
        duration: "8 min",
        keyPoints: [
          "All CoR parties share the same Primary Duty but discharge it in different ways.",
          "No single party is responsible for all controls — responsibility is shared.",
          "Businesses can rely on other parties' controls but must verify their effectiveness.",
          "Commercial pressure must never override safety obligations.",
          "The 'prohibited requests' provisions prevent businesses from passing safety risks down the chain."
        ],
        content: `
          <h2>Sharing Responsibility Across the Supply Chain</h2>
          <p>One of the distinctive features of the CoR framework is that responsibility for safety is shared across multiple parties in the supply chain. No single party is responsible for all controls — each party has a role to play based on what they do and the opportunities they have to eliminate or minimise risk.</p>
          <h3>How Shared Responsibility Works in Practice</h3>
          <p>Consider a simple example: a consignor sends goods to a consignee via a transport operator. The consignor is responsible for providing accurate mass and dimension information and ensuring the goods are safely packaged. The operator is responsible for ensuring the vehicle is suitable and the load is properly restrained. The consignee is responsible for ensuring the unloading premises are safe and that the vehicle is not delayed unnecessarily. All three parties share responsibility for the overall safety of the transport task.</p>
          <h3>Relying on Other Parties' Controls</h3>
          <p>If another party is implementing an effective control, you may not need to implement that control yourself. However, if you rely on that party to perform that action, you may also need to be satisfied that they do it consistently. This means having systems in place to verify that other parties are fulfilling their obligations — not simply assuming they are.</p>
          <h3>Commercial Pressure and Safety</h3>
          <p>Commercial pressure is one of the most significant drivers of unsafe behaviour in heavy vehicle transport. Tight delivery timeframes, low rates, and pressure to maximise vehicle utilisation can all create conditions for unsafe behaviour. The prohibited requests provisions in the HVNL are designed to prevent businesses from passing these pressures down the chain in a way that compromises safety.</p>
          <div class="callout callout-amber">
            <strong>Safety Is Not Negotiable</strong>
            <p>No commercial arrangement can override the obligations imposed by the HVNL. A contract that requires a driver to exceed work hours, a payment structure that incentivises speeding, or a delivery timeframe that can only be achieved by breaking the law — all of these are prohibited, regardless of what the parties have agreed.</p>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m9-q1",
        text: "A business complies fully with all WHS obligations related to its loading dock. Does this mean it has also complied with the CoR Primary Duty?",
        options: [
          "Yes — WHS compliance covers all safety obligations",
          "No — the CoR Primary Duty and WHS obligations are separate and both must be addressed independently",
          "Yes — if there are no WHS breaches, there can be no CoR breaches",
          "Only if the business is also registered with the NHVR"
        ],
        correctIndex: 1,
        explanation: "Compliance with WHS obligations does not guarantee compliance with the CoR Primary Duty, and vice versa. Both sets of obligations must be considered and addressed independently. The CoR Primary Duty focuses on public risk from heavy vehicle transport activities, while WHS focuses on the health and safety of workers."
      },
      {
        id: "m9-q2",
        text: "A consignor provides inaccurate mass information to a transport operator, resulting in an overmass vehicle being sent on the road. Who bears responsibility for this breach?",
        options: [
          "Only the transport operator — they are responsible for ensuring the vehicle is not overmass",
          "Only the consignor — they provided the inaccurate information",
          "Both the consignor and the operator may bear responsibility, as both have CoR obligations relevant to mass management",
          "Neither — this is a driver error"
        ],
        correctIndex: 2,
        explanation: "Both the consignor and the operator may bear responsibility. The consignor has an obligation to provide accurate mass information (Activity 23). The operator has an obligation to ensure the vehicle is not overmass before it departs (Activities 28, 34). Shared responsibility means both parties must fulfil their respective obligations."
      }
    ]
  },
  {
    id: "module-10",
    number: 10,
    title: "Final Assessment",
    description: "Demonstrate your understanding of the 2026 NHVR Master Code of Practice with a comprehensive final assessment covering all modules.",
    icon: "Award",
    color: "#B45309",
    lessons: [
      {
        id: "m10-l1",
        title: "Course Summary and Key Resources",
        duration: "8 min",
        keyPoints: [
          "The 2026 Master Code covers 45 activities and hundreds of controls across all sectors.",
          "The four-step action plan: confirm your CoR role, identify hazards, select controls, monitor and review.",
          "Key resources include the NHVR website, Load Restraint Guide 2025, and AFTD Standards.",
          "The Code is a living document — stay current with updates and new guidance from the NHVR.",
          "Completing this course is itself an act of executive due diligence."
        ],
        content: `
          <h2>Course Summary and Key Resources</h2>
          <p>Congratulations on completing the 2026 NHVR Master Code of Practice online course. This final lesson summarises the key themes of the course and provides a practical action plan for applying what you have learned.</p>
          <h3>What You Have Learned</h3>
          <p>Across the nine preceding modules, you have covered the full scope of the 2026 Master Code, including: the purpose and legal status of the Code; who is a party in the CoR and what duties apply; the six-step risk management process; the 10 Foundation Activities that apply to all CoR parties; the specific controls for managing drivers, vehicles, premises, operations, and sector-specific activities; and how CoR and WHS obligations interact.</p>
          <h3>Your Four-Step Action Plan</h3>
          <div class="action-steps">
            <div class="action-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <strong>Confirm Your CoR Role and Operating Context</strong>
                <p>Determine whether you or your business is a party in the CoR and understand the nature, scope, and context of your business or operations.</p>
              </div>
            </div>
            <div class="action-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <strong>Identify Transport Activities, Hazards, and Risks</strong>
                <p>Identify your transport activities, associated hazards, and assess the risks arising from those hazards.</p>
              </div>
            </div>
            <div class="action-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <strong>Select, Allocate, and Implement Controls</strong>
                <p>Identify appropriate controls, allocate them to the relevant risks, and engage with business partners to ensure controls are applied across the supply chain.</p>
              </div>
            </div>
            <div class="action-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <strong>Monitor, Review, and Improve</strong>
                <p>Monitor and assure the effectiveness of controls, re-appraise hazards and risks, and regularly review arrangements to support continuous improvement.</p>
              </div>
            </div>
          </div>
          <h3>Key Resources</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Where to Find It</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2026 Master Code of Practice (full text)</td><td>nhvr.gov.au/safety-accreditation-compliance/industry-codes-of-practice/2026-master-code</td></tr>
                <tr><td>Load Restraint Guide 2025</td><td>nhvr.gov.au</td></tr>
                <tr><td>Austroads Assessing Fitness to Drive Standards</td><td>austroads.com.au</td></tr>
                <tr><td>NHVR Regulatory Advice documents</td><td>nhvr.gov.au/safety-accreditation-compliance/regulatory-advice</td></tr>
                <tr><td>Court orders and case learnings</td><td>nhvr.gov.au/safety-accreditation-compliance/enforcement/court-orders-and-case-learnings</td></tr>
                <tr><td>SafeWork Australia Guide for Managing Fatigue Risk</td><td>safeworkaustralia.gov.au</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    quiz: [
      {
        id: "m10-q1",
        text: "Which of the following is the correct first step in the four-step action plan recommended by the Master Code?",
        options: [
          "Select and implement control measures",
          "Confirm your CoR role and operating context",
          "Monitor and review existing controls",
          "Engage a safety consultant to conduct a risk assessment"
        ],
        correctIndex: 1,
        explanation: "The first step is to confirm your CoR role and operating context — determine whether you or your business is a party in the CoR and understand the nature, scope, and context of your business or operations. You cannot manage your obligations until you know what they are."
      },
      {
        id: "m10-q2",
        text: "The 2026 Master Code identifies how many activities and associated controls?",
        options: [
          "10 activities",
          "25 activities",
          "45 activities",
          "100 activities"
        ],
        correctIndex: 2,
        explanation: "The 2026 Master Code identifies 45 activities, each with associated controls. These activities cover Foundation Activities, Managing Drivers, Vehicles and Equipment, Premises, Operations, and Additional Sector-Specific Controls."
      },
      {
        id: "m10-q3",
        text: "Completing this online course on the Master Code is an example of which type of due diligence activity?",
        options: [
          "Providing funding for safety resources",
          "Acquiring and keeping up-to-date knowledge of heavy vehicle safety matters",
          "Verifying that controls are being implemented",
          "Conducting a risk assessment"
        ],
        correctIndex: 1,
        explanation: "The HVNL defines due diligence to include 'acquiring and keeping up-to-date knowledge of heavy vehicle safety matters'. Completing this course — and reading the Master Code itself — is a direct example of this due diligence activity."
      }
    ]
  }
];

export const finalAssessmentQuestions: Question[] = [
  {
    id: "fa-q1",
    text: "Under the HVNL, which of the following businesses would be classified as a 'Loading Manager'?",
    options: [
      "A business that loads goods onto heavy vehicles at its own warehouse",
      "A business that manages a depot where an average of 6 heavy vehicles are loaded or unloaded each day",
      "A business that employs heavy vehicle drivers",
      "A business that schedules transport tasks"
    ],
    correctIndex: 1,
    explanation: "A 'Loading Manager' is a party who manages premises where 5 or more heavy vehicles are loaded or unloaded each day. A business managing a depot with an average of 6 vehicles per day meets this definition."
  },
  {
    id: "fa-q2",
    text: "Which Australian jurisdictions are NOT covered by the Heavy Vehicle National Law (HVNL)?",
    options: [
      "Queensland and South Australia",
      "Victoria and Tasmania",
      "Western Australia and the Northern Territory",
      "New South Wales and the ACT"
    ],
    correctIndex: 2,
    explanation: "The HVNL applies in all Australian states and territories except Western Australia and the Northern Territory. Businesses operating in WA or NT must refer to relevant state-specific legislation."
  },
  {
    id: "fa-q3",
    text: "A transport company's scheduler sets delivery timeframes that require drivers to skip mandatory rest breaks. Which duty is the scheduler's employer breaching?",
    options: [
      "Only the driver's personal duty to take rest breaks",
      "The Primary Duty — specifically the prohibition against conduct that causes or encourages a driver to contravene the HVNL",
      "Only the Executive Duty",
      "No duty — the driver can choose to take rest breaks regardless of the schedule"
    ],
    correctIndex: 1,
    explanation: "The Primary Duty's prohibition component (s 26C(2)(b)) prohibits conduct that directly or indirectly causes or encourages a driver to contravene the HVNL. Setting delivery timeframes that require drivers to skip mandatory rest breaks is a breach of this prohibition."
  },
  {
    id: "fa-q4",
    text: "What is the maximum penalty for an individual who commits a Category 1 offence under the HVNL (2025/26 financial year)?",
    options: [
      "$68,635",
      "$206,237",
      "$424,794 or 5 years imprisonment or both",
      "$4,113,837"
    ],
    correctIndex: 2,
    explanation: "The maximum penalty for an individual who commits a Category 1 offence (s 26F, HVNL) is $424,794 or 5 years imprisonment or both, for the 2025/26 financial year. The same penalty applies to an executive who breaches the Executive Duty."
  },
  {
    id: "fa-q5",
    text: "A consignor provides a transport operator with inaccurate mass information, resulting in an overmass vehicle. The operator does not weigh the vehicle before departure. Who may be held responsible?",
    options: [
      "Only the consignor — they provided the wrong information",
      "Only the operator — they are responsible for vehicle compliance",
      "Both the consignor and the operator may bear responsibility",
      "Neither — this is a regulatory compliance issue, not a CoR issue"
    ],
    correctIndex: 2,
    explanation: "Both parties may bear responsibility. The consignor has an obligation to provide accurate mass information. The operator has an obligation to ensure the vehicle is not overmass before departure. The CoR framework recognises shared responsibility — multiple parties can be responsible for the same safety outcome."
  },
  {
    id: "fa-q6",
    text: "Which of the following best describes the difference between the Primary Duty and Chapter 6 of the HVNL regarding fatigue?",
    options: [
      "They are the same obligation — Chapter 6 is simply the implementation of the Primary Duty",
      "Chapter 6 applies to all heavy vehicles; the Primary Duty only applies to fatigue-regulated heavy vehicles",
      "The Primary Duty applies to all heavy vehicles and requires a risk management approach; Chapter 6 applies only to fatigue-regulated heavy vehicles and sets prescriptive work/rest hours",
      "The Primary Duty is less demanding than Chapter 6 and only applies to operators"
    ],
    correctIndex: 2,
    explanation: "Chapter 6 sets prescriptive work and rest hour requirements for fatigue-regulated heavy vehicles (FRHVs). The Primary Duty is broader — it applies to all heavy vehicles and requires a risk management approach. Complying with Chapter 6 is not a guarantee of compliance with the Primary Duty."
  },
  {
    id: "fa-q7",
    text: "An executive of a CoR party attends an industry conference, reads the 2026 Master Code, and participates in a risk assessment of the business's transport activities. These activities are examples of:",
    options: [
      "Optional best practice activities with no legal significance",
      "Exercising due diligence under the Executive Duty",
      "Compliance with the Primary Duty only",
      "Activities only required for Category 1 businesses"
    ],
    correctIndex: 1,
    explanation: "These activities are direct examples of exercising due diligence under the Executive Duty. The HVNL defines due diligence to include acquiring and keeping up-to-date knowledge of heavy vehicle safety matters, understanding the business's operations and associated hazards and risks, and participating in risk assessments."
  },
  {
    id: "fa-q8",
    text: "A business installs telematics in all its vehicles but never reviews the data. Does this satisfy the Primary Duty regarding monitoring?",
    options: [
      "Yes — installing the technology demonstrates a commitment to safety",
      "Yes — the technology itself prevents incidents from occurring",
      "No — data from monitoring devices must be actively reviewed and used to manage safety",
      "Only if the telematics system is NHVR-approved"
    ],
    correctIndex: 2,
    explanation: "Installing monitoring devices is not sufficient on its own. The data generated must be actively reviewed and used to manage safety. Activity 17 (Using monitoring devices and safety systems) requires businesses to actively use data from monitoring devices to manage safety — not just collect it."
  },
  {
    id: "fa-q9",
    text: "The Master Code identifies 'H11a: Drivers are paid in a way which encourages unsafe behaviour' as a hazard. What category does this fall under?",
    options: [
      "Driver performance or impairment",
      "Negligent or dangerous driving behaviours",
      "Organisational or commercial hazards",
      "External, environmental, or infrastructure based hazards"
    ],
    correctIndex: 2,
    explanation: "H11a falls under H11 — Organisational or Commercial Hazards. This category recognises that the way businesses are structured, managed, and commercially arranged can itself create safety hazards. Payment structures that incentivise unsafe behaviour are a prime example."
  },
  {
    id: "fa-q10",
    text: "Which of the following is the correct four-step action plan recommended by the Master Code for getting started?",
    options: [
      "Train → Audit → Report → Improve",
      "Confirm CoR role → Identify hazards and risks → Select and implement controls → Monitor, review and improve",
      "Register with NHVR → Complete training → Obtain accreditation → Operate",
      "Assess → Plan → Do → Check"
    ],
    correctIndex: 1,
    explanation: "The Master Code's four-step action plan is: (1) Confirm your CoR role and operating context; (2) Identify transport activities, hazards, and risks; (3) Select, allocate, and implement controls; (4) Monitor, review, and improve. This cyclical process is the foundation of effective CoR compliance."
  }
];
