import axios from "axios";

// Fetch symptoms data from the endpoint
const getSymptomsData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/symptoms');
    const symptomsData = response.data;
    return symptomsData;
  } catch (error) {
    console.error('Error fetching symptoms data:', error.message);
    throw error;
  }
};

// Rule-Based Expert System for Computer Diagnostics
const diagnoseComputer = (symptoms) => {
  let computerIssue = null;
  let diagnosis = "";
  let recommendations = [];

  // Rule 1: Hardware Issue
  if (symptoms["Computer Fails to Turn On"].boolean && symptoms["Power Supply Failure"].boolean) {
    computerIssue = "Hardware Issue";
    diagnosis = "Your computer is experiencing a hardware issue.";
    recommendations.push("Check the power supply connections.");
    recommendations.push("Inspect the motherboard for any visible damage.");
    recommendations.push("Test the power supply with a multimeter.");
  }

  // Rule 2: Overheating
  if (symptoms["Overheating"].boolean && symptoms["Fan Malfunction"].boolean) {
    computerIssue = "Overheating";
    diagnosis = "Your computer is overheating.";
    recommendations.push("Clean the dust from the fans and vents.");
    recommendations.push("Check if all fans are working properly.");
    recommendations.push("Improve the ventilation around your computer.");
  }

  // Rule 3: Software Problem
  if (symptoms["Software Crashes"].boolean) {
    computerIssue = "Software Problem";
    diagnosis = "Your computer is facing software issues.";
    recommendations.push("Update your operating system and drivers.");
    recommendations.push("Scan for malware and viruses.");
    recommendations.push("Reinstall problematic software.");
  }

  // Rule 4: Network Issue
  if (symptoms["Internet Connection Issues"].boolean && !symptoms["Hardware Issue"].boolean && !symptoms["Software Problem"].boolean) {
    computerIssue = "Network Issue";
    diagnosis = "Your computer is experiencing network connection issues.";
    recommendations.push("Restart your modem and router.");
    recommendations.push("Check network cables and connections.");
    recommendations.push("Contact your internet service provider.");
  }

  // Rule 5: Display Problem
  if (symptoms["Display Problems"].boolean) {
    computerIssue = "Display Problem";
    diagnosis = "Your computer is facing display issues.";
    recommendations.push("Check the monitor connection.");
    recommendations.push("Update display drivers.");
    recommendations.push("Test with another monitor.");
  }

  // Rule 6: RAM Issues
  if (symptoms["Memory (RAM) Issues"].boolean) {
    computerIssue = "RAM Issues";
    diagnosis = "Your computer is experiencing memory (RAM) issues.";
    recommendations.push("Reseat the RAM modules.");
    recommendations.push("Test RAM with a diagnostic tool.");
    recommendations.push("Replace faulty RAM modules.");
  }

  // Rule 7: Hard Drive Failure
  if (symptoms["Hard Drive Failure"].boolean) {
    computerIssue = "Hard Drive Failure";
    diagnosis = "Your computer's hard drive is failing.";
    recommendations.push("Back up important data immediately.");
    recommendations.push("Check hard drive health with a diagnostic tool.");
    recommendations.push("Replace the failing hard drive.");
  }

  // Rule 8: Noisy Hard Drive
  if (symptoms["Noisy Hard Drive"].boolean) {
    computerIssue = "Noisy Hard Drive";
    diagnosis = "Your computer's hard drive is making unusual noise.";
    recommendations.push("Backup important data immediately.");
    recommendations.push("Replace the noisy hard drive.");
  }

  // Rule 9: System Freezes
  if (symptoms["System Freezes"].boolean) {
    computerIssue = "System Freezes";
    diagnosis = "Your computer is experiencing system freezes.";
    recommendations.push("Check for software conflicts.");
    recommendations.push("Update drivers and software.");
    recommendations.push("Test hardware components for issues.");
  }

  // Rule 10: Application Errors
  if (symptoms["Application Errors"].boolean) {
    computerIssue = "Application Errors";
    diagnosis = "Your computer is facing application errors.";
    recommendations.push("Reinstall the problematic applications.");
    recommendations.push("Check for updates to the applications.");
    recommendations.push("Run the applications in compatibility mode.");
  }

  // Rule 11: Unknown Issue
  if (computerIssue === null) {
    computerIssue = "Unknown Issue";
    diagnosis = "We are unable to diagnose the exact issue with your computer based on the symptoms provided.";
  }

  return {
    computerIssue,
    diagnosis,
    recommendations
  };
};

// Main function
const showResults = async () => {
  try {
    // Get symptoms data
    const symptoms = await getSymptomsData();

    // Create a dictionary from the symptoms list for easier access
    const symptomsDict = {};
    symptoms.forEach(symptom => {
      symptomsDict[symptom.symptom] = {
        boolean: symptom.boolean
      };
    });

    // Call the diagnoseComputer function with the symptoms data
    const { computerIssue, diagnosis, recommendations } = diagnoseComputer(symptomsDict);

    // Prepare the result JSON
    const resultJson = {
      result: computerIssue,
      diagnosis,
      recommendations
    };
    

    // Post the result JSON to an endpoint
    const response = await axios.post("http://localhost:3000/api/results", resultJson);
    console.log("Result JSON posted successfully:", response.data);

    return resultJson;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default showResults;
