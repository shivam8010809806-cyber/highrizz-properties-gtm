(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var form = document.getElementById("enquiry-form");
  var formArea = document.getElementById("form-area");
  var successPanel = document.getElementById("success-panel");
  var formStatus = document.getElementById("form-status");
  var menuToggle = document.getElementById("menu-toggle");
  var siteNav = document.getElementById("site-nav");
  var selectedPlotType = "not_selected";

  function pushEvent(eventName, parameters) {
    var payload = Object.assign({ event: eventName }, parameters || {});
    window.dataLayer.push(payload);
    // Helpful for local learning even before a GTM container is installed.
    console.info("[Demo dataLayer event]", payload);
  }

  function getValue(id) {
    var element = document.getElementById(id);
    return element ? element.value.trim() : "";
  }

  function setError(id, message) {
    var error = document.getElementById(id + "-error");
    var input = document.getElementById(id);
    if (error) error.textContent = message || "";
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function clearErrors() {
    ["name", "phone", "budget", "purpose", "consent"].forEach(function (id) {
      setError(id, "");
    });
    formStatus.textContent = "";
  }

  function scrollToTarget(selector) {
    var target = document.querySelector(selector);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Track CTA clicks and take the visitor to the relevant section.
  document.querySelectorAll("[data-cta-text]").forEach(function (button) {
    button.addEventListener("click", function () {
      pushEvent("cta_click", {
        cta_text: button.getAttribute("data-cta-text") || "unknown",
        cta_location: button.getAttribute("data-cta-location") || "unknown",
        destination_section: button.getAttribute("data-scroll-target") || "unknown"
      });
      var target = button.getAttribute("data-scroll-target");
      if (target) scrollToTarget(target);
    });
  });

  // Track plot selection; selecting a plot also prefills the demo form's context.
  document.querySelectorAll(".plot-select").forEach(function (button) {
    button.addEventListener("click", function () {
      selectedPlotType = button.getAttribute("data-plot-type") || "unknown";
      pushEvent("plot_select", {
        plot_type: selectedPlotType,
        plot_name: button.getAttribute("data-plot-name") || "unknown",
        selection_location: "plot_options"
      });
      scrollToTarget("#contact");
    });
  });

  function validateForm() {
    clearErrors();
    var errors = [];
    var name = getValue("full-name");
    var phone = getValue("phone");
    var budget = getValue("budget");
    var purpose = form.querySelector('input[name="purchase_purpose"]:checked');
    var consent = document.getElementById("demo-consent").checked;

    if (name.length < 2) {
      setError("name", "Please enter your name (at least 2 characters).");
      errors.push("name");
    }
    // This is a demo validation rule, not a country-specific phone verification.
    var phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("phone", "Please enter a phone number with 7–15 digits.");
      errors.push("phone");
    }
    if (!budget) {
      setError("budget", "Please select a budget range.");
      errors.push("budget");
    }
    if (!purpose) {
      setError("purpose", "Please select a purchase purpose.");
      errors.push("purpose");
    }
    if (!consent) {
      setError("consent", "Please confirm that you understand this is a demo form.");
      errors.push("consent");
    }

    if (errors.length) {
      pushEvent("form_error", {
        form_name: "residential_plot_enquiry",
        error_type: "validation_error",
        error_fields: errors.join(","),
        error_count: errors.length
      });
      formStatus.textContent = "Please review the highlighted fields and try again.";
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return false;
    }

    return {
      budget_range: budget,
      purchase_purpose: purpose.value
    };
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var validData = validateForm();
    if (!validData) return;

    // Do not push names, phone numbers, emails, or other personal information to dataLayer/GA4.
    // This demo has no backend; success means the client-side demo flow completed.
    pushEvent("generate_lead", {
      form_name: "residential_plot_enquiry",
      property_type: "residential_plot",
      plot_type: selectedPlotType,
      budget_range: validData.budget_range,
      purchase_purpose: validData.purchase_purpose,
      submission_status: "demo_success"
    });

    formArea.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    selectedPlotType = "not_selected";
  });

  document.getElementById("new-enquiry").addEventListener("click", function () {
    successPanel.hidden = true;
    formArea.hidden = false;
    clearErrors();
    scrollToTarget("#contact");
    document.getElementById("full-name").focus({ preventScroll: true });
  });

  // Mobile navigation.
  menuToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();