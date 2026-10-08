window.portfolio = {
  "name": "Evan Balson",
  "email": "",
  "github": "https://github.com/Evan-Balson",
  "linkedin": "",
  "cv": "",
  "projects": [
    {
      "id": "express-bnb",
      "github": "https://github.com/Evan-Balson/Express-BnB-CNN-Model--SD3-Sprint3",
      "title": "Express BnB",
      "category": "Software Engineering",
      "kind": "booking",
      "tagline": "A JavaFX accommodation-booking application built around explicit booking workflows, extended with a self-directed Java-to-Python image-classification feature for location search.",
      "description": "Designed and implemented guest, host and administrator workflows for accommodation search and booking. A self-directed CNN extension connected the Java desktop application to a local Flask inference service.",
      "tech": [
        "Java",
        "JavaFX",
        "Python",
        "Flask",
        "TensorFlow",
        "JUnit"
      ],
      "highlights": [
        "Translated user stories into UML and domain rules",
        "Applied state modelling and separation of concerns",
        "Trained and integrated a CNN beyond the module brief"
      ],
      "status": "Completed academic project",
      "type": "Individual academic project",
      "date": "January 2025",
      "real": true,
      "image": "assets/express-bnb/guest-search.webp",
      "imageAlt": "Express BnB working guest interface with accommodation filters, booking form and notifications",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Express BnB was designed around three roles: guests searching for accommodation, hosts managing properties and reservations, and administrators overseeing users and activity."
            },
            {
              "type": "paragraph",
              "text": "The central engineering challenge was keeping those workflows consistent. A booking decision affects more than a status field: room availability, user actions and notifications all need to reflect the same reservation state."
            },
            {
              "type": "paragraph",
              "text": "That made the booking lifecycle a domain problem rather than something that should live entirely inside JavaFX event handlers."
            }
          ]
        },
        {
          "title": "System Overview",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The application separates interface behaviour from the underlying booking model. JavaFX controllers coordinate user interaction, while Java domain classes represent users, properties, accommodations, facilities, bookings and notifications."
            },
            {
              "type": "paragraph",
              "text": "Booking behaviour is expressed through explicit lifecycle states so that reservation rules and capacity changes remain part of the domain model. The prototype maintains application data in Java objects and collections, which suited the scope of the desktop application."
            },
            {
              "type": "paragraph",
              "text": "Alongside the core booking system, a separate Python service provides image-based location classification. Java sends the selected image to Flask as a multipart HTTP request, TensorFlow performs inference, and the returned location is applied to the existing accommodation search."
            },
            {
              "type": "paragraph",
              "text": "**JavaFX → Java domain logic → booking workflows**"
            },
            {
              "type": "paragraph",
              "text": "**Image selection → Flask → TensorFlow → location prediction → JavaFX search**"
            }
          ]
        },
        {
          "title": "Engineering Challenge: Booking State & Capacity",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Reservation status and room availability need to remain aligned throughout the booking lifecycle."
            },
            {
              "type": "paragraph",
              "text": "Pending requests can move into confirmed or cancelled states, while confirmed bookings can later be completed or cancelled. Capacity checks are applied as part of those booking operations so availability is handled alongside the lifecycle rather than separately in the interface."
            },
            {
              "type": "heading",
              "text": "Booking lifecycle"
            },
            {
              "type": "table",
              "headers": [
                "From",
                "Permitted destination"
              ],
              "rows": [
                [
                  "Pending",
                  "Confirmed or Canceled"
                ],
                [
                  "Confirmed",
                  "Completed or Canceled"
                ]
              ]
            },
            {
              "type": "paragraph",
              "text": "State-specific behaviour keeps these transitions explicit and gives the booking model a clearer responsibility for deciding which actions are valid."
            },
            {
              "type": "paragraph",
              "text": "Ownership rules also form part of the workflow. Host operations act on accommodations belonging to that host, while guest booking updates are tied to the relevant guest records. The result is a domain layer that carries meaningful application rules instead of relying entirely on what each screen chooses to expose."
            },
            {
              "type": "paragraph",
              "text": "This was the most useful part of the project from a software-design perspective: modelling a booking system required thinking about relationships between state, availability and user ownership rather than treating each screen as an isolated feature."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Connecting Java and Python",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The image-search extension was a self-directed experiment beyond the core booking requirements."
            },
            {
              "type": "paragraph",
              "text": "The first integration approach relied on Java and Python referring to the same local image path. That made the two runtimes unnecessarily dependent on filesystem assumptions."
            },
            {
              "type": "paragraph",
              "text": "The boundary was redesigned around HTTP instead."
            },
            {
              "type": "paragraph",
              "text": "Java uploads the image itself to a Flask `/predict` endpoint. Python applies the model's preprocessing and inference pipeline, returns the predicted location as JSON, and Java maps a recognised result into the accommodation filter."
            },
            {
              "type": "paragraph",
              "text": "This created a cleaner contract between the two runtimes:"
            },
            {
              "type": "paragraph",
              "text": "**image bytes in → location prediction out**"
            },
            {
              "type": "paragraph",
              "text": "The classifier covered five locations:"
            },
            {
              "type": "paragraph",
              "text": "**China · London · New York · Paris · Rome**"
            },
            {
              "type": "paragraph",
              "text": "Rather than existing as an isolated machine-learning demonstration, the model was connected to a complete application flow: a user selects an image, Java requests inference, Python returns a location, and the existing booking interface uses that result to narrow accommodation search."
            },
            {
              "type": "paragraph",
              "text": "The value of the extension was therefore as much about **system integration** as model training—combining Java desktop development, HTTP communication and Python inference inside one working workflow."
            }
          ]
        },
        {
          "title": "Testing & Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "JUnit tests targeted the core behaviours of the booking domain, including:"
            },
            {
              "type": "list",
              "items": [
                "booking transitions",
                "room-capacity checks",
                "accommodation filtering",
                "notification behaviour"
              ]
            },
            {
              "type": "paragraph",
              "text": "Guest, host and administrator workflows were also exercised through the application to check the interaction between the interface and domain model."
            },
            {
              "type": "paragraph",
              "text": "For the image-search extension, validation covered the complete integration path from Java image upload through Flask inference and back into the JavaFX location filter."
            },
            {
              "type": "paragraph",
              "text": "Together, these checks focused on the boundaries where behaviour mattered most: booking state, capacity, user workflows and communication between the Java and Python components."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The completed application supported accommodation and facility search, booking requests, host reservation management, role-specific interfaces and application notifications."
            },
            {
              "type": "paragraph",
              "text": "The optional image-search extension added a second technical dimension to the project by completing a working Java → Flask → TensorFlow → Java integration and connecting the prediction directly to accommodation discovery."
            },
            {
              "type": "paragraph",
              "text": "The finished project therefore combined two different engineering problems in one application: modelling stateful booking behaviour inside Java and defining a clean boundary between Java and a separate Python inference service."
            }
          ]
        },
        {
          "title": "Application Screenshots",
          "blocks": [
            {
              "type": "heading",
              "text": "Guest search & booking"
            },
            {
              "type": "image",
              "src": "assets/express-bnb/guest-search.webp",
              "alt": "Guest search & booking"
            },
            {
              "type": "paragraph",
              "text": "Location and facility filters, booking form, availability and notifications."
            },
            {
              "type": "heading",
              "text": "Booking request feedback"
            },
            {
              "type": "image",
              "src": "assets/express-bnb/booking-confirmation.webp",
              "alt": "Booking request feedback"
            },
            {
              "type": "paragraph",
              "text": "Guest workflow after submitting a booking request."
            },
            {
              "type": "heading",
              "text": "Host management"
            },
            {
              "type": "image",
              "src": "assets/express-bnb/host-dashboard.webp",
              "alt": "Host management"
            },
            {
              "type": "paragraph",
              "text": "Owned accommodation, pending bookings, facilities and ratings."
            },
            {
              "type": "heading",
              "text": "Administrator dashboard"
            },
            {
              "type": "image",
              "src": "assets/express-bnb/admin-dashboard.webp",
              "alt": "Administrator dashboard"
            },
            {
              "type": "paragraph",
              "text": "User management, account requests and activity views."
            },
            {
              "type": "heading",
              "text": "Image-led location search"
            },
            {
              "type": "image",
              "src": "assets/express-bnb/image-search.webp",
              "alt": "Image-led location search"
            },
            {
              "type": "paragraph",
              "text": "Landmark classification connected to the JavaFX search interface."
            },
            {
              "type": "link",
              "text": "**View all screenshots ↗**"
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "paragraph",
              "text": "For a larger version of the system, the next step would be persistent storage with transactional booking updates so reservation state and capacity changes can be committed together."
            },
            {
              "type": "paragraph",
              "text": "Automated coverage could also be extended across more lifecycle and ownership scenarios, while the inference workflow could be moved onto a background task with explicit timeout and error handling for a more resilient desktop experience."
            },
            {
              "type": "paragraph",
              "text": "The image-classification experiment could then be developed further with a broader dataset and more systematic evaluation before expanding its role in search."
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The booking system reinforced that application behaviour belongs in the domain rather than being distributed across interface handlers. State objects made lifecycle rules easier to reason about, but the more important lesson was that booking state, capacity and ownership form one business operation and should be designed together."
            },
            {
              "type": "paragraph",
              "text": "The CNN extension introduced a different kind of boundary. Training the model was only one part of the feature; preprocessing, transport, inference and application behaviour all had to agree before the prediction became useful inside the Java application."
            },
            {
              "type": "paragraph",
              "text": "Together, those two parts of the project strengthened my understanding of both **domain modelling within an application** and **integration across separate systems**."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Engineering report**",
              "description": "Design, implementation and submitted testing documentation.",
              "url": "assets/express-bnb/engineering-report.pdf"
            },
            {
              "type": "resource",
              "label": "**Class & state diagrams**",
              "description": "UML covering the domain model and booking lifecycle.",
              "url": "assets/express-bnb/class-diagram.pdf"
            },
            {
              "type": "resource",
              "label": "**Application screenshots**",
              "description": "Guest, host, administrator and image-search workflows.",
              "url": "#case-section-7"
            }
          ]
        }
      ],
      "categories": [
        "Software Engineering",
        "AI & Machine Learning"
      ],
      "visualLabel": "WORKING APPLICATION / JAVAFX",
      "evidenceLabel": "Screenshots & UML",
      "layout": "portfolio",
      "quickFacts": [],
      "headerMeta": "Individual academic project · January 2025",
      "headerStack": "Java · JavaFX · Python · Flask · TensorFlow · JUnit"
    },
    {
      "id": "stockshark",
      "title": "StockShark",
      "category": "Software Engineering",
      "categories": [
        "Software Engineering",
        "Web Development"
      ],
      "kind": "web",
      "tagline": "Designed and implemented a layered Java web architecture for retrieving, storing and comparing historical stock data across external APIs, application services, persistence and browser visualisation.",
      "description": "Led the architecture and implementation of a Java/Tomcat stock-comparison prototype. My technical focus was mapping provider JSON into stored market records, reusing persisted data under API limits, and preparing date-aligned series for Chart.js.",
      "tech": [
        "Java",
        "JSP / Servlets",
        "Tomcat",
        "Chart.js",
        "MySQL",
        "Market-data APIs"
      ],
      "highlights": [
        "Led research, requirements and architectural planning",
        "Implemented API-to-database market-data flows",
        "Prepared aligned time series for stock comparisons"
      ],
      "real": true,
      "status": "Academic prototype",
      "type": "Team academic project",
      "date": "Spring 2025",
      "image": "assets/stockshark/comparison.webp",
      "imageAlt": "StockShark original working application screenshot",
      "visualLabel": "WORKING WEB APPLICATION",
      "evidenceLabel": "Source, screens & architecture",
      "github": "https://github.com/Evan-Balson/SDA-Spring-Project",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "StockShark was developed as a Software Architecture & Design project around a practical question:"
            },
            {
              "type": "paragraph",
              "text": "**How should a stock-comparison system be structured so that external data, application behaviour, persistence and presentation can evolve without becoming tightly coupled?**"
            },
            {
              "type": "paragraph",
              "text": "The application needed to support account workflows, historical stock comparisons and saved portfolios while relying on an external provider for market data."
            },
            {
              "type": "paragraph",
              "text": "That created several architectural concerns at once:"
            },
            {
              "type": "list",
              "items": [
                "how external market data enters the system",
                "where provider-specific formats should be translated",
                "how stock records should be persisted and reused",
                "how application components should expose behaviour to controllers",
                "how historical series should be prepared for browser visualisation",
                "how those responsibilities should be divided across a team"
              ]
            },
            {
              "type": "paragraph",
              "text": "The architecture was therefore designed alongside the implementation rather than documented after it."
            }
          ]
        },
        {
          "title": "My Role",
          "blocks": [
            {
              "type": "paragraph",
              "text": "As project lead, I worked across the project from requirements and architectural design through implementation and integration."
            },
            {
              "type": "paragraph",
              "text": "My technical contribution focused on defining component responsibilities and interfaces, integrating external market data, implementing JDBC/MySQL persistence and preparing historical datasets for comparison in Chart.js."
            },
            {
              "type": "paragraph",
              "text": "I also coordinated the Java/Tomcat development environment, repository and sprint work so that separate team contributions could integrate around the same architectural boundaries."
            }
          ]
        },
        {
          "title": "Architecture",
          "blocks": [
            {
              "type": "paragraph",
              "text": "StockShark uses a layered Java web design that separates presentation, request handling, application behaviour, persistence and external integrations."
            },
            {
              "type": "paragraph",
              "text": "These are **logical architectural responsibilities within one web application**, rather than independently deployed services."
            },
            {
              "type": "heading",
              "text": "Presentation"
            },
            {
              "type": "paragraph",
              "text": "JSP pages render the web interface, while Chart.js handles interactive historical comparisons in the browser."
            },
            {
              "type": "heading",
              "text": "Request handling"
            },
            {
              "type": "paragraph",
              "text": "Jakarta servlets receive browser requests and coordinate the relevant application operations."
            },
            {
              "type": "heading",
              "text": "Application components"
            },
            {
              "type": "paragraph",
              "text": "Java components group behaviours such as user management, sessions, portfolios and stock-data operations behind explicit interfaces."
            },
            {
              "type": "heading",
              "text": "Persistence"
            },
            {
              "type": "paragraph",
              "text": "JDBC connects the application to MySQL for user, portfolio and market-data records."
            },
            {
              "type": "heading",
              "text": "External integration"
            },
            {
              "type": "paragraph",
              "text": "Provider-facing components translate external JSON responses into the application's internal stock representation before the data reaches storage or visualisation."
            },
            {
              "type": "paragraph",
              "text": "The resulting flow is:"
            },
            {
              "type": "paragraph",
              "text": "**Browser / JSP → Servlets → Application Components → Persistence / Market-Data Integration**"
            },
            {
              "type": "paragraph",
              "text": "For stock comparisons:"
            },
            {
              "type": "paragraph",
              "text": "**External API → internal StockData model → MySQL → date alignment → Chart.js datasets**"
            },
            {
              "type": "paragraph",
              "text": "This architecture gave each part of the application a clearer responsibility and provided the team with defined integration points during development."
            }
          ]
        },
        {
          "title": "Architecture Decision: Explicit Component Interfaces",
          "blocks": [
            {
              "type": "paragraph",
              "text": "A major goal was to make component responsibilities visible rather than allowing servlet controllers to become the centre of the application."
            },
            {
              "type": "paragraph",
              "text": "Interfaces were defined around operations such as login, sessions, portfolio management and stock-data access. Coordinating components then provided higher-level entry points for workflows that crossed several responsibilities."
            },
            {
              "type": "paragraph",
              "text": "For example, a servlet can delegate a user operation through the user-management component instead of needing direct knowledge of every underlying object involved."
            },
            {
              "type": "paragraph",
              "text": "This made the architectural model useful beyond documentation: the same boundaries helped structure implementation and coordinate work between team members."
            },
            {
              "type": "paragraph",
              "text": "The key lesson was that additional layers are valuable only when they represent meaningful responsibilities. Architecture improved the system when it reduced what each component needed to know about the rest of the application."
            }
          ]
        },
        {
          "title": "Engineering Challenge: External Market Data",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Market data entered StockShark in a provider-specific JSON format, but the rest of the application needed records that could be persisted, searched and compared consistently."
            },
            {
              "type": "paragraph",
              "text": "The integration layer maps those responses into internal `StockData` objects before they enter the rest of the system."
            },
            {
              "type": "paragraph",
              "text": "That creates an architectural boundary between:"
            },
            {
              "type": "paragraph",
              "text": "**provider representation**"
            },
            {
              "type": "paragraph",
              "text": "and:"
            },
            {
              "type": "paragraph",
              "text": "**application representation**"
            },
            {
              "type": "paragraph",
              "text": "As a result, persistence and comparison logic work with StockShark's own data model instead of depending directly on external JSON structures."
            },
            {
              "type": "paragraph",
              "text": "This became particularly useful when dealing with provider request limits. Retrieved data could be persisted in MySQL and reused by later comparison requests rather than treating the external API as the application's only source of stock information."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Reusing Persisted Market Data",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Historical-data requests should not automatically become new external API requests."
            },
            {
              "type": "paragraph",
              "text": "The comparison workflow first checks persisted market records for the requested stocks and uses the external provider when additional data is required. Newly retrieved records are then stored for reuse."
            },
            {
              "type": "paragraph",
              "text": "That produces the flow:"
            },
            {
              "type": "paragraph",
              "text": "**comparison request → stored records → required external data → persistence → comparison**"
            },
            {
              "type": "paragraph",
              "text": "The design reduced unnecessary dependence on the external provider and made persistence part of the market-data architecture rather than simply a place to save user accounts."
            },
            {
              "type": "paragraph",
              "text": "A larger implementation could take this further by tracking explicit freshness and date-range coverage for cached records."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Aligning Historical Series",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Two stocks cannot safely be compared by assuming their returned price arrays contain identical dates."
            },
            {
              "type": "paragraph",
              "text": "Historical records may cover different trading days or contain gaps."
            },
            {
              "type": "paragraph",
              "text": "The comparison workflow therefore builds a shared timeline across the selected symbols. Records are grouped by symbol, their dates are combined and sorted, and each stock series is mapped onto that common date axis."
            },
            {
              "type": "paragraph",
              "text": "Where a stock has no value for a particular date, the dataset represents the gap explicitly rather than shifting later values into the wrong position."
            },
            {
              "type": "paragraph",
              "text": "The resulting pipeline is:"
            },
            {
              "type": "paragraph",
              "text": "**stored market records → group by symbol → shared date axis → aligned series → Chart.js**"
            },
            {
              "type": "paragraph",
              "text": "This gave the visualisation layer a predictable contract and kept comparison preparation in Java rather than embedding data-reconciliation logic in the browser."
            }
          ]
        },
        {
          "title": "Architecture as a Team Coordination Tool",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The component and interface models also helped coordinate implementation across the team."
            },
            {
              "type": "paragraph",
              "text": "Responsibilities for user management, market data, persistence and presentation could be discussed in terms of the interfaces between them rather than only in terms of individual classes."
            },
            {
              "type": "paragraph",
              "text": "As the implementation evolved, the architectural models provided a shared reference for how contributions were expected to connect."
            },
            {
              "type": "paragraph",
              "text": "That was one of the project's most useful lessons: architecture is valuable not only because it describes software structure, but because it gives developers a common language for integrating work."
            }
          ]
        },
        {
          "title": "Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Validation combined application-level workflow checks, SQL inspection of persisted records, pull-request review and feedback from three users exercising registration, navigation, form submission and market-data views."
            },
            {
              "type": "paragraph",
              "text": "The comparison path was also inspected across its architectural boundaries: provider data mapping, database storage, preparation of historical series and browser rendering."
            },
            {
              "type": "paragraph",
              "text": "This helped verify not just individual screens, but whether data moved through the system in the way the architecture intended."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "StockShark delivered a working Java web prototype supporting:"
            },
            {
              "type": "list",
              "items": [
                "user and session workflows",
                "external stock-data retrieval",
                "MySQL-backed market records",
                "historical stock comparisons",
                "interactive Chart.js visualisations",
                "saved portfolios"
              ]
            },
            {
              "type": "paragraph",
              "text": "More importantly, the implementation demonstrated the architectural path designed for the project:"
            },
            {
              "type": "paragraph",
              "text": "**external provider → integration boundary → internal model → persistence → application workflow → browser visualisation**"
            },
            {
              "type": "paragraph",
              "text": "The project gave me practical experience treating architecture as something that shapes implementation decisions, component responsibilities and team integration rather than as documentation created separately from the code."
            }
          ]
        },
        {
          "title": "Application Screenshots",
          "blocks": [
            {
              "type": "heading",
              "text": "Market overview"
            },
            {
              "type": "image",
              "src": "assets/stockshark/market-overview.webp",
              "alt": "Market overview"
            },
            {
              "type": "paragraph",
              "text": "Stock information and retrieved market data."
            },
            {
              "type": "heading",
              "text": "Historical comparison"
            },
            {
              "type": "image",
              "src": "assets/stockshark/comparison.webp",
              "alt": "Historical comparison"
            },
            {
              "type": "paragraph",
              "text": "Date-aligned stock series rendered through Chart.js."
            },
            {
              "type": "heading",
              "text": "Saved portfolios"
            },
            {
              "type": "image",
              "src": "assets/stockshark/portfolios.webp",
              "alt": "Saved portfolios"
            },
            {
              "type": "paragraph",
              "text": "User-managed groups of selected stocks."
            },
            {
              "type": "heading",
              "text": "Login workflow"
            },
            {
              "type": "image",
              "src": "assets/stockshark/login.webp",
              "alt": "Login workflow"
            },
            {
              "type": "paragraph",
              "text": "Session-backed access to personalised application features."
            },
            {
              "type": "link",
              "text": "**View all screenshots ↗**"
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Strengthen the persistence boundary.** Keep database operations behind dedicated data-access components so request controllers remain focused on coordination.",
                "**Make market-data freshness explicit.** Track stored date coverage and freshness before deciding whether another provider request is required.",
                "**Add deterministic integration tests.** Use fixed market-data fixtures to test missing dates, malformed responses and provider failures without depending on a live API.",
                "**Reduce provider dependency.** Make the market-data integration boundary capable of supporting another provider or caching strategy without changing comparison and presentation logic."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "StockShark changed how I understood software architecture. The useful part was not producing component diagrams; it was deciding what each part of the system should know about the others and then carrying those decisions into implementation."
            },
            {
              "type": "paragraph",
              "text": "The market-data pipeline made that especially concrete. An external API response was not yet application data, persisted records were not yet a meaningful comparison, and two arrays of prices were not automatically aligned time series. Each boundary required an explicit transformation and a clear owner."
            },
            {
              "type": "paragraph",
              "text": "Leading the project also showed the coordination value of architecture. Interfaces and component responsibilities gave the team a shared model for how independently developed parts should integrate, connecting the design work directly to delivery."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Architecture diagrams**",
              "description": "Component, business-concept and system-interface models.",
              "url": "assets/stockshark/architecture-diagrams.pdf"
            },
            {
              "type": "resource",
              "label": "**Engineering report**",
              "description": "Architecture decisions, implementation and validation evidence.",
              "url": "assets/stockshark/engineering-report.pdf"
            },
            {
              "type": "resource",
              "label": "**Research & requirements**",
              "description": "Market-tool research, requirements and early architectural proposals.",
              "url": "assets/stockshark/research-and-requirements.pdf"
            },
            {
              "type": "resource",
              "label": "**Application screenshots**",
              "description": "Market overview, portfolios and historical comparison workflows.",
              "url": "#case-section-11"
            },
            {
              "type": "resource",
              "label": "**Source repository**",
              "description": "Java web implementation, persistence, integration components and supporting project documentation.",
              "url": "https://github.com/Evan-Balson/SDA-Spring-Project"
            }
          ]
        }
      ],
      "layout": "portfolio",
      "quickFacts": [],
      "headerEyebrow": "COMPLETED PROJECT / SOFTWARE ARCHITECTURE & DESIGN",
      "headerMeta": "Team academic project · Project lead · Spring 2025",
      "headerStack": "Java · Jakarta Servlets · JSP · MySQL · JDBC · Chart.js · Alpha Vantage · Tomcat"
    },
    {
      "id": "fitxchange",
      "title": "FitXchange",
      "category": "Software Engineering",
      "categories": [
        "Software Engineering",
        "Web Development",
        "AI & Machine Learning"
      ],
      "kind": "web",
      "tagline": "A team-built outfit-sharing platform connecting account, catalogue and rental workflows, with an experimental natural-language assistant integrated into the existing inventory system.",
      "description": "Managed delivery and implemented backend and data workflows for a Node.js/Express outfit-sharing prototype. Technical work included combined inventory filters, session-aware account behaviour and an NLP/API experiment translating natural-language requests into catalogue searches.",
      "tech": [
        "Node.js",
        "Express",
        "Pug",
        "MySQL",
        "Docker",
        "NLP / AI APIs"
      ],
      "highlights": [
        "Implemented MVC backend and relational data workflows",
        "Connected session-aware accounts, inventory and rentals",
        "Developed the NLP/API outfit-discovery experiment"
      ],
      "real": true,
      "status": "Academic prototype",
      "type": "Team academic project",
      "date": "Spring 2025",
      "image": "assets/fitxchange/catalogue.webp",
      "imageAlt": "FitXchange original working application screenshot",
      "visualLabel": "WORKING WEB APPLICATION",
      "evidenceLabel": "Source, screens & architecture",
      "github": "https://github.com/Evan-Balson/SE-Spring-Project",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "FitXchange was designed around a two-sided rental model. Lenders needed a way to list clothing, while borrowers needed to discover suitable items, manage their accounts and move through rental and checkout workflows."
            },
            {
              "type": "paragraph",
              "text": "Supporting those journeys meant more than building a catalogue. Authentication, inventory, user sessions, filtering and transaction data all had to work as parts of the same application, while the implementation itself was being developed across a team."
            },
            {
              "type": "paragraph",
              "text": "As project manager and a backend contributor, my role sat between those two concerns: coordinating delivery while translating user requirements into application behaviour, data relationships and working backend features."
            }
          ]
        },
        {
          "title": "My Role",
          "blocks": [
            {
              "type": "paragraph",
              "text": "My technical contribution centred on the backend and data model, including:"
            },
            {
              "type": "list",
              "items": [
                "Express controllers and model behaviour",
                "MySQL integration and relational data modelling",
                "authentication and session-aware workflows",
                "catalogue filtering and inventory queries",
                "rental and account behaviour",
                "the experimental NLP / language-model integration"
              ]
            },
            {
              "type": "paragraph",
              "text": "Project coordination ran alongside that implementation work. Short iterations, a shared GitHub board and regular stand-ups helped expose dependencies between features, while changes in team availability were handled by reprioritising tasks and ownership around the work needed for the next usable increment."
            },
            {
              "type": "paragraph",
              "text": "This made project management closely tied to the software itself. Knowing which route depended on a model, which interface depended on a schema change, or where another contributor was blocked was more useful than tracking task status in isolation."
            }
          ]
        },
        {
          "title": "System Overview",
          "blocks": [
            {
              "type": "paragraph",
              "text": "FitXchange follows an MVC-style structure that gives each part of the application a clear responsibility."
            },
            {
              "type": "paragraph",
              "text": "Pug templates render the interface, Express controllers coordinate requests and responses, model classes contain application behaviour, and a shared database service provides access to MySQL."
            },
            {
              "type": "paragraph",
              "text": "**Pug views → Express controllers → application models → database service → MySQL**"
            },
            {
              "type": "paragraph",
              "text": "The same structure carries through the major workflows. Registration and login pass account operations into the user model while controllers manage HTTP and session behaviour. Catalogue requests move through inventory logic and relational queries, while rental and account features build on the same user and inventory data."
            },
            {
              "type": "paragraph",
              "text": "That shared path allowed features to evolve around a common backend instead of developing as isolated screens."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Modelling the Rental Domain",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The relational model had to support users, inventory, categories, inspection information and transactions while keeping those relationships understandable across several workflows."
            },
            {
              "type": "paragraph",
              "text": "Inventory became the central representation for listed items, with related records adding information such as ownership, category and inspection status. This gave catalogue, account and rental features a common model rather than requiring each part of the application to interpret outfit data differently."
            },
            {
              "type": "paragraph",
              "text": "The schema also evolved as the prototype developed. Changes to inventory and transaction relationships were reflected in the ERD, physical data model and class relationships so implementation and design documentation continued to describe the same system."
            },
            {
              "type": "paragraph",
              "text": "That made data modelling part of the integration work. A relationship changed in MySQL could affect queries, controllers and user-facing behaviour, so the schema effectively became a contract shared across several parts of the application."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Combining Catalogue Filters",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Catalogue search supported combinations of category, location and price range together with ordering and pagination."
            },
            {
              "type": "paragraph",
              "text": "Although each control was individually simple, combining them expanded the number of backend paths quickly. Three optional filter groups alone produce eight presence/absence combinations before sorting and pagination are considered."
            },
            {
              "type": "paragraph",
              "text": "The catalogue workflow handled those combinations through model queries joining inventory with related category, inspection and user records. Keeping inspection state within those queries also ensured that filtering did not bypass application rules about which listings should be visible."
            },
            {
              "type": "paragraph",
              "text": "This was a useful example of complexity emerging from combinations rather than from any individual feature. A future version would consolidate the repeated query paths behind a composable query-building layer, making additional filters easier to introduce and test."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Authentication & Sessions",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Account state had to remain consistent across registration, login, navigation and user-specific workflows."
            },
            {
              "type": "paragraph",
              "text": "Registration delegates record creation to the user model, while login verifies credentials and stores the authenticated user in the session. Passwords are hashed with bcrypt rather than persisted directly."
            },
            {
              "type": "paragraph",
              "text": "Keeping credential behaviour within the model leaves controllers responsible for the web request and session lifecycle, rather than duplicating account logic across routes. The same authenticated session can then support account, catalogue and rental behaviour throughout the application."
            },
            {
              "type": "paragraph",
              "text": "This gave authentication a shared place in the application architecture instead of treating login as an isolated page-level feature."
            }
          ]
        },
        {
          "title": "Self-Directed Extension: Natural-Language Catalogue Search",
          "blocks": [
            {
              "type": "paragraph",
              "text": "A self-directed extension explored whether natural-language interaction could provide another route into the existing catalogue."
            },
            {
              "type": "paragraph",
              "text": "Two approaches were investigated: local intent-training routines with `node-nlp` and a hosted language-model API connected to the web application. The live application path used the hosted model, while the local classifier remained a separate experiment."
            },
            {
              "type": "paragraph",
              "text": "Prompts incorporated the catalogue's available category vocabulary so responses could support both conversational outfit advice and structured catalogue discovery. When the model returned category selections, those values were mapped into the existing inventory workflow and used to retrieve matching items."
            },
            {
              "type": "paragraph",
              "text": "The resulting path connected generated language to real application data:"
            },
            {
              "type": "paragraph",
              "text": "**user request → language model → structured category result → inventory search → matching catalogue items**"
            },
            {
              "type": "paragraph",
              "text": "The interesting part of the experiment was therefore not the API call itself, but the boundary between flexible language and structured application behaviour. The assistant had to fit into the catalogue's existing vocabulary and data model before its output could become useful inside the application."
            }
          ]
        },
        {
          "title": "Software Engineering & Team Delivery",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Because FitXchange was developed as a team Software Engineering project, design, implementation and coordination evolved together."
            },
            {
              "type": "paragraph",
              "text": "User stories and workflow models established the features that needed to connect, while sprint tasks and regular reviews made dependencies between account, catalogue, rental and interface work visible as implementation progressed."
            },
            {
              "type": "paragraph",
              "text": "A change in team availability during Sprint 3 required those dependencies to be reassessed. Ownership and priorities were adjusted around blocked work, with short syncs and detailed task notes helping contributors continue without losing implementation context."
            },
            {
              "type": "paragraph",
              "text": "The experience made the relationship between project management and engineering particularly concrete. Delivery planning worked best when it reflected the structure of the application: its interfaces, data relationships and dependencies between components."
            }
          ]
        },
        {
          "title": "Testing & Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Validation focused on the main user journeys, including:"
            },
            {
              "type": "list",
              "items": [
                "registration and login",
                "account behaviour",
                "catalogue interactions",
                "rental workflows",
                "valid and invalid authentication responses"
              ]
            },
            {
              "type": "paragraph",
              "text": "HTTP-level checks and CI workflow configuration were also explored alongside the manual application testing."
            },
            {
              "type": "paragraph",
              "text": "The catalogue and assistant introduced two areas where more systematic automated coverage would add the most value. Filter combinations naturally lend themselves to a table-driven regression suite, while structured assistant responses can be tested against known categories, malformed output and service failures."
            },
            {
              "type": "paragraph",
              "text": "Those additions would turn the most combination-heavy and integration-heavy parts of the prototype into more reproducible test boundaries."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "FitXchange delivered a working web prototype supporting:"
            },
            {
              "type": "list",
              "items": [
                "account registration and login",
                "catalogue browsing and filtering",
                "listing management",
                "carts and checkout",
                "user account views",
                "administrative workflows",
                "experimental natural-language catalogue discovery"
              ]
            },
            {
              "type": "paragraph",
              "text": "The project connected requirements, relational modelling, backend implementation and team delivery in one system. User stories shaped the workflows, those workflows informed the data model, and the resulting catalogue data supported both conventional filtering and the experimental assistant."
            },
            {
              "type": "paragraph",
              "text": "For me, the strongest outcome was learning to reason across those boundaries rather than treating backend development, database design and project coordination as separate activities."
            }
          ]
        },
        {
          "title": "Application Screenshots",
          "blocks": [
            {
              "type": "heading",
              "text": "Browse catalogue"
            },
            {
              "type": "image",
              "src": "assets/fitxchange/catalogue.webp",
              "alt": "Browse catalogue"
            },
            {
              "type": "paragraph",
              "text": "Category, location and price-based item discovery."
            },
            {
              "type": "heading",
              "text": "Account overview"
            },
            {
              "type": "image",
              "src": "assets/fitxchange/account.webp",
              "alt": "Account overview"
            },
            {
              "type": "paragraph",
              "text": "User profile and recent activity."
            },
            {
              "type": "heading",
              "text": "Checkout workflow"
            },
            {
              "type": "image",
              "src": "assets/fitxchange/checkout.webp",
              "alt": "Checkout workflow"
            },
            {
              "type": "paragraph",
              "text": "Rental transaction flow."
            },
            {
              "type": "heading",
              "text": "Administrator tasks"
            },
            {
              "type": "image",
              "src": "assets/fitxchange/admin.webp",
              "alt": "Administrator tasks"
            },
            {
              "type": "paragraph",
              "text": "Administrative management interface."
            },
            {
              "type": "heading",
              "text": "Experimental outfit assistant"
            },
            {
              "type": "image",
              "src": "assets/fitxchange/assistant.webp",
              "alt": "Experimental outfit assistant"
            },
            {
              "type": "paragraph",
              "text": "Natural-language advice connected to catalogue categories."
            },
            {
              "type": "link",
              "text": "**View all screenshots ↗**"
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Consolidate catalogue querying.** Replace repeated filter-specific query paths with composable query construction and a table-driven regression suite.",
                "**Strengthen automated testing.** Add a reproducible fixture-backed test environment covering account, catalogue and rental workflows.",
                "**Harden session and authorization behaviour.** Extend coverage around session lifecycle and user-specific operations.",
                "**Formalise the assistant contract.** Validate structured responses against the catalogue vocabulary before they trigger application actions.",
                "**Keep schema and implementation changes aligned.** Review database relationships, dependent code and design models as parts of the same engineering change."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "FitXchange reinforced that software engineering depends on maintaining agreement between different parts of a system. User stories, database relationships, controllers and interface behaviour all influenced one another, and coordinating the project required understanding those relationships rather than simply tracking tasks."
            },
            {
              "type": "paragraph",
              "text": "Catalogue filtering made that idea visible at a smaller scale. A few optional controls created many possible execution paths, showing how quickly seemingly simple requirements can benefit from composable logic and systematic testing."
            },
            {
              "type": "paragraph",
              "text": "The assistant introduced a different kind of boundary. A language-model response only becomes an application feature once its output has a defined relationship with vocabulary, data and application behaviour."
            },
            {
              "type": "paragraph",
              "text": "Together, those experiences changed how I approached project leadership as well as implementation: planning was most effective when it helped the team preserve coherence between requirements, models, interfaces and working code."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Engineering report**",
              "description": "Requirements, design models, implementation and engineering discussion.",
              "url": "assets/fitxchange/engineering-report.pdf"
            },
            {
              "type": "resource",
              "label": "**Project presentation**",
              "description": "Selected material covering users, Agile/DSDM, architecture and delivery.",
              "url": "assets/fitxchange/presentation.pdf"
            },
            {
              "type": "resource",
              "label": "**Design diagrams**",
              "description": "ERD, physical data model and class relationships.",
              "url": "assets/fitxchange/architecture-diagrams.pdf"
            },
            {
              "type": "resource",
              "label": "**Application screenshots**",
              "description": "Catalogue, account, checkout, administration and assistant workflows.",
              "url": "#case-section-11"
            },
            {
              "type": "resource",
              "label": "**Source repository**",
              "description": "Implementation, sprint documentation and workflow definitions.",
              "url": "https://github.com/Evan-Balson/SE-Spring-Project"
            }
          ]
        }
      ],
      "layout": "portfolio",
      "quickFacts": [],
      "headerEyebrow": "COMPLETED PROJECT / SOFTWARE ENGINEERING",
      "headerMeta": "Team academic project · Project manager / backend engineer · Spring 2025",
      "headerStack": "Node.js · Express · Pug · MySQL · Docker · bcryptjs · node-nlp · Hosted language-model API"
    },
    {
      "id": "library-management",
      "title": "Library Management System GUI",
      "category": "Software Engineering",
      "kind": "archive",
      "tagline": "A Windows desktop application for catalogue management, lending, returns and overdue-fine tracking, built by extending a native C++ library system with a C++/CLI Windows Forms interface.",
      "description": "Implemented a C++ library system with loan, return and overdue-fine workflows, then extended the CLI brief with Windows Forms through C++/CLI. Learning C# and .NET informed the experiment, while the delivered application retained native C++ domain logic.",
      "tech": [
        "C++/CLI",
        ".NET",
        "Windows Forms",
        "File I/O"
      ],
      "highlights": [
        "Extended the required C++ CLI with a desktop GUI",
        "Learned C# and .NET through practical experimentation",
        "Bridged Windows Forms and existing native C++ logic"
      ],
      "real": true,
      "status": "Academic prototype",
      "type": "Individual academic project",
      "date": "April 2024",
      "image": "assets/library/librarian-dashboard.webp",
      "imageAlt": "Working librarian dashboard with book management, user management, return and borrow controls",
      "visualLabel": "WORKING APPLICATION / WINDOWS FORMS",
      "evidenceLabel": "Source & screenshots",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The system was designed around two roles: librarians managing books and users, and students borrowing, returning and reviewing their account activity."
            },
            {
              "type": "paragraph",
              "text": "The main engineering challenge was keeping related records consistent across each operation. Borrowing affects stock and active loans; returning a book updates those records again, calculates any overdue fine and records the transaction history."
            },
            {
              "type": "paragraph",
              "text": "That meant lending and returns could not be treated as isolated button clicks. Each action had to coordinate several pieces of application state and present a clear result back to the user."
            }
          ]
        },
        {
          "title": "My Role",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The project began as a C++ command-line application and was later extended into a Windows desktop interface as a self-directed step beyond the original brief."
            },
            {
              "type": "paragraph",
              "text": "My work covered:"
            },
            {
              "type": "list",
              "items": [
                "C++ domain logic for catalogue, users, loans and returns",
                "overdue-fine calculation",
                "local-file persistence",
                "librarian and student workflows",
                "receipt and transaction output",
                "C++/CLI integration between native modules and Windows Forms",
                "validation and feedback around lending and return actions"
              ]
            },
            {
              "type": "paragraph",
              "text": "The desktop extension required learning the .NET application model and Windows Forms event handling, then finding a practical way to reuse the existing native C++ logic rather than rewriting the application from scratch."
            }
          ]
        },
        {
          "title": "System Overview",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The application separates desktop interaction from the underlying library operations."
            },
            {
              "type": "paragraph",
              "text": "Windows Forms provides the managed interface, while C++/CLI event handlers translate user input into native values and delegate to the existing C++ modules."
            },
            {
              "type": "paragraph",
              "text": "**Windows Forms UI → C++/CLI interop → native C++ modules → shared records / local files**"
            },
            {
              "type": "paragraph",
              "text": "Shared application records are maintained through collections such as vectors and unordered maps, while file-handling components load and save data between sessions."
            },
            {
              "type": "paragraph",
              "text": "This structure allowed the GUI to sit on top of the original domain logic instead of duplicating lending, return and fine calculations inside interface code."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Keeping Lending State Consistent",
          "blocks": [
            {
              "type": "paragraph",
              "text": "A borrowing or return operation changes several related records at once."
            },
            {
              "type": "paragraph",
              "text": "For a successful loan, the system needs to confirm that the requested book is available, record the borrower’s active loan and update the remaining stock."
            },
            {
              "type": "paragraph",
              "text": "A return involves a longer chain:"
            },
            {
              "type": "paragraph",
              "text": "**active loan → fine calculation → return record → loan removal → stock restoration → receipt / feedback**"
            },
            {
              "type": "paragraph",
              "text": "Treating that sequence as one workflow made the consistency requirements much clearer than updating each record independently."
            },
            {
              "type": "paragraph",
              "text": "The result was a domain model where catalogue state, borrower records and transaction history were coordinated around the lending operation rather than scattered across the interface."
            },
            {
              "type": "paragraph",
              "text": "This was the most useful design lesson from the project: user actions that appear simple on screen often represent several related state changes underneath."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Date-Based Fine Calculation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Overdue charges depend on the relationship between the loan date and the actual return date."
            },
            {
              "type": "paragraph",
              "text": "The fine module uses the system date rather than asking the user to provide one, then calculates the number of days beyond the 14-day lending period and applies the configured daily rate."
            },
            {
              "type": "paragraph",
              "text": "Keeping that behaviour inside a dedicated module made the rule reusable across the return workflow and kept date calculations out of the Windows Forms event handlers."
            },
            {
              "type": "paragraph",
              "text": "For a larger system, the next step would be to abstract the clock so boundary cases around the loan period can be tested deterministically."
            }
          ]
        },
        {
          "title": "Self-Directed Extension: Bridging C++ and Windows Forms",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The graphical interface was the main extension beyond the coursework requirement."
            },
            {
              "type": "paragraph",
              "text": "Rather than replacing the existing C++ implementation, the application uses C++/CLI as the bridge between managed Windows Forms controls and native domain modules."
            },
            {
              "type": "paragraph",
              "text": "That introduced a new boundary:"
            },
            {
              "type": "paragraph",
              "text": "**managed UI values → C++/CLI conversion → native operations → result → Windows Forms feedback**"
            },
            {
              "type": "paragraph",
              "text": "Inputs collected from text boxes, lists and buttons are converted into the types expected by the native C++ code before the relevant lending, return or catalogue operation is called."
            },
            {
              "type": "paragraph",
              "text": "This approach allowed the original domain logic to remain useful while adding a richer desktop workflow for both librarians and students. It also gave me practical experience integrating two different runtime models inside the same application rather than rebuilding everything in one technology."
            }
          ]
        },
        {
          "title": "Persistence",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Local files provide persistence for catalogue, user and transaction records between application sessions."
            },
            {
              "type": "paragraph",
              "text": "On startup, the application loads the saved records when they are available and can initialise demonstration data when expected files are absent."
            },
            {
              "type": "paragraph",
              "text": "For the scope of the prototype, file-backed storage provided a straightforward way to inspect and preserve application state without introducing a separate database layer."
            },
            {
              "type": "paragraph",
              "text": "A larger version would move these related records behind a transactional persistence boundary so lending and return updates could be committed together."
            }
          ]
        },
        {
          "title": "Testing & Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Validation focused on the workflows most important to the application:"
            },
            {
              "type": "list",
              "items": [
                "borrowing and returning books",
                "catalogue and user management",
                "account access",
                "overdue-fine calculation",
                "role-specific librarian and student actions",
                "consistency between the original CLI behaviour and the desktop interface"
              ]
            },
            {
              "type": "paragraph",
              "text": "Testing the same operations through both terminal and GUI paths helped confirm that the interface was delegating to the intended domain behaviour rather than creating a separate implementation."
            },
            {
              "type": "paragraph",
              "text": "Future automated coverage would add the most value around date boundaries, invalid returns, repeated operations and persistence round trips."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The completed desktop application supported:"
            },
            {
              "type": "list",
              "items": [
                "librarian book and user management",
                "student account access",
                "borrowing and returns",
                "stock updates",
                "overdue-fine calculation",
                "transaction / receipt output",
                "local persistence across sessions"
              ]
            },
            {
              "type": "paragraph",
              "text": "The project combined two distinct engineering concerns: maintaining consistent lending records in native C++ and integrating those workflows into a managed Windows desktop interface."
            },
            {
              "type": "paragraph",
              "text": "Extending the original CLI application into Windows Forms also showed the value of preserving working domain logic while adapting the surrounding interface and runtime boundary."
            }
          ]
        },
        {
          "title": "Application Screenshots",
          "blocks": [
            {
              "type": "heading",
              "text": "Librarian dashboard"
            },
            {
              "type": "image",
              "src": "assets/library/librarian-dashboard.webp",
              "alt": "Librarian dashboard"
            },
            {
              "type": "paragraph",
              "text": "Book and user management, borrowing and return controls."
            },
            {
              "type": "heading",
              "text": "Student dashboard"
            },
            {
              "type": "image",
              "src": "assets/library/student-dashboard.webp",
              "alt": "Student dashboard"
            },
            {
              "type": "paragraph",
              "text": "Borrowing, returns and account access."
            },
            {
              "type": "heading",
              "text": "Catalogue management"
            },
            {
              "type": "image",
              "src": "assets/library/manage-books.webp",
              "alt": "Catalogue management"
            },
            {
              "type": "paragraph",
              "text": "Search, create, update and delete book records."
            },
            {
              "type": "heading",
              "text": "Account & overdue fines"
            },
            {
              "type": "image",
              "src": "assets/library/account-fines.webp",
              "alt": "Account & overdue fines"
            },
            {
              "type": "paragraph",
              "text": "Loan history, payment status and outstanding fines."
            },
            {
              "type": "heading",
              "text": "Book returns"
            },
            {
              "type": "image",
              "src": "assets/library/return-book.webp",
              "alt": "Book returns"
            },
            {
              "type": "paragraph",
              "text": "Return workflow and application feedback."
            },
            {
              "type": "link",
              "text": "**View all screenshots ↗**"
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Introduce transactional persistence.** Store related catalogue, loan and return changes behind one commit boundary so partial updates cannot leave records out of sync.",
                "**Abstract time-dependent behaviour.** Inject a clock into fine calculations so loan-period boundaries can be tested reliably.",
                "**Expand automated regression coverage.** Add tests for repeated borrowing/returns, missing records, fine thresholds and persistence round trips.",
                "**Make operation results more explicit.** Return structured success/error results from domain operations so the UI can handle failures consistently.",
                "**Strengthen file recovery.** Add clearer handling for malformed or partially missing persisted records."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The project reinforced that a useful interface depends on consistent behaviour underneath it. A single return action can affect stock, active loans, fines and transaction history, so the quality of the workflow depends on coordinating those records rather than simply wiring up controls."
            },
            {
              "type": "paragraph",
              "text": "The Windows Forms extension introduced a second lesson: adopting a new interface technology does not always require replacing the existing system. C++/CLI made it possible to reuse the native C++ implementation while adding a managed desktop layer around it."
            },
            {
              "type": "paragraph",
              "text": "Together, those two parts of the project strengthened my understanding of both **stateful domain workflows** and **integration across language/runtime boundaries**."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Engineering report**",
              "description": "Requirements, design approach, implementation and original interface screenshots.",
              "url": "assets/library/engineering-report.pdf"
            },
            {
              "type": "resource",
              "label": "**Application screenshots**",
              "description": "Librarian and student dashboards, catalogue management, account fines and return workflows.",
              "url": "#case-section-10"
            },
            {
              "type": "resource",
              "label": "**Source repository**",
              "description": "Native C++ logic and the Windows Forms integration project.",
              "url": "https://github.com/Evan-Balson/SD2-Library-MS-GUI-Cpp"
            }
          ]
        }
      ],
      "github": "https://github.com/Evan-Balson/SD2-Library-MS-GUI-Cpp",
      "layout": "portfolio",
      "quickFacts": [],
      "headerEyebrow": "COMPLETED PROJECT / SOFTWARE ENGINEERING",
      "headerMeta": "Individual academic project · April 2024",
      "headerStack": "C++ · C++/CLI · Windows Forms · .NET Framework · Local file persistence"
    },
    {
      "id": "footballer-skills",
      "title": "Footballer Skills Evaluator",
      "category": "Software Engineering",
      "kind": "archive",
      "tagline": "A Python desktop application that turns player attributes into consistent ratings, salary bands and exportable records, extended from a command-line program into a multi-screen Kivy interface.",
      "description": "Built a Python player evaluator, then extended the Year 1 CLI brief with Kivy/KivyMD screens for entry, updates and results. Current isolated checks cover six date cases and eight salary-band scenarios across both new-player and update paths.",
      "tech": [
        "Python",
        "Kivy",
        "KivyMD",
        "File I/O"
      ],
      "highlights": [
        "Extended a Year 1 CLI brief with a usability experiment",
        "Learned GUI frameworks through a working application",
        "Connected player entry, validation, results and export"
      ],
      "real": true,
      "status": "Academic prototype",
      "type": "Individual academic project",
      "date": "2023–2024",
      "image": "assets/football-evaluator/live-ui/welcome.webp",
      "imageAlt": "Footballer Skills application welcome screen with its original football-themed background",
      "visualLabel": "CAPTURED APPLICATION / KIVY",
      "evidenceLabel": "GUI source & screenshots",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Footballer Skills Evaluator began as a Year 1 command-line project for assessing football players from six attributes: speed, shooting, passing, defending, dribbling and physicality."
            },
            {
              "type": "paragraph",
              "text": "Each attribute is rated from 0–5. Together, those values produce an overall score and corresponding salary band according to defined rules."
            },
            {
              "type": "paragraph",
              "text": "The core engineering challenge was making those rules predictable across data entry, validation, calculation and saved player records. Extending the project into a desktop application added a second challenge: preserving the same behaviour while moving from a linear terminal workflow to an event-driven interface where users could navigate between screens and update existing players."
            }
          ]
        },
        {
          "title": "My Role",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The project was designed and implemented independently, covering both the original Python logic and the later graphical extension."
            },
            {
              "type": "paragraph",
              "text": "My work included:"
            },
            {
              "type": "list",
              "items": [
                "player-rating and salary calculations",
                "input and date validation",
                "player lookup and update workflows",
                "local record import and export",
                "multi-screen Kivy/KivyMD interface development",
                "result tables and user feedback",
                "focused tests around calculation and validation boundaries"
              ]
            },
            {
              "type": "paragraph",
              "text": "The graphical application was a self-directed extension beyond the required CLI deliverable and became an opportunity to learn event-driven desktop development through a working application."
            }
          ]
        },
        {
          "title": "System Overview",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The evaluator separates the rules used to calculate player results from the interface that collects and presents the data."
            },
            {
              "type": "paragraph",
              "text": "Calculation functions handle skill totals, score normalisation and salary selection, while the Kivy interface guides users through player lookup, data entry, rating, results and export."
            },
            {
              "type": "paragraph",
              "text": "**Player details → validation → six skill ratings → overall score → salary band → record / export**"
            },
            {
              "type": "paragraph",
              "text": "Kivy's `ScreenManager` provides the navigation between stages of the workflow, with dedicated screens responsible for player details, ratings, results and record views."
            },
            {
              "type": "paragraph",
              "text": "This allowed the same evaluation rules to support both the original command-line workflow and the later graphical application."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Turning Ratings into Consistent Results",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The central calculation starts with six ratings between 0 and 5, giving a maximum total of 30."
            },
            {
              "type": "paragraph",
              "text": "That total is normalised to a score out of 100:"
            },
            {
              "type": "paragraph",
              "text": "**overall rating = total skill score × 100 / 30**"
            },
            {
              "type": "paragraph",
              "text": "The resulting score is then mapped to a salary band according to the rules defined for the project."
            },
            {
              "type": "paragraph",
              "text": "Although the calculation itself is relatively small, the boundaries matter. Exact threshold values need to produce the intended salary result just as reliably as values between those thresholds."
            },
            {
              "type": "paragraph",
              "text": "Keeping the calculation in dedicated functions made those rules easier to reason about and test independently from user input or screen navigation."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Validation at the Boundaries",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Player evaluation is only meaningful if the data entering the calculation is valid."
            },
            {
              "type": "paragraph",
              "text": "Skill ratings are checked against their allowed range before results are derived, while player dates require both the expected format and a valid calendar value."
            },
            {
              "type": "paragraph",
              "text": "A string can resemble a correctly formatted date while still representing something impossible, such as an invalid leap day. Combining format checks with Python's date parsing allowed both cases to be handled."
            },
            {
              "type": "paragraph",
              "text": "This reinforced an early but important engineering principle: validating the shape of input is not always the same as validating its meaning."
            }
          ]
        },
        {
          "title": "Self-Directed Extension: From CLI to Kivy",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The required coursework deliverable was a command-line application. The graphical version was developed as an additional experiment in usability and event-driven programming."
            },
            {
              "type": "paragraph",
              "text": "Instead of entering every value through one terminal sequence, users could move through dedicated screens for:"
            },
            {
              "type": "list",
              "items": [
                "player lookup",
                "new-player details",
                "skill ratings",
                "existing-player updates",
                "calculated results",
                "player overview",
                "export"
              ]
            },
            {
              "type": "paragraph",
              "text": "Moving to a GUI changed the structure of the problem."
            },
            {
              "type": "paragraph",
              "text": "The CLI naturally controlled the order in which values were entered. In Kivy, navigation, button events and existing-player updates meant application state had to remain coherent across several screens."
            },
            {
              "type": "paragraph",
              "text": "`ScreenManager` provided the navigation structure, while shared player data connected the individual stages of the workflow."
            },
            {
              "type": "paragraph",
              "text": "The extension therefore became more than a visual redesign: it introduced a different interaction model and required the original evaluation logic to work within it."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Player Records & Updates",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The application supports both creating new player records and retrieving existing players for review or update."
            },
            {
              "type": "paragraph",
              "text": "Player information is carried through the rating workflow and presented in a KivyMD table, while local file operations provide a straightforward way to import and export records."
            },
            {
              "type": "paragraph",
              "text": "This gave the prototype a complete data path:"
            },
            {
              "type": "paragraph",
              "text": "**load records → find/create player → enter ratings → calculate result → review → export**"
            },
            {
              "type": "paragraph",
              "text": "For the scale of the project, local files kept persistence simple and inspectable while allowing the application to demonstrate more than a single-use calculation."
            }
          ]
        },
        {
          "title": "Testing & Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Focused checks covered the parts of the application where boundary behaviour mattered most."
            },
            {
              "type": "paragraph",
              "text": "Eight checks exercised rating totals, score normalisation and salary thresholds, while six covered date validation, including valid leap days, invalid dates, incorrect months and malformed input."
            },
            {
              "type": "paragraph",
              "text": "The graphical workflow was also exercised across player lookup, new and existing records, result display and the player table."
            },
            {
              "type": "paragraph",
              "text": "These checks gave the strongest validation to the deterministic parts of the application: calculation rules and input boundaries."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The completed application supported:"
            },
            {
              "type": "list",
              "items": [
                "new and existing player lookup",
                "six-attribute skill evaluation",
                "overall player ratings",
                "salary-band calculation",
                "date and rating validation",
                "player record updates",
                "tabulated player overviews",
                "local import and export",
                "a multi-screen desktop workflow"
              ]
            },
            {
              "type": "paragraph",
              "text": "The project started as a small command-line calculation problem and grew into a complete desktop workflow around the same core rules."
            },
            {
              "type": "paragraph",
              "text": "Its strongest outcome was the progression from implementing deterministic Python logic to integrating that logic into an event-driven interface with navigation, persistent records and update paths."
            }
          ]
        },
        {
          "title": "Application Screenshots",
          "blocks": [
            {
              "type": "heading",
              "text": "Player lookup"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/welcome.webp",
              "alt": "Player lookup"
            },
            {
              "type": "paragraph",
              "text": "Entry point for finding an existing player or beginning a new record."
            },
            {
              "type": "heading",
              "text": "New-player details"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/new-player.webp",
              "alt": "New-player details"
            },
            {
              "type": "paragraph",
              "text": "Player information captured before evaluation."
            },
            {
              "type": "heading",
              "text": "Six core skill ratings"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/player-ratings.webp",
              "alt": "Six core skill ratings"
            },
            {
              "type": "paragraph",
              "text": "Speed, shooting, passing, defending, dribbling and physicality."
            },
            {
              "type": "heading",
              "text": "Existing-player workflow"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/existing-player.webp",
              "alt": "Existing-player workflow"
            },
            {
              "type": "paragraph",
              "text": "Existing record retrieval and review."
            },
            {
              "type": "heading",
              "text": "Update ratings"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/update-ratings.webp",
              "alt": "Update ratings"
            },
            {
              "type": "paragraph",
              "text": "Editing player attributes through the desktop interface."
            },
            {
              "type": "heading",
              "text": "Evaluation result"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/calculation.webp",
              "alt": "Evaluation result"
            },
            {
              "type": "paragraph",
              "text": "Calculated overall rating and salary result."
            },
            {
              "type": "heading",
              "text": "Player overview"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/player-table.webp",
              "alt": "Player overview"
            },
            {
              "type": "paragraph",
              "text": "KivyMD table displaying imported player records."
            },
            {
              "type": "heading",
              "text": "Save results"
            },
            {
              "type": "image",
              "src": "assets/football-evaluator/live-ui/export.webp",
              "alt": "Save results"
            },
            {
              "type": "paragraph",
              "text": "Export workflow for player data."
            },
            {
              "type": "link",
              "text": "**View all screenshots ↗**"
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Introduce a player record model.** Replace parallel collections with a single structured representation for each player.",
                "**Centralise evaluation rules.** Keep salary and rating logic behind one reusable service so new and existing player workflows use the same path.",
                "**Strengthen record validation.** Validate imported data before allowing it to update application state.",
                "**Expand workflow testing.** Add automated checks around record updates, navigation and import/export round trips."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "This project showed how quickly a small calculation can become a broader software-design problem once it is placed inside a complete user workflow."
            },
            {
              "type": "paragraph",
              "text": "The original CLI made the evaluation rules clear, while the graphical extension introduced state, events and navigation. Moving between those two approaches helped me understand why core application logic should remain independent from the way users interact with it."
            },
            {
              "type": "paragraph",
              "text": "Learning Kivy also provided an early example of using a project to explore unfamiliar technology. Rather than rebuilding the idea around the framework, the GUI was added around working Python rules, allowing the focus to remain on how a different interface model could reuse the same underlying behaviour."
            },
            {
              "type": "paragraph",
              "text": "The result was an early but important step from writing individual functions toward thinking about how data, rules and interface state work together across an application."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Engineering report**",
              "description": "Requirements, implementation approach and the CLI-to-GUI extension.",
              "url": "assets/football-evaluator/engineering-report.pdf"
            },
            {
              "type": "resource",
              "label": "**Original flowcharts**",
              "description": "Planning for input, calculation and file workflows.",
              "url": "assets/football-evaluator/original-flowcharts.pdf"
            },
            {
              "type": "resource",
              "label": "**Application screenshots**",
              "description": "Player lookup, rating, update, results and export screens.",
              "url": "#case-section-10"
            },
            {
              "type": "resource",
              "label": "**Source repository**",
              "description": "Python/Kivy implementation and project documentation.",
              "url": "https://github.com/Evan-Balson/Footballer-Skills--GUI-Using-Kivy"
            }
          ]
        }
      ],
      "github": "https://github.com/Evan-Balson/Footballer-Skills--GUI-Using-Kivy",
      "layout": "portfolio",
      "quickFacts": [],
      "headerEyebrow": "COMPLETED PROJECT / SOFTWARE ENGINEERING",
      "headerMeta": "Individual academic project · 2023–2024",
      "headerStack": "Python · Kivy · KivyMD · datetime · Local file I/O"
    },
    {
      "id": "cinema-database",
      "title": "Cinema Database Design & Implementation",
      "category": "Data & Databases",
      "kind": "archive",
      "tagline": "A relational database for a fictional multi-branch cinema business, modelling customers, staff, films, licences, tickets, payments, transactions and related operations.",
      "description": "Led team coordination and populated transaction-related records for an 18-table cinema database. The technical work focused on consistent identifiers across payments, tickets and transactions, supported by ER/physical models, SQL constraints and manual database checks.",
      "tech": [
        "SQL",
        "MySQL / MariaDB",
        "phpMyAdmin",
        "ER modelling"
      ],
      "highlights": [
        "Led team coordination from design to implementation",
        "Populated and checked connected transaction records",
        "Translated relationships into keys and junction tables"
      ],
      "real": true,
      "status": "Academic prototype",
      "type": "Team academic project",
      "date": "2024",
      "image": "assets/cinema-database/schema-tables.webp",
      "imageAlt": "phpMyAdmin showing the cinema database tables created for the project",
      "visualLabel": "IMPLEMENTED DATABASE / PHPMYADMIN",
      "evidenceLabel": "SQL & report evidence",
      "sections": [
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Visual Studio Prime was designed around a fictional cinema business operating across multiple branches."
            },
            {
              "type": "paragraph",
              "text": "The business scenario included customers, staff, memberships, film licences, ticket purchases, payments and themed stores. Representing those records as independent lists would lose the relationships needed to answer even basic operational questions, such as which customer completed a transaction, which film was involved, how the purchase was paid for, or which staff member handled it."
            },
            {
              "type": "paragraph",
              "text": "The core challenge was therefore relational: turning a broad business scenario into a structured database where entities, dependencies and many-to-many relationships were explicit and could be implemented consistently in SQL."
            }
          ]
        },
        {
          "title": "My Role",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The project was completed as a team, with my contribution spanning both coordination and database implementation."
            },
            {
              "type": "paragraph",
              "text": "My technical work focused on populating roughly half of the database tables, particularly transaction-related records, reviewing relationships between dependent data and checking that connected records could be queried coherently."
            },
            {
              "type": "paragraph",
              "text": "Team coordination also formed part of the work, helping keep the conceptual design, physical model and SQL implementation moving toward the same shared structure."
            },
            {
              "type": "paragraph",
              "text": "This made the project a practical exercise in more than inserting data. Every dependent record had to fit the relationships defined elsewhere in the schema."
            }
          ]
        },
        {
          "title": "Database Design",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The design moved from business activities into progressively more concrete representations of the data."
            },
            {
              "type": "paragraph",
              "text": "A conceptual ERD first identified the main entities and cardinalities. The physical model then defined table structures, identifiers, data types and relationships before those decisions were implemented in SQL."
            },
            {
              "type": "paragraph",
              "text": "The delivered database contained 18 InnoDB tables."
            },
            {
              "type": "paragraph",
              "text": "Core relationships connected:"
            },
            {
              "type": "list",
              "items": [
                "customers to transactions",
                "transactions to films and offers",
                "tickets and payment methods to transactions",
                "films to categories",
                "employees to transactions",
                "licences to cinema departments and branches",
                "transactions to themed stores"
              ]
            },
            {
              "type": "paragraph",
              "text": "This produced a model where business operations could be traced through related records rather than reconstructed from duplicated information."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Modelling Relationships",
          "blocks": [
            {
              "type": "paragraph",
              "text": "One of the most important design decisions was identifying where direct foreign-key relationships were sufficient and where junction tables were needed."
            },
            {
              "type": "paragraph",
              "text": "For example, a film can belong to multiple categories, while each category can contain multiple films. Representing that relationship directly inside either table would introduce duplication or restrict the model."
            },
            {
              "type": "paragraph",
              "text": "A dedicated `film_category` junction table instead connects the two entities through their identifiers."
            },
            {
              "type": "paragraph",
              "text": "The same principle was applied where other many-to-many relationships appeared in the business model."
            },
            {
              "type": "paragraph",
              "text": "This made the relational structure more flexible and kept reusable records such as films, categories and employees separate from the relationships between them."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Referential Integrity",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Once the relationships were defined, data had to be inserted in an order that respected those dependencies."
            },
            {
              "type": "paragraph",
              "text": "A transaction could reference existing customers, films or offers, while ticket and payment records depended on valid transactions already being present."
            },
            {
              "type": "paragraph",
              "text": "That created a natural parent-child structure across the data."
            },
            {
              "type": "paragraph",
              "text": "**parent records → transaction → dependent ticket / payment records**"
            },
            {
              "type": "paragraph",
              "text": "Primary keys identified individual records, while foreign-key constraints expressed the relationships between them."
            },
            {
              "type": "paragraph",
              "text": "Working with connected sample data made those constraints practical rather than theoretical. A mismatched identifier in one table could affect several related operations, so checking groups of related records was more useful than inspecting each table in isolation."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Turning a Business Scenario into a Manageable Schema",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The original cinema scenario contained more potential entities and business processes than were necessary for the coursework implementation."
            },
            {
              "type": "paragraph",
              "text": "The design therefore required scope decisions as well as normalization."
            },
            {
              "type": "paragraph",
              "text": "The aim was to retain the relationships needed to represent meaningful cinema operations while keeping the schema understandable enough to implement, populate and query within the project."
            },
            {
              "type": "paragraph",
              "text": "This process turned broad requirements into a relational structure with clearly defined entities, identifiers and associations."
            },
            {
              "type": "paragraph",
              "text": "It also reinforced an important database-design principle: a useful schema does not model every possible detail of a business. It models the relationships required to support the operations within scope."
            }
          ]
        },
        {
          "title": "Sample Data & Implementation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Populating the database required more than creating realistic-looking rows."
            },
            {
              "type": "paragraph",
              "text": "Related records had to use compatible identifiers so that transactions, payment methods, tickets, employees and other dependent entities formed meaningful chains across the database."
            },
            {
              "type": "paragraph",
              "text": "A typical transaction path could therefore be followed through multiple tables:"
            },
            {
              "type": "paragraph",
              "text": "**customer → transaction → payment / ticket → related film or offer**"
            },
            {
              "type": "paragraph",
              "text": "Working with these relationships helped make the consequences of the ERD concrete. Decisions made during modelling directly affected insertion order, foreign-key references and the joins required to retrieve useful information."
            }
          ]
        },
        {
          "title": "Team Workflow",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Development took place across local database environments, with phpMyAdmin exports used to share schema and sample-data changes between team members."
            },
            {
              "type": "paragraph",
              "text": "This provided a practical way to combine work produced on separate development machines while preserving the database structure and records."
            },
            {
              "type": "paragraph",
              "text": "The process also highlighted the importance of keeping everyone aligned around the same schema. Column names, identifiers and relationship assumptions needed to remain consistent so separately produced SQL could integrate cleanly."
            },
            {
              "type": "paragraph",
              "text": "That experience made schema coordination an important part of the project rather than treating database work as a collection of independent scripts."
            }
          ]
        },
        {
          "title": "Validation",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Validation focused on whether the implemented tables, relationships and sample records matched the intended relational design."
            },
            {
              "type": "paragraph",
              "text": "phpMyAdmin was used to inspect populated tables and verify that related records could be traced through their keys."
            },
            {
              "type": "paragraph",
              "text": "Queries were also used to examine how the implemented relationships behaved and whether the schema supported the intended business data."
            },
            {
              "type": "paragraph",
              "text": "The most useful checks were those that crossed table boundaries, because they tested whether the relationships themselves were meaningful rather than merely confirming that individual rows existed."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The project produced:"
            },
            {
              "type": "list",
              "items": [
                "an 18-table relational database",
                "a conceptual ERD",
                "a physical data model",
                "primary and foreign-key relationships",
                "many-to-many junction tables",
                "connected sample data",
                "SQL implementation and validation queries"
              ]
            },
            {
              "type": "paragraph",
              "text": "The finished schema connected customer, film, employee, ticket, payment and transaction data into one relational model."
            },
            {
              "type": "paragraph",
              "text": "For me, the strongest outcome was seeing how database design decisions affect implementation directly. Cardinalities became foreign keys, many-to-many relationships became junction tables, and sample-data insertion exposed whether those relationships actually worked together as intended."
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Introduce versioned migrations.** Replace manual schema snapshots with ordered migration files so structural changes are easier to review and reproduce.",
                "**Create reproducible seed data.** Use scripted datasets to rebuild connected test records consistently across environments.",
                "**Automate integrity checks.** Add repeatable tests for valid and invalid foreign-key relationships instead of relying primarily on manual inspection.",
                "**Keep design and implementation synchronized.** Treat changes to the ERD, physical model and executable schema as one database change.",
                "**Expand query analysis.** Use representative joins and execution plans to evaluate indexing and performance as the dataset grows."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "This project made relational database design much more concrete."
            },
            {
              "type": "paragraph",
              "text": "A relationship drawn on an ERD eventually becomes a foreign key, an insertion dependency and a join that other parts of the system rely on. Working with connected sample data made it clear that database quality depends not only on individual table definitions, but on whether the relationships between those tables remain coherent."
            },
            {
              "type": "paragraph",
              "text": "Normalization also became easier to understand through implementation. Separating reusable entities and representing many-to-many associations through junction tables reduced duplication while making the underlying business relationships explicit."
            },
            {
              "type": "paragraph",
              "text": "The team workflow added another lesson: database structure needs a shared source of truth. When several people contribute to the same schema, consistent naming, schema versions and reproducible data become as important as the SQL itself."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Conceptual ERD**",
              "description": "Entities, cardinalities and business relationships.",
              "url": "assets/cinema-database/architecture-diagrams.pdf"
            },
            {
              "type": "resource",
              "label": "**Physical data model**",
              "description": "Tables, identifiers, data types and relational structure.",
              "url": "assets/cinema-database/physical-model.webp"
            },
            {
              "type": "resource",
              "label": "**Implemented database**",
              "description": "The completed 18-table MariaDB schema.",
              "url": "assets/cinema-database/schema-tables.webp"
            },
            {
              "type": "resource",
              "label": "**Sample data**",
              "description": "Connected transaction, payment, ticket and related business records.",
              "url": "assets/cinema-database/payment-methods.webp"
            },
            {
              "type": "resource",
              "label": "**SQL implementation**",
              "description": "DDL, insert scripts and supporting database queries.",
              "url": "https://github.com/Evan-Balson/Visual-Studio-Prime_Database-Design"
            }
          ]
        }
      ],
      "github": "https://github.com/Evan-Balson/Visual-Studio-Prime_Database-Design",
      "layout": "portfolio",
      "quickFacts": [],
      "headerEyebrow": "COMPLETED PROJECT / DATABASE DESIGN",
      "headerMeta": "Team academic project · Database design & implementation",
      "headerStack": "SQL · MariaDB · InnoDB · phpMyAdmin · XAMPP · draw.io",
      "hideHeroAction": true
    },
    {
      "id": "assembly-calculator",
      "title": "AsmCalc · Assembly Fundamentals",
      "category": "Systems & Low-level",
      "kind": "archive",
      "tagline": "A collection of NASM exercises exploring arithmetic, registers, control flow, loops, subroutines and low-level input/output.",
      "description": "Explored how arithmetic and control flow translate into register instructions, branches and subroutine calls. The repository collects 21 standalone assembly exercises and documents a NASM/GCC workflow.",
      "tech": [
        "Assembly",
        "NASM",
        "GCC",
        "Ubuntu"
      ],
      "highlights": [
        "Implemented arithmetic and control-flow exercises",
        "Worked with registers, stack arguments and subroutines",
        "Documented an Ubuntu assembler/linker workflow"
      ],
      "real": true,
      "status": "Completed coursework exercises",
      "type": "Individual coursework",
      "date": "2024",
      "image": "assets/assembly-calculator/repository-cover.webp",
      "imageAlt": "Original AsmCalc repository graphic introducing assembly-language exercises",
      "visualLabel": "ORIGINAL REPOSITORY OVERVIEW",
      "evidenceLabel": "Assembly source & README",
      "sections": [
        {
          "title": "Overview",
          "blocks": [
            {
              "type": "paragraph",
              "text": "AsmCalc is a collection of focused assembly-language programs built to understand what happens beneath higher-level expressions and control structures."
            },
            {
              "type": "paragraph",
              "text": "Across 21 source files, the exercises cover arithmetic, comparisons, conditional jumps, loops, subroutines and console input/output. Rather than forming one large application, each program isolates a particular low-level operation so its behaviour can be inspected directly."
            },
            {
              "type": "paragraph",
              "text": "The project provided an early foundation in how values move through registers, how control flow is expressed through jumps and labels, and how assembly code interacts with the surrounding runtime."
            }
          ]
        },
        {
          "title": "The Problem",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Operations that appear simple in a higher-level language hide a large amount of behaviour."
            },
            {
              "type": "paragraph",
              "text": "An expression such as:"
            },
            {
              "type": "paragraph",
              "text": "`result = a + b`"
            },
            {
              "type": "paragraph",
              "text": "does not expose where the operands are stored, which instruction performs the operation, how the result is passed to another function, or how execution proceeds afterwards."
            },
            {
              "type": "paragraph",
              "text": "Assembly makes those steps explicit."
            },
            {
              "type": "paragraph",
              "text": "The exercises therefore focused on translating familiar programming concepts into instructions, registers and branches, making the mechanics of computation easier to inspect."
            }
          ]
        },
        {
          "title": "What I Built",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The collection includes programs covering:"
            },
            {
              "type": "list",
              "items": [
                "addition, subtraction, multiplication and division",
                "register-based arithmetic",
                "numeric comparisons",
                "conditional branching",
                "repeated execution through loops",
                "subroutine calls",
                "console input and formatted output",
                "numeric classification exercises",
                "coursework problems involving calculated totals and conditions"
              ]
            },
            {
              "type": "paragraph",
              "text": "Each program concentrates on a small behaviour rather than hiding several concepts behind a larger application structure."
            },
            {
              "type": "paragraph",
              "text": "That made the repository useful as a progression from individual instructions toward complete control-flow routines."
            }
          ]
        },
        {
          "title": "Understanding Arithmetic at Register Level",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Arithmetic exercises use registers to hold and manipulate values directly."
            },
            {
              "type": "paragraph",
              "text": "For example, addition requires loading an operand, applying the arithmetic instruction and then preparing the result for output:"
            },
            {
              "type": "code",
              "language": "asm",
              "text": "mov eax, [A]\nadd eax, [B]\n\npush eax\npush msg\ncall printf"
            },
            {
              "type": "paragraph",
              "text": "What would normally be one expression in Python, Java or C becomes a sequence of explicit data movements and operations."
            },
            {
              "type": "paragraph",
              "text": "Working at this level helped connect higher-level arithmetic with the processor-oriented instructions that ultimately implement it."
            }
          ]
        },
        {
          "title": "Engineering Challenge: Explicit Control Flow",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Assembly also removes many of the abstractions normally provided by structured language syntax."
            },
            {
              "type": "paragraph",
              "text": "Conditions are expressed through comparisons and jumps, while loops are built by controlling where execution continues."
            },
            {
              "type": "paragraph",
              "text": "Instead of writing a high-level construct such as:"
            },
            {
              "type": "paragraph",
              "text": "`if value > limit`"
            },
            {
              "type": "paragraph",
              "text": "the program must compare values, interpret the processor flags and branch to the appropriate label."
            },
            {
              "type": "paragraph",
              "text": "The same principle applies to repeated operations: loop behaviour is created through labels, counters and conditional jumps rather than through a built-in `for` or `while` structure."
            },
            {
              "type": "paragraph",
              "text": "This made control flow much more tangible and helped build an understanding of how higher-level language constructs map onto lower-level execution."
            }
          ]
        },
        {
          "title": "Subroutines & Program Structure",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Several exercises move repeated or logically distinct behaviour into separate routines."
            },
            {
              "type": "paragraph",
              "text": "Subroutine calls introduce another important part of low-level programming: control must move to another section of code and then return to the caller while preserving the information needed for the surrounding program."
            },
            {
              "type": "paragraph",
              "text": "Working with these routines provided an introduction to concepts that later appear more formally in calling conventions, stack management and compiled program structure."
            }
          ]
        },
        {
          "title": "Input, Output & Runtime Interaction",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The programs also connect assembly instructions to visible input and output."
            },
            {
              "type": "paragraph",
              "text": "Examples use routines such as `printf` and `scanf`, requiring values to be prepared in the form expected by those functions before control is transferred to them."
            },
            {
              "type": "paragraph",
              "text": "This made the boundary between assembly code and existing runtime libraries visible."
            },
            {
              "type": "paragraph",
              "text": "Rather than treating output as a single language feature, the exercises exposed the steps involved in preparing arguments, invoking another routine and continuing execution afterwards."
            }
          ]
        },
        {
          "title": "Development Environment",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The exercises were developed around an Ubuntu environment using NASM and GCC."
            },
            {
              "type": "paragraph",
              "text": "That workflow introduced the distinction between writing source code and producing something the operating system can execute:"
            },
            {
              "type": "paragraph",
              "text": "**assembly source → assembler → object file → linker → executable**"
            },
            {
              "type": "paragraph",
              "text": "Understanding that toolchain was another useful part of the project because it exposed compilation and linking stages that higher-level development environments often handle automatically."
            }
          ]
        },
        {
          "title": "Outcome",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The completed repository contains 21 assembly-language exercises covering arithmetic, branching, loops, subroutines and low-level I/O."
            },
            {
              "type": "paragraph",
              "text": "The project was intentionally small in application scope, but useful in technical scope. It provided direct experience with:"
            },
            {
              "type": "list",
              "items": [
                "register manipulation",
                "arithmetic instructions",
                "comparisons and processor-driven branching",
                "labels and loops",
                "subroutine calls",
                "stack-based argument passing",
                "interaction with runtime functions",
                "assembling and linking native programs"
              ]
            },
            {
              "type": "paragraph",
              "text": "Most importantly, it connected programming concepts already familiar from higher-level languages to the operations used to implement them at a lower level."
            }
          ]
        },
        {
          "title": "What I Would Improve",
          "blocks": [
            {
              "type": "list",
              "items": [
                "**Standardise the build target.** Document one consistent target architecture and matching NASM/GCC commands across the repository.",
                "**Add reproducible builds.** Provide a simple build script or Makefile for assembling and linking each example.",
                "**Add expected-output checks.** Pair representative exercises with known inputs and outputs so behaviour can be verified consistently.",
                "**Organise exercises by concept.** Group arithmetic, branching, loops, subroutines and I/O into a clearer learning progression.",
                "**Build a small integrated program.** After validating the individual operations, combine them into a single interactive calculator or command-line utility."
              ]
            }
          ]
        },
        {
          "title": "Reflection",
          "blocks": [
            {
              "type": "paragraph",
              "text": "AsmCalc helped make the relationship between source code and processor-level execution more concrete."
            },
            {
              "type": "paragraph",
              "text": "Arithmetic became register operations, conditions became comparisons and jumps, and loops became explicit changes in control flow. Even console output required understanding how values were prepared and passed into another routine."
            },
            {
              "type": "paragraph",
              "text": "The project also gave me an early appreciation for abstractions. Higher-level languages remove a great deal of mechanical detail, but understanding some of that detail makes concepts such as stack usage, calling conventions, compilation and runtime behaviour easier to reason about later."
            },
            {
              "type": "paragraph",
              "text": "For a small coursework collection, that was the main value: not the complexity of the finished programs, but the clearer mental model of what happens underneath the software built at higher levels."
            }
          ]
        },
        {
          "title": "Evidence",
          "blocks": [
            {
              "type": "resource",
              "label": "**Source repository**",
              "description": "Twenty-one NASM source files covering arithmetic and control-flow exercises.",
              "url": "https://github.com/Evan-Balson/AsmCalc-Exploring-Assembly-Language-Calculations"
            },
            {
              "type": "resource",
              "label": "**Repository overview**",
              "description": "Original documentation describing the exercise collection and development environment.",
              "url": "https://github.com/Evan-Balson/AsmCalc-Exploring-Assembly-Language-Calculations#readme"
            },
            {
              "type": "resource",
              "label": "**Assembly examples**",
              "description": "Focused implementations of arithmetic, loops, branching, I/O and subroutines.",
              "url": "https://github.com/Evan-Balson/AsmCalc-Exploring-Assembly-Language-Calculations"
            }
          ]
        }
      ],
      "github": "https://github.com/Evan-Balson/AsmCalc-Exploring-Assembly-Language-Calculations",
      "galleryLabel": "View repository overview",
      "headerEyebrow": "COMPLETED PROJECT / SYSTEMS & LOW-LEVEL PROGRAMMING",
      "headerMeta": "Individual coursework · 2024",
      "headerStack": "Assembly · NASM · GCC · Ubuntu",
      "quickFacts": [],
      "heroActionLabel": "View repository overview",
      "heroActionUrl": "https://github.com/Evan-Balson/AsmCalc-Exploring-Assembly-Language-Calculations#readme"
    }
  ],
  "capabilities": [
    {
      "icon": "code",
      "title": "Languages & Formats",
      "items": [
        "C",
        "C#",
        "C++",
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "PHP",
        "SQL",
        "Assembly",
        "XML",
        "JSON",
        "SCPI commands",
        "Shell / Batch scripts"
      ]
    },
    {
      "icon": "testing",
      "title": "Frameworks & Testing",
      "items": [
        ".NET",
        "React",
        "Node.js",
        "PyTorch",
        "TensorFlow",
        "Playwright",
        "Pytest",
        "Jest",
        "Web UI",
        "CI/CD",
        "End-to-end testing",
        "Unit testing",
        "Simulation testing",
        "Hardware testing",
        "Remote testing",
        "Templating"
      ]
    },
    {
      "icon": "tools",
      "title": "Development Tools",
      "items": [
        "Git",
        "GitLab",
        "GitHub",
        "Jira",
        "Confluence",
        "Figma",
        "Visual Studio",
        "CMake",
        "VS Code",
        "IntelliJ",
        "Docker",
        "Linux",
        "NetBeans",
        "Virtual Machines",
        "PowerShell"
      ]
    },
    {
      "icon": "chip",
      "title": "AI & Machine Learning",
      "items": [
        "Inference optimisation",
        "Local LLM deployment",
        "CNN development",
        "Machine learning",
        "AI training",
        "Model evaluation",
        "Cloud AI services",
        "OpenAI GPTs",
        "Cursor",
        "Claude",
        "AI skills / rule development",
        "MCP servers",
        "Responsible AI development"
      ]
    },
    {
      "icon": "workplace",
      "title": "Other Tools",
      "items": [
        "Office 365",
        "SharePoint",
        "Teams",
        "HubSpot",
        "Google Workspace",
        "Azure",
        "Microsoft Dynamics 365"
      ]
    }
  ]
};
