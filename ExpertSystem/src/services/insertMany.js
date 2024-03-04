import axios from "axios"
const symptoms = {
    symptoms: [
      {
        "symptom": "Computer Fails to Turn On",
        "boolean": false,
        "id": "1"
      },
      {
        "id": "2",
        "symptom": "Random Computer Restarts",
        "boolean": false
      },
      {
        "id": "3",
        "symptom": "Internet Connection Issues",
        "boolean": false
      },
      {
        "id": "4",
        "symptom": "Overheating",
        "boolean": false
      },
      {
        "id": "5",
        "symptom": "Software Crashes",
        "boolean": false
      },
      {
        "id": "6",
        "symptom": "Peripheral Malfunction",
        "boolean": false
      },
      {
        "id": "7",
        "symptom": "Display Problems",
        "boolean": false
      },
      {
        "id": "8",
        "symptom": "Power Supply Failure",
        "boolean": false
      },
      {
        "id": "9",
        "symptom": "Fan Malfunction",
        "boolean": false
      },
      {
        "id": "10",
        "symptom": "Slow Performance",
        "boolean": false
      },
      {
        "id": "11",
        "symptom": "Blue Screen of Death (BSOD)",
        "boolean": false
      },
      {
        "id": "12",
        "symptom": "Continuous Beep Sounds on Startup",
        "boolean": false
      },
      {
        "id": "13",
        "symptom": "Memory (RAM) Issues",
        "boolean": false
      },
      {
        "id": "14",
        "symptom": "Hard Drive Failure",
        "boolean": false
      },
      {
        "id": "15",
        "symptom": "Noisy Hard Drive",
        "boolean": false
      },
      {
        "id": "16",
        "symptom": "System Freezes",
        "boolean": false
      },
      {
        "id": "17",
        "symptom": "Application Errors",
        "boolean": false
      },
      {
        "id": "18",
        "symptom": "Missing DLL Files",
        "boolean": false
      },
      {
        "id": "19",
        "symptom": "High CPU Usage",
        "boolean": false
      },
      {
        "id": "20",
        "symptom": "Unexpected Shutdowns",
        "boolean": false
      },
      {
        "id": "21",
        "symptom": "Slow Boot Time",
        "boolean": false
      },
      {
        "id": "22",
        "symptom": "Keyboard Malfunction",
        "boolean": false
      },
      {
        "id": "23",
        "symptom": "Mouse or Touchpad Not Working",
        "boolean": false
      },
      {
        "id": "24",
        "symptom": "USB Port Not Recognizing Devices",
        "boolean": false
      },
      {
        "id": "25",
        "symptom": "Printer Connection Issues",
        "boolean": false
      },
      {
        "id": "26",
        "symptom": "Wi-Fi Adapter Not Detected",
        "boolean": false
      },
      {
        "id": "27",
        "symptom": "Graphics Card Problems",
        "boolean": false
      },
      {
        "id": "28",
        "symptom": "Sound Card Not Working",
        "boolean": false
      },
      {
        "id": "29",
        "symptom": "System Time Incorrect",
        "boolean": false
      },
      {
        "id": "30",
        "symptom": "Computer Running Hot",
        "boolean": false
      },
      {
        "id": "31",
        "symptom": "Computer Fans Running Loudly",
        "boolean": false
      },
      {
        "id": "32",
        "symptom": "Error Messages During Boot",
        "boolean": false
      },
      {
        "id": "33",
        "symptom": "Network Connectivity Problems",
        "boolean": false
      },
      {
        "id": "34",
        "symptom": "System Files Missing or Corrupted",
        "boolean": false
      }
    ]
  }
  
const symptomsArray = symptoms.symptoms

const url = "http://localhost:3000/api/symptoms"

const insert = async () => {
    symptomsArray.forEach((symptom)=>{
        axios
            .post(url,symptom)
            .then(result=>console.log(result))
            .catch(error=>console.log(error))
    })
}

insert()