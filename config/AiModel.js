const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate a 30 second video on topic:intersting historical story along with ai image prompt in realistic format for each scene and give me result in json format with image prompt and context as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"The Great Molasses Flood of 1919\",\n  \"description\": \"A sweet disaster in Boston that taught us about engineering and community.\",\n  \"scenes\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 5,\n      \"context\": \"A bustling street scene in Boston's North End, 1919. People are going about their daily lives, horse-drawn carts are moving along cobblestone streets, and factories are visible in the background.\",\n      \"image_prompt\": \"Realistic photograph, 1919 Boston North End, bustling street scene, horse-drawn carts, factory buildings in background, people walking, overcast sky, vintage clothing, grainy texture, natural lighting, depth of field emphasizing street activity.\"\n    },\n    {\n      \"scene_number\": 2,\n      \"duration\": 7,\n      \"context\": \"Focus on a massive, rusty molasses tank towering over the neighborhood. Steam is slightly visible rising from the tank.  The sun glints off the metal.\",\n      \"image_prompt\": \"Realistic photograph, massive rusty metal molasses tank, Boston North End 1919, towering over buildings, steam rising from top, sunlight glinting on metal, overcast sky, industrial atmosphere, wide angle lens, slight perspective distortion from height.\"\n    },\n    {\n      \"scene_number\": 3,\n      \"duration\": 8,\n      \"context\": \"A dramatic depiction of the molasses tank bursting. A wave of dark brown molasses surges outwards, engulfing buildings and people.  Chaos and destruction.\",\n      \"image_prompt\": \"Dramatic realistic painting, molasses tank bursting, wave of dark brown molasses engulfing buildings and people, Boston North End 1919, chaotic scene, debris flying through the air, terrified expressions on people's faces, dark and dramatic lighting, wide angle perspective, visible tank fragments.\"\n    },\n    {\n      \"scene_number\": 4,\n      \"duration\": 5,\n      \"context\": \"Aftermath of the flood. The street is covered in thick, dark molasses. Rescue workers are helping survivors.  Damage to buildings is evident.\",\n      \"image_prompt\": \"Realistic photograph, aftermath of the Great Molasses Flood, Boston North End 1919, street covered in thick dark molasses, rescue workers helping survivors, damaged buildings, debris everywhere, somber atmosphere, muted colors, natural lighting, close-up on a rescuer helping a survivor.\"\n    },\n    {\n      \"scene_number\": 5,\n      \"duration\": 5,\n      \"context\": \"A modern-day engineer examining blueprints of the tank, next to a historical photo of the disaster. Implying lessons learned.\",\n      \"image_prompt\": \"Realistic photograph, modern engineer examining blueprints next to a historical black and white photo of the Great Molasses Flood aftermath, split screen effect, engineer in a modern suit, blueprints with technical drawings, well-lit environment, contrast between old and new, serious expression on the engineer's face.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
