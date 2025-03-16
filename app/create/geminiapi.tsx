// Code to interact with Gemini API for image and document verification

import axios from 'axios';

// Interface for file data
interface FileData {
  file: File;
  type: string;
}

// Convert file to base64
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1]; // Remove data URL part
      resolve(base64String || '');
    };
    reader.onerror = (error) => reject(error);
  });
};

// Check if image exists on web using Gemini
export const checkImageExistsOnWeb = async (imageFile: File | null): Promise<string> => {
  if (!imageFile) {
    return "No image provided";
  }

  try {
    // Convert image to base64
    const base64Data = await convertFileToBase64(imageFile);
    
    // Prompt for Gemini to check if image exists on web
    const imageSearchPrompt = `
      Hey! I want you to do this work for me, I am giving you this cause you are best suited for the job, haven't had such accurate results before, so the job is firstly find image of human in the document I have provided you using that I want you to global web search for that image exactly like google lens search, and output the result to me in yes or no form, that is whether or not that image exists on global web, if not then output "not found" and if you do find it just output "found it" and I need you to be very careful with this, cause I want you to search for exact match there should be no visible difference between image from document I provided and image you will see on web.
    `;
    const API_KEY = 'AIzaSyB1i62tOXe6jLJ-fm7jpDo4mF-HQpQCJYE';
    
    // Call Gemini API to check if image exists
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: imageSearchPrompt },
              {
                inline_data: {
                  mime_type: imageFile.type,
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Replace with your API key - Add your Gemini API key here
        //   "Authorization": `Bearer AIzaSyB1i62tOXe6jLJ-fm7jpDo4mF-HQpQCJYE`
        }
      }
    );
    
    // Extract the response text
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Return the result (should be "found it" or "not found")
    return responseText.trim();
    
  } catch (error) {
    console.error("Error checking image on web:", error);
    return "Error checking image";
  }
};

// Verify campaign using Gemini AI
// export const verifyCampaignWithGemini = async (
//   campaignDetails: {
//     title: string;
//     description: string;
//     ngoRegistrationNumber: string;
//     goal: string;
//     contactName: string;
//     contactEmail: string;
//     contactPhone: string;
//     milestones: Array<{ title: string; amount: string }>;
//   },
//   files: {
//     imageFile: File | null;
//     certificateFile: File | null;
//     supportingDocFile: File | null;
//   }
// ): Promise<{
//   isGenuine: boolean;
//   confidenceScore: number;
//   analysisDetails: string;
//   flags: string[];
//   imageWebCheckResult?: string;
// }> => {
//   try {
//     // First, check if campaign image exists on web
//     let imageWebCheckResult = "No image check performed";
//     if (files.imageFile) {
//       imageWebCheckResult = await checkImageExistsOnWeb(files.imageFile);
//     }
    
//     const filesToProcess = [];
    
//     if (files.imageFile) {
//       filesToProcess.push({
//         file: files.imageFile,
//         type: "campaign_image"
//       });
//     }
    
//     if (files.certificateFile) {
//       filesToProcess.push({
//         file: files.certificateFile,
//         type: "ngo_certificate"
//       });
//     }
    
//     if (files.supportingDocFile) {
//       filesToProcess.push({
//         file: files.supportingDocFile,
//         type: "supporting_document"
//       });
//     }
    
//     // Convert files to base64
//     const filePromises = filesToProcess.map(async (fileObj) => {
//       const base64Data = await convertFileToBase64(fileObj.file);
//       return {
//         type: fileObj.type,
//         data: base64Data,
//         name: fileObj.file.name,
//         mimeType: fileObj.file.type
//       };
//     });
    
//     const processedFiles = await Promise.all(filePromises);
    
//     // Prepare a specific prompt for Gemini focused on verification
//     const verificationPrompt = `
//       CAMPAIGN VERIFICATION TASK
      
//       Please analyze this fundraising campaign for authenticity and respond with a JSON object containing:
//       1. isGenuine (boolean): Overall assessment of whether the campaign appears genuine
//       2. confidenceScore (number 0-100): Confidence in your assessment
//       3. analysisDetails (string): Detailed analysis
//       4. flags (array of strings): List of any red flags or concerns
      
//       CRITICALLY IMPORTANT: Search for the supporting documents online. If you find that these documents are being used elsewhere or appear to be copied, the campaign should be REJECTED immediately as likely fraudulent.
      
//       Campaign Details:
//       - Title: ${campaignDetails.title}
//       - Description: ${campaignDetails.description}
//       - NGO Registration: ${campaignDetails.ngoRegistrationNumber}
//       - Goal Amount: ${campaignDetails.goal}
//       - Contact: ${campaignDetails.contactName} (${campaignDetails.contactEmail}, ${campaignDetails.contactPhone})
//       - Milestones: ${campaignDetails.milestones.map(m => `${m.title}: ₹${m.amount}`).join(', ')}
      
//       Look for:
//       - Inconsistencies in the documents
//       - Verification of NGO registration number
//       - Evidence of document manipulation or forgery
//       - Whether the campaign details match the provided documents
//       - Any indicators of fraud or misrepresentation
      
//       Format your response as valid JSON.
//     `;
    
    // Call Gemini API
    // const response = await axios.post(
    //   "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent",
    //   {
    //     contents: [
    //       {
    //         parts: [
    //           { text: verificationPrompt },
    //           ...processedFiles.map(file => ({
    //             inline_data: {
    //               mime_type: file.mimeType,
    //               data: file.data
    //             }
    //           }))
    //         ]
    //       }
    //     ],
    //     generationConfig: {
    //       temperature: 0.2,
    //       maxOutputTokens: 4096
    //     }
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Replace with your API key - Add your Gemini API key here
    //       "Authorization": `Bearer AIzaSyB1i62tOXe6jLJ-fm7jpDo4mF-HQpQCJYE`
    //     }
    //   }
    // );
    
    // Parse the response to get the analysis
//     const responseText = response.data.candidates[0].content.parts[0].text;
    
//     // Extract the JSON from the response
//     let analysisResult;
//     try {
//       // Handle potential JSON formatting issues in the response
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         analysisResult = JSON.parse(jsonMatch[0]);
//       } else {
//         throw new Error("Could not parse JSON from response");
//       }
//     } catch (parseError) {
//       console.error("Error parsing JSON from Gemini response:", parseError);
      
//       // Fallback with a best-effort extraction
//       const isGenuine = responseText.toLowerCase().includes("genuine") && 
//                         !responseText.toLowerCase().includes("not genuine");
      
//       analysisResult = {
//         isGenuine: isGenuine,
//         confidenceScore: 50,
//         analysisDetails: responseText,
//         flags: ["Error parsing structured response"]
//       };
//     }
    
//     // Add the image web check result to the analysis result
//     return {
//       ...analysisResult,
//       imageWebCheckResult
//     };
//   } catch (error) {
//     console.error("Error in Gemini verification:", error);
//     throw new Error("Failed to verify campaign with Gemini");
//   }
// };
