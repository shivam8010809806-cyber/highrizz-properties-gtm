# HighRizz Properties — GTM Practice Landing Page

This is a fictional residential-plots landing page for educational Google Tag Manager (GTM) and Google Analytics 4 (GA4) practice.

## Files
- `index.html` — page structure and dataLayer initialization
- `styles.css` — responsive visual styling
- `script.js` — interactions, form validation, and dataLayer events

## Run locally
1. Extract this ZIP.
2. Open the folder in VS Code.
3. Use the Live Server extension, or serve the folder using any local static web server.
4. Open the local URL and test the buttons and form.
5. Open browser DevTools → Console to see `[Demo dataLayer event]` messages.

## Important: GTM is not installed yet
The project intentionally does not include a real GTM container ID. Create a Web container at https://tagmanager.google.com/ and follow Google's installation instructions:
- Add the official GTM script to the `<head>`.
- Add the official GTM `noscript` iframe immediately after the opening `<body>`.
- Replace the placeholder instructions with the actual snippet for your own container.

Do not publish with a placeholder ID. The website currently works as a front-end demo without GTM.

## DataLayer events implemented
- `demo_page_view` — pushed during page initialization
- `cta_click` — pushed when a CTA is clicked
- `plot_select` — pushed when a plot card enquiry button is clicked
- `form_error` — pushed when client-side form validation fails
- `generate_lead` — pushed after a valid demo form submission

## Suggested GTM setup
Create Custom Event triggers for:
- `cta_click`
- `plot_select`
- `form_error`
- `generate_lead`

Create Data Layer Variables as needed:
- `cta_text`
- `cta_location`
- `destination_section`
- `plot_type`
- `plot_name`
- `selection_location`
- `form_name`
- `error_type`
- `error_fields`
- `error_count`
- `property_type`
- `budget_range`
- `purchase_purpose`
- `submission_status`

Then create GA4 Event tags for the events you want to send. Make sure your Google tag / GA4 configuration is correct and test with GTM Preview and GA4 DebugView.

## Privacy and demo limitations
- The form is front-end only. It does not save data to a server or contact a sales team.
- Do not use real personal details while testing.
- The user's name and phone number are intentionally not sent to the dataLayer or GA4.
- Plot categories and all business copy are illustrative, not real listings or promises.
- `generate_lead` represents a successful demo flow, not a real commercial lead.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. Open repository Settings → Pages.
4. Choose deployment from the main branch and root folder.
5. Wait for GitHub Pages to provide the live URL.
6. Install your real GTM container before testing hosted tracking.
