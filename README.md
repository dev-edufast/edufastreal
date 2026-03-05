# edufast
        
Create a professional, modern website for Edufast, an education company with the bold promise: “Get Your Degree in Just 6 Months.”

Branding & Theme
* Colors: white mode background with accents of orange and black (matching Edufast logo)
* Typography: Bold, confident fonts to build trust
* Style: Clean, modern, and university-like with trust-building visuals
* Include icons, infographics, and light 3D/animated elements for timelines & processes

Website Goals
* Build trust in the 6-month degree model
* Educate visitors on how the process works
* Capture leads (students & professionals)
* Convert leads into counseling bookings or applications

Target Audience
* Students seeking fast-track education
* Working professionals wanting career growth
* International students exploring alternative education models

Core Pages & Structure
* Homepage
  * Bold headline: “Get Your Degree in Just 6 Months with Edufast.”
  * Sub-headline: “Accredited, flexible, career-focused programs designed for ambitious learners.”
  * Strong CTA: “Apply Now” / “Book Free Counseling.”
  * Explainer: “How it works in 3 steps” (with icons/animations)
  * Testimonials & success stories
  * Trust signals (logos, accreditations, media mentions)
* About Us
  * Edufast story, mission, vision
  * Explanation of the 6-month model
  * Leadership & team section
* Programs / Degrees
  * Categories (Business, IT, Healthcare, Engineering, etc.)
  * For each: Duration, Eligibility, Mode (online/offline/hybrid), Fees/Scholarships, Career outcomes
  * CTA: “Enroll Now” / “Get Counseling.”
* How It Works
  * Step-by-step timeline with infographics/animations
* Success Stories
  * Student testimonials (photos/videos)
  * Case studies
  * Video interviews
* FAQs
  * Is the degree valid & recognized?
  * How is it possible in 6 months?
  * Can working professionals apply?
  * Fees & scholarships?
  * International students eligible?
* Blog / Resources
  * Articles like:
    * “Why Fast-Track Degrees Are the Future”
    * “How to Complete a Degree in 6 Months Without Stress”
    * “Top Careers That Value Skills Over Time”
* Contact / Apply Now
  * Lead form: Name, Email, WhatsApp, Program interested in
  * WhatsApp chat integration
  * Google Maps (if campus exists)
  * Big, visible phone & email
* Extra Features
  * Explainer video on homepage
  * 3D animated process timeline
  * Lead capture popups → store in Google Sheets/CRM
* Conversion Flow
  * Visitor lands → sees 6-month USP
  * Scrolls to “How It Works”
  * Reads testimonials
  * CTA → Apply/Book Counseling
  * Lead captured → Edufast team follows up

Made with Floot.

# Instructions

For security reasons, the `env.json` file is not pre-populated — you will need to generate or retrieve the values yourself.  

For **JWT secrets**, generate a value with:  

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then paste the generated value into the appropriate field.  

For the **Floot Database**, download your database content as a pg_dump from the cog icon in the database view (right pane -> data -> floot data base -> cog icon on the left of the name), upload it to your own PostgreSQL database, and then fill in the connection string value.  

**Note:** Floot OAuth will not work in self-hosted environments.  

For other external services, retrieve your API keys and fill in the corresponding values.  

Once everything is configured, you can build and start the service with:  

```
npm install -g pnpm
pnpm install
pnpm vite build
pnpm tsx server.ts
```
