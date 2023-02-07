import React from "react";
import BackEndIntegration from "./PaypalIntegration/IntegrationWithBackend";
import FrontEndIntegration from "./PaypalIntegration/IntegrationWithFrontEndOnly";

export default function PayPal() {
  return (
    <div>
      <BackEndIntegration />
    </div>
  );
}
